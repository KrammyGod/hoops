const API = "http://localhost:3000/api";

async function playerSearch() {
    const response = await fetch(`${API}/playersearch?id=john&page=1`);
    return response.json();
}

async function teamSearch() {
    const response = await fetch(`${API}/teamsearch?id=ana&page=1`);
    return response.json();
}

async function leaderboard() {
    const response = await fetch(`${API}/leaderboards/twpt?page=3`);
    return response.json();
}

async function playerFilter() {
    const response = await fetch(`${API}/playerfilter?rebounds=500&assists=500&points=2000&games=60&season=2023`);
    return response.json();
}

async function playerStats() {
    const response = await fetch(`${API}/playerstats/1`);
    return response.json();
}

async function playerSearchError() {
    const response = await fetch(`${API}/playersearch?id=x&page=1000000`);
    return response.json();
}

async function playerStatsError() {
    const response = await fetch(`${API}/playerstats/-1`);
    return response.json();
}

async function leaderboardError() {
    const response = await fetch(`${API}/leaderboards/x?page=1`);
    return response.json();
}

async function retry(fn, retries, delay) {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return await retry(fn, retries - 1, delay);
        }
        throw error;
    }
}

test('player search returns the correct players for search "john", limited to 10 on page 1', async () => {
  // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(playerSearch, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"data": [{"firstname": "Harold", "lastname": "Johnson", "pid": 82}, {"firstname": "John", "lastname": "Abramovic", "pid": 100}, {"firstname": "John", "lastname": "Barr", "pid": 101}, {"firstname": "John", "lastname": "Janisch", "pid": 102}, {"firstname": "John", "lastname": "Logan", "pid": 103}, {"firstname": "John", "lastname": "Mahnken", "pid": 104}, {"firstname": "John", "lastname": "Mills", "pid": 105}, {"firstname": "John", "lastname": "Murphy", "pid": 106}, {"firstname": "Johnny", "lastname": "Norlander", "pid": 107}, {"firstname": "Johnny", "lastname": "Simmons", "pid": 108}]});
}, 15000);

test('team search returns the correct teams for search "ana", limited to 10 on page 1', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(teamSearch, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"data": [{"abbrev": "ANA", "tname": "Anaheim Amigos"}, {"abbrev": "INA", "tname": "Indiana Pacers"}, {"abbrev": "IND", "tname": "Indiana Pacers"}, {"abbrev": "INJ", "tname": "Indianapolis Jets"}, {"abbrev": "INO", "tname": "Indianapolis Olympians"}]});
}, 15000);

test('leaderboard of total wins per team on page 3', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(leaderboard, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"data": [{"id": "LAC", "name": "Los Angeles Clippers", "value": "1347"}, {"id": "SAC", "name": "Sacramento Kings", "value": "1296"}, {"id": "ORL", "name": "Orlando Magic", "value": "1268"}, {"id": "NJN", "name": "New Jersey Nets", "value": "1186"}, {"id": "MIN", "name": "Minnesota Timberwolves", "value": "1091"}, {"id": "TOR", "name": "Toronto Raptors", "value": "1071"}, {"id": "WSB", "name": "Washington Bullets", "value": "887"}, {"id": "WAS", "name": "Washington Wizards", "value": "879"}, {"id": "MEM", "name": "Memphis Grizzlies", "value": "870"}, {"id": "OKC", "name": "Oklahoma City Thunder", "value": "668"}]});
}, 15000);

test('player filter of players with 500 rebounds, 500 assists, 2000 points in season 2023', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(playerFilter, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"data": [{"assists": 529, "games": 66, "id": 4654, "name": "Luka Dončić", "points": 2138, "rebounds": 569, "season": 2023}]});
}, 15000);

test('player stats of player with pid 1', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(playerStats, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"player": {"firstname": "Al", "lastname": "Brightman", "pid": 1}, "stats": [{"abbrev": "BOS", "assists": 60, "games": 58, "rebounds": null, points: 567, "season": 1947, "tname": "Boston Celtics"}]});
}, 15000);

test('player search with invalid page value', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(playerSearchError, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"data": []});
}, 15000);

test('player stats with invalid pid', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(playerStatsError, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"stats": []});
}, 15000);

test('leaderboard with invalid type', async () => {
    // Retry up to 3 times with 2-second intervals between retries
    const maxRetries = 3;
    const retryDelay = 2000;

    const response = await retry(leaderboardError, maxRetries, retryDelay);

    // Assertion: Check if the response data is correct
    expect(response).toEqual({"messages": "Invalid leaderboard type"});
}, 15000);
