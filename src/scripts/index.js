import '../styles/index.scss';
import Todo from './Todo';

document.addEventListener('DOMContentLoaded', function(){
    new Todo(document.querySelector('.main-layout'));
    console.log('init');
});