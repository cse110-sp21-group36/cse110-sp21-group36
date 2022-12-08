/**
 * Function to see if a class element exists or not. If not, throw error. 
 * 
 * @param selector - class object to select
 */
const getElement = (selector) => {
	const element = document.querySelector(selector)
	if (element) return element
	throw Error(
	  `Please double check your class names, there is no ${selector} class`
	)
  }
  
/** 
 * Enable the toggle function in the nav bar for mobile screens when button is 
 * clicked on. 
 */
const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')
navBtnDOM.addEventListener('click', () => {
	links.classList.toggle('show-links')
})