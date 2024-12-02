import axios from "axios";

export const backend = axios.create({
  baseURL: "https://api.fastforex.io/",
});

export const github = axios.create({
  baseURL: "https://api.github.com/",
});

export const books = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes?q=",
});
