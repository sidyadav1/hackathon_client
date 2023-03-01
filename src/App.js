import logo from "./logo.svg";
import "./App.css";
import { useStateValue } from "./StateProvider";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LOGIN.JS";
import Register from "./components/Register";

function App() {
    const [{ user, predictions }, dispatch] = useStateValue();
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
