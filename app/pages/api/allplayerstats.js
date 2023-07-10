import { getAllPlayerStats } from "../../apis/stats.js";

export default async function allplayerstats(req, res) {
    try {
        const page = (req.query.page ?? 1) - 1;
        const data = await getAllPlayerStats(page);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
