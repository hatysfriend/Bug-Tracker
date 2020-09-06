fetch('components/BugModalComponent/bugModalComponent.html')
    .then((response) => {
        response.text()
        .then((res) => {
            class BugModalComponent extends HTMLElement {
                set bug(value) {
                    this._bug = value;
                    this.initializeTemplate(this.bug);
                }
    
                get bug() {
                    return this._bug;
                }
    
                constructor() {
                    super();
                    this._bug;
                    const parser = new DOMParser();
                    let html = parser.parseFromString(res, 'text/html');
    
                    let shadowRoot = this.attachShadow({mode: 'open'});
                    console.log(html);
                    shadowRoot.appendChild(html.getElementById('bugModalTemplate').content.cloneNode(true));
                    this.shadowDom = shadowRoot;
                }
    
                initializeTemplate(bug) {
                    let container = this.shadowDom.getElementById('addBugModal');
                    container.querySelector('#bugId').setAttribute('value', bug._id);
                    container.querySelector('#name').innerHTML = bug.name;
                    container.querySelector('#status').innerHTML = '<span class="fas fa-bug text-' + this.bugColour(bug) + ' mr-2"></span>' + bug.status;
                    container.querySelector('#description').innerHTML = bug.description.length > 0 ? bug.description : "Enter Description Here...";
                    container.querySelector('#modalTagList').innerHTML = this.tags(bug);
                    container.querySelector('#author').innerHTML = '<span class="badge badge-pill badge-light mr-2">' + bug.author.charAt(0) + '</span>' + bug.author;
                    container.querySelector('#prevTitle').value = bug.name;
    
                    let date = new Date(bug.date).toLocaleDateString();
                    container.querySelector('#date').innerHTML = date;
                }
    
                bugColour = (bug) => {
                    if (bug.status === 'Created') {
                      return 'danger';
                    }
                    if (bug.status === 'In-Progress') {
                      return 'warning';
                    }
                    if (bug.status === 'Fixed') {
                      return 'success';
                    }
                }
    
                tags = function (bug) {
                    let tags = "";
                    bug.tags.forEach(tag => {
                      tags += '<span class="mx-1 my-1 badge badge-' + tag.colour + '">' + tag.name + '</span>'
                    });
                    return tags;
                }
                
            }
            customElements.define("bug-modal-component", BugModalComponent);
        });
    });