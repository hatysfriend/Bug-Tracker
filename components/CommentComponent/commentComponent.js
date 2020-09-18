fetch('components/CommentComponent/commentComponent.html')
    .then((response) => {
        response.text()
            .then((res) => {
                class CommentEntryComponent extends HTMLElement {
                    set bug(value) {
                        this._bug = value;
                        console.log("The passed BUG: " + JSON.stringify(this._bug));
                    }
        
                    get bug() {
                        return this._bug;
                    }
                    constructor() {
                        super();
                        this._bug;
                        const parser = new DOMParser();
                        let html = parser.parseFromString(res, 'text/html');

                        let shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(html.getElementById('commentEntryTemplate').content.cloneNode(true));
                        this.shadowDom = shadowRoot;
                        this.setEventListeners();
                    }

                    setEventListeners() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        let saveButton = this.shadowDom.querySelector('#commentSaveButton');
                        
                        commentTextArea.addEventListener('focus', (e) => {
                            this.expandCommentTextArea();
                        });

                        commentTextArea.addEventListener('blur', (e) => {
                            this.validateButtonState();     
                        });

                        commentTextArea.addEventListener('input', (e) => {
                            this.validateCommentEntryState();
                        });

                        saveButton.addEventListener('click', (e) => {
                            this.saveComment();
                        })
                    }

                    validateButtonState() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        if(commentTextArea.value.length <= 0) {
                            this.compressCommentTextArea();
                        }
                    }

                    validateCommentEntryState() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        if(commentTextArea.value.length > 0) {
                            this.enableSaveButton();
                        }
                        else {
                            this.disableSaveButton();
                        }
                    }

                    expandCommentTextArea() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        commentTextArea.classList.add("commentTextAreaWithSaveButton");
                        let commentControls = this.shadowDom.querySelector('#comment-controls');
                        commentControls.removeAttribute('hidden');
                    }

                    compressCommentTextArea() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        commentTextArea.classList.remove("commentTextAreaWithSaveButton");
                        let commentControls = this.shadowDom.querySelector('#comment-controls');
                        commentControls.setAttribute('hidden', true);
                    }

                    enableSaveButton() {
                        let commentSaveButton = this.shadowDom.querySelector('#commentSaveButton');
                        commentSaveButton.removeAttribute('disabled');
                    }

                    disableSaveButton() {
                        let commentSaveButton = this.shadowDom.querySelector('#commentSaveButton');
                        commentSaveButton.setAttribute('disabled', true);
                    }

                    saveComment() {
                        this.compressCommentTextArea();
                        let comment = this.shadowDom.querySelector('#commentTextArea').value;
                        CreateComment(this.bug._id, comment);
                        // updateComment();
                        console.log("Dispatching Event");
                        // let event = CustomEvent('update-modal', {detail})
                        this.shadowDom.dispatchEvent(new Event('update-modal', {detail: this.bug, bubbles: true, composed: true}));
                    }

                }
                customElements.define('comment-entry-component', CommentEntryComponent);
            });
    });