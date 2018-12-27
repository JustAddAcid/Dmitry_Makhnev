import ArrayEventable from "./utils/ArrayEventable";
import TodoListItem from "./TodoListItem";
import gen from "./utils/DOMGenerator";
import Eventable from "./utils/Eventable";

export default class TodoList extends Eventable {
    /**
     * Creates an instance of TodoList.
     * @param {Control} parentNode 
     * 
     * @memberOf TodoList
     */
    constructor(parentNode){
        super();
        this.DOMNode = this.render(parentNode);
        this.items = new ArrayEventable();
    }
    /**
     * 
     * 
     * @param {Control} parentNode 
     * 
     * @memberOf TodoList
     */
    render(parentNode){
        return parentNode.appendChild(
            gen('div', {className : 'todos-list'})
        );
    }
    /**
     * 
     * 
     * @returns {Number}
     * 
     * @memberOf TodoList
     */
    getItemsCount(){
        return this.items.length();
    }

    /**
     * 
     * 
     * @param {String} text 
     * @param {Boolean} isChecked 
     * 
     * @memberOf TodoList
     */
    addItem(text, isChecked){
        const item = new TodoListItem(this.DOMNode, text, isChecked);
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
     * Удаляет элемент item из TodoList
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
    }
    /**
     * 
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
     * 
     * 
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
