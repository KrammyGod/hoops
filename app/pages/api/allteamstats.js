import { getAllTeamStats } from "../../apis/stats.js";

export default async function allteamstats(req, res) {
    try {
        const data = await getAllTeamStats();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
