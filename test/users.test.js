const axios = require("axios");
describe("API Users", () => {
  it("GET in API Users and return status code 200", async () => {
    const response = await axios.get("http://localhost:3000/api/users/");
    expect(response.status).toBe(200);
  });
  it("GET in API Users and return data books", async () => {
    const response = await axios.get("http://localhost:3000/api/users/");
    expect(response.data).toMatchObject({});
  });
  it("GET some User id and return this user", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/users/?id=6245cca38192d5d41e32d314"
    );
    expect(response.data._id).toBe("6245cca38192d5d41e32d314");
  });
  it("GET some User name and return this user", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/users/?name=ADCairex"
    );
    expect(response.data[0].name).toBe("ADCairex");
  });
  it("DELETE pass User and return status code 200", async () => {
    const response = await axios.delete("http://localhost:3000/api/users/", {
      _id: "6245cca38192d5d41e32d314",
    });
    expect(response.status).toBe(200);
  });
});
