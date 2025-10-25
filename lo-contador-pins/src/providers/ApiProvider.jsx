import ApiContext from "../contexts/ApiContext"
import Api from "../services/Api"

function ApiProvider({ children }) {
    const api = Api.getInstance()
    return (
        <ApiContext.Provider value={ { api } }>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiProvider