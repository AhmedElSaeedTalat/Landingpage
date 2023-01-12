/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
	const navBar = document.querySelector("#navbar__list");

	const fragment = document.createDocumentFragment();

	const sections = document.querySelectorAll("section");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


// set the Menu item class to active to be highlighted 

	const setActiveMenu = (element) => {

		const links = document.querySelectorAll("#navbar__list a");
				
		for(const link of links){

			if(element !== link.textContent){
				
				link.classList.remove("activeItem");

					
				} else {

					link.classList.add("activeItem");

				}
			};
	}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav



	const buildMenu= ()=>{

		for(const section of sections) {

			const listElement = document.createElement("li");
		
			listElement.innerHTML += `<a class= 'menu__link'>${section.getAttribute('data-nav')}</a>`;
		
			fragment.appendChild(listElement);
	
		}
			navBar.appendChild(fragment);
	}



// Add class 'active' to section when near top of viewport

	const setActive = () => {

		for(const section of sections) {

			const BoundingClientRect = section.getBoundingClientRect();
			
			const top = BoundingClientRect.top;

			const bottom = BoundingClientRect.bottom;

			const sectionHeight = (bottom-top) -10 ;

			if(sectionHeight >= top && sectionHeight <= bottom){
				
				section.classList.add("your-active-class");


				// here invoked the function to highlight menuItems:

				const sectionsData = section.getAttribute("data-nav");
				
				setActiveMenu(sectionsData);


			} else {
			
				section.classList.remove("your-active-class")
			
			}
		}
	}


// Scroll to anchor ID using scrollTO event


	const scroll = (event) => {
				
		event.preventDefault();

		if(event.target.nodeName === 'A'){

				const sectionName = event.target.textContent;	

				const targetSection =  document.querySelector(`[data-nav = "${sectionName}"]`);
		
				targetSection.scrollIntoView({behavior:"smooth"});

		}
		

	}





/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

	document.addEventListener('DOMContentLoaded',buildMenu);

// Scroll to section on link click

	navBar.addEventListener('click',scroll);

// Set sections as active

	document.addEventListener('scroll',setActive);



