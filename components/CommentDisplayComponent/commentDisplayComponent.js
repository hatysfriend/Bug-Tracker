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
                        // this.setEventListeners();
                    }

                    setEventListeners() {
                        let commentDate = this.shadowRoot.querySelector('#commentDate');
                        commentDate.addEventListener('mouseover', (e)=> {
                            
                        });
                    }

                    initializeCommentsList() {
                        this.shadowRoot.querySelector('#commentUserBadge').innerHTML = `<h5><span class="badge badge-pill badge-light mr-2">${this._comment.user.username.charAt(0).toUpperCase()}</span></h5>`
                        this.shadowRoot.querySelector('#commentLabel').innerHTML =`<strong>${this._comment.user.username.charAt(0).toUpperCase()}${this._comment.user.username.slice(1)}</strong>`;
                        this.shadowRoot.querySelector('#commentsDisplay').textContent = this._comment.comment;
                        this.shadowRoot.querySelector('#commentDate').innerHTML = this.convertDisplayDate(this._comment.date).fontsize(1);
                    }

                    convertDisplayDate(commentDate) {
                        let date = new Date(commentDate);
                        let currentTime = new Date(); 
                        let timeDifference = new Date(currentTime.getTime() - date.getTime());
                        let timeDifferenceHours = timeDifference/1000/3600;
                        let formatted_date = `${date.toLocaleDateString('en-AU', {month: 'short'})} ${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
                        if((timeDifferenceHours*60) < 1)
                        {
                            return `a few seconds ago`;
                        }
                        if(timeDifferenceHours < 1)
                        {
                            return `commented ${Math.ceil(timeDifferenceHours*60)} mins ago`;
                        }
                        if(timeDifferenceHours < 6)
                        {
                            return `commented ${Math.ceil(timeDifferenceHours)} hours ago`;
                        }
                        return formatted_date;
                    }
                }
                customElements.define('comment-display-component', CommentDisplayComponent);
            });
    });