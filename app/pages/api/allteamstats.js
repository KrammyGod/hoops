import { getAllTeamStats } from "../../apis/stats.js";

export default async function allteamstats(req, res) {
    const stats = await getAllTeamStats();
    res.send(stats);
};