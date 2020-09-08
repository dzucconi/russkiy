import { info } from "../schedule";

describe("info", () => {
  it("reports a summary", () => {
    expect(info()).toEqual(
      "There are 274937 words. Running at 38.18569444444445 words per second, the work is 2 hours long."
    );
  });
});
