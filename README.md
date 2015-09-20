# React Shallow Query

A small utility for React that helps make testing shallow rendered components less of a chore, removing repetitive _x.props.children_ code. Automated test specs are greatly improved as structural changes to components won't have as much of an impact. Furthermore, they won't require a number of variables just to store references to each child element (an example of this can be found below).

### Install

```console
$ npm install react-shallow-query
```

### Motivation

My idea to create this module sprung from an article on [React Kung Fu](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/). One of the topics it talked about was the newly implemented shallow rendering functionality, introduced in React v0.13. Unfortunately, accessing nested components requires a series of _x.props.children_ calls in order to locate them. This felt awkward. Instead, I wanted to query the object returned from _getRenderOutput_ in a syntax I was familiar with. My solution was to mimic CSS-like selectors similar to jQuery. This helped to reduce the pain I had in examples such as the one below:

```js
// CommentsList component structure.
<div className="comments-list">
    <div className="comment">
        <span className="author">
            Lewis Barnes
        </span>
        <span className="message">
            Hello world!
        </span>
    </div>
    <div className="comment">
        <span className="author">
            John Smith
        </span>
        <span className="message">
            Hi there!
        </span>
    </div>
</div>

// Note: 'output' is an object returned from .getRenderOutput(), given the component tree above.

var comments = output.props.children;
var firstComment = comments.props.children[0];
var author = firstComment.props.children[0];

console.log(author.props.children == "Lewis Barnes") // true 
```

### Basic Example

Below is an example of a simple React component called 'Comment':

```js
import React from "react/addons";
import $ from "react-shallow-query";

var { TestUtils } = React.addons;
var renderer = TestUtils.createRenderer();
var output, results;

// Simple React comment component.
var Comment = React.createClass({
    render() {
        return (
            <div className="comment">
                <span className="author">
                    {this.props.author}
                </span>
                <span className="message">
                    {this.props.message}
                </span>
            </div>
        );
    }
});

// Render the component (similar to to React.render).
renderer.render(<Comment author="Lewis Barnes" message="Hello world!" />);

// Get the shallow rendered output.
output = renderer.getRenderOutput();

// Search through the output for components that have a className containing 'message'.
results = $(output, ".message");

// 'results' will contain an array of matching elements.
console.log(results[0] == output.props.children[1]); // true
```

### Future Improvements

- Provide syntax that allows more specificity. For example "span.message".
