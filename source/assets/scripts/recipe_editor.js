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
    stepsHandler();
    //
    toolsHandler();
    //
    ingredientsHandler();
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
        var recipes = getRecipesFromStorage(recipeObject);
        const formData = Object.fromEntries(new FormData(e.target).entries())

        const filename = formData.filename;
        const imagedata = formData.filedata;
        if (filename == "") {
            filename = "no-image.png";
            imagedata = require("./source/assets/images/no-image.txt");
        }

        meal_types = []
        for (let i=0; i<formData.keys().length; i++){
            if (formData.keys()[i].slice(0,9) == "meal-type") {
                meal_types.push(formData.keys()[i].slice(10))
            }
        }

        tools = []
        for (let i=0; i<formData.keys().length; i++){
            if (formData.keys()[i].slice(0,7) == "tools-v") {
                let id = formData.keys()[i].slice(-2)
                tools.push({
                    id: id,
                    quantity: formData["tools-nb-"+id],
                    tool: formData["tools-v-"+id]
                })
            }
        }

        ingredients = []
        for (let i=0; i<formData.keys().length; i++){
            if (formData.keys()[i].slice(0,14) == "ingredients-v") {
                let id = formData.keys()[i].slice(-2)
                tools.push({
                    id: id,
                    quantity: formData["ingredients-q-"+id],
                    unit: formData["ingredients-u-"+id],
                    ingredient: formData["ingredients-v-"+id]
                })
            }
        }

        ingredients = []
        for (let i=0; i<formData.keys().length; i++){
            if (formData.keys()[i].slice(0,7) == "steps-v") {
                let id = formData.keys()[i].slice(-2)
                tools.push({
                    id: id,
                    step: formData["step-v-"+id]
                })
            }
        }

        const recipeObject = {
            // make the recipe data structure 
            recipe: ("0"+(recipes.length+1)).slice(-2),
            title: formData.title,
            author: formData.author,
            image: {
                name: filename,
                data: imagedata,
            },
            favorite: formData.favorite == "Yes",

            difficulty: formData.difficulty,
            time: {
                hours: formData.hours,
                mins: formData.mins
            },
            mealtype: meal_types,
            note: formData.note,

            tools: tools,
            ingredients: ingredients,
            steps: steps
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

    const mealType = document.querySelector(".meal-type");
    const button = document.createElement('button');
    button.classList.add("new-type-btn");
    button.textContent = "Custom Meal";
    const mealDiv = mealType.querySelector("div"); 
    
    const meals = getMealsFromStorage();
    addMealsToDocument(meals);
    mealType.appendChild(button);

    button.addEventListener('click', () => {
        addCustomMealsToList();
    });
    

    /**
     * Reads 'mealTypes' from localStorage and returns an array of
     * all of the meal type found (parsed, not in string form). If
     * nothing is found in localStorage for 'mealTypes', an array with default
     * value is returned.
     * @return {Array<Object>} An array of meal types
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
        checkbox.name = "meal-type-"+meal;
        checkbox.value = "Yes";
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

        new_button.addEventListener('click', () => {
            let new_meal_type = mealDiv.querySelector(".new-meal-type-value").value
            if (!(new_meal_type in meals)) {
                if (new_meal_type) {
                    createMealTypeElement(new_meal_type);
                    mealDiv.removeChild(new_div);
                    mealType.appendChild(button);

                    meals.push(new_meal_type);
                    saveMealsToStorage(meals);
                }
            }
        });
    }
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * steps to do the recipe
 */
 function stepsHandler() {
    var step_number = 1;
    const main = document.querySelector(".step-list");
    const step_list = main.querySelector('div');
    addFirstStepElement();

    let add_step = document.createElement('button');
    add_step.classList.add('create-step');
    add_step.textContent = "Add New Step";
    main.appendChild(add_step);

    add_step.addEventListener('click', () => {
        addNewStepElement();
    })


     /**
     * Creates the html element for step
     * @return {Array<Object>} of html element 
     */
      function createStepElement() {
        let new_step = document.createElement("div");
        let label = document.createElement('label');
        label.htmlFor = "step-v-"+("0"+step_number).slice(-2);
        label.textContent = " - ";
        let text = document.createElement('input');
        text.type = "text";
        text.name = "step-v-"+("0"+step_number).slice(-2);
        text.required = true;
        step_number = step_number+1;
        return [new_step, label, text]
    }

     /**
     * Create the first textarea to fullfil with instruction to do the recipe
     */
      function addFirstStepElement() {
        //let new_step = undefined;
        //let label = undefined;
        //let text = undefined;
        [new_step, label, text] = createStepElement();
        new_step.appendChild(label);
        new_step.appendChild(text);
        step_list.appendChild(new_step);
    };


    /**
     * Create the other textarea to fullfil with instruction to do the recipe 
     * with an additional button to delete them
     */
    function addNewStepElement() {
        [new_step, label, text] = createStepElement();
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

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * tools to do the recipe
 */
 function toolsHandler() {
    var tool_number = 1;
    const main = document.querySelector(".tool-list");
    const tool_list = main.querySelector('div');
    const tools = getToolsFromStorage();
    addFirstToolsElement(tools);

    const add_tool_button = document.createElement('button');
    add_tool_button.classList.add("new-tool-btn");
    add_tool_button.textContent = "Add New Tool";
    main.appendChild(add_tool_button);
    
    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Custom Tool";
    main.appendChild(button);

    add_tool_button.addEventListener('click', () => {
        addNewToolElement(tools);
    })

    button.addEventListener('click', () => {
        createNewTool(tools);
    })


    /**
     * Reads 'tools' from localStorage and returns an array of
     * all of the tools found (parsed, not in string form). If
     * nothing is found in localStorage for 'tools', an array with default
     * value is returned.
     * @return {Array<Object>} An array of tools
     */
     function getToolsFromStorage() {
        const tools = JSON.parse(window.localStorage.getItem('tools'));
        if (!tools) return [
            'non-stick frying pan', 'saucepan', 'stock pot', 'sheet pans', 
            'glass baking dish', 'knives', 'measuring spoons', 
            'measuring cups', 'wooden spoon', 'fish turner', 'peeler', 
            'whisk', 'tongs', 'cutting board', 'colander', 'prep bowls', 
            'can opener', 'microplane zester', 'stick blender', 'salad spinner'];
        return tools 
    }

    /**
     * Takes in an array of tools, converts it to a string, and then
     * saves that string to 'tools' in localStorage
     * @param {Array<Object>} tools An array of tools
     */
     function saveToolsToStorage(tools) {
        localStorage.setItem('tools', JSON.stringify(tools));
    }

    /**
     * Takes in an array of tools, create the html element for tools
     * @param {Array<Object>} tools An array of tools
     * @return {Tuple<Object} of html element
     */
    function createToolElement(tools) {
        const new_div = document.createElement('div');
        const select = document.createElement("select");
        select.required = true;
        select.name = 'tool-v-'+ ("0"+tool_number).slice(-2);
        select.classList.add("choosen-tool");
        const option = document.createElement("option");
        select.appendChild(option);

        for (let i=0; i<tools.length; i++){
            const option = document.createElement("option");
            option.textContent = tools[i];
            select.appendChild(option);
        }

        const number_select = document.createElement("select");
        number_select.name = 'tool-nb-'+("0"+tool_number).slice(-2);
        number_select.classList.add("choosen-nb-tool");

        for (let i=1; i<5; i++){
            const option = document.createElement("option");
            option.textContent = i;
            number_select.appendChild(option);
        }
        tool_number = tool_number+1;
        return [new_div, number_select, select]
    }

    /**
     * Create the first textarea to fullfil with instruction to do the recipe
     * @param {Array<Object>} tools An array of tools
     */
    function addFirstToolsElement(tools) {
        [new_div, number_select, select] = createToolElement(tools);
        new_div.appendChild(number_select);
        new_div.appendChild(select);
        tool_list.appendChild(new_div)
    };

    /**
     * Create the other textarea to fullfil with instruction to do the recipe 
     * with an additional button to delete them
     * @param {Array<Object>} tools An array of tools
     */
    function createNewTool(tools) {
        let new_textarea = document.createElement('input');
        new_textarea.type = 'textarea';
        new_textarea.classList.add('new-tool-value');
        let new_button = document.createElement('button');
        new_button.classList.add('new-tool');
        new_button.textContent = "Add New Tool";
        let new_div = document.createElement('div');

        new_div.appendChild(new_textarea);
        new_div.appendChild(new_button);
        tool_list.appendChild(new_div);
        main.removeChild(button);

        new_button.addEventListener('click', () => {
            let new_tool = tool_list.querySelector(".new-tool-value").value
            if (!(new_tool in tools)){
                if (new_tool) {
                    const option = document.createElement("option");
                    option.textContent = new_tool;
                    let select = main.querySelector('select');
                    select.appendChild(option);

                    tools.push(new_tool);
                    saveToolsToStorage(tools);

                    tool_list.removeChild(new_div);
                    main.appendChild(button);
                }
            }
        })
    }

    /**
     * Create the other select option with tools to do the recipe 
     * with an additional button to delete them
     * @param {Array<Object>} tools An array of tools
     */
    function addNewToolElement(tools) {

        const [new_div, number_select, select] = createToolElement(tools);
        const cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        new_div.appendChild(number_select);
        new_div.appendChild(select);
        new_div.appendChild(cancel);
        tool_list.appendChild(new_div);

        cancel.addEventListener('click', () => {
            tool_list.removeChild(new_div);
        })
    };
}

/**
 * Adds the necesarry event handlers and function to manage the list of 
 * ingredients to do the recipe
 */
 function ingredientsHandler() {
    var ingredient_number = 1;
    const main = document.querySelector(".ingredient-list");
    const ingredient_list = main.querySelector('div');
    const ingredients = getIngredientsFromStorage();
    const quantities = getQuantitiesFromStorage();
    const units = getUnitsFromStorage();
    addFirstIngredientsElement(ingredients, quantities, units);

    const add_ingredient_button = document.createElement('button');
    add_ingredient_button.classList.add("new-ingredient-btn");
    add_ingredient_button.textContent = "Add New Ingredient";
    main.appendChild(add_ingredient_button);

    add_ingredient_button.addEventListener('click', () => {
        addNewIngredientElement(ingredients, quantities, units);
    })


    //
    const button = document.createElement('button');
    button.classList.add("new-custom-btn");
    button.textContent = "Custom Ingredient";
    main.appendChild(button);

    button.addEventListener('click', () => {
        createNewIngredients(ingredients);
    })


    /**
     * Reads 'ingredients' from localStorage and returns an array of
     * all of the ingredients found (parsed, not in string form). If
     * nothing is found in localStorage for 'ingredients', an array with default
     * value is returned.
     * @return {Array<Object>} An array of ingredients
     */
     function getIngredientsFromStorage() {
        const ingredients = JSON.parse(window.localStorage.getItem('ingredients'));
        if (!ingredients) return [
            'chicken', 'beef', 'red peeper', 'onion', 'garlic', 'cilantro',
            'tortilla'];
        return ingredients 
    }

    /**
     * Reads 'quantities' from localStorage and returns an array of
     * all of the quantities found (parsed, not in string form). If
     * nothing is found in localStorage for 'quantities', an array with default
     * value is returned.
     * @return {Array<Object>} An array of quantities
     */
     function getQuantitiesFromStorage() {
        const quantities = JSON.parse(window.localStorage.getItem('quantities'));
        if (!quantities) return [
            '0.5', '1', '2', '3', '4', '5', '100', '200', '350'];
        return quantities 
    }

    /**
     * Reads 'units' from localStorage and returns an array of
     * all of the units found (parsed, not in string form). If
     * nothing is found in localStorage for 'units', an array with default
     * value is returned.
     * @return {Array<Object>} An array of units
     */
     function getUnitsFromStorage() {
        const units = JSON.parse(window.localStorage.getItem('units'));
        if (!units) return ['oz', 'mL', 'cL', 'L', 'g', 'kg', 'lb', 'ea'];
        return units 
    } 
    
    /**
     * Takes in an array of ingredients, converts it to a string, and then
     * saves that string to 'ingredients' in localStorage
     * @param {Array<Object>} tools An array of ingredients
     */
     function saveIngredientsToStorage(ingredients) {
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }

    /**
     * Takes in an array of quantities, converts it to a string, and then
     * saves that string to 'quantities' in localStorage
     * @param {Array<Object>} quantities An array of quantities
     */
     function saveQuantitiesToStorage(quantities) {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }

    /**
     * Takes in an array of units, converts it to a string, and then
     * saves that string to 'units' in localStorage
     * @param {Array<Object>} tools An array of units
     */
     function saveUnitsToStorage(units) {
        localStorage.setItem('units', JSON.stringify(units));
    }

    /**
     * Takes in an array of ingredients, create the html element for ingredients
     * @param {Array<Object>} ingredients An array of ingredients
     * @return {Tuple<Object} of html element
     */
    function createIngredientElement(ingredients, quantities, units) {
        const new_div = document.createElement('div');
        const select = document.createElement("select");
        select.required = true;
        select.name = 'ingredients-v-'+("0"+ingredient_number).slice(-2);
        select.classList.add("choosen-ingredient");
        const option = document.createElement("option");
        select.appendChild(option);

        for (let i=0; i<ingredients.length; i++){
            const option = document.createElement("option");
            option.textContent = ingredients[i];
            select.appendChild(option);
        }

        const quantity_select = document.createElement("select");
        quantity_select.name = 'ingredients-q-'+("0"+ingredient_number).slice(-2);
        quantity_select.classList.add("choosen-q-tool");

        for (let i=0; i<quantities.length; i++){
            const option = document.createElement("option");
            option.textContent = quantities[i];
            quantity_select.appendChild(option);
        }

        const unit_select = document.createElement("select");
        unit_select.name = 'ingredients-u-'+("0"+ingredient_number).slice(-2);
        unit_select.classList.add("choosen-u-tool");

        for (let i=0; i<units.length; i++){
            const option = document.createElement("option");
            option.textContent = units[i];
            unit_select.appendChild(option);
        }
        ingredient_number = ingredient_number+1;
        return [new_div, quantity_select, unit_select, select]
    }

    /**
     * Create the selevt option to add a new ingredient to the recipe
     * @param {Array<Object>} ingredients An array of ingredients
     * @param {Array<Object>} quantities An array of quantities
     * @param {Array<Object>} units An array of units
     */
    function addFirstIngredientsElement(ingredients, quantities, units) {
        [
            new_div, 
            quantity_select,
            unit_select,
            select] = createIngredientElement(ingredients, quantities, units);
        new_div.appendChild(quantity_select)
        new_div.appendChild(unit_select);
        new_div.appendChild(select);
        ingredient_list.appendChild(new_div)
    };

    /**
     * Create the other textarea to fullfil with instruction to do the recipe 
     * with an additional button to delete them
     * @param {Array<Object>} tools An array of tools
     */
    function createNewTool(tools) {
        let new_textarea = document.createElement('input');
        new_textarea.type = 'textarea';
        new_textarea.classList.add('new-tool-value');
        let new_button = document.createElement('button');
        new_button.classList.add('new-tool');
        new_button.textContent = "Add New Tool";
        let new_div = document.createElement('div');

        new_div.appendChild(new_textarea);
        new_div.appendChild(new_button);
        tool_list.appendChild(new_div);
        main.removeChild(button);

        new_button.addEventListener('click', () => {
            let new_tool = tool_list.querySelector(".new-tool-value").value
            if (!(new_tool in tools)){
                if (new_tool) {
                    const option = document.createElement("option");
                    option.textContent = new_tool;
                    let select = main.querySelector('select');
                    select.appendChild(option);

                    tools.push(new_tool);
                    saveToolsToStorage(tools);

                    tool_list.removeChild(new_div);
                    main.appendChild(button);
                }
            }
        })
    }

    /**
     * Create the other select option with ingredients to do the recipe 
     * with an additional button to delete them
     * @param {Array<Object>} ingredients An array of ingredients
     * @param {Array<Object>} quantities An array of quantities
     * @param {Array<Object>} units An array of units
     */
    function addNewIngredientElement(ingredients, quantities, units) {
        [
            new_div, 
            quantity_select,
            unit_select,
            select] = createIngredientElement(ingredients, quantities, units);
        const cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        
        new_div.appendChild(quantity_select)
        new_div.appendChild(unit_select);
        new_div.appendChild(select);
        new_div.appendChild(cancel);
        ingredient_list.appendChild(new_div);

        cancel.addEventListener('click', () => {
            ingredient_list.removeChild(new_div);
        })
    };
}
    


    

