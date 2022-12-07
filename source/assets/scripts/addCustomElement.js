// addCustomElement.js
import { save_ToStorage } from "./localStorage.js";
import { create_Element } from "./RecipeEditorElement.js";


/**
 * Template function to create a new element when users want to create custom element for their 
 * recipe such as ingredients, tools, meal type, and so on. 
 * 
 * @param target        - the target element to create custom for
 * @param targetDiv     - the div that this new custom element belongs
 * @param targetUpDiv   - the wrapper div for targetDiv
 * @param targetButton  - the custom button  
 * @param values        - the object array associated with this custom element
 * @param text          - the text appears on the custom button
 */
function addCustom_Element(
    target, targetDiv, targetUpDiv, targetButton, values=[], text="Add New") {

    // Create a blank text area for user to input the info 
    let new_textarea = document.createElement('input');
    new_textarea.type = 'textarea';
    new_textarea.classList.add('new-'+target+'-value');

    // Create a button to add this new info 
    let new_button = document.createElement('button');
    new_button.classList.add("edit-btn");
    new_button.textContent = text;

    // Create a new div for this new custom element
    let new_div = document.createElement('div');
    new_div.appendChild(new_textarea);
    new_div.appendChild(new_button);
    targetDiv.appendChild(new_div);
    // targetUpDiv.removeChild(targetButton);
    targetButton.hidden = true;

    // Add event for the "add new custom" button 
    new_button.addEventListener('click', () => {
        let new_target = targetDiv.querySelector('.new-'+target+'-value').value
        new_target = new_target.toLowerCase();
        if (!values.includes(new_target)) {
            if (new_target) {
                if (!(target=="mealTypes")) {
                    const select = targetDiv.querySelector(".choosen-"+target);
                    const option = document.createElement("option");
                    option.textContent = new_target;
                    select.appendChild(option);

                } else {
                    create_Element(target, targetDiv, new_target);
                }
                values.push(new_target);
                save_ToStorage(target, values);
            }
        }
        targetDiv.removeChild(new_div);
        // targetUpDiv.appendChild(targetButton);
        targetButton.hidden = false;
    });
}
export{ addCustom_Element };
