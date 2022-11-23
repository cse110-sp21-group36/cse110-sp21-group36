// addCustomElement.js
import { save_ToStorage } from "./localStorage.js";
import { create_Element } from "./RecipeEditorElement.js";


/**
 * 
 */
function addCustom_Element(
    target, targetDiv, targetUpDiv, targetButton, values=[], text="Add New") {

    let new_textarea = document.createElement('input');
    new_textarea.type = 'textarea';
    new_textarea.classList.add('new-'+target+'-value');
    let new_button = document.createElement('button');
    new_button.classList.add('new-'+target);
    new_button.textContent = text;
    let new_div = document.createElement('div');

    new_div.appendChild(new_textarea);
    new_div.appendChild(new_button);
    targetDiv.appendChild(new_div);
    targetUpDiv.removeChild(targetButton);

    new_button.addEventListener('click', () => {
        let new_target = targetDiv.querySelector('.new-'+target+'-value').value
        new_target = new_target.toLowerCase();
        if (!values.includes(new_target)) {
            if (new_target) {
                create_Element(target, targetDiv, new_target);
                targetDiv.removeChild(new_div);
                targetUpDiv.appendChild(targetButton);

                values.push(new_target);
                save_ToStorage(target, values);
            }
        }
    });
}
export{ addCustom_Element };
