fetch('components/CommentDisplayComponent/commentDisplayComponent.html')
    .then((response) => {
        response.text()
            .then((res) => {
                class CommentDisplayComponent extends HTMLElement {
                    get bug() {
                        return this._bug;
                    }
                    
                    set bug(value) {
                        this._bug = value;
                    }

                    get comment() {
                        return this._comment;
                    }
                    
                    set comment(value) {
                        this._comment = value;
                        this.initializeCommentsList();
                    }
        
                    constructor() {
                        super();
                        this._bug;
                        this._comment;
                        const parser = new DOMParser();
                        let html = parser.parseFromString(res, 'text/html');
                        console.log("HTML" +html.getElementById('commentDisplayTemplate').content);
                        let shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(html.getElementById('commentDisplayTemplate').content.cloneNode(true));
                        this.shadowDom = shadowRoot;
                        
                        this.setEventListeners();
                    }

                    initializeCommentsList() {
                        console.log("COmmmetn USER "+ JSON.stringify(this._comment));
                        this.shadowRoot.querySelector('#commentLabel').textContent = this._comment.user.username;
                        this.shadowRoot.querySelector('#commentsDisplay').textContent = this._comment.comment;
                    }

                    setEventListeners() {
                       
                    }

                }
                customElements.define('comment-display-component', CommentDisplayComponent);
            });
    });