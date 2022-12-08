// localStorage.js

/**
 * Takes a String target and reads target from localStorage and returns an
 * array of all of this object found (parsed, not in string form). If
 * nothing is found in localStorage for target, nullObject is returned, the
 * default value is a empty array.
 * 
 * @param {String} target A value to look for in localStorage
 * @param {Object} nullObject An object to use if nothing in localStorage
 * @returns {Object} An object found in localStorage
 */
function get_FromStorage(target, nullObject=null) {
    var response = JSON.parse(window.localStorage.getItem(target));
    if (!response) return nullObject;
    return response 
}
export{ get_FromStorage };

/**
 * Takes an object and an array, adds the new object to the array if not null
 * or create an array with one element value. Retuns the new array.
 * 
 * @param {Object} value An Object
 * @param {Array<Object>} values An array
 * @returns {Array<Object>} An array 
 */
function add_ToList(value, values) {
    if (values == null) { values = [] }
    values.push(value);
    return values
}
export{ add_ToList };

/**
 * Takes in string and an object, converts the object to a string, and then
 * saves that string to target in localStorage.
 * 
 * @param {String} target A value to look for in localStorage
 * @param {Object} values An object to store in localStorage
 */
function save_ToStorage(target, values) {
    localStorage.setItem(target, JSON.stringify(values));
}
export{ save_ToStorage };
