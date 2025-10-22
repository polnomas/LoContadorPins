import { ReactSVG } from "react-svg";
import "../styles/CampusMap.css";

function CampusMap() {
  return (
    <div className="map-wrap">
      <ReactSVG
        src="/Group 3.svg"
        wrapper="div"
        className="map-svg-wrap"
      />
    </div>
  )
}

export default CampusMap;