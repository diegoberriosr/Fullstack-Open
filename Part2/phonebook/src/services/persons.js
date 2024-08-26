import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = async () => {
    return await axios.get(baseUrl)
}

const create = async newPerson => {
    return await axios.post(baseUrl, newPerson)
}

const update = async (id, newObject) => {
    return await axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteResource = async (id) => {
    return await axios.delete(`${baseUrl}/${id}`)
}

export default {create, getAll, update, deleteResource}