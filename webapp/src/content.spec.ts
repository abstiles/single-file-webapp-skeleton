import content from "./content";
import { expect } from "chai";

describe("Content", function() {
    it("should be wrapped in a Skeleton container", function() {
        expect(content.classList[0]).to.equal("container");
    });
});
