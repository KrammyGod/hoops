'use client'
import { useEffect, useState } from 'react';
import { API } from "@/types/config";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Table from 'react-bootstrap/Table';

const LeaderboardTypes = {
    TOTAL_WINS_PER_TEAM: <><th>Team Abbreviation</th><th>Team</th><th>Lifetime Wins</th></>,
    AVERAGE_POINTS_PER_PLAYER: <><th>Player ID</th><th>Player</th><th>Lifetime Average Points</th></>,
    MOST_BOOKMARKED_PLAYERS: <><th>Player ID</th><th>Player</th><th>Total Bookmarks</th></>,
    PERCENTAGE_WINS_PER_TEAM: <><th>Team Abbreviation</th><th>Team</th><th>Lifetime Wins(%)</th></>
};

enum LeaderboardAbbrevs {
    TOTAL_WINS_PER_TEAM = 'twpt',
    AVERAGE_POINTS_PER_PLAYER = 'appp',
    MOST_BOOKMARKED_PLAYERS = 'mbp',
    PERCENTAGE_WINS_PER_TEAM = 'pgpt'
};

function generateCols(data : { id : string, name : string, value : string }[]) {
    if (data.length === 0) return (<tr><td colSpan={3} align='center'>No data found.</td></tr>);
    return data.map((item) => (
        <tr key={item.id}>
        <td align='center'>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.value}</td>
        </tr>
    ));
}

export default function Leaderboards() {
    const [data, setData] = useState<{ id : string, name : string, value : string }[]>([]);
    const [leaderboardType, setLeaderboardType] = useState<JSX.Element>(LeaderboardTypes.TOTAL_WINS_PER_TEAM);
    const [leaderboardAbbrev, setLeaderboardAbbrev] = useState<string>(LeaderboardAbbrevs.TOTAL_WINS_PER_TEAM);
    const [radioValue, setRadioValue] = useState(1);

    const radios = [
        { name: 'Total Wins Per Team', value: 1 },
        { name: 'Average Points Per Player', value: 2 },
        { name: 'Most Bookmarked Players', value: 3 },
        { name: 'Percentage Wins Per Team', value: 4 },
    ];

    const radioChange = (val : number) => {
        setRadioValue(val);
        switch (val) {
            case 1:
                setLeaderboardType(LeaderboardTypes.TOTAL_WINS_PER_TEAM);
                break;
            case 2:
                setLeaderboardType(LeaderboardTypes.AVERAGE_POINTS_PER_PLAYER);
                break;
            case 3:
                setLeaderboardType(LeaderboardTypes.MOST_BOOKMARKED_PLAYERS);
                break;
            case 4:
                setLeaderboardType(LeaderboardTypes.PERCENTAGE_WINS_PER_TEAM);
                break;
        }
    };
    
    useEffect(() => {
        switch (leaderboardType) {
            case LeaderboardTypes.TOTAL_WINS_PER_TEAM:
                setLeaderboardAbbrev(LeaderboardAbbrevs.TOTAL_WINS_PER_TEAM);
                break;
            case LeaderboardTypes.AVERAGE_POINTS_PER_PLAYER:
                setLeaderboardAbbrev(LeaderboardAbbrevs.AVERAGE_POINTS_PER_PLAYER);
                break;
            case LeaderboardTypes.MOST_BOOKMARKED_PLAYERS:
                setLeaderboardAbbrev(LeaderboardAbbrevs.MOST_BOOKMARKED_PLAYERS);
                break;
            case LeaderboardTypes.PERCENTAGE_WINS_PER_TEAM:
                setLeaderboardAbbrev(LeaderboardAbbrevs.PERCENTAGE_WINS_PER_TEAM);
                break;
        }
    }, [leaderboardType]);

    useEffect(() => {
        fetch(`${API}/leaderboards/${leaderboardAbbrev}`)
            .then((res) => res.json())
            .then((data) => setData(data.data ?? []))
            .catch(() => setData([]));
    }, [leaderboardAbbrev]);
    
    return (
        <div>
        <h1 className='text-center'>Leaderboards</h1>
        <ToggleButtonGroup name="types" type="radio" value={radioValue} onChange={radioChange}>
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    value={radio.value}
                    variant="secondary"
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
        <Table striped bordered hover variant="dark">
            <thead className='text-center'>
            <tr className='text-center'>
                {leaderboardType}
            </tr>
            </thead>
            <tbody>
                {generateCols(data)}
            </tbody>
        </Table>
        </div>
    );
}
