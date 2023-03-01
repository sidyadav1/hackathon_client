import "./App.css";
import { useStateValue } from "./StateProvider";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register";
import { useEffect } from "react";
import { BASE_URL, headers } from "./APIs/fetch";
import  TopPlayers  from "./components/TopPlayers.js";

function App() {
  const [{ user, predictions }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`${BASE_URL}/me`, {
        method: "GET",
        headers: headers,
      });
      const result = await response.json();

      if (response.status !== 200) {
        return;
      }
      dispatch({
        type: "CREATE_USER",
        user: result.data,
      });
    };
    fetchDetails();
  }, []);

  console.log(user);
  console.log(localStorage.getItem("token"));
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/top" element={<TopPlayers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
