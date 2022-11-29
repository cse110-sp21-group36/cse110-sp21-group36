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
    // 
    unloadHandler();
    //
    dragDropImageHandler();
    //
    mealTypeHandler();
    //
    stepsHandler();
    //
    toolsHandler();
    //
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
    const form = document.querySelector('form');
    var recipes = get_FromStorage('recipes');

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

        let keys = Object.keys(formData);

        let meal_types = []
        let tools = []
        let ingredients = []
        let steps = []
        for (let key of keys) {
            if (key.slice(0,9) == "meal-type") {
                meal_types.push(key.slice(10))
            }

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
        
        const recipeObject = {
            // make the recipe data structure 
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
        recipes = add_ToList(recipeObject, recipes);
        save_ToStorage('recipes', recipes);
        save_ToStorage('currRecipe', recipeObject)
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
        saveFileName();
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
        saveFileName(); 
    });

    function saveFileName() {
    let fileType = file.type; 
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if(validExtensions.includes(fileType)) { 
        let fileReader = new FileReader(); 
        fileReader.onload = () => {
            let fileURL = fileReader.result;

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

    const element = "mealTypes";
    const mealType = document.querySelector(".meal-type");
    const button = document.createElement('button');
    button.classList.add("new-type-btn");
    button.textContent = "Custom Meal";
    const mealDiv = mealType.querySelector("div"); 
    
    const meals = get_FromStorage(
        element, ['breakfast', 'lunch', 'dinner', 'snack']);
    addMealsToDocument(meals);
    mealType.appendChild(button);

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

    var step_number = 1;
    const element = "steps";
    const main = document.querySelector(".step-list");
    const step_list = main.querySelector('div');
    create_Element(element, step_list, undefined, step_number);
    step_number = step_number+1;

    let add_step_button = document.createElement('button');
    add_step_button.classList.add('create-step');
    add_step_button.textContent = "Add New Step";
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
    var tool_number = 1;
    const element = "tools";
    const main = document.querySelector(".tool-list");
    const tool_list = main.querySelector('div');
    const tools = get_FromStorage(
        'tools', ['non-stick frying pan', 'saucepan', 'stock pot', 'sheet pans', 
        'glass baking dish', 'knives', 'measuring spoons', 'measuring cups', 
        'wooden spoon', 'fish turner', 'peeler', 'whisk', 'tongs', 
        'cutting board', 'colander', 'prep bowls', 'can opener',
        'microplane zester', 'stick blender', 'salad spinner']);
    create_Element(element, tool_list, tools, tool_number);
    tool_number = tool_number+1;

    const add_tool_button = document.createElement('button');
    add_tool_button.classList.add("new-tool-btn");
    add_tool_button.textContent = "Add New Tool";
    main.appendChild(add_tool_button);
    
    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Custom Tool";
    main.appendChild(button);

    add_tool_button.addEventListener('click', () => {
        create_Element(element, tool_list, tools, tool_number);
        tool_number = tool_number+1;
    })

    button.addEventListener('click', () => {
        addCustom_Element(element, tool_list, main, button, tools, "Add New Tool");
    })
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * ingredients to do the recipe
 */
 function ingredientsHandler() {
    var ingredient_number = 1;
    const element = "ingredient";
    const main = document.querySelector(".ingredient-list");
    const ingredient_list = main.querySelector('div');
    const ingredients = get_FromStorage(
        'ingredients', ['chicken', 'beef', 'red peeper', 'onion', 'garlic', 'cilantro', 'tortilla']);
    const quantities = get_FromStorage(
        'ingredientQuatitity', ['0.5', '1', '2', '3', '4', '5', '100', '200', '350']);
    const units = get_FromStorage(
        'ingredientUnits', ['oz', 'mL', 'cL', 'L', 'g', 'kg', 'lb', 'ea']);
    create_Element(element+'s', ingredient_list, [quantities, units, ingredients], ingredient_number);
    ingredient_number = ingredient_number+1;

    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Add New Ingredient";
    main.appendChild(button);

    button.addEventListener('click', () => {
        create_Element(element+'s', ingredient_list, [quantities, units, ingredients], ingredient_number);
        ingredient_number = ingredient_number+1;
    })

    const quantity_button = document.createElement('button');
    quantity_button.classList.add("new-quantity-btn");
    quantity_button.textContent = "Custom Quantity";
    main.appendChild(quantity_button);

    quantity_button.addEventListener('click', () => {
        addCustom_Element(
            element+'Quantity', ingredient_list, main, quantity_button, quantities, "Add New Quantity");
    })

    const unit_button = document.createElement('button');
    unit_button.classList.add("new-units-btn");
    unit_button.textContent = "Custom Unit";
    main.appendChild(unit_button);

    unit_button.addEventListener('click', () => {
        addCustom_Element(
            element+"Units", ingredient_list, main, unit_button, units, "Add New Unit");
    })

    const ingredient_button = document.createElement('button');
    ingredient_button.classList.add("new-ingredient-btn");
    ingredient_button.textContent = "Custom Ingredient";
    main.appendChild(ingredient_button);

    ingredient_button.addEventListener('click', () => {
        addCustom_Element(
            element+"s", ingredient_list, main, ingredient_button, ingredients, "Add New Ingredient");
    })
 }
