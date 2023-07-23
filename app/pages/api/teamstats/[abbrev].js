import { getTeamStats } from "@apis/stats";

export default async function teamstats(req, res) {
    try {
        const data = await getTeamStats(req.query.abbrev);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
