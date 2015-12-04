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
        var newResults = [];
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
        
        results.forEach((result) => {
            var objects = (index ? result.props.children : result);
            var foundResults;

            if (!Array.isArray(objects))
                objects = [objects];

            foundResults = findResults(objects, matcher, fragment, recursive);

            // Append the newly found results to the 'newResults' array.
            newResults.push.apply(newResults, foundResults);
        });

        results = newResults;
    });

    return results;
};

function findResults(objects = [], matcher, fragment, recursive) {
    var results = [];

    // TODO: Use Array.reduce.
    objects.forEach((object) => {
        var children, foundResults;

        // Ignore objects that aren't objects (e.g. text) or null values.
        if (!object || typeof object != "object")
            return;
        
        ({children} = object.props);
        
        if (matcher(object, fragment))
            results.push(object);
        
        if (!children || !recursive)
            return;
        
        if (!Array.isArray(children))
            children = [children];

        foundResults = findResults(children, matcher, fragment, recursive);

        // Append the newly found results onto the 'results' array.
        results.push.apply(results, foundResults);
    });

    return results;
}

export default ReactShallowQuery;
