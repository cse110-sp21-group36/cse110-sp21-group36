window.addEventListener('DOMContentLoaded', init);
function init() {
  let current = getCurrentRecipe(); //object
  displayInfo(current); 
  initFormHandler();
}

function displayInfo(current) {
   //fill in template 
  //TITLE
    var title = document.getElementById(“recipe-name”); 
    title.textContent = current.name; 

    //favorite 
    if(data.favorite == “true”{
    document.getElementById(“favorite”)
      //set image 
    }

    // time 
    var time = document.getElementById(“time”); 
    time.textContent(data.time)’ 
    //INGREDIENTS 
    var ingredientsList = document.querySelector(‘ul[id=“ingredients-list”]’)

    //loop through array of strings 
    var LSingredients = data.ingredients 
    for (int i = 0; i < LSingredients.length; i++){
      //create new element 
      //append to list 
    }


    //DIRECTIONS
    var directionsList = document.querySelector(‘ol[id=“directions-list”]’)


    //MATERIALS
    var materials List = document.querySelector(‘ul[id=“materials-list”]’)


    //add buttons that link to the other pages 
    
}

function getCurrentRecipe() {
  var stringForm = localStorage.getItem(‘current’);
  var currRecipe = JSON.parse(stringForm);
  return currRecipe; 
}
