import React from "react";

export function Comments() {
    return (
        <ul>
            <Comment author="John Smith" message="Hello World" />
            <li className="custom-comment">
                <h3>Some Author</h3>
            </li>
            <li className="custom-comment">
                <strong>Some Other Author</strong>
            </li>
        </ul>
    );
}

export function Comment({author, message}) {
    return (
        <li className="comment">
            <span className="author">
                <em>
                    <strong>Author: </strong>{author}
                </em>
            </span>
            <span id="message">
                <strong>Message: </strong>{message}
            </span>
        </li>
    );
}
