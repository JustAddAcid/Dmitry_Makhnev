import TodoList from "./TodoList";
import TodoGenerator from "./TodoGenerator";
import StatusBar from "./StatusBar";

export default class Todo {

    /**
     * Creates an instance of Todo.
     * @param {Object} parentNode
     *
     * @memberOf Todo
     */
    constructor(parentNode){
        this.DOMNode = this.connectToDOM(parentNode);

        this.todoList = new TodoList(this.DOMNode);
        this.todoGenerator = new TodoGenerator(this.DOMNode, this.todoList);
        this.statusBar = new StatusBar(this.DOMNode, this.todoList);

        this.todoList.on('empty', ()=> this._board.classList.remove('__has-content'));
        this.todoList.on('notEmpty', ()=> this._board.classList.add('__has-content'));
    }

    /**
     * Connection to existing dom element
     *
     * @param {Object} parentNode
     *
     * @memberOf Todo
     */
    connectToDOM(parentNode){
        this._board = parentNode.querySelector('.todo-board');
        return this._board;
    }
};
