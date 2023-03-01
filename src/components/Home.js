import homePageCss from "./Home.module.css";
import teamImage from "../assets/csk.png";
import vsImage from "../assets/vs.png";
import Prediction from "./Prediction";
import { useEffect, useRef, useState } from "react";
import {
    getTodayMatch,
    getUpcomingMatches,
    getUsersLeaderBoard,
} from "../APIs/matches";

const Home = () => {
    const dataFetched = useRef(false);
    const [todayMatch, setTodayMatch] = useState(null);
    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);

    const [leaderBoard, setLeaderBoard] = useState([]);
    const leaderBoardOffset = useRef(0);

    const [upcomingMatches, setupcomingMatches] = useState([]);
    const [teams, setTeams] = useState({});
    const upcomingMatchesOffset = useRef(0);

    useEffect(() => {
        if (dataFetched.current) return;
        getTodayMatch().then((result) => {
            setTodayMatch(result.match);
            setTeamA(result[result.match.teams[0]]);
            setTeamB(result[result.match.teams[1]]);
        });

        getUsersLeaderBoard(leaderBoardOffset).then((result) => {
            leaderBoardOffset.current = leaderBoardOffset.current + 10;
            setLeaderBoard((l) => {
                const newLeaderBoard = [...l, ...result];
                return newLeaderBoard;
            });
        });

        getUpcomingMatches(upcomingMatchesOffset).then((result) => {
            upcomingMatchesOffset.current = upcomingMatchesOffset.current + 10;
            setupcomingMatches((u) => {
                return [...u, ...result.upcomingMatches];
            });
            setTeams((t) => {
                return { ...t, ...result.teams };
            });
        });

        dataFetched.current = true;
    }, []);
    return (
        <div className={homePageCss.home}>
            <div className={homePageCss.heroSection}>
                <div className={homePageCss.heroContainer}>
                    <div className={homePageCss.heroHeader}>
                        <h1>Cricket Predictions</h1>
                        <p className={homePageCss.heroAbout}>
                            If you're looking for high-quality and accurate
                            cricket predictions and the today match prediction
                            for all International tests and major T20 and T10
                            leagues, you're on the right page.
                        </p>
                    </div>
                    <div className={homePageCss.todayMatch}>
                        <h1 className={homePageCss.todayMatchHeader}>
                            Today's Match
                        </h1>
                        <div className={homePageCss.todayTeams}>
                            <div className={homePageCss.team}>
                                <img
                                    className={homePageCss.teamImage}
                                    src={teamImage}
                                    alt="Teams"
                                />
                                <h4 className={homePageCss.teamName}>
                                    {teamA?.name}
                                </h4>
                            </div>
                            <div className={homePageCss.teamVS}>
                                <img
                                    className={homePageCss.vsImage}
                                    src={vsImage}
                                    alt="vs"
                                />
                            </div>
                            <div className={homePageCss.team}>
                                <img
                                    className={homePageCss.teamImage}
                                    src={teamImage}
                                    alt="Teams"
                                />
                                <h4 className={homePageCss.teamName}>
                                    {teamB?.name}
                                </h4>
                            </div>
                        </div>
                        <Prediction
                            match={todayMatch}
                            teamA={teamA}
                            teamB={teamB}
                        />
                    </div>
                </div>
            </div>
            <div className={homePageCss.matches}>
                <div className={homePageCss.matchesContainer}>
                    <h2 className={homePageCss.upcomingMatcheHeader}>
                        Upcoming Matches
                    </h2>
                    <div className={homePageCss.upcoming}>
                        {upcomingMatches.map((match) => {
                            return (
                                <div
                                    className={homePageCss.upcomingMatch}
                                    key={match.id}
                                >
                                    <p className={homePageCss.upcomingDate}>
                                        01 Mar 2023 - 14:00 IST
                                    </p>
                                    <div className={homePageCss.upcomingTeams}>
                                        {match?.teams.map((teamId) => {
                                            return (
                                                <div
                                                    className={
                                                        homePageCss.upcomingTeam
                                                    }
                                                    key={teamId}
                                                >
                                                    <img
                                                        src={teamImage}
                                                        className={
                                                            homePageCss.upcomingTeamImage
                                                        }
                                                        alt="team"
                                                    />
                                                    <p
                                                        className={
                                                            homePageCss.upcomingTeamName
                                                        }
                                                    >
                                                        {teams[teamId]?.name}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <span className={homePageCss.upcomingVS}>
                                        &#127951; {teamA?.name} VS {teamB?.name}
                                    </span>
                                    <span
                                        className={homePageCss.goToPrediction}
                                    >
                                        Make a Prediction
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={homePageCss.leaderboard}>
                <div className={homePageCss.leaderboardContainer}>
                    <h2 className={homePageCss.leaderboardHeader}>
                        Top Players
                    </h2>
                    <div className={homePageCss.leaderboardTableHeader}>
                        <span className={homePageCss.leaderboardTableName}>
                            Name
                        </span>
                        <span className={homePageCss.leaderboardTableScore}>
                            Score
                        </span>
                    </div>
                    <ol className={homePageCss.leaders}>
                        {leaderBoard?.map((user) => {
                            return (
                                <li
                                    className={homePageCss.leaderBoardUser}
                                    key={user.id}
                                >
                                    <span
                                        className={homePageCss.leaderboardName}
                                    >
                                        <img
                                            src={teamImage}
                                            className={
                                                homePageCss.leaderboardImage
                                            }
                                            alt="user"
                                        />
                                        {user.name}
                                    </span>
                                    <span
                                        className={homePageCss.leaderboardScore}
                                    >
                                        {user.score}
                                    </span>
                                </li>
                            );
                        })}
                        <span className={homePageCss.fetchMoreLeaderBoard}>
                            Get more users
                        </span>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Home;
