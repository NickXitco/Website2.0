import './App.css';
import {Header} from './Header';
import {SideNav} from "./SideNav";
import {Gallery} from "./Gallery";

function App() {
  return (
    <div className="main">
      <Header/>
      <Gallery/>
      <SideNav/>
      <div className="bg"/>
    </div>
  );
}

export const PALETTE = {
    RED: "#ff0000",
    ORANGE: "#ff5500",
    YELLOW: "#ffee00",
    MINT: "#00ff66",
    CYAN: "#00ffea",
    BLUE: "#0095ff",
    PURPLE: "#9500ff",
    MAGENTA: "#ff0080",
}

export default App;
