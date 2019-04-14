/* 

Example:

gen('div', { class: 'myClassName', id: 'myId'}, [
        gen('a', { href: 'http://google.com', textContent: 'google'})
])

*/

/**
 * 
 * 
 * @export
 * @param {String} tagName 
 * @param {Object} props 
 * @param {Array} childs 
 * @returns {Control}
 */
export default function gen(tagName, props, childs){
    let el = document.createElement(tagName);
    //Object.assign(el,props); //ie == зло
    for (let prop in props){
        el[prop] = props[prop];
    }
    if (childs && childs.length > 0){
        childs.forEach(child => el.appendChild(child));
    }
    return el;
}