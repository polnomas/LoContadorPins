import "../styles/Pin.css";
import useModal from "../hooks/useModal";
import PinDetail from "./PinDetail";

function Pin({ x, y, scale, d }) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(<PinDetail />);
  };

  return (
    <div
      className="pin"
      onClick={handleClick}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${d / scale}px`,
        height: `${d / scale}px`,
      }}
    />
  );
}

export default Pin;
