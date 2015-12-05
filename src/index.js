import Matches from "./matches";

// Maps symbols to matches.
const SYMBOL_MATCHES = {
    "#": Matches.id,
    ".": Matches.className
};

// TODO: Use better variables names.
function ReactShallowQuery(object, query) {
    if (typeof query !== "string")
        throw new Error("You must provide a query.");
    
    var results = Array.isArray(object) ? object : [object];
    var fragments = query.split(" ");
    var recursive = true;

    // Loop through each fragement.
    // TODO: Use Array.reduce.
    fragments.forEach((fragment, index) => {
        var prefix = fragment.charAt(0);
        var matcher;
        
        if (fragment == ">") 
            return recursive = false;

        // Handle prefix symbols.
        if (SYMBOL_MATCHES[prefix]) {
            matcher = SYMBOL_MATCHES[prefix];
        } else {
            let upperCase = (prefix === prefix.toUpperCase());

            // Handle default and custom React component names.
            matcher = Matches[upperCase ? "displayName" : "type"];
        }

        // Alter the accumulative results array based on the current fragement.
        // This may add new elements or remove existing elements within the array.
        results = results.reduce((elements, element) => {
            var objects = (index ? element.props.children : element);

            if (!Array.isArray(objects))
                objects = [objects];
            
            // Append the newly found elements.
            return elements.concat(findResults(objects, matcher, fragment, recursive));
        }, []);
    });

    return results;
};

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
