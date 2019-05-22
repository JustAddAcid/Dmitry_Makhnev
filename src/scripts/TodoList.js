import ArrayEventable from "./utils/ArrayEventable";
import TodoListItem from "./TodoListItem";
import Eventable from "./utils/Eventable";
import Model from "./Model";

export default class TodoList extends Eventable {
    /**
     * Creates an instance of TodoList.
     *
     * @memberOf TodoList
     */
    constructor(){
        super();
        this.DOMNode = this.connectToDOM();
        this.items = new ArrayEventable();
        this.model = new Model;

        const todos = document.querySelectorAll('.todos-list_item');
        for (let todo of todos){
            let id = todo.dataset.id;
            let text = todo.querySelector('textarea').value;
            let isChecked = todo.querySelector('input').checked;
            this.createItemWithoutRender(id, text, isChecked, todo);
        }
    }

    connectToDOM(){
        return document.querySelector('.todos-list');
    }

    /**
     * Returns count of contains todo elements
     *
     * @returns {Number}
     *
     * @memberOf TodoList
     */
    getItemsCount(){
        return this.items.length();
    }

    /**
     * Add new element to list
     *
     * @param {String} text
     * @param {Boolean} isChecked
     *
     * @memberOf TodoList
     */
    addItem(text, isChecked){
        this.model.create(text).then(data => {
            const item = new TodoListItem(this.DOMNode, text, data.id, isChecked);
            item.render();
            item.on('remove', ()=> this.removeItem(item));
            item.on('change', ()=> this.trigger('itemchanged'));
            this.items.push(item);
            this.trigger('itemchanged');
            if (this.getItemsCount() == 1){
                this.trigger('notEmpty');
            }
            return item;
        });
    }

    /**
     * Creates TodoListItem object without generation new DOM elements
     * Connect to existing element, which passed in param "itemNode"
     *
     * @param  {Number} id
     * @param  {String} text
     * @param  {Boolean} isChecked
     * @return {TodoListItem}
     * @memberof TodoList
     */
    createItemWithoutRender(id, text, isChecked, itemNode){
        const item = new TodoListItem(this.DOMNode, text, id, isChecked, itemNode);
        item.connectToDOM();
        item.on('remove', ()=> this.removeItem(item));
        item.on('change', ()=> this.trigger('itemchanged'));
        this.items.push(item);
        this.trigger('itemchanged');
        if (this.getItemsCount() == 1){
            this.trigger('notEmpty');
        }
        return item;
    }

    /**
     * Removing element (item) from TodoList
     *
     * @param {TodoListItem} item
     *
     * @memberOf TodoList
     */
    removeItem(item){
        this.items.remove(item);
        this.DOMNode.removeChild(item.DOMNode);
        this.trigger('itemchanged');
        if (this.getItemsCount() === 0){
            this.trigger('empty');
        }
        this.model.delete(item.id);
    }
    /**
     * Returns count of unchecked elements
     *
     * @returns {Number} count of unchecked elements
     *
     * @memberOf TodoList
     */
    getUncheckedCount(){
        let unchecked = 0;
        this.items.array.forEach(item => unchecked += !(item.isChecked));
        return unchecked;
    }
    /**
     * Delete compleated todo
     *
     * @memberOf TodoList
     */
    clearCompleated(){
        const items = this.items.array.slice();
        for (let item of items){
            if (item.isChecked){
                this.removeItem(item);
            }
        }
    }
};
