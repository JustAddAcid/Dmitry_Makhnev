import gen from "./utils/DOMGenerator";
import Eventable from "./utils/Eventable";
import Model from "./Model";

export default class TodoListItem extends Eventable {
    /**
     * Creates an instance of TodoListItem.
     * @param {Control} parentNode 
     * @param {String} text 
     * @param {Number} id
     * @param {Boolean} isChecked 
     * 
     * @memberOf TodoListItem
     */
    constructor(parentNode, text, id, isChecked, DOMNode){
        super();
        this.model = new Model();
        // this.DOMNode = this.render(parentNode);
        this.parentNode = parentNode;
        this.DOMNode = DOMNode;

        this.isChecked = !!isChecked;
        this.text = text;
        this.id = id;

        this.textVal = text;
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

    _onTextFocus(){
        this._lastText = this.text;
    }
    _onTextBlur(){
        if (this.text !== this._lastText){
            this.model.update(this.id, this.text, this.isChecked);
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
    render(){

        this._checkbox = gen('input', {
            type: 'checkbox',
            className: 'custom-checkbox_target', 
            onclick: ()=> this.change()
        });
        this._textArea = gen('textarea', {
            className: 'todos-list_item_text', 
            value: this.textVal,
            oninput: ()=> this.autoresize(),
            onfocus: ()=> this._onTextFocus(), 
            onblur: ()=> this._onTextBlur()
        });

        this.DOMNode = this.parentNode.appendChild(
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

    connectToDOM(){
        this._checkbox = this.DOMNode.querySelector('.custom-checkbox_target');
        this._checkbox.onclick = ()=> this.change();

        this._textArea = this.DOMNode.querySelector('.todos-list_item_text');
        this._textArea.oninput = ()=> this.autoresize();
        this._textArea.onfocus = ()=> this._onTextFocus();
        this._textArea.onblur  = ()=> this._onTextBlur();

        this._removeBtn = this.DOMNode.querySelector('.cross-button');
        this._removeBtn.onclick = ()=> this.remove();

        return this.DOMNode;
    }
    remove(){
        this.trigger('remove');
    }
    change(){
        this.trigger('change');
        this.model.update(this.id, this.text, this.isChecked);
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
