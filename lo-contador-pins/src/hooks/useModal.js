import { useContext } from "react"
import ModalContext from "../contexts/ModalContext"

const useModal = () => {
    const ctx = useContext(ModalContext)
    if (!ctx) throw new Error('Usar useModal dentro de ModalProvider')
    return ctx
}

export default useModal