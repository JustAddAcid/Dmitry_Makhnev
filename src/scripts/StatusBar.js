import gen from "./utils/DOMGenerator";
import TodoList from "./TodoList";

export default class StatusBar {
    /**
     * Creates an instance of StatusBar.
     * @param {Control} parentNode
     * @param {TodoList} todoList
     *
     * @memberOf StatusBar
     */
    constructor(parentNode, todoList){
        this.todoList = todoList;
        this.DOMNode = this.render(parentNode);
        // filters
        this.filterStatuses = Object.freeze({
            all : 1,
            active: 2,
            compleated: 3
        });
        this.filterStatus = this.filterStatuses.all;
        // counter
        this.todoList.on('itemchanged', () => this.leftCount = this.todoList.getUncheckedCount());
    }

    // Two-way binding
    get leftCount(){
        if (this._itemsLeftCounter){
            return this._itemsLeftCounter.textContent;
        } else {
            return '0';
        }
    }
    set leftCount(value){
        if (this._itemsLeftCounter){
            this._itemsLeftCounter.textContent = value;
        }
    }

    set filterStatus(newStatus){ // очень некрасиво, но я не придумал, как сделать красивее
        this._filterActiveBtn.classList.remove('__selected');
        this._filterCompleatedBtn.classList.remove('__selected');
        this._filterAllBtn.classList.remove('__selected');
        if (newStatus == this.filterStatuses.all){
            this._filterAllBtn.classList.add('__selected');
            this.todoList.items.array.forEach(item => {
                item.DOMNode.style.display = 'block';
            });
        } else if (newStatus == this.filterStatuses.active){
            this._filterActiveBtn.classList.add('__selected');
            this.todoList.items.array.forEach(item => {
                if (item.isChecked){
                    item.DOMNode.style.display = 'none';
                } else {
                    item.DOMNode.style.display = 'block';
                }
            });
        } else {
            this._filterCompleatedBtn.classList.add('__selected');
            this.todoList.items.array.forEach(item => {
                if (!item.isChecked){
                    item.DOMNode.style.display = 'none';
                } else {
                    item.DOMNode.style.display = 'block';
                }
            });
        }
    }

    /**
     *
     *
     * @param {Control} parentNode
     * @returns {Control}
     *
     * @memberOf StatusBar
     */
    render(parentNode){
        // очень-очень некрасиво. Нужно было, наверное сделать свой или подключить НОРМАЛЬНЫЙ шаблонизатор
        this._itemsLeftCounter = document.createTextNode(this.todoList.getUncheckedCount());
        this._filterAllBtn = gen('button', {className: 'filters-item all-btn __selected', textContent:'All', onclick: () => this.filterStatus = this.filterStatuses.all });
        this._filterActiveBtn = gen('button', {className: 'filters-item active-btn', textContent: 'Active', onclick: () => this.filterStatus = this.filterStatuses.active});
        this._filterCompleatedBtn = gen('button', {className: 'filters-item completed-btn', textContent: 'Completed', onclick: () => this.filterStatus = this.filterStatuses.compleated});

        let itemsLeft = document.createTextNode(' items left');

        return parentNode.appendChild(
            gen('div', {className : 'todos-toolbar'}, [
                gen('div', {className: 'todos-toolbar_unready-counter'}, [
                    this._itemsLeftCounter,
                    itemsLeft
                ]),
                gen('button', {className: 'todos-toolbar_clear-completed', textContent: 'Clear completed', onclick: ()=> this.todoList.clearCompleated()}),
                gen('div', {className: 'filters todos-toolbar_filters'}, [
                    this._filterAllBtn,
                    this._filterActiveBtn,
                    this._filterCompleatedBtn
                ])
            ])
        );
    }
};
