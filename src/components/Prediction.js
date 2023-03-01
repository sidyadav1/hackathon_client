import React, { useEffect, useRef, useState } from "react";
import { getUserPredictionForMatch, makeUserPrediction } from "../APIs/matches";
import predictionCss from "./Prediction.module.css";
import csk from "../assets/csk.png";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

const Prediction = ({ match, teamA, teamB }) => {
    const [{ user, predictions }, dispatch] = useStateValue();
    const date = Date(match?.date);
    const countDownDate = new Date(
        `${date.substring(0, 15)} 16:00:00`
    ).getTime();
    const initalTimer = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const [timer, setTimer] = useState(initalTimer);
    const timeUp = useRef(false);

    const [prediction, setPrediction] = useState(null);

    const makePrediction = (pred) => {
        makeUserPrediction(pred, match.id).then((result) => {
            setPrediction(result);
        });
    };

    useEffect(() => {
        // if (dataFetched.current) return;
        getUserPredictionForMatch({ matchid: match?.id })
            .then((result) => {
                setPrediction(result);
            })
            .catch((error) => {
                setPrediction(null);
            });
        // dataFetched.current = true;
    }, [match?.id, user]);

    useEffect(() => {
        setInterval(function () {
            var now = new Date().getTime();
            var timeleft = countDownDate - now;

            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
                (timeleft % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

            setTimer({ days, hours, minutes, seconds });
        }, 1000);
    }, [countDownDate]);

    const MatchOver = () => {
        return match?.updated ? (
            <div className={predictionCss.prediction}>
                {prediction ? (
                    <>
                        <h1 className={predictionCss.alreadyHeader}>
                            Match Over, Your Prediction for Match
                        </h1>
                        <div className={predictionCss.predictionTeam}>
                            {prediction.prediction !== "draw" ? (
                                <img
                                    className={
                                        predictionCss.predictionTeamImage
                                    }
                                    src={csk}
                                    alt="Team"
                                />
                            ) : (
                                ""
                            )}
                            <p className={predictionCss.predictionTeamName}>
                                {prediction.prediction === teamA?.id
                                    ? teamA?.name
                                    : prediction.prediction === teamB?.id
                                    ? teamB?.name
                                    : "Draw"}
                            </p>
                        </div>
                        <p className={predictionCss.result}>
                            {prediction === null
                                ? "You didn't male any predictions for the match !!!!"
                                : prediction?.result
                                ? "Congratulations your prediction was correct"
                                : "Your prediction failed, Better luck nect time"}
                        </p>
                    </>
                ) : (
                    <></>
                )}
            </div>
        ) : (
            ""
        );
    };

    const PredictionAlreadyCreated = () => {
        return (
            <div className={predictionCss.prediction}>
                <h1 className={predictionCss.alreadyHeader}>
                    Your Prediction for Match
                </h1>
                <div className={predictionCss.predictionTeam}>
                    {prediction.prediction !== "draw" ? (
                        <img
                            className={predictionCss.predictionTeamImage}
                            src={csk}
                            alt="Team"
                        />
                    ) : (
                        ""
                    )}
                    <p className={predictionCss.predictionTeamName}>
                        {prediction.prediction === teamA?.id
                            ? teamA?.name
                            : prediction.prediction === teamB?.id
                            ? teamB?.name
                            : "Draw"}
                    </p>
                </div>
                <p className={predictionCss.result}>
                    {prediction?.result === null
                        ? "Result Has not been declared yet !!!! STAY TUNED"
                        : prediction?.result
                        ? "Congratulations your prediction was correct"
                        : "Your prediction failed, Better luck nect time"}
                </p>
            </div>
        );
    };

    const NotPredicted = () => {
        return (
            <div className={predictionCss.prediction}>
                <div className={predictionCss.prdictionTime}>
                    <h4 className={predictionCss.timeLeft}>
                        Time Left to make a prediction
                    </h4>
                    <div className={predictionCss.timer}>
                        <span className={predictionCss.time}>
                            {timer.days} Days
                        </span>
                        <span className={predictionCss.time}>
                            {timer.hours} Hours
                        </span>
                        <span className={predictionCss.time}>
                            {timer.minutes} Minutes
                        </span>
                        <span className={predictionCss.time}>
                            {timer.seconds} Seconds
                        </span>
                    </div>
                </div>
                <div className={predictionCss.predict}>
                    <h4 className={predictionCss.predictHeader}>
                        Choose Today's Match's Outcome:
                    </h4>
                    <div className={predictionCss.predictButtons}>
                        <span
                            className={predictionCss.outCome}
                            onClick={() => makePrediction(teamA?.id)}
                        >
                            {teamA?.name}
                        </span>
                        <span
                            className={predictionCss.outCome}
                            onClick={() => makePrediction(teamB?.id)}
                        >
                            {teamB?.name}
                        </span>
                        <span
                            className={predictionCss.outCome}
                            onClick={() => makePrediction("Draw")}
                        >
                            Draw
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {!user ? (
                <div className={predictionCss.prediction}>
                    <p className={predictionCss.notLoggedIn}>
                        You're not logged in, {"         "}Please{" "}
                        <Link to={"/login"}>Login</Link>/
                        <Link to={"/registration"}>Register</Link> to make a
                        prediction.
                    </p>
                </div>
            ) : match?.updated ? (
                <MatchOver />
            ) : (
                <>
                    {prediction ? (
                        <PredictionAlreadyCreated />
                    ) : match?.updated ? (
                        <></>
                    ) : (
                        <NotPredicted />
                    )}
                </>
            )}
        </>
    );
};

export default Prediction;
