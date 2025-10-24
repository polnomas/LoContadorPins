import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'

const cloudinary = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
})

function PinImage({ publicId }) {
    const image = cloudinary.image(publicId)
    return <AdvancedImage cldImg={image} />
}

export default PinImage