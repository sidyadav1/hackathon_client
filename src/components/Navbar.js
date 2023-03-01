import React from "react";
import { useStateValue } from "../StateProvider";

const Navbar = () => {
    const [{ user, predictions }, dispatch] = useStateValue();
    const logout = () => {
        localStorage.setItem("token", null);
        dispatch({
            type: "REMOVE_USER",
        });
    };
    return (
        <div style={{ height: "60px" }}>
            <p onClick={logout}>logout</p>
        </div>
    );
};

export default Navbar;
