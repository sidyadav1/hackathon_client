import { BASE_URL, headers } from "./fetch";

export const getTodayMatch = () => {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(`${BASE_URL}/get_today_match`, {
            method: "GET",
        });
        const data = await result.json();
        if (result.status !== 200) {
            return reject(data.message);
        }
        return resolve(data.data);
    });
};

export const getUsersLeaderBoard = (offset) => {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(
            `${BASE_URL}/users_leaderboard?offset=${offset}`,
            {
                method: "GET",
            }
        );
        const data = await result.json();
        if (result.status !== 200) {
            return reject(data.message);
        }
        return resolve(data.data);
    });
};

export const getUpcomingMatches = (offset) => {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(
            `${BASE_URL}/get_upcoming_matches?offset=${offset}`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await result.json();
        if (result.status !== 200) {
            return reject(data.message);
        }
        return resolve(data.data);
    });
};

export const getUserPredictionForMatch = ({ matchid }) => {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(
            `${BASE_URL}/user_prediction_match?matchid=${matchid}`,
            {
                method: "GET",
                headers: headers,
            }
        );
        const data = await result.json();
        if (result.status !== 200) {
            return reject(data.message);
        }
        return resolve(data.data);
    });
};

export const makeUserPrediction = (prediction, matchid) => {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(`${BASE_URL}/create_prediction`, {
            method: "POST",
            body: JSON.stringify({ prediction, matchid }),
            headers: headers,
        });
        const data = await result.json();
        console.log(data);
        if (result.status !== 200) {
            return reject(data.message);
        }
        return resolve(data.data);
    });
};
