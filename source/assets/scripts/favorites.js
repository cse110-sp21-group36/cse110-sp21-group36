// favorites.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    createNewRecipeButtonFunctionality();

    //set banner image on homepage dimensions
    let bannerImage = document.getElementById('homepage_banner');
    bannerImage.width = window.innerWidth;
    bannerImage.height = window.innerWidth / 3;

    // Get the recipes from localStorage
    let recipes = getRecipesFromStorage();
    // Add each recipe to the <main> element
    addRecipesToDocument(recipes);
}


function createNewRecipeButtonFunctionality() {
    let button = document.getElementById('createNewRecipeButton');
    button.onclick = () => {
        localStorage.setItem('currRecipe', null);
        window.location.replace('./recipe_editor.html');
    }
}


/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-preview> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
    let mainEl = document.getElementsByTagName('main')[0];

    for (let i = 0; i < recipes.length; i++) {
        let favorite = recipes[i].favorite;
        if (favorite) {
            let RecipePreviewEl = document.createElement('recipe-preview');
            RecipePreviewEl.data = recipes[i];
            mainEl.append(RecipePreviewEl);
        }
    }
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
    return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}