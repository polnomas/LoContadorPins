import UploadWidget from "./UploadWidget"
import { useState } from "react"
import PinImage from "./PinImage"

function PinSubmit() {
    const [publicId, setPublicId] = useState(null)
    const [description, setDescription] = useState("")

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div>
            {publicId ? <PinImage publicId={publicId} /> : null}
            <UploadWidget publicIdSetter={setPublicId}/>
            <textarea
                id="desc"
                value={description}
                onChange={handleDescriptionChange}
                rows={3}
                placeholder="Escribe una descripción…"
                style={{ width: "100%", maxWidth: "400px" }}
            />
        </div>
    )
}

export default PinSubmit