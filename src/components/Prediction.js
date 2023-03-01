import React, { useEffect, useRef, useState } from "react";
import { getUserPredictionForMatch } from "../APIs/matches";
import predictionCss from "./Prediction.module.css";

const Prediction = ({ match, teamA, teamB }) => {
    const countDownDate = new Date("Feb 29 2023 16:37:52").getTime();
    const initalTimer = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const [timer, setTimer] = useState(initalTimer);

    const [prediction, setPrediction] = useState(null);

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
    }, [match?.id]);

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

    const NotPredicted = (
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
                    <span className={predictionCss.outCome}>{teamA?.name}</span>
                    <span className={predictionCss.outCome}>{teamB?.name}</span>
                    <span className={predictionCss.outCome}>Draw</span>
                </div>
            </div>
        </div>
    );

    return <>{prediction ? <></> : NotPredicted}</>;
};

export default Prediction;
