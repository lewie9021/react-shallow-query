import React from "react";
import TestUtils from "react-addons-test-utils";

export function renderComponent(Component, props) {
    const renderer = TestUtils.createRenderer();
    
    renderer.render(<Component {...props} />);
    
    return {
        renderer,
        output: renderer.getRenderOutput()
    };
}
