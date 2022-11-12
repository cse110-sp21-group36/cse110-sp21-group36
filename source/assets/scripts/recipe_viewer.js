window.addEventListener('DOMContentLoaded', init);
function init() {
  let recipes = getRecipesFromStorage();
  let current = getCurrentRecipe(); 
  displayInfo(recipes, current); 
  initFormHandler();
}

function displayInfo(recipes, current ) {
    // loop through to find the correct recipe 
    for (var i = 0; i < recipes.length ; i++){
    }
    // fill in the information in the template
    
    // title
    var title = document.getElementByID()
    //favorite
    //ingredients 
    // steps
    //materials 
}

function getRecipesFromStorage() {
  var stringForm = localStorage.getItem('recipes');
  var recipes = JSON.parse(stringForm);
  return recipes; 
}

function getCurrentRecipe() {
  var stringForm = localStorage.getItem(‘current’);
  var currRecipe = JSON.parse(stringForm);
  return currRecipe; 
}
