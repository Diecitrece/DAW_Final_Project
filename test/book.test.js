const axios = require("axios");
const newBook = {
  name: "Test Book",
  ISBN:
    Math.floor(Math.random() * (9999999999999 - 1000000000000)) + 1000000000000,
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
      "http://localhost:3000/api/books/?id=625fe716210758bc896d629d"
    );
    expect(response.data._id).toBe("625fe716210758bc896d629d");
  });
  it("GET some Book name and return this book", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/books/?name=Quijote"
    );
    expect(response.data[0].name).toBe("Quijote");
  });
  it("GET some Book ISBN and return this book", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/books/?ISBN=9788408061052"
    );
    expect(response.data[0].ISBN).toBe("9788408061052");
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
