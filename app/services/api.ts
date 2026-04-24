import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = () => axios.get(`${BASE_URL}/users`);

export const getPostsByUser = (userId: string) =>
  axios.get(`${BASE_URL}/posts?userId=${userId}`);