import axios from "axios"
class Api {
    static instance = null
    
    constructor() {
        if (Api.instance) return Api.instance
        if (import.meta.env.VITE_ENVIRONMENT === 'development') {
            this.baseUrl = import.meta.env.VITE_DEVELOPMENT_API_URL
        }
        else {
            this.baseUrl = import.meta.env.VITE_PRODUCTION_API_URL
        }
        this.api = axios.create({ baseURL: this.baseUrl })
        Api.instance = this
    }
    static getInstance() {
        if (!Api.instance) {
            return new Api()
        }
        return Api.instance
    }
    /**
     * @returns id del pin
     */
    async createNewPin(data) {
        return (await this.api.post('/pins', data)).data._id
    }
    /**
     * @returns Una lista con todos los pins 
     */
    async getAllPins() {
        return (await this.api.get('/pins')).data.list
    }
}

export default Api