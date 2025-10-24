import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import "../styles/PinImage.css"

const cloudinary = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
})

function PinImage({ publicId }) {
    const image = cloudinary.image(publicId)
    return (
        <div className='image-wrapper'>
            <AdvancedImage cldImg={image} className="pin-image"/>
        </div>
    )
}

export default PinImage