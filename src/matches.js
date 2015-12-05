function displayName({type}, fragment) {
    const {displayName, name} = type;

    return ((displayName || name) == fragment);
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
    return (object.props.id == fragment.slice(1));
}

export default {
    displayName,
    className,
    type,
    id
};
