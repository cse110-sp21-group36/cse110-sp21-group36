/** 
 * Enable the toggle function in the nav bar for mobile screens and 
 * display date in footer. 
 */


/* Function to see if a class element exists or not. If not, throw error. */
const getElement = (selector) => {
	const element = document.querySelector(selector)
  
	if (element) return element
	throw Error(
	  `Please double check your class names, there is no ${selector} class`
	)
  }
  
  /* Function to toggle the nav bar for mobile */
  const links = getElement('.nav-links')
  const navBtnDOM = getElement('.nav-btn')
  
  navBtnDOM.addEventListener('click', () => {
	links.classList.toggle('show-links')
  })