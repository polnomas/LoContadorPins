import { useContext } from "react"
import ModalContext from "../contexts/ModalContext"

function useModal() {
    const ctx = useContext(ModalContext)
    if (!ctx) throw new Error('Usar useModal dentro de ModalProvider')
    return ctx
}

export default useModal