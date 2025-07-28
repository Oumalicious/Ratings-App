import axios from "axios";

const API_URL = 'http://localhost:8080/movies';

export async function saveMovie(movie) {
    return await axios.post(API_URL, movie);
}

export async function getAllMovies(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getMovie(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateMovie(movie) {
    return await axios.post(API_URL, movie);
}

export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteMovie(id) {
    return await axios.delete(`${API_URL}/${id}`);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}