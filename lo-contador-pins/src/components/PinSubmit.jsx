import UploadWidget from "./UploadWidget"
import { useState } from "react"
import PinImage from "./PinImage"

function PinSubmit() {
    const [publicId, setPublicId] = useState(null)
    return (
        <div>
            {publicId ? <PinImage publicId={publicId} /> : null}
            <UploadWidget publicIdSetter={setPublicId}/>
        </div>
    )
}

export default PinSubmit