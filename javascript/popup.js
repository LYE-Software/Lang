class PopupBuilder {
    constructor() {
        this.elements = []
        this.inputs = {}
        this.container = null;
    }

    add(element) {
        this.elements.push(element)
        return this
    }

    show() {
        this.container = document.createElement('div');

        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.right = '0';
        this.container.style.bottom = '0';

        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        this.container.style.zIndex = '10000';
        
        this.container.style.display = 'flex';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.container.style.textAlign = 'center';

        var popup = document.createElement('div');
        popup.classList.add('container')
        popup.classList.add('popup');
        this.container.appendChild(popup);

        for (var i = 0; i < this.elements.length; i++) {
            popup.appendChild(this.elements[i].getHTML());

            var inputs = this.elements[i].getInputElements();
            for (var j = 0; j < inputs.length; j++) {
                this.inputs[inputs[j].id] = inputs[j].element;
            }
        }

        document.body.appendChild(this.container);
    }

    get_input_value(id) {
        return this.inputs[id].value;
    }

    close() {
        // console.log("CLOSINOG")
        // console.log(this.container)
        this.container.style.opacity = '0';
        this.container.style.pointerEvents = 'none';
        let containerReference = this.container;
        setTimeout(function() {
            //it's abstracted away from the popup context in the timeout so you have to use a reference not this
            //we love JS
            containerReference.remove();
        }, 250);
    }
}

class PopupElement {
    constructor() {
        this.style = "";
    }

    getHTML() {

    }

    setStyle(style) {
        this.style = style;
        return this;
    }

    getInputElements() {
        return []
    }
}

class PopupText extends PopupElement {
    constructor(text) {
        super();
        this.text = text;
    }

    getHTML() {
        var element = document.createElement('p');
        element.innerHTML = this.text;
        element.style = this.style;
        return element;
    }
}

class PopupButton extends PopupElement {
    constructor(text, onclick, style) {
        super();
        this.text = text;
        this.onclick = onclick; // function reference
        this.style = style;
    }

    getHTML() {
        var element = document.createElement('button');
        element.innerHTML = this.text;
        element.onclick = this.onclick;
        element.classList.add("newbutton");
        element.classList.add("buttonHoverDark")
        
        
        element.style.width = "100px";
        element.style = this.style;
        element.style.color = "#001945";

        return element;
    }
}

class PopupImage extends PopupElement {
    constructor(src, style) {
        super();
        this.src = src;
        this.style = style;
    }

    getHTML() {
        var element = document.createElement('img');
        element.src = this.src;
        element.style = this.style;

        return element;
    }
}

class PopupTextInput extends PopupElement {
    constructor(text, placeholder, id) {
        super();
        this.text = text;
        this.placeholder = placeholder;
        this.id = id;
        this.input_element = null;
    }

    getHTML() {
        var textInputContainer = document.createElement('div');

        var element = document.createElement('input');
        element.type = 'text';
        element.placeholder = this.placeholder;

        element.style.width = '380px';
        element.style.height = '40px';
        element.style.fontWeight = '200';

        this.input_element = element;

        textInputContainer.appendChild(element);

        return textInputContainer;
    }

    getInputElements() {
        return [{
            id: this.id,
            element: this.input_element
        }]
    }
}

class PopupDismissButton extends PopupButton {
    constructor(text, style={}) {
        super(text, function() {
            this.parentElement.parentElement.style.opacity = '0';
            this.parentElement.parentElement.style.pointerEvents = 'none';
            
            setTimeout(function(buttonElem) {
                buttonElem.parentElement.parentElement.remove();
            }.bind(null, this), 250);
        }, style);
    }
}