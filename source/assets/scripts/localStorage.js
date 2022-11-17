/**
 * Takes a String target and reads target from localStorage and returns an
 * array of all of this object found (parsed, not in string form). If
 * nothing is found in localStorage for target, nullObject is returned, the
 * default value is a empty array.
 * 
 * @param {String} target value to look for in localStorage
 * @param {Object} nullObject the object to use if nothing in localStorage
 * @returns {Object} the object found in localStorage
 */
 function get_FromStorage(target, nullObject=[]) {
    var response = JSON.parse(window.localStorage.getItem(target));
    if (!response) return nullObject;
    return response 
}

// TODO
/**
 * Takes in a json of a recipe and ,
 * adds the new recipes to recipes array if not null or create an array 
 * with one elemnt recipe
 * @param {JSON<Object>} recipe A json of one recipe
 * @param {Array<Object>} recieps An array of recipes
 * @returns {Array<Object>} An array of recipes
 */
function add_ToList(recipe, recipes) {
    var recipes = JSON.parse(window.localStorage.getItem('recipes'));
    if (recipes == null) { recipes = [] }
    recipes.push(recipe);
    return recipes
}


// TODO
/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function save_ToStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}
