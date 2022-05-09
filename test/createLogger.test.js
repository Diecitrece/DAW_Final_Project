const logger = require("../components/logger/createLogger");
describe("createLogger", () => {
  it("should create a logger", () => {
    const logger2 = logger.info("test");
    expect(logger2).toBeDefined();
  });
  it("should create a logger", () => {
    const logger2 = logger.error("test error");
    expect(logger2).toBeDefined();
  });
});
