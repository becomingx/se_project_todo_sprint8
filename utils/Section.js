export default class Section {
    constructor({ items= [], renderer = () => {}, containerSelector }) {
        this._items = items; 
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);    
    };

        addItem(element) {
        //This method should be called when adding an individual card to the DOM
        //takes a DOM element and adds it to the container
            if (element instanceof HTMLElement) {
                const container = this._containerElement;
                container.append(element);
            } else {
                console.error('Invalid element provided to addItem method');
            };
        };

        renderItems() {
        //This method should be called once on page load
        //renders all elements on page
        //item = raw data from _items array
            this._items.forEach(item => {
                const renderedItem = this._renderer(item);
                this.addItem(renderedItem);
            });
        };
    

};