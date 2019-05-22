'use strict';

export default class Eventable {
    constructor(){
        this.listeners = {}; // event : [listener1(), listener2()]
    }

    /**
     * Register listener on event
     *
     * @param {String} event
     * @param {function()} callback
     *
     * @memberOf Eventable
     */
    on(event, callback){
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    /**
     * Remove listener on event
     *
     * @param {String} event
     * @param {function()} callback
     * @returns {Boolean}
     *
     * @memberOf Eventable
     */
    off(event, callback){
        if (event === undefined){
            this.listeners = {};
            return true;
        }
        let handlers = this.listeners[event];
        if (!handlers || handlers.length === 0){
            return false;
        }
        if (callback){
            this.listeners[event] = handlers.filter( handler => typeof handler === 'function' && handler !== callback );
        } else {
            this.listeners[event] = [];
        }
        return true;
    }

    /**
     * Fire the event
     *
     * @param {String} event
     * @param {object[]} args
     *
     * @memberOf Eventable
     */
    trigger(event, ...args){
        let listeners = this.listeners[event] || [];
        listeners.forEach(listener => listener(...args));
    }
};
