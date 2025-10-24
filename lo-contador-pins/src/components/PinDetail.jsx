import useModal from "../hooks/useModal";

function PinDetail() {
  const { closeModal } = useModal();

  return (
    <div
      style={{
        backgroundColor: "#4fd7ff",
        border: "4px solid #000",
        boxShadow: "6px 6px 0 #777",
        borderRadius: "0px",
        padding: "30px 40px",
        width: "900px",               
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",                   
        fontFamily: "'Press Start 2P', monospace",
        color: "#111",
      }}
    >
      {/* Imagen del pin */}
      <img
  src="/images/01.png"
  alt="Pin del campus"
  style={{
    width: "400px",   
    height: "400px",
    objectFit: "cover",
    border: "4px solid #000",
    boxShadow: "4px 4px 0 #777",
  }}
/>


      {}
      <div style={{ textAlign: "left", flex: 1, maxWidth: "450px" }}>
        <h2
          style={{
            fontSize: "14px",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          Detalles del Pin
        </h2>
        <p
          style={{
            fontSize: "11px",
            lineHeight: "1.8",
          }}
        >
          Aquí irán los detalles del pin seleccionado. Puedes incluir una descripción
          más extensa, información sobre su ubicación, historia o elementos destacados
          del lugar.
        </p>
      </div>
    </div>
  );
}

export default PinDetail;
