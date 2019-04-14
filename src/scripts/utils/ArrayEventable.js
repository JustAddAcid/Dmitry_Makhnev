'use strict';

import Eventable from "./Eventable";

export default class ArrayEventable extends Eventable {
    /**
     * Creates an instance of ArrayEventable.
     * @param {Array} array 
     * 
     * @memberOf ArrayEventable
     */
    constructor(array){
        super();
        this.array = array || [];
    }

    /**
     * Append the element to array and fires the 'push' event (using array.push)
     * 
     * @param {any} element 
     * @returns {Number} length of array after append
     * 
     * @memberOf ArrayEventable
     */
    push(element){
        let length = this.array.push(element);
        this.trigger('push', element);
        return length;
    }

    /**
     * 
     * Empty the array and fires 'clear' event
     * 
     * @memberOf ArrayEventable
     */
    clear(){
        this.array = [];
        this.trigger('clear');
    }

    /**
     * Removes all occurrences of an item in an array.
     * 
     * @param {any} member 
     * 
     * @memberOf ArrayEventable
     */
    remove(member){
        this.array = this.array.filter( el => member !== el );
        this.trigger('remove', member);
    }

    /**
     * Remove item by index
     * 
     * @param {Number} index 
     * 
     * @memberOf ArrayEventable
     */
    removeByIndex(index){
        let member = this.array[index];
        this.array.splice(index, 1);
        this.trigger('remove', member);
    }
    length(){
        return this.array.length;
    }
};
