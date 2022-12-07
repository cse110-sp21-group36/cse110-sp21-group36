// RecipeEditorElemnt.js

/**
 * Function to idnetify which target needing create a new element among meal type, step, tool and 
 * ingredient, and call associated functions. 
 */
function create_Element(target, targetDiv, values, number) {
    if (target=='mealTypes') {
        createMealTypeElement(targetDiv, values);
    }
    if (target=='steps') {
        createStepElement(targetDiv, number);
    }
    if (target=='tools') {
        createToolElement(targetDiv, values, number);
    }
    if (target=='ingredients') {
        createIngredientElement(targetDiv, values, number);
    }
};
export { create_Element };




/**
 * Takes a meal type and an html div, create the checkbox + label element with 
 * the meal type on the html file into div selected.
 * 
 * @param {Object} div the html div where you to add the element
 * @param {String<Object>} meal A string of one meal type
 */
function createMealTypeElement(div, meal) {
    meal = meal.toLowerCase();
    
    // Create new checkbox input element 
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = meal;
    checkbox.name = "meal-type-"+meal;
    checkbox.value = "Yes";

    // Create new meal label 
    let label = document.createElement('label')
    label.htmlFor = meal;
    label.textContent = meal[0].toUpperCase() + meal.substring(1);

    // Add new input and label to the current meal type section 
    div.appendChild(checkbox);
    div.appendChild(label);
}

/**
 * Creates the html element for step
 * @param {Object} div the html div where you to add the element
 * 
 * @return {Array<Object>} of html element 
 */
function createStepElement(div, number) {
    // The new step element 
    let new_step = document.createElement("div");

    // Create new step label 
    let label = document.createElement('label');
    label.htmlFor = "step-v-"+("0"+number).slice(-2);
    label.textContent = " - ";

    // // Create new text input element 
    let text = document.createElement('input');
    text.type = "text";
    text.name = "step-v-"+("0"+number).slice(-2);
    text.required = true;

    // Add new input and label to the current step section 
    new_step.appendChild(label);
    new_step.appendChild(text);

    // Create a cancel changes button 
    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('btn');
        cancel.textContent = "Delete";
        new_step.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_step);
        })
    }
    
    // Attach the new step element to the step section to the form
    div.appendChild(new_step);
}

/**
 * Takes in an array of tools, create the html element for tools
 * @param {Array<Object>} tools An array of tools
 * @return {Tuple<Object} of html element
 */
function createToolElement(div, tools, number) {
    // The new tool element 
    const new_tool = document.createElement('div');

    // Create new select input for this new tool element
    const select = document.createElement("select");
    select.required = true;
    select.name = 'tool-v-'+ ("0"+number).slice(-2);
    select.classList.add("choosen-tools");
    // Create new option for new select input 
    const option = document.createElement("option");
    select.appendChild(option);

    // Iterate the tools array to create accordingly new tool name option 
    for (let i=0; i<tools.length; i++){
        const option = document.createElement("option");
        option.textContent = tools[i];
        select.appendChild(option);
    }

    // The number of a choosen tool 
    const number_select = document.createElement("select");
    number_select.name = 'tool-nb-'+("0"+number).slice(-2);
    number_select.classList.add("choosen-toolNumber");

    // Create the number of tool option iteratively 
    for (let i=1; i<5; i++){
        const option = document.createElement("option");
        option.textContent = i;
        number_select.appendChild(option);
    }

    // Add the tool's name and quantity to the current tool section 
    new_tool.appendChild(number_select);
    new_tool.appendChild(select);
    
    // Create a cancel changes button
    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('btn');
        cancel.textContent = "Delete";
        new_tool.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_tool);
        })
    }

    // Attach the new tool element to the tool section to the form
    div.appendChild(new_tool)
}


/**
 * Takes in an array of ingredients, create the html element for ingredients
 * @param {Array<Object>} ingredients An array of ingredients
 * @return {Tuple<Object} of html element
 */
function createIngredientElement(div, [quantities, units, ingredients], number) {
    // The new ingredient element 
    const new_ingredient = document.createElement('div');

    // Create new select input for this new ingredient name element
    const select = document.createElement("select");
    select.required = true;
    select.name = 'ingredients-v-'+("0"+number).slice(-2);
    select.classList.add("choosen-ingredients");
    // Create new option for new select input 
    const option = document.createElement("option");
    select.appendChild(option);

    // Iterate the ingredients array to create accordingly new ingredient name option 
    for (let i=0; i<ingredients.length; i++){
        const option = document.createElement("option");
        option.textContent = ingredients[i];
        select.appendChild(option);
    }

    // Create new select input for this new ingredient quantity element 
    const quantity_select = document.createElement("select");
    quantity_select.name = 'ingredients-q-'+("0"+number).slice(-2);
    quantity_select.classList.add("choosen-ingredientQuantity");

    // Iterate the quantity array to create accordingly new ingredient quantity option 
    for (let i=0; i<quantities.length; i++){
        const option = document.createElement("option");
        option.textContent = quantities[i];
        quantity_select.appendChild(option);
    }

    // Create new select input for this new ingredient unit element 
    const unit_select = document.createElement("select");
    unit_select.name = 'ingredients-u-'+("0"+number).slice(-2);
    unit_select.classList.add("choosen-ingredientUnits");

    // Iterate the unit array to create accordingly new ingredient unit option 
    for (let i=0; i<units.length; i++){
        const option = document.createElement("option");
        option.textContent = units[i];
        unit_select.appendChild(option);
    }

    // Add the ingredient's name, quantity and unit to the current ingredient section to the form
    new_ingredient.appendChild(quantity_select)
    new_ingredient.appendChild(unit_select);
    new_ingredient.appendChild(select);
    

    // Create a cancel changes button
    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('btn');
        cancel.textContent = "Delete";
        new_ingredient.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_ingredient);
        })
    }

    // Attach the new ingredient element to the ingredient section in form
    div.appendChild(new_ingredient);
}
