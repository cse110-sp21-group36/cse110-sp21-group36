window.addEventListener('DOMContentLoaded', init);
function init() {
  let current = getCurrentRecipe(); //object
  /* let current = {
    "imgSrc": "/source/assets/images/icons/goldstar.jpg",
    "recipeName": "bruh",
    "mealType": ["breakfast", "lunch"],
    "totalTime": 123,
    "ingredients": ["potatoe", "poop", "salad"],
    "steps": ["k", "m", "s"],
    "favorite": "true",
    "tools": ["fork", "spoon", "bowl"],
    "difficulty": "super duper hard",
    "notes": "hahaha"
  } */
  displayInfo(current); 
  //initFormHandler();

  // TO-DO: Add links to navbar
  /* var links = document.querySelector("nav-links");
  let homeLink = document.createElement("a");
  let editorLink = document.createElement("a");
  homeLink.href = "./recipe_manager.html" ;
  editorLink.href = "./recipe_editor.html";
  homeLink.title = "Go to homepage";
  editorLink.title = "Go to editor";
  homeLink.innerHTML = "Home";
  editorLink.innerHTML = "Edit";
  links.appendChild(homeLink);
  links.appendChild(editorLink); */

  const element = document.getElementById("delete");

  // Initiates deletion of a recipe, returns to home page
  element.addEventListener("click", ()=>{
    window.localStorage.removeItem('currRecipe');
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    let i = 0;
    while (i < recipes.length && recipes[i]["recipeName"] != current["recipeName"]) {
      i++;
    }
    recipes.splice(i, 1);
    window.localStorage.setItem('recipes', JSON.stringify(recipes));
    window.location.href = "./recipe_manager.html";
 });
  
  
}

/**
 * Populates view page.
 * 
 * Recipe Object {
      imgSrc": "This is an absolute path on user's cpu",    // String that needs parsed to get URL
      recipeName": "String",                         // Single String
      "mealType": [Multiple Values],                 // Array of Strings, but specifily limited to ["Breakfast", "Lunch", etc.], if you get passed ["Dinner"], then that is the only meal type for that specific recipe; they can also have more than one.
      "totalTime": num#,                             // Number
      "ingredients": [String Array],                 // An array of Strings e.g. ["Carrots", "
       “steps”: [String Array]                       // An array of Strings e.g. ["Step 1: Add Water", "Step 2: Boil", ... ]
       "favorite": True/False                        // Boolean
       "tools": [String Array]                       // Tools: ["Frying Pan", "Beaker", "Blow Torch", ... ]
       "difficulty": "String"                        // A string, under <30 Characters e.g. "Medium", "Hard", etc.
       "notes": "String"                             // Single String, stores additional notes
}
  * @param current - current object to populate view page
 */

function displayInfo(current) {
   //fill in template 

    //TITLE
    var title = document.getElementById('recipe-name'); 
    title.textContent  = current.recipeName;

    //FAVORITE 
    // TODO: not sure what to do for favorite
    if(current.favorite == true){
      var image = document.getElementById('favorite');
      let imgElement = document.createElement('img');
      //set image 
      imgElement.src = './assets/images/icons/heart.png';
      imgElement.width = 50;
      imgElement.height = 50;
      image.appendChild(imgElement);
    }

    //IMAGE
    var image = document.getElementById('recipeImage');
    image.src = current.imgSrc;

    //MEAL TYPE
    var mealtype = document.getElementById('mealtype');
    mealtype.textContent = "";
    for (let i = 0; i < current.mealType.length; i++){
      mealtype.textContent += current.mealType[i];
      if (i != current.mealType.length - 1){
        mealtype.textContent  += ", ";
      }
    }
    

    //TIME 
    var time = document.getElementById('time'); 
    time.textContent = "Total Time: " + current.totalTime + " minutes";

    //DIFFICULTY
    var difficulty = document.getElementById('difficulty');
    difficulty.textContent = "Difficulty: " + current.difficulty;

    //NOTES
    var notes = document.getElementById('notes');
    notes.textContent = current.notes;

    //INGREDIENTS 
    var htmlIngredient = document.getElementById('ingredient-list');
    htmlIngredient.innerHTML = "";

    //loop through array of strings 
    var listIngredients = current.ingredients 
    for (var i = 0; i < listIngredients.length; i++){
      //create new element
      let newIngredient = document.createElement('li');
      newIngredient.textContent = listIngredients[i];
      
      //append to list 
      htmlIngredient.appendChild(newIngredient)
    }


    //STEPS
    var htmlStep = document.getElementById('steps-list');
    htmlStep.innerHTML = "";

    var listStep = current.steps;
    for (var x = 0; x < listStep.length; x++){

      //create new element
      let newStep = document.createElement('li');
      newStep.textContent = listStep[x];
      
      //append to list 
      htmlStep.appendChild(newStep);
    }


    //MATERIALS
    var htmlTools = document.getElementById('tools-list');
    htmlTools.innerHTML = "";

    var listTools = current.tools;
    for (var x = 0; x < listTools.length; x++){

      //create new element
      let newTool = document.createElement('li');
      newTool.textContent = listTools[x];
      
      //append to list 
      htmlTools.appendChild(newTool);
    }
    


    //add buttons that link to the other pages 
    
}

/**
 * Gets current recipe object.
 * 
 * @returns currRecipe - current recipe object
 */
function getCurrentRecipe() {
  var stringForm = localStorage.getItem('currRecipe');
  var currRecipe = JSON.parse(stringForm);
  return currRecipe; 
}
