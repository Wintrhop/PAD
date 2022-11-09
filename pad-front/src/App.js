import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./styles/pages/app.scss";
import NavBar from "./components/NavBar";
import Client from "./pages/Client";
import Advicer from "./pages/Advicer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navBarContainer">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/userClient" element={<Client/>}/>
            <Route exact path="/advicer" element={<Advicer/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
