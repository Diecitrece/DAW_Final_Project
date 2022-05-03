const axios = require("axios");
describe("start the server", () => {
  it("starts on 3000", async () => {
    const response = await axios.get("http://localhost:3000");
    expect(response.status).toBe(200);
  });
});
