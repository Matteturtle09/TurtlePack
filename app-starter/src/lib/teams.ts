import { ObjectId } from "mongodb";
import client from "./db/mongoClient";

export async function getTeamById(teamId: string) {
    const dataBase = client.db("test");
    const teamsCol = dataBase.collection("teams");

    if (!teamId) {
        throw new Error("Team ID is required.");
    }

    const team = await teamsCol.findOne({ _id: new ObjectId(teamId) });
    if (!team) {
        throw new Error("Team not found.");
    }

    return team;
}

export async function getTeamMembersById(teamId: string) {
    const dataBase = client.db("test");
    const teamsCol = dataBase.collection("teams");
    const usersCol = dataBase.collection("users");

    if (!teamId) {
        throw new Error("Team ID is required.");
    }

    // Find the team document
    const team = await teamsCol.findOne({ _id: new ObjectId(teamId) });
    if (!team) {
        throw new Error("Team not found.");
    }

    const { members: membersList, admin: adminList } = team;

    // Query the `users` collection to get full user details for members and admins
    const members = await usersCol.find({ _id: { $in: membersList.map((id:string) => new ObjectId(id)) } }).toArray();
    const admins = await usersCol.find({ _id: { $in: adminList.map((id:string) => new ObjectId(id)) } }).toArray();
    // Return the team object with resolved member and admin details
    return {
        ...team,
        members,
        admins,
    };
}
