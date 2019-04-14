import gen from "./utils/DOMGenerator";
import TodoList from "./TodoList";

export default class TodoGenerator {
    /**
     * Creates an instance of TodoGenerator.
     * @param {Control} parentNode 
     * @param {TodoList} todoList 
     * 
     * @memberOf TodoGenerator
     */
    constructor(parentNode, todoList){
        this.todoList = todoList;
        this.DOMNode = this.render(parentNode);
    }


    // Кустарный вариант двустороннего биндинга
    get input(){
        return this._inputControl.value;
    }
    set input(value){
        this._inputControl.value = value;
    }

    /**
     * 
     * 
     * @param {Event} event 
     * 
     * @private
     * @memberOf TodoGenerator
     */
    submit(event){
        if (this.input.trim().length > 0){
            this.todoList.addItem(this.input.trim());
        }
        this.input = '';
        event.preventDefault();
    }
    /**
     * 
     * 
     * 
     * @memberOf TodoGenerator
     */
    checkAll(){
        this.todoList.items.array.forEach( item => item.isChecked = true);
    }
    /**
     * 
     * 
     * @param {Control} parentNode 
     * @returns {Control} Html outer of Todo Generator
     * 
     * @memberOf TodoGenerator
     */
    render(parentNode){
        this._inputControl = gen('input', {type: 'text', placeholder: 'What needs to be done?', className: 'todo-creator_text-input'});

        return parentNode.insertBefore(
            gen('form', {className : 'todo-creator', onsubmit: e => this.submit(e)}, [
                gen('div', {className: 'todo-creator_check-all', onclick: ()=> this.checkAll()}),
                gen('div', {className: 'todo-creator_text-input-w'}, [
                    this._inputControl
                ])
            ])
        , this.todoList.DOMNode);
    }
};
