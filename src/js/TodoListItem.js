import gen from "./utils/DOMGenerator";
import Eventable from "./utils/Eventable";

export default class TodoListItem extends Eventable {
    /**
     * Creates an instance of TodoListItem.
     * @param {Control} parentNode 
     * @param {String} text 
     * @param {Boolean} isChecked 
     * 
     * @memberOf TodoListItem
     */
    constructor(parentNode, text, isChecked){
        super();
        this.DOMNode = this.render(parentNode);

        this.isChecked = !!isChecked;
        this.text = text;
    }

    // Кустарный вариант двустороннего биндинга
    get isChecked(){
        if (this._checkbox){
            return this._checkbox.checked;
        } else {
            return false;
        }
    }
    set isChecked(value){
        if (this._checkbox){
            this._checkbox.checked = value;
        }
    }
    get text(){
        if(this._textArea){
            return this._textArea.value;
        } else {
            return '';
        }
    }
    set text(value){
        if(this._textArea){
            this._textArea.value = value;
        }
    }

    /**
     * 
     * 
     * @param {any} parentNode 
     * @returns {Control}
     * 
     * @memberOf TodoListItem
     */
    render(parentNode){

        this._checkbox = gen('input', {type: 'checkbox', className: 'custom-checkbox_target', onclick: ()=> this.change()});
        this._textArea = gen('textarea', {className: 'todos-list_item_text', oninput: () => this.autoresize()});

        return parentNode.appendChild(
            gen('div', {className: 'todos-list_item'}, [
                gen('div', {className: 'custom-checkbox todos-list_item_ready-marker'}, [
                    this._checkbox,
                    gen('div', {className: 'custom-checkbox_visual'}, [
                        gen('div', {className: 'custom-checkbox_visual_icon'})
                    ])
                ]),
                gen('button', {className: 'todos-list_item_remove cross-button', onclick: ()=> this.remove()}),
                gen('div', {className: 'todos-list_item_text-w'}, [
                    this._textArea
                ])
            ])
        )
    }
    remove(){
        this.trigger('remove');
    }
    change(){
        this.trigger('change');

        if (this.isChecked){
            this._textArea.style.textDecoration = 'line-through';    
        } else {
            this._textArea.style.textDecoration = 'none';    
        }
    }
    autoresize(){ 
        this._textArea.style.height = '36px';
        this._textArea.style.height = this._textArea.scrollHeight + 'px';
    }
};
