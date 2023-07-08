import { getTeamStats } from "../../../apis/stats"

export default async function teamstats(req, res) {
    const stats = await getTeamStats(req.query.abbrev);
    res.send(stats);
};