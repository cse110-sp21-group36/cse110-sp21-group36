// recipe_editor.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Add the event listeners to the form elements
    initFormHandler();
    // 
    unloadHandler();
    //
    dragDropImageHandler();
    //
    mealTypeHandler();
    //
    stepHandler();
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
 * Adds the necesarry event handlers to the form page, to prevent page exit 
 * without saving the data
 */
function unloadHandler() {
    window.addEventListener("beforeunload", function (e) {
        var warningMessage = '';
        e.preventDefault();
        e.returnValue = warningMessage;
        return warningMessage;
    });

}


/**
 * Adds the necesarry event handlers to the drag area, to drag an image over,
 * or not, to drop this image or to manually add it by looking into the laptop 
 * folders
 */
 function dragDropImageHandler() {
    const dropArea = document.querySelector(".drag-area");
    const dragText = dropArea.querySelector(".drag-header");
    const dragName = dropArea.querySelector("p")
    let button = dropArea.querySelector("button");
    let input = dropArea.querySelector("input");
    let file; 

    button.onclick = () => { input.click() }

    input.addEventListener("change", function() {
        file = this.files[0];
        dropArea.classList.add("active");
        displayFileName();
    });

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        displayFileName(); 
    });

    function displayFileName() {
    let fileType = file.type; 
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if(validExtensions.includes(fileType)) { 
        let fileReader = new FileReader(); 
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            dragName.textContent = file.name;
            // Add save image to locale storage 
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }}
}


/**
 * Adds the necesarry event handlers and function to load dinamicly the 
 * meal types and allow the user to add some new one of his choise.
 */
 function mealTypeHandler() {

    const mealType = document.querySelector(".meal-type");
    const button = document.createElement('button');
    button.classList.add("new-type-btn");
    button.textContent = "Custom Meal";
    const mealDiv = mealType.querySelector("div"); 
    
    const meals = getMealsFromStorage();
    addMealsToDocument(meals);
    mealType.appendChild(button);
    addCustomMealsToList();
    

    /**
     * Reads 'mealTypes' from localStorage and returns an array of
     * all of the meal type found (parsed, not in string form). If
     * nothing is found in localStorage for 'mealTypes', an array with default
     * value is returned.
     */
    function getMealsFromStorage() {
        const meals = JSON.parse(window.localStorage.getItem('mealTypes'));
        if (!meals) return ['breakfast', 'lunch', 'dinner', 'snack'];
        return meals 
    }

    /**
     * Takes in an array of meal types, converts it to a string, and then
     * saves that string to 'mealTypes' in localStorage
     * @param {Array<Object>} meals An array of meal types
     */
    function saveMealsToStorage(meals) {
        localStorage.setItem('mealTypes', JSON.stringify(meals));
    }

    /**
     * Takes a meal type, create the checkbox + label element on the html 
     * file
     * @param {String<Object>} meal A string of one meal type
     */
     function createMealTypeElement(meal) {
        meal = meal.toLowerCase();
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = meal;
        checkbox.name = "meal-type";
        checkbox.value = meal;
        let label = document.createElement('label')
        label.htmlFor = meal;
        label.textContent = meal[0].toUpperCase() + meal.substring(1);

        mealDiv.appendChild(checkbox);
        mealDiv.appendChild(label);
    }

    /**
     * Takes in an array of meal types and for each and then appends 
     * the meal type to <.meal-type> checkbox
     * @param {Array<Object>} meals An array of mealTypes
     */
    function addMealsToDocument(meals) {
        for (let i = 0; i < meals.length; i++) {
            createMealTypeElement(meals[i]);
        }
    }

    /**
     * Takes nothing, adds event listener if someone want to add a new
     * meal type, update localStorage, and the page
     */
     function addCustomMealsToList() {
        button.addEventListener('click', () => {
            let new_textarea = document.createElement('input');
            new_textarea.type = 'textarea';
            new_textarea.classList.add('new-meal-type-value');
            let new_button = document.createElement('button');
            new_button.classList.add('new-meal-type');
            new_button.textContent = "Add New Meal Type";
            let new_div = document.createElement('div');

            new_div.appendChild(new_textarea);
            new_div.appendChild(new_button);
            mealDiv.appendChild(new_div);
            mealType.removeChild(button);

            let new_meal_button = document.querySelector(".new-meal-type")
            new_meal_button.addEventListener('click', () => {
                let new_meal_type = mealDiv.querySelector(".new-meal-type-value").value
                if (new_meal_type) {
                    createMealTypeElement(new_meal_type);
                    mealDiv.removeChild(new_div);
                    mealType.appendChild(button);

                    meals.push(new_meal_type);
                    saveMealsToStorage(meals);
                }
            })
        });
}
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * steps to do the recipe
 */
 function stepHandler() {
    const main = document.querySelector(".step-list");
    const step_list = main.querySelector('div')
    createFirstStepElement();

    let add_step = document.createElement('button');
    add_step.classList.add('create-step');
    add_step.textContent = "Add New Step";
    main.appendChild(add_step);

    add_step.addEventListener('click', () => {
        createNewStepElement();
    })


     /**
     * Create the first textarea to fullfil with instruction to do the recipe
     */
      function createFirstStepElement() {
        const new_step = document.createElement("div");
        let label = document.createElement('label');
        label.htmlFor = "steps";
        label.textContent = " - ";
        let text = document.createElement('input');
        text.type = "text";
        text.id = "steps";
        text.name = "step";
        text.required = true;
        new_step.appendChild(label);
        new_step.appendChild(text);
        step_list.appendChild(new_step);
    };


    /**
     * Create the other textarea to fullfil with instruction to do the recipe 
     * with an additional button to delete them
     */
    function createNewStepElement() {
        const new_step = document.createElement("div");
        let label = document.createElement('label');
        label.htmlFor = "steps";
        label.textContent = " - ";
        let text = document.createElement('input');
        text.type = "text";
        text.id = "steps";
        text.name = "step";
        text.required = true;
        let cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        new_step.appendChild(label);
        new_step.appendChild(text);
        new_step.appendChild(cancel);
        step_list.appendChild(new_step);

        let delete_step = new_step.querySelector("button")
        delete_step.addEventListener('click', () => {
            step_list.removeChild(new_step);
        })
    };

 }
