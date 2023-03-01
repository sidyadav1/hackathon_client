import logo from "./logo.svg";
import "./App.css";
import { useStateValue } from "./StateProvider";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
    const [{ user, predictions }, dispatch] = useStateValue();
    return (
        <div className="App">
            <Navbar />
            <Home />
        </div>
    );
}

export default App;
