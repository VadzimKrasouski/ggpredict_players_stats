import axios from "axios";

export default class PlayersService {
    static async getAll(page: number, size: number) {
        try {
            const response = await axios.get(`https://api.ggpredict.dev:8080/restapi/players?page=${page}&size=${size}`)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async searchBy(search: string, page: number, size: number) {
        try {
            const response = await axios.get(`https://api.ggpredict.dev:8080/restapi/players?searchBy=${search}&page=${page}&size=${size}`)
            return response.data
        } catch (e) {
            console.log(e);
        }
    }
}