import { useEffect, useRef } from 'react'

const UploadWidget = ({ publicIdSetter }) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    },
    (err, result) => {
        console.log(result)
        if (result && result.event === 'success') {
            publicIdSetter(result.info.public_id)
            console.log(result)
            console.log(result.info.public_id)
        }
    })
  }, [])
  return (
    <div>
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    </div>
  )
}

export default UploadWidget

//Código de https://cloudinary.com/blog/uploading-images-and-videos-in-react-with-the-cloudinary-upload-widget