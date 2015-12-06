import Matches from "./matches";

// Maps symbols to matches.
const SYMBOL_MATCHES = {
    "#": Matches.id,
    ".": Matches.className
};

// TODO: Use better variables names.
function ReactShallowQuery(objects, query) {
    if (typeof query !== "string")
        throw new Error("You must provide a query.");

    if (!Array.isArray(objects))
        objects = [objects];
    
    const fragments = query.split(" ");
    let recursive = true;

    // Loop through each fragments.
    return fragments.reduce((results, fragment, index) => {
        if (fragment == ">") {
            recursive = false;
            
            return results;
        }

        // Parse the fragment to figure out what matcher to use.
        // The matcher is used on each component to figure out if meets the query criteria.
        const matcher = getMatcher(fragment);

        // Alter the accumulative results array based on the current fragment.
        // This may add new elements or remove existing elements within the array.
        return results.reduce((elements, element) => {
            let objects = (index ? element.props.children : element);

            if (!Array.isArray(objects))
                objects = [objects];
            
            // Append the newly found elements.
            return elements.concat(findResults(objects, matcher, fragment, recursive));
        }, []);
    }, objects);
};

function getMatcher(fragment) {
    const prefix = fragment.charAt(0);

    // Handle symbols (hash = id | period = className).
    if (SYMBOL_MATCHES[prefix])
        return SYMBOL_MATCHES[prefix];

    // Handle custom React components.
    if (prefix === prefix.toUpperCase())
        return Matches.displayName;

    // It must be a default React component (div, span, li, etc).
    return Matches.type;
}

function findResults(objects = [], matcher, fragment, recursive) {
    if (!Array.isArray(objects))
        objects = [objects];

    return objects.reduce((results, object) => {
        // Ignore objects that aren't components (e.g. text) or null values.
        if (!object || typeof object !== "object")
            return results;

        // This covers the case where array.map is used when composing components.
        if (Array.isArray(object))
            return results.concat(findResults(object, matcher, fragment, recursive));

        // Check if the object is valid and append it to our results if true.
        if (matcher(object, fragment))
            results.push(object);

        const {props} = object;
        
        if (!props || !props.children || !recursive)
            return results;

        // Append the newly found results onto the 'results' array.
        return results.concat(findResults(props.children, matcher, fragment, recursive));
    }, []);
}

export default ReactShallowQuery;
