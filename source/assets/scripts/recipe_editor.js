// recipe_editor.js
import { get_FromStorage, add_ToList, save_ToStorage } from "./localStorage.js";
import { create_Element } from "./RecipeEditorElement.js";
import { addCustom_Element } from "./addCustomElement.js";

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Add the event listeners to the form elements
    initFormHandler();
    // Alert user before leaving the editor page without saving
    unloadHandler();
    // Process the image used for this recipe
    dragDropImageHandler();
    // Process the meal types for this recipe
    mealTypeHandler();
    // Process the steps to cook for this recipe
    stepsHandler();
    // Process the tools used for this recipe
    toolsHandler();
    // Process the ingredients used for this recipe
    ingredientsHandler();
}

/**
 * Adds the necesarry event handlers to <form>, selects the form element, 
 * adds event listener for the 'submit' event, where creates a new FormData
 * from form, uses it to fill a new recipe object, adds the recipes to 
 * recipes array and save the new recipes array in localStorage inplace of
 * the previous
 */
function initFormHandler() {
    // The form to take in info for the recipe
    const form = document.querySelector('form');
    // Retrieve the existing recipes array in localStorage, if exists
    var recipes = get_FromStorage('recipes');

    // Add event listener for the form when user save the recipe
    form.addEventListener('submit', async (e) => {
        const formData = Object.fromEntries(new FormData(e.target).entries())

        var filename = formData.filename;
        var imagedata = formData.filedata;
        if (filename == undefined) {
            filename = "no-image.png"
            imagedata = "./assets/images/no-image.png";
            // const response = await fetch('http://127.0.0.1:5500/source/assets/images/no-image.txt');
            // imagedata = await response.text();
        }

        let keys = Object.keys(formData);   // key value from the submitted form
        let meal_types = []                 // meal types array
        let tools = []                      // tools array
        let ingredients = []                // ingredients array
        let steps = []                      // steps array

        for (let key of keys) {
            // Stores the meal type values from the form
            if (key.slice(0,9) == "meal-type") {
                meal_types.push(key.slice(10))
            }

            // Stores the tool values from the form
            if (key.slice(0,6) == "tool-v") {
                // let id = key.slice(-2)
                // tools.push({
                //     id: id,
                //     quantity: formData["tool-nb-"+id],
                //     tool: formData["tool-v-"+id]
                // })
                let id = key.slice(-2)
                tools.push(formData["tool-nb-"+id]+' '+formData["tool-v-"+id]);
            }

            // Stores the ingredient values from the form
            if (key.slice(0,13) == "ingredients-v") {
                // let id = key.slice(-2)
                // ingredients.push({
                //     id: id,
                //     quantity: formData["ingredients-q-"+id],
                //     unit: formData["ingredients-u-"+id],
                //     ingredient: formData["ingredients-v-"+id]
                // })
                let id = key.slice(-2)
                ingredients.push(formData["ingredients-v-"+id]+' '+formData["ingredients-q-"+id]+' '+formData["ingredients-u-"+id]);
            }
            
            // Stores the step values from the form
            if (key.slice(0, 6) == "step-v") {
                // let id = key.slice(-2);
                // steps.push({
                //     id: id,
                //     step: formData["step-v-"+id]
                // })
                let id = key.slice(-2);
                steps.push(formData["step-v-"+id]);
            }
        }
        
        // Constrcuts the recipe object used to contain the entered info 
        const recipeObject = {
            recipe: ("0"+(recipes.length+1)).slice(-2),
            recipeName: formData.title,
            title: formData.title,
            author: formData.author,
            image: {
                name: filename,
                data: imagedata,
            },
            imgSrc: imagedata,
            favorite: formData.favorite == "Yes",

            difficulty: formData.difficulty,
            totalTimeString: formData.hours+' hours '+formData.mins+' mins',
            totalTime: Number(formData.hours)*60+Number(formData.mins),
            time: {
                hours: formData.hours,
                mins: formData.mins
            },
            mealType: meal_types,
            notes: formData.note,

            tools: tools,
            ingredients: ingredients,
            steps: steps
        }

        // Add the new object back to the recipe object array 
        recipes = add_ToList(recipeObject, recipes);
        // Save the recipes array back to localStorage
        save_ToStorage('recipes', recipes);
        // Save the current recipe object to localStorage
        save_ToStorage('currRecipe', recipeObject)
    });
}


/**
 * Adds the necessary event handlers to the form page, to prevent page exit 
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
    // Retrieve the drag image area in form
    const dropArea = document.querySelector(".drag-area"); 
    // The instruction header in the drag area 
    const dragText = dropArea.querySelector(".drag-header");
    // The image file name
    const dragName = dropArea.querySelector("p")
    // The "browse file" button 
    let button = dropArea.querySelector("button");
    // The image file
    let input = dropArea.querySelector("input");
    // The image file type
    let file; 

    button.onclick = () => { input.click() }

    // Save image file when users adding through browse button 
    input.addEventListener("change", function() {
        file = this.files[0];
        dropArea.classList.add("active");
        saveFileName();
    });

    // Change section header when users are dragging the image file to the area
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    // Change section header when users are not dragging image anymore
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });

    // Save image file when users adding through directly dragging image file
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        saveFileName(); 
    });

    /**
     * Process the image file put by the users and save to the recipe object
     */
    function saveFileName() {
    // image file type
    let fileType = file.type; 
    // accepted image file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    // If image file type matched, process the image
    if(validExtensions.includes(fileType)) { 
        let fileReader = new FileReader(); 
        fileReader.onload = () => {
            // The image file raw data 
            let fileURL = fileReader.result;
            // The image file name
            dragName.textContent = file.name;

            let label_1 = document.createElement('label');
            label_1.htmlFor = "filename";
            let text_1 = document.createElement('input');
            text_1.type = "text";
            text_1.hidden = true;
            text_1.name = "filename";
            text_1.value = file.name;
            dropArea.appendChild(label_1);
            dropArea.appendChild(text_1);

            let label_2 = document.createElement('label');
            label_2.htmlFor = "filedata";
            let text_2 = document.createElement('input');
            text_2.type = "text";
            text_2.hidden = true;
            text_2.name = "filedata";
            text_2.value = fileURL;
            dropArea.appendChild(label_2);
            dropArea.appendChild(text_2);
        }
        // Encode the file data as a string
        fileReader.readAsDataURL(file);
    } 
    // If not matched the acceptable image file type, 
    // ask user to use different file 
    else {
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
    // The meal type key associated in the recipe object 
    const element = "mealTypes";
    // Retrieve the meal type element from the form 
    const mealType = document.querySelector(".meal-type");
    // Retrieve the meal type div from the form
    const mealDiv = mealType.querySelector("div"); 
    // The custom meal type button 
    const button = document.createElement('button');
    button.classList.add("new-type-btn");
    button.textContent = "Custom Meal";
    
    // Retrive the existing meal type array in localStorage
    const meals = get_FromStorage(
        element, ['breakfast', 'lunch', 'dinner', 'snack']);
    addMealsToDocument(meals);
    mealType.appendChild(button);

    // Save entered custom meal type 
    button.addEventListener('click', () => {
        addCustom_Element(
            element, mealDiv, mealType, button, meals, "Add New Meal Type");
    });

    /**
     * Takes in an array of meal types and for each and then appends 
     * the meal type to <.meal-type> checkbox
     * @param {Array<Object>} meals An array of mealTypes
     */
    function addMealsToDocument(meals) {
        for (let i = 0; i < meals.length; i++) {
            create_Element(element, mealDiv, meals[i], undefined);
        }
    }
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * steps to do the recipe
 */
 function stepsHandler() {
    // Track how many steps are there
    var step_number = 1;
      // Identifier to create a new step for the recipe object
    const element = "steps";
    // Retrieve the targeted step section from the form 
    const main = document.querySelector(".step-list");
    const step_list = main.querySelector('div');

    // Create a new step element 
    create_Element(element, step_list, undefined, step_number);
    step_number = step_number+1;

    // Create a "Add New Step" button for this recipe
    let add_step_button = document.createElement('button');
    add_step_button.classList.add('create-step');
    add_step_button.textContent = "Add New Step";

    // Attach the button to the step section 
    main.appendChild(add_step_button);

    add_step_button.addEventListener('click', () => {
        create_Element(element, step_list, undefined, step_number);
        step_number = step_number+1;
    })
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * tools to do the recipe
 */
 function toolsHandler() {
    // Track how many tools are there
    var tool_number = 1;
    // Identifier to create a new tool for the recipe object
    const element = "tools";
    // Retrieve the targeted tool section from the form 
    const main = document.querySelector(".tool-list");
    const tool_list = main.querySelector('div');
    // Retrieve the existing tool array from localStorage
    const tools = get_FromStorage(
        'tools', ['non-stick frying pan', 'saucepan', 'stock pot', 'sheet pans', 
        'glass baking dish', 'knives', 'measuring spoons', 'measuring cups', 
        'wooden spoon', 'fish turner', 'peeler', 'whisk', 'tongs', 
        'cutting board', 'colander', 'prep bowls', 'can opener',
        'microplane zester', 'stick blender', 'salad spinner']);

    // Create a new tool for this recipe object 
    create_Element(element, tool_list, tools, tool_number);
    tool_number = tool_number+1;

    // Create a "Add New Tool" button for this recipe 
    const add_tool_button = document.createElement('button');
    add_tool_button.classList.add("new-tool-btn");
    add_tool_button.textContent = "Add New Tool";
    main.appendChild(add_tool_button);

    add_tool_button.addEventListener('click', () => {
        create_Element(element, tool_list, tools, tool_number);
        tool_number = tool_number+1;
    })
    
    // Create a "Custom Tool" button when users want to add new type of tool
    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Custom Tool";
    main.appendChild(button);

    button.addEventListener('click', () => {
        addCustom_Element(element, tool_list, main, button, tools, "Add New Tool");
    })
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * ingredients to do the recipe
 */
 function ingredientsHandler() {
    // Track how many ingredients are there
    var ingredient_number = 1;
    // Identifier to create a new ingredient for the recipe object
    const element = "ingredient";
    // Retrieve the targeted ingredient section from the form 
    const main = document.querySelector(".ingredient-list");
    const ingredient_list = main.querySelector('div');
    // Retrieve the existing ingredient name array from localStorage
    const ingredients = get_FromStorage(
        'ingredients', ['chicken', 'beef', 'red peeper', 'onion', 'garlic', 'cilantro', 'tortilla']);
    // Retrieve the existing ingredient quantity array from localStorage
    const quantities = get_FromStorage(
        'ingredientQuatitity', ['0.5', '1', '2', '3', '4', '5', '100', '200', '350']);
     // Retrieve the existing ingredient unit array from localStorage
    const units = get_FromStorage(
        'ingredientUnits', ['oz', 'mL', 'cL', 'L', 'g', 'kg', 'lb', 'ea']);

    // Create a new ingredient for this recipe object 
    create_Element(element+'s', ingredient_list, [quantities, units, ingredients], ingredient_number);
    ingredient_number = ingredient_number+1;

    // Create a "Add New Ingredient" button for this recipe 
    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Add New Ingredient";
    main.appendChild(button);

    button.addEventListener('click', () => {
        create_Element(element+'s', ingredient_list, [quantities, units, ingredients], ingredient_number);
        ingredient_number = ingredient_number+1;
    })

    // Create a "Custom Quantity" button when users want to add new type of ingredient quantity
    const quantity_button = document.createElement('button');
    quantity_button.classList.add("new-quantity-btn");
    quantity_button.textContent = "Custom Quantity";
    main.appendChild(quantity_button);

    quantity_button.addEventListener('click', () => {
        addCustom_Element(
            element+'Quantity', ingredient_list, main, quantity_button, quantities, "Add New Quantity");
    })

    // Create a "Custom Unit" button when users want to add new type of ingredient unit
    const unit_button = document.createElement('button');
    unit_button.classList.add("new-units-btn");
    unit_button.textContent = "Custom Unit";
    main.appendChild(unit_button);

    unit_button.addEventListener('click', () => {
        addCustom_Element(
            element+"Units", ingredient_list, main, unit_button, units, "Add New Unit");
    })

    // Create a "Custom Ingredient" button when users want to add new type of ingredient name
    const ingredient_button = document.createElement('button');
    ingredient_button.classList.add("new-ingredient-btn");
    ingredient_button.textContent = "Custom Ingredient";
    main.appendChild(ingredient_button);

    ingredient_button.addEventListener('click', () => {
        addCustom_Element(
            element+"s", ingredient_list, main, ingredient_button, ingredients, "Add New Ingredient");
    })
 }
