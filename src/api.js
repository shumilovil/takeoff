import axios from 'axios';

export const authorise = () => {
    return axios.get('http://localhost:4001/users/1');
}

export const getAllContacts = () => {
    return axios.get('http://localhost:4001/contacts');
}

export const updateContact = (id, firstName, lastName, email, phone) => {
    return axios.put(`http://localhost:4001/contacts/${id}`, { firstName, lastName, email, phone });
}

export const addContact = (firstName, lastName, email, phone) => {
    return axios.post(`http://localhost:4001/contacts`, {firstName, lastName, email, phone });
}