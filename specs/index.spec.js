import {expect} from "chai";
import React from "react";
import { renderComponent } from "./helpers";
import $ from "../src";

function Comment({author, message}) {
    return (
        <li className="comment">
            <span className="author">
                {author}
            </span>
            <span id="message">
                {message}
            </span>
        </li>
    );
}

function Comments() {
    return (
        <ul>
            <Comment author="John Smith" message="Hello World" />
            <li>Some other item</li>
        </ul>
    );
}

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

    it("should select elements by class name using a period", function() {
        const {output} = renderComponent(Comment);
        const results = $(output, ".author");

        expect(results.length).to.be.at.least(1);
        results.forEach((result) => expect(result.props.className).to.contain("author"));
    });

    it("should select elements by id using a hash", function() {
        const {output} = renderComponent(Comment);
        const results = $(output, "#message");

        expect(results.length).to.be.at.least(1);
        results.forEach((result) => expect(result.props.id).to.eq("message"));
    });

    it("should provide support for selecting components by name", function() {
        const {output} = renderComponent(Comments);
        const results = $(output, "Comment");

        expect(results.length).to.be.at.least(1);
        results.forEach((result) => expect(result.type.name).to.eq("Comment"));
    });

    it("should allow selecting of elements by tag", function() {
        const {output} = renderComponent(Comments);
        const results = $(output, "li");

        expect(results.length).to.be.at.least(1);
        results.forEach((result) => expect(result.type).to.eq("li"));
    });
    
});
