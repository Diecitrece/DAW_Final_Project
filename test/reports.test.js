const axios = require("axios");
describe("API Request", () => {
    it("Get in API Request and return status code 200", async () => {
        const response = await axios.get("http://localhost:3000/api/request/");
        expect(response.status).toBe(200);
    });
    it("Get in API Request and return data request", async () => {
        const response = await axios.get("http://localhost:3000/api/request/");
        expect(response.data).toMatchObject({})
    });
    // it("Get some Book id and return this book", async () => {
    //     const response = await axios.get("http://localhost:3000/api/books/?id=6245af2b6f022c5de9411ded");
    //     expect(response.data._id).toBe("6245af2b6f022c5de9411ded");
    // });
    // it("Get some Book name and return this book", async () => {
    //     const response = await axios.get("http://localhost:3000/api/books/?name=Quijote");
    //     expect(response.data[0].name).toBe("Quijote");
    // });
    // it("Get some Book ISBN and return this book", async () => {
    //     const response = await axios.get("http://localhost:3000/api/books/?ISBN=9788408061052");
    //     expect(response.data[0].ISBN).toBe("9788408061052");
    // });
    // it("POST and return status code 200", async () => {
    //     const response = await axios.post("http://localhost:3000/api/books/");
    //     expect(response.status).toBe(200);
    // });
});