import { add } from "./index";

describe("index", () => {
	it("adds correctly", () => {
		expect(add(1, 2)).toBe(3);
	});
});
