import { getAllTeamStats } from "../../apis/stats.js";

export default async function allteamstats(req, res) {
    try {
        const page = (req.query.page ?? 1) - 1;
        const data = await getAllTeamStats(page);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
