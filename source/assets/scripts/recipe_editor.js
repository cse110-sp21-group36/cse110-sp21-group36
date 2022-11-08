// recipe_editor.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Add the event listeners to the form elements
    initFormHandler();
    // 
    unloadHandler();
}


/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
 function getRecipesFromStorage() {
    var recipes = JSON.parse(window.localStorage.getItem('recipes'));
    if (!recipes) return [];
    return recipes 
}


/**
 * Takes in a json of a recipe and ,
 * adds the new recipes to recipes array if not null or create an array 
 * with one elemnt recipe
 * @param {JSON<Object>} recipe A json of one recipe
 * @param {Array<Object>} recieps An array of recipes
 * @returns {Array<Object>} An array of recipes
 */
function addRecipesToList(recipe, recipes) {
    var recipes = JSON.parse(window.localStorage.getItem('recipes'));
    if (recipes == null) { recipes = [] }
    recipes.push(recipe);
    return recipes
}


/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

  
/**
 * Adds the necesarry event handlers to <form>, selects the form element, 
 * adds event listener for the 'submit' event, where creates a new FormData
 * from form, uses it to fill a new recipe object, adds the recipes to 
 * recipes array and save the new recipes array in localStorage inplace of
 * the previous
 */
function initFormHandler() {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        formSubmitted = true;
        const formData = Object.fromEntries(new FormData(e.target).entries())
        const recipeObject = {
        // make the recipe data structure 



        }
        var recipes = addRecipesToList(recipeObject);
        saveRecipesToStorage(recipes);
        window.location.url('source/recipe_viewer.html');
    });

}


/**
 * 
 */
function unloadHandler() {
    window.addEventListener("beforeunload", function (e) {
        var warningMessage = '';
        e.preventDefault();
        e.returnValue = warningMessage;
        return warningMessage;
    });

}
