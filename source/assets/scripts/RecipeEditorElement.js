// RecipeEditorElemnt.js


/**
 * 
 */
function create_Element(target, targetDiv, value) {
    if (target=='mealTypes') {
        createMealTypeElement(targetDiv, value)
    }
    if (target=='steps') {
        createStepElement(targetDiv, value);
    }

}
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
function createStepElement(div, step_number) {
    let new_step = document.createElement("div");
    let label = document.createElement('label');
    label.htmlFor = "step-v-"+("0"+step_number).slice(-2);
    label.textContent = " - ";
    let text = document.createElement('input');
    text.type = "text";
    text.name = "step-v-"+("0"+step_number).slice(-2);
    text.required = true;

    new_step.appendChild(label);
    new_step.appendChild(text);

    if (!(step_number==1)){
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
