import axios from "axios";

//const BASE_URL = 'http://localhost:4000/'
const BASE_URL = 'https://backend-teste-gq17.onrender.com/'

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export async function getUsers() {
    const response = await http.get(`user/getUsers`)
    return response.data
}

export async function getCompanies() {
    const response = await http.get(`company/getAllCompanies`)
    return response.data
}

export async function getUsersAndCompanies() {
    const response = await http.get(`user/getAllUsers`)
    return response.data
}

export async function putUser(json) {
    const response = await http.put(`user/putUser`, {
        ...json
    })
    return response.data
}

export async function postNewUser(json) {
    const response = await http.post(`user/postUser`, {
        ...json
    })
    return response.data
}

export async function deleteUser(id) {
    const response = await http.post(`user/deleteUser`, {
        id: id
    })
    return response.data
}

export async function deleteCompany(id) {
    const response = await http.post(`company/deleteCompany`, {
        id: id
    })
    return response.data
}

export async function getCompaniesLabel() {
    const response = await http.get(`company/getCompanies`)
    return response.data
} 

export async function postNewComapany(json) {
    const response = await http.post(`company/postCompany`, {
        ...json
    })
    return response.data
}

export async function putCompany(json) {
    const response = await http.put(`company/putCompany`, {
        ...json
    })
    return response.data
}


export const api = {
    getUsers,
    getCompanies,
    getUsersAndCompanies,
    postNewUser,
    putUser,
    deleteUser,
    deleteCompany,
    getCompaniesLabel,
    postNewComapany,
    putCompany
}