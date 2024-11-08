"use server"
import client from "@/lib/db/mongoClient";
import { ObjectId } from "mongodb";
import { faker } from '@faker-js/faker';
import { revalidatePath } from "next/cache";

export async function joinTeam(formData: FormData) {
    const dataBase = client.db("test");
    const teamsCol = dataBase.collection("teams");
    const usersCol = dataBase.collection("users");
    const invitesCol = dataBase.collection("invites");

    // Get user ID and token/phrase from formData and ensure they are not empty
    const userId = formData.get("userId")?.toString();
    const token = formData.get("token")?.toString();
    const phrase = formData.get("phrase")?.toString();

    // Check that required fields are provided
    if (!userId || (!token && !phrase)) {
        throw new Error("User ID and either a token or phrase are required.");
    }

    // Find the user by ID
    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw new Error("User not found.");
    }

    // Define the query for finding the invite
    const inviteQuery: any = {};
    if (token) inviteQuery.token = token;
    if (phrase) inviteQuery.phrase = phrase;

    // Find the invite using token, phrase, or both
    const invite = await invitesCol.findOne(inviteQuery);
    if (!invite || !invite.teamId) {
        throw new Error("Invalid or expired token/phrase.");
    }

    // Find the team by invite's teamId
    const team = await teamsCol.findOne({ _id: invite.teamId });
    if (!team) {
        throw new Error("Team not found.");
    }

    // Add the user to the team
    const result = await teamsCol.updateOne(
        { _id: invite.teamId },
        { $addToSet: { members: userId } }  // Ensures user is added only once
    );

    if (result.modifiedCount === 0) {
        throw new Error("Failed to join team.");
    }

    return { success: true, message: "User successfully joined the team." };
}

export async function createTeamInvite(prevState: any, formData: FormData) {
    const teamId = formData.get('teamId')?.toString();
    const token = formData.get('token')?.toString();
    const dataBase = client.db("test");
    const invitesCol = dataBase.collection("invites");

    // Ensure there's an index on 'createdAt' for automatic expiration after 1 hour
    invitesCol.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 3600 } // Documents will expire 1 hour after creation
    );

    // Check if an invite for this team already exists
    const existingInvite = await invitesCol.findOne({ teamId: new ObjectId(teamId) });
    if (existingInvite) {
        // Return the existing invite's phrase and link if found
        return {
            phrase: existingInvite.phrase,
            link: `${process.env.NEXT_PUBLIC_URL}team/invite/${existingInvite.token}`
        };
    }

    // If no existing invite, create a new one
    const phrase = faker.commerce.productName();
    const invite = await invitesCol.insertOne({
        teamId: new ObjectId(teamId),
        token: token,
        phrase: phrase,
        createdAt: new Date()
    });

    return {
        phrase: phrase,
        link: `${process.env.NEXT_PUBLIC_URL}team/invite/${token}`
    };
}


export async function createTeam(formData: FormData){
    const teamName = formData.get("teamName");
    const admin = formData.get("userId");
    const dataBase = client.db("test")
    const teamsCol = dataBase.collection("teams")
    const usersCol = dataBase.collection("users")
    const userId: string = formData.get("userId") ?? "";
    const newTeam = await teamsCol.insertOne({
        name: teamName,
        admin: [userId],
        members: [userId]
    })
    const user = await usersCol.updateOne({_id: new ObjectId(userId)}, {$addToSet: {teams: newTeam.insertedId.toString()}})
    
}

export async function updateTeamName(formData: FormData) {
    const teamId = formData.get("teamId")?.toString();
    const newTeamName = formData.get("teamName")?.toString();
    const userId = formData.get("userId")?.toString();
    const dataBase = client.db("test");
    const teamsCol = dataBase.collection("teams");
    // Check if required fields are provided
   

    // Find the team by ID and ensure the user is the team admin
    const team = await teamsCol.findOne({ _id: new ObjectId(teamId), admin: userId });
    console.log(newTeamName)
    if (!team) {
        throw new Error("Team not found or you do not have permission to update this team.");
    }

    // Update the team's name
    const result = await teamsCol.updateOne(
        { _id: new ObjectId(teamId) },
        { $set: { name: newTeamName } }
    );

    if (result.modifiedCount === 0) {
        return
    }
    revalidatePath(`/team/${teamId}/dashboard/team-settings/`)

    return { success: true, message: "Team name updated successfully." };
}
