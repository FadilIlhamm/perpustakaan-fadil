import axios from "axios";
import { URL_ACCESS } from "../utils/constant";

export default class PerpustakaanServices {

    static login = (payload) => {
        return axios.post(URL_ACCESS.urlLogin,payload)
    }

    static register = (payload) => {
        return axios.post(URL_ACCESS.urlRegister,payload)
    }

    static getBook = (headers) => {
        return axios.get(`${URL_ACCESS.urlBook}?limit=20&offset=0`,headers)
    }

    static createBook = (payload,headers) => {
        return axios.post(URL_ACCESS.urlBook,payload,headers)
    }

    static updateBook = (id,payload,headers) => {
        return axios.put(`${URL_ACCESS.urlBook}?id=${id}`,payload,headers)
    }

    static deleteBook = (id, headers) => {
        return axios.delete(`${URL_ACCESS.urlBook}/${id}`,headers)
    }

    static getBookById = (id, headers) => {
        return axios.get(`${URL_ACCESS.urlBookById}/${id}`,headers)
    }

}