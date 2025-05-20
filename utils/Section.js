class Section {
    //The items property should be an array of data, which you must add to the page when it loads.
    //The renderer property should be a function that creates and adds a single item to the page.
    //The containerSelector property should be a CSS class selector for the element where you’ll add the to-do elements.

    constructor({ items: array, renderer: () => {}, containerSelector: todoElement.querySelector() }) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        //This method should be called once on page load
        //renders all elements on page
        //iterate through items array, call renderer() function on each item in array
    }

    addItem() {
        //This method should be called when adding an individual card to the DOM
        //takes a DOM element and adds it to the container

    }


}