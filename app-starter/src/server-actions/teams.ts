"use server"
import client from "@/lib/db/mongoClient";
import { ObjectId } from "mongodb";


export async function joinTeam(formData: FormData) {
    const dataBase = client.db("test");
    const teamsCol = dataBase.collection("teams");
    const usersCol = dataBase.collection("users");
    const invitesCol = dataBase.collection("invites");

    // Get user ID and token from formData and ensure they are not empty
    const userId = formData.get("userId")?.toString();
    const token = formData.get("token")?.toString();

    // Check that required fields are provided
    if (!userId || !token) {
        throw new Error("User ID and token are required.");
    }

    // Find the user by ID
    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw new Error("User not found.");
    }

    // Find the invite by token and ensure it exists
    const invite = await invitesCol.findOne({ token });
    if (!invite || !invite.teamId) {
        throw new Error("Invalid or expired token.");
    }

    // Convert teamId to a string
    const teamId = invite.teamId.toString();

    // Add teamId to the user's teams array, and add userId to the team's members array
    await usersCol.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { teams: teamId } } // Prevent duplicate entries in the array
    );
    await teamsCol.updateOne(
        { _id: new ObjectId(teamId) },
        { $addToSet: { members: userId } } // Prevent duplicate entries in the array
    );
}

export async function createTeamInvite(prevState: any ,formData: FormData){
    const teamId = formData.get('teamId')
    const token = formData.get('token')
    const dataBase = client.db("test")
    const invitesCol = dataBase.collection("invites")
    invitesCol.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 3600 } // Documents will expire 1 hour after creation
      );
    await invitesCol.insertOne({
        teamId: new ObjectId(teamId),
        token: token,
        createdAt: new Date()
    })
    return {phrase: "", link: `${process.env.NEXT_PUBLIC_URL}team/invite/${token}`}
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
