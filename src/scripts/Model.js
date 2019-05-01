export default class Model {
    constructor(){
        this.path = '/todo';
    }
    /**
     * `
     * @param  {String} description 
     * @return {Promise}
     * @memberof Model
     */
    create(description){
        return this._xhr('POST', {description});
    }
    /**
     * 
     * @return {Promise}
     * @memberof Model
     */
    read(){
        return this._xhr('GET');
    }
    /**
     * 
     * @param  {Number} id 
     * @param  {String} description 
     * @return {Promise}
     * @memberof Model
     */
    update(id, description, isChecked){
        return this._xhr('PUT', {id, description, isChecked});
    }
    /**
     * 
     * @param  {Number} id 
     * @return {Promise}
     * @memberof Model
     */
    delete(id){
        return this._xhr('DELETE', {id});
    }
    /**
     * 
     * @param  {String} method Name of method
     * @param  {Object} data Data to send to server
     * @return {Promise}
     * @memberof Model
     */
    _xhr(method, data){
        const self = this;
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();
            const token = document.querySelector("meta[name='_csrf']").getAttribute('content');
            const header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');
            xhr.open(method, self.path, true);
            xhr.setRequestHeader(header,token);
            xhr.send(self._getFormData(data));
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200){
                    reject({
                        statusCode: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                resolve(JSON.parse(xhr.responseText));                
            }
        });
        
    }
    /**
     * 
     * @param  {Object} [object={}] 
     * @return {FormData}
     * @memberof Model
     */
    _getFormData(object = {}) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
};
