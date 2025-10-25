import { useContext } from "react"
import ApiContext from "../contexts/ApiContext"

function useApi() {
    const ctx = useContext(ApiContext)
    if (!ctx) throw new Error('Usar useApi dentro de ApiProvider')
    return ctx
}

export default useApi