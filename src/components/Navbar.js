import React from "react";
import { useStateValue } from "../StateProvider";
import styles from "./Navbar.module.css"

const Navbar = () => {
    const [{ user, predictions }, dispatch] = useStateValue();
    const logout = () => {
        localStorage.setItem("token", null);
        dispatch({
            type: "REMOVE_USER",
        });
    };
    return (
         <nav className={styles.nav_container}>
        <div  id={styles.logo}>
          CrikTrik
        </div>
        <div className={styles.list}>
          <ul className={styles.nav_list}>
            <li>
              {/* <i className={`${styles.logo_icon} fa-solid fa-user`}></i>
              <Link to="/Login" className={styles.nav_ele}> 
                Login/Register
             </Link> */}
            </li>
            <li>
              <a href="#!" className={styles.nav_ele}>
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
        // <div style={{ height: "60px" }}>
        //     <p onClick={logout}>logout</p>
        // </div>
    );
};

export default Navbar;
