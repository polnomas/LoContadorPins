import UploadWidget from "./UploadWidget"
import { useState } from "react"
import PinImage from "./PinImage"
import "../styles/PinSubmit.css" // 👈 nuevo archivo CSS

function PinSubmit() {
  const [publicId, setPublicId] = useState(null)
  const [description, setDescription] = useState("")

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
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
    </div>
  )
}

export default PinSubmit
