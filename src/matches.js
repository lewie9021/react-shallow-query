function displayName(object, fragment) {
    var {type} = object;

    return (type && type.displayName == fragment);
}

function className(object, fragment) {
    var {className} = object.props;

    // Remove the period.
    fragment = fragment.slice(1);

    // Search in the className for the fragment.
    return className && className.split(" ").some((name) => {
        return name == fragment;
    });
}

function type(object, fragment) {
    return (object.type === fragment);
}

function id(object, fragment) {
    return (object.props.id == fragment);
}

export default {
    displayName,
    className,
    type,
    id
};
