// import { ReactSVG } from "react-svg";
import "../styles/CampusMap.css";

function CampusMap() {
  return (
    <div className="map-wrap">
      {/* <ReactSVG
        src="/Group 3.svg"
        wrapper="div"
        className="map-svg-wrap"
      /> */}
      <div className="map-png-wrap">
        <img src="/mapalc.png" className="map-wrap-png" />
      </div>
    </div>
  );
}

export default CampusMap;
