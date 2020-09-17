fetch('components/CommentComponent/commentComponent.html')
    .then((response) => {
        response.text()
            .then((res) => {
                class CommentEntryComponent extends HTMLElement {
                    constructor() {
                        super();
                        const parser = new DOMParser();
                        let html = parser.parseFromString(res, 'text/html');

                        let shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(html.getElementById('commentEntryTemplate').content.cloneNode(true));
                        this.shadowDom = shadowRoot;
                        this.setEventListeners();
                    }

                    setEventListeners() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        
                        commentTextArea.addEventListener('focus', (e) => {
                            this.expandCommentTextArea();
                        });

                        commentTextArea.addEventListener('blur', (e) => {
                            this.validateButtonState();     
                        });

                        commentTextArea.addEventListener('input', (e) => {
                            this.validateCommentEntryState();
                        });
                    }

                    validateButtonState() {
                        let commentTextArea = this.shadowDom.querySelector('#commentTextArea');
                        if(commentTextArea.value.length <= 0) {
                            let commentControls = this.shadowDom.querySelector('#comment-controls');
                            commentControls.style.display = 'none';
                            commentTextArea.classList.remove("commentTextAreaWithSaveButton");
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
                        commentControls.style.display = 'inline-block';
                    }

                    enableSaveButton() {
                        let commentSaveButton = this.shadowDom.querySelector('#commentSaveButton');
                        commentSaveButton.removeAttribute('disabled');
                    }

                    disableSaveButton() {
                        let commentSaveButton = this.shadowDom.querySelector('#commentSaveButton');
                        commentSaveButton.setAttribute('disabled', true);
                    }

                }
                customElements.define('comment-entry-component', CommentEntryComponent);
            });
    });