import React, { useState, useEffect } from "react";
import styles from "./Styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../APIs/fetch";
import { useStateValue } from "../StateProvider";

const Register = () => {
    const navigate = useNavigate();
    const [_, dispatch] = useStateValue();
    const [inputValues, setInputValue] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const [validation, setValidation] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    async function callAPI(data) {
        const res = await fetch(`${BASE_URL}/registration`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            redirect: "follow",
        });
        if (res.status !== 200) {
            return;
        }
        const data1 = await res.json();
        dispatch({
            type: "CREATE_USER",
            user: data1.data.user,
        });
        localStorage.setItem("token", data1.data.token);
        navigate("/");
    }

    function handleSubmit(event) {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const checkValidation = () => {
        let errors = validation;

        // email validation
        const email = inputValues.email;
        if (!inputValues.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = "Invalid email address";
        } else {
            errors.email = "";
        }

        //password validation
        const password = inputValues.password;
        if (!password) {
            errors.password = "password is required";
        } else if (/^^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            errors.password =
                "Password must contain capital letter, digit and length must be greater than 8";
        } else {
            errors.password = "";
        }

        const cpassword = inputValues.cpassword;
        if (!cpassword) {
            errors.cpassword = "Re-enter password";
        } else if (cpassword !== inputValues.password) {
            errors.cpassword = "Passwords does not match";
        } else {
            errors.cpassword = "";
        }
    };
    useEffect(() => {
        checkValidation();
    }, [inputValues]);

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const obj = {};
        obj.email = inputValues.email;
        obj.password = inputValues.password;
        obj.name = inputValues.name;

        console.log(obj);
        callAPI(obj);
    };

    return (
        <>
            <div className={styles.backgroundR}>
                <div className={`${styles.containerR}`}>
                    <h1 className={`${styles.headerR}`}> Register</h1>
                    <div className="form">
                        <form>
                            <div className={styles.inputcontainer}>
                                <div className={styles.label}>Name </div>
                                <input
                                    className={styles.inputtext}
                                    placeholder="Enter your name"
                                    type="text"
                                    name="name"
                                    onChange={(e) => handleSubmit(e)}
                                    value={inputValues.name}
                                    required
                                />
                                <p className={styles.error}></p>
                            </div>
                            <div className={styles.inputcontainer}>
                                <div className={styles.label}>Email </div>
                                <input
                                    className={styles.inputtext}
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
                                    onChange={(e) => handleSubmit(e)}
                                    value={inputValues.email}
                                    required
                                />
                                {
                                    <p className={styles.error}>
                                        {validation.email}
                                    </p>
                                }
                            </div>

                            <div className={styles.inputcontainer}>
                                <div className={styles.label}>Password </div>
                                <input
                                    className={styles.inputtext}
                                    placeholder="Enter your password"
                                    type="text"
                                    name="password"
                                    onChange={(e) => handleSubmit(e)}
                                    value={inputValues.password}
                                    required
                                />
                                {<p className="error">{validation.password}</p>}
                            </div>

                            <div className={styles.inputcontainer}>
                                <div className={styles.label}>
                                    Confirm Password{" "}
                                </div>
                                <input
                                    className={styles.inputtext}
                                    placeholder="Re-enter your password"
                                    type="text"
                                    name="cpassword"
                                    onChange={(e) => handleSubmit(e)}
                                    value={inputValues.cpassword}
                                    required
                                />
                                {
                                    <p className="error">
                                        {validation.cpassword}
                                    </p>
                                }
                            </div>
                            <input
                                type="submit"
                                name="submit"
                                className={styles.inputsubmit}
                                value="Register"
                                onClick={(e) => handleSubmit2(e)}
                            />

                            <div className={styles.already}>
                                Already registered{" "}
                                <Link to="/Login" className={styles.link}>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;
