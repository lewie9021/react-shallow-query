import {expect} from "chai";
import React from "react";
import { renderComponent } from "./helpers";
import $ from "../src";

function TestComponent({name}) {
    return (
        <span>Hello {name}</span>
    );
}

describe("React Shallow Query", function() {

    it("should throw if 'query' isn't a string", function() {
        const {output} = renderComponent(TestComponent);
        const invalidParameters = [true, false, undefined, 5, {}, [], null];
        const error = "You must provide a query.";
        
        invalidParameters.forEach((invalidParameter) => {
            expect(() => $(output, invalidParameter)).to.throw(error);
        });

        expect(() => $(output, "test")).not.to.throw();
    });
    
});
