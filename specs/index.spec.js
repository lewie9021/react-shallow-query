import { expect } from "chai";
import { renderComponent } from "./helpers";
import { Comments, Comment } from "./components";
import $ from "../src";

describe("React Shallow Query", function() {

    it("should throw if 'query' isn't a string", function() {
        const {output} = renderComponent(Comment);
        const invalidParameters = [true, false, undefined, 5, {}, [], null];
        const error = "You must provide a query.";
        
        invalidParameters.forEach((invalidParameter) => {
            expect(() => $(output, invalidParameter)).to.throw(error);
        });

        expect(() => $(output, "test")).not.to.throw();
    });

    it("should return an array of results", function() {
        const {output} = renderComponent(Comment);
        const results = $(output, "test");

        expect(Array.isArray(results)).to.eq(true);
    });

    describe("Basic Querying", function() {
    
        it("should select elements by class name using a period", function() {
            const {output} = renderComponent(Comment);
            const results = $(output, ".author");

            expect(results.length).to.eq(1);
            results.forEach((result) => expect(result.props.className).to.contain("author"));
        });

        it("should select elements by id using a hash", function() {
            const {output} = renderComponent(Comment);
            const results = $(output, "#message");

            expect(results.length).to.eq(1);
            results.forEach((result) => expect(result.props.id).to.eq("message"));
        });

        it("should provide support for selecting components by name", function() {
            const {output} = renderComponent(Comments);
            const results = $(output, "Comment");

            expect(results.length).to.eq(1);
            results.forEach((result) => expect(result.type.name).to.eq("Comment"));
        });

        it("should allow selecting of elements by tag", function() {
            const {output} = renderComponent(Comments);
            const results = $(output, "li");

            expect(results.length).to.eq(2);
            results.forEach((result) => expect(result.type).to.eq("li"));
        });

    });

    describe("Advanced Querying", function() {

        it("should query elements nested within the current matches when using spaces", function() {
            const {output} = renderComponent(Comment);
            const results = $(output, "span strong");

            expect(results.length).to.eq(2);
            results.forEach((result) => expect(result.type).to.eq("strong"));
        });

        it("should only query direct decendants when a '>' is used", function() {
            const {output} = renderComponent(Comment);
            const results = $(output, "span > strong");

            expect(results.length).to.eq(1);
            results.forEach((result) => expect(result.type).to.eq("strong"));
        });
        
    });
    
});
