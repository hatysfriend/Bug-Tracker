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
                        console.log("HTML" + html.getElementById('commentDisplayTemplate').content);
                        
                        let shadowRoot = this.attachShadow({ mode: 'open' });
                        shadowRoot.appendChild(html.getElementById('commentDisplayTemplate').content.cloneNode(true));
                        this.shadowDom = shadowRoot;
                    }

                    async initializeCommentsList() {
                        let comentsDisplayTextArea = this.shadowRoot.querySelector('#commentsDisplay');
                        this.shadowRoot.querySelector('#commentUserBadge').innerHTML = `<h5><span class="badge badge-pill badge-light mr-2">${this._comment.user.username.charAt(0).toUpperCase()}</span></h5>`
                        this.shadowRoot.querySelector('#commentLabel').innerHTML =`<strong>${this._comment.user.username.charAt(0).toUpperCase()}${this._comment.user.username.slice(1)}</strong>`;
                        comentsDisplayTextArea.textContent = this._comment.comment;
                        this.shadowRoot.querySelector('#commentDate').innerHTML = this.convertDisplayDate(this._comment.date).fontsize(1);
                        this.shadowRoot.querySelector('#upvote-count').innerHTML = this.comment.likes.length;

                        let userCheck = await this.checkUser();
                        if(userCheck) {
                            let deleteElement = document.createElement("a");
                            deleteElement.setAttribute('id', 'comment-delete');
                            deleteElement.innerHTML = 'Delete';
                            deleteElement.setAttribute('href', '#');
                            let editElement = document.createElement("a");
                            editElement.setAttribute('id', 'comment-edit');
                            editElement.innerHTML = 'Edit';
                            editElement.setAttribute('href', '#');
                            
                            this.shadowRoot.querySelector('#comment-options').appendChild(editElement);
                            this.shadowRoot.querySelector('#comment-options').appendChild(document.createTextNode(' - '));
                            this.shadowRoot.querySelector('#comment-options').appendChild(deleteElement);

                            this.setCurrentUserEventListeners();
                        }
                        else {
                            comentsDisplayTextArea.disabled = true;
                        }  
                        this.setEventListeners();
                    }

                    async checkUser() {
                        let currentUser = await GetCurrentUser();
                        if(currentUser === this.comment.user._id) {
                            return true;
                        }
                        return false;
                    }

                    setEventListeners() {
                        let commentUpvote = this.shadowDom.querySelector('#comment-upvote');

                        commentUpvote.addEventListener('click', (e)=> {
                            this.updateUpvote()
                                .then();
                        });
                    }

                    async updateUpvote() {
                        let commentDisplayDiv = this.shadowDom.querySelector('#commentDisplayDiv');
                        let currentUserId = await GetCurrentUser();
                         
                        let likes = this._comment.likes;
                        if(likes.includes(currentUserId)) {
                            let index = likes.findIndex((element) => {
                                element === currentUserId;
                            });      
                            likes.splice(index, 1);                  
                        }
                        else {
                            likes.push(currentUserId);
                        }
                        console.log("Likes Array!!!: "+likes);                        
                        let commentObj = {
                            _id: this.comment._id,
                            likes: likes
                        }
                        await UpdateComment(this._bug._id, commentObj);
                        commentDisplayDiv.dispatchEvent(new CustomEvent('update-modal', {detail: this.bug, bubbles: true, composed: true}));
                    }

                    setCurrentUserEventListeners() {
                        let commentDisplayDiv = this.shadowDom.querySelector('#commentDisplayDiv');
                        let commentDisplay = this.shadowDom.querySelector('#commentsDisplay');
                        let commentDelete = this.shadowDom.querySelector('#comment-delete');
                        let commentEdit = this.shadowDom.querySelector('#comment-edit');

                        commentDelete.addEventListener('click', (e)=> {
                            DeleteComment(this._bug._id, this._comment._id);
                            commentDisplayDiv.dispatchEvent(new CustomEvent('update-modal', {detail: this.bug, bubbles: true, composed: true}));
                        });

                        commentEdit.addEventListener('click', (e)=> {
                            commentDisplay.focus();
                        });

                        commentEdit.addEventListener('click', (e)=> {
                            let comment = this.shadowDom.querySelector('#commentsDisplay').value;
                            let commentObj = {
                                _id: this.comment._id,
                                comment: comment
                            }
                            UpdateComment(this._bug._id, commentObj)
                                .then();
                            commentDisplayDiv.dispatchEvent(new CustomEvent('update-modal', {detail: this.bug, bubbles: true, composed: true}));
                        });
                    }

                    convertDisplayDate(commentDate) {
                        let date = new Date(commentDate);
                        let minutes = date.getMinutes();
                        let hours = date.getHours();
                        if( hours < 10) {
                           hours = `0${hours}`; 
                        }
                        if(minutes < 10) {
                           minutes = `0${minutes}`; 
                        }
                        let formatted_date = `${date.toLocaleDateString('en-AU', {month: 'short'})} ${date.getDate()} at ${hours}:${minutes}`;
                    
                        let currentTime = new Date(); 
                        let timeDifference = new Date(currentTime.getTime() - date.getTime());
                        let timeDifferenceHours = timeDifference/1000/3600;
                        if((timeDifferenceHours*60) < 1) {
                            return `a few seconds ago`;
                        }
                        else if(timeDifferenceHours < 1) {
                            return `commented ${Math.round(timeDifferenceHours*60)} mins ago`;
                        }
                        else if(timeDifferenceHours < 6) {
                            return `commented ${Math.round(timeDifferenceHours)} hours ago`;
                        }
                        return formatted_date;
                    }
                }
                customElements.define('comment-display-component', CommentDisplayComponent);
            });
    });