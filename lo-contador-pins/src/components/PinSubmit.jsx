import UploadWidget from "./UploadWidget"
import { useState } from "react"
import PinImage from "./PinImage"
import "../styles/PinSubmit.css"
import useModal from "../hooks/useModal"
import useApi from "../hooks/useApi"

function PinSubmit({x, y, pinsSetter}) {
  const [publicId, setPublicId] = useState(null)
  const [description, setDescription] = useState("")
  const { closeModal } = useModal()
  const { api } = useApi()

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const handleAccept = async () => {
    if (!publicId) return
    const newPin = {
      x,
      y,
      publicId,
      description
    }
    newPin._id = await api.createNewPin(newPin)
    console.log(newPin.publicId)
    console.log(newPin.description)
    console.log(newPin._id)
    pinsSetter((prev) => [...prev, newPin])
    closeModal()
  }

  return (
    <div className="pin-submit-box">
      <h2 className="pin-submit-title">SUBIR IMAGEN DEL PIN</h2>

      {publicId ? <PinImage publicId={publicId} /> : null}

      <UploadWidget publicIdSetter={setPublicId} />

      <textarea
        id="desc"
        value={description}
        onChange={handleDescriptionChange}
        rows={3}
        placeholder="Escribe una descripción…"
        className="pin-submit-textarea"
      />
      <button onClick={handleAccept}>
        Aceptar
      </button>
    </div>
  )
}

export default PinSubmit
