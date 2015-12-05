import React from "react";

export function Comments({comments = []}) {
    return (
        <ul>
            {comments.map((comment, index) => <Comment key={index} {...comment} />)}
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
