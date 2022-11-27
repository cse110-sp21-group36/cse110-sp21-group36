// RecipeEditorElemnt.js


/**
 * 
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
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = meal;
    checkbox.name = "meal-type-"+meal;
    checkbox.value = "Yes";
    let label = document.createElement('label')
    label.htmlFor = meal;
    label.textContent = meal[0].toUpperCase() + meal.substring(1);

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
    let new_step = document.createElement("div");
    let label = document.createElement('label');
    label.htmlFor = "step-v-"+("0"+number).slice(-2);
    label.textContent = " - ";
    let text = document.createElement('input');
    text.type = "text";
    text.name = "step-v-"+("0"+number).slice(-2);
    text.required = true;

    new_step.appendChild(label);
    new_step.appendChild(text);

    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        new_step.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_step);
        })
    }
       
    div.appendChild(new_step);
}

/**
 * Takes in an array of tools, create the html element for tools
 * @param {Array<Object>} tools An array of tools
 * @return {Tuple<Object} of html element
 */
function createToolElement(div, tools, number) {
    const new_tool = document.createElement('div');
    const select = document.createElement("select");
    select.required = true;
    select.name = 'tool-v-'+ ("0"+number).slice(-2);
    select.classList.add("choosen-tools");
    const option = document.createElement("option");
    select.appendChild(option);

    for (let i=0; i<tools.length; i++){
        const option = document.createElement("option");
        option.textContent = tools[i];
        select.appendChild(option);
    }

    const number_select = document.createElement("select");
    number_select.name = 'tool-nb-'+("0"+number).slice(-2);
    number_select.classList.add("choosen-toolNumber");

    for (let i=1; i<5; i++){
        const option = document.createElement("option");
        option.textContent = i;
        number_select.appendChild(option);
    }

    new_tool.appendChild(number_select);
    new_tool.appendChild(select);
    
    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        new_tool.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_tool);
        })
    }

    div.appendChild(new_tool)
}


/**
 * Takes in an array of ingredients, create the html element for ingredients
 * @param {Array<Object>} ingredients An array of ingredients
 * @return {Tuple<Object} of html element
 */
function createIngredientElement(div, [quantities, units, ingredients], number) {
    const new_ingredient = document.createElement('div');
    const select = document.createElement("select");
    select.required = true;
    select.name = 'ingredients-v-'+("0"+number).slice(-2);
    select.classList.add("choosen-ingredients");
    const option = document.createElement("option");
    select.appendChild(option);

    for (let i=0; i<ingredients.length; i++){
        const option = document.createElement("option");
        option.textContent = ingredients[i];
        select.appendChild(option);
    }

    const quantity_select = document.createElement("select");
    quantity_select.name = 'ingredients-q-'+("0"+number).slice(-2);
    quantity_select.classList.add("choosen-ingredientQuantity");

    for (let i=0; i<quantities.length; i++){
        const option = document.createElement("option");
        option.textContent = quantities[i];
        quantity_select.appendChild(option);
    }

    const unit_select = document.createElement("select");
    unit_select.name = 'ingredients-u-'+("0"+number).slice(-2);
    unit_select.classList.add("choosen-ingredientUnits");

    for (let i=0; i<units.length; i++){
        const option = document.createElement("option");
        option.textContent = units[i];
        unit_select.appendChild(option);
    }

    new_ingredient.appendChild(quantity_select)
    new_ingredient.appendChild(unit_select);
    new_ingredient.appendChild(select);
    
    if (!(number==1)){
        let cancel = document.createElement('button');
        cancel.classList.add('delete-step');
        cancel.textContent = "Delete";
        new_ingredient.appendChild(cancel);
        cancel.addEventListener('click', () => {
            div.removeChild(new_ingredient);
        })
    }

    div.appendChild(new_ingredient);
}
