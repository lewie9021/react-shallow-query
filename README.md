# React Shallow Query

A small utility for React that helps make testing shallow rendered components less of a chore, removing repetitive _x.props.children_ code. Automated test specs are greatly improved as structural changes to components won't have as much of an impact. Furthermore, they won't require a number of variables just to store references to each child element (an example of this can be found below).

### Install

```console
$ npm install react-shallow-query
```

### Motivation

My idea to create this module sprung from an article on [React Kung Fu](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/). One of the topics it talked about was the newly implemented shallow rendering functionality, introduced in React v0.13. Unfortunately, accessing nested components requires a series of _x.props.children_ calls in order to locate them. This felt awkward. Instead, I wanted to query the object returned from _getRenderOutput_ in a syntax I was familiar with. My solution was to mimic CSS-like selectors similar to jQuery. This helped to reduce the pain I had in examples such as the one below:

```js
import React from "react";
import TestUtils from "react-addons-test-utils";

function Comments() {
    return (
        <div className="comments">
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
    );
}

const renderer = TestUtils.createRenderer();

renderer.render(<Comments />);

const comments = renderer.getRenderOutput();
const [firstComment] = comments.props.children;
const [author] = firstComment.props.children;

console.log(author.props.children === "Lewis Barnes") // true
```

### Basic Example

Using the same component from above, lets see what it looks like using react-shallow-query:

```js
import React from "react";
import TestUtils from "react-addons-test-utils";
import $ from "react-shallow-query";

function Comments() {
    return (
        <div className="comments">
            <div id="comment-1" className="comment">
                <span className="author">
                    Lewis Barnes
                </span>
                <span className="message">
                    Hello world!
                </span>
            </div>
            <div id="comment-2" className="comment">
                <span className="author">
                    John Smith
                </span>
                <span className="message">
                    Hi there!
                </span>
            </div>
        </div>
    );
}

const renderer = TestUtils.createRenderer();

renderer.render(<Comments />);

const comments = renderer.getRenderOutput();
const [author] = $(comments, ".author");

console.log(author.props.children === "Lewis Barnes") // true
```

### Query String

There are three different matchers supported by react-shallow-query:

**Class Name**

You can query a component by class name. This is similar to jQuery, only it looks within the value of props.className for each component.

```js
// Note: We are using the Comments component defined above for this example.
// This will return an array of shallow rendered React components containing the class name of 'author'.
const authors = $(comments, ".author");
```

**ID**

Just like you can in jQuery, you can also select elements by their id using the hash symbol. In React this the value assigned to props.id.

```js
// Note: We are using the Comments component defined above for this example.
// This will return an array of shallow rendered React components with an id of 'comment-2'.
const [secondComment] = $(comments, "#comment-2");
```

**Component Name**

It's also possible to query for components by their tag name. For custom components, this is either the displayName or the function name given on declaration.

```js

function Comment({messsage}) {
    return (
        <li className="comment">{message}</li>
    )
}

function Comments() {
    return (
        <ul className="comments">
            <Comment message="Hello World!" />
            <Comment message="Hi there!" />
        </ul>
    );
}

const renderer = TestUtils.createRenderer();

renderer.render(<Comments />);

const comments = renderer.getRenderOutput();
// This will return an array of shallow rendered React components with the name "Comment".
const [firstComment] = $(comments, "Comment");
```

### Future Improvements

- Provide syntax that allows more specificity. For example "span.message".
