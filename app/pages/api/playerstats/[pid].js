import { getPlayerStats } from "../../../apis/stats"

export default async function playerstats(req, res) {
    const stats = await getPlayerStats(req.query.pid);
    res.send(stats);
};