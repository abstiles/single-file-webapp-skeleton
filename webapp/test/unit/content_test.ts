import content from "../../src/content";

let expect = chai.expect;

describe("Content", function() {
    it("should be wrapped in a Skeleton container", function() {
        expect(content).to.have.class("container");
    });
});
