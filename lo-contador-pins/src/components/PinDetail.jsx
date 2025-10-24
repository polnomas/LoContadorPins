import useModal from "../hooks/useModal";

function PinDetail() {
  //NOTE: por defecto la pantalla se cierra solo con tecla ESC
  //Si quieren que se cierre haciendo click en alguna componente, debe llamar a closeModal()
  const { closeModal } = useModal()
  return (
    <div
      style={{
        backgroundColor: "transparent",
        border: "0px",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "500px",
        maxHeight: "400px",
        margin: "auto",
      }}
    >
      <h2>Detalles del Pin</h2>
      <p>Aquí irán los detalles del pin seleccionado.</p>
    </div>
  );
}

export default PinDetail;
