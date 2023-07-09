import { getPlayerStats } from "../../../apis/stats"

export default async function playerstats(req, res) {
    try {
        const data = await getPlayerStats(req.query.pid)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).json(err)
    }
}