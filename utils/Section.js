export default class Section {
    //The items property should be an array of data, which you must add to the page when it loads.
    //The renderer property should be a function that creates and adds a single item to the page.
    //The containerSelector property should be a CSS class selector for the element where you’ll add the to-do elements.

    constructor({ items= [], renderer = () => {}, containerSelector }) {
        this._items = items; 
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);    
    };


        renderItems() {
        //The Section class shouldn't need to know about renderElements 
        // it should rely on the renderer function that's passed to it

        //This method should be called once on page load
        //renders all elements on page
        //item = raw data from _items array
   
            this._items.forEach(item => {
                const renderedItem = this._renderer(item);
                return this.addItem(renderedItem);
            });
        };
    
        addItem(element) {
        //This method should be called when adding an individual card to the DOM
        //takes a DOM element and adds it to the container
            if (element instanceof HTMLElement) {
                const container = this._containerElement;
                container.append(element);
            } else {
                console.error('Invalid element provided to addItem method');
            }
        };
};