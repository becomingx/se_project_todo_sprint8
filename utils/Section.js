export default class Section {
    //The items property should be an array of data, which you must add to the page when it loads.
    //The renderer property should be a function that creates and adds a single item to the page.
    //The containerSelector property should be a CSS class selector for the element where you’ll add the to-do elements.

    constructor({ items= [], renderer = () => {}, containerSelector }) {
        this._items = items; 
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);    }


        renderItems() {
        //The Section class shouldn't need to know about renderElements 
        // it should rely on the renderer function that's passed to it

        //This method should be called once on page load
        //renders all elements on page
        //iterate through items array, call renderer() function on each item in array
        // Call the renderer function for each item
            this._items.forEach(item => {
                this._renderer(item); 
            });
        }
    
        addItem(element) {
        //This method should be called when adding an individual card to the DOM
        //takes a DOM element and adds it to the container
            if (element instanceof HTMLElement) {
                this._containerSelector.append(element); // Append the element to the container
            } else {
                console.error('Invalid element provided to addItem method');
            }
        }


};