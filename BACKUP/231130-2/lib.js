// Random number generator ---------------------------------------------------------------
const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

// Create DOM Element --------------------------------------------------------------------
const createDOMElement = (content=false, type='div', parent='body', className=false, id=false) => {
    let el = document.createElement(type);
    el.innerHTML = content;
    document.querySelector(parent).append(el);
    el.className = className;
    el.id = id;
};