const axios = require("axios");
describe("API Books", () => {
  it("GET in API Requests and return status code 200", async () => {
    debugger;
    const response = await axios.get("http://localhost:3000/api/requests/");
    expect(response.status).toBe(200);
  });
  it("GET in API Requests and return data requests", async () => {
    const response = await axios.get("http://localhost:3000/api/requests/");
    expect(response.data).toMatchObject({});
  });
  it("GET some Requests id and return this requests", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/requests/?id=62793ae41a649b561b31e117"
    );
    expect(response.data._id).toBe("62793ae41a649b561b31e117");
  });
  it("POST pass some Requests name and return created requests", async () => {
    const response = await axios.post("http://localhost:3000/api/requests/", {
      name: "La guerra de las galaxias",
    });
    expect(response.status).toBe(200);
  });
  it("PUT pass Id Requests and new name and return updated request", async () => {
    const response = await axios.put("http://localhost:3000/api/requests/", {
      _id: "62650f37a9f6bdc755282f2b",
      name: "La guerra de las galaxias 2",
    });
    expect(response.status).toBe(200);
  });
  it("DELETE pass id request and return status code 200", async () => {
    const response = await axios.delete("http://localhost:3000/api/requests/", {
      _method: "DELETE",
      _id: "62651200f012256186ce4e00",
    });
    expect(response.status).toBe(200);
  });
});
