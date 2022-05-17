const axios = require("axios");
const newBook = {
  name: "El nombre de la rosa",
  ISBN:
    Math.floor(Math.random() * (9999999999999 - 1000000000000)) + 1000000000000,
  author: "Dante Alighieri",
  description: "El nombre de la rosa es una de las obras maestras de la literatura italiana",
  reviews: [],
};
describe("API Books", () => {
  it("GET in API Book and return status code 200", async () => {
    const response = await axios.get("http://localhost:3000/api/books/");
    expect(response.status).toBe(200);
  });
  it("GET in API Book and return data books", async () => {
    const response = await axios.get("http://localhost:3000/api/books/");
    expect(response.data).toMatchObject({});
  });
  it("GET some Book id and return this book", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/books/?id=6283e4142a535570c93dabf7"
    );
    expect(response.data._id).toBe("6283e4142a535570c93dabf7");
  });
  it("GET some Book name and return this book", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/books/?name=viento"
    );
    expect(response.data[0].name).toBe("La sombra del viento");
  });
  it("GET some Book ISBN and return this book", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/books/?ISBN=1234564321345"
    );
    expect(response.data[0].ISBN).toBe("1234564321345");
  });
  it("POST pass book and return status code 200", async () => {
    const response = await axios.post(
      "http://localhost:3000/api/books/",
      newBook
    );
    expect(response.status).toBe(200);
  });
  it("PUT pass book and return status code 200", async () => {
    const response = await axios.put("http://localhost:3000/api/books/", {
      _id: "625ff1d598bc90ddd1b2541a",
      name: "El señor de los anillos 2",
      ISBN: "9788845292612",
      reviews: [],
    });
    expect(response.status).toBe(200);
  });
  it("DELETE pass book and return status code 200", async () => {
    const response = await axios.delete("http://localhost:3000/api/books/", {
      _id: "625ff1d598bc90ddd1b2541a",
    });
    expect(response.status).toBe(200);
  });
});
