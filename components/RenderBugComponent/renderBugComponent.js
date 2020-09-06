fetch("/components/RenderBugComponent/renderBugComponent.html")
    .then((response)  => {
        response.text()
        .then((res) => {
            class BugCardComponent extends HTMLElement {
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

                    shadowRoot.appendChild(html.getElementById('bugCardTemplate').content.cloneNode(true));
                    this.shadowDom = shadowRoot;
                }

                initializeTemplate (bug) {
                    let container = this.shadowDom.getElementById('bugCardContent');
                    container.setAttribute('bugid', bug._id);
                    let listItem = container.getElementsByClassName('list-group-item');
                    listItem[0].setAttribute('bugid', bug._id);
                    container.querySelector('#editButton').setAttribute('id', bug._id);
                    container.querySelector('#bugCardTitle').innerHTML = bug.name;
                    container.querySelector('#commentCounter').innerHTML = '  '+ bug.comments.length;
                    container.querySelector('#tagSection').innerHTML = this.tags(bug);
                }

                tags = function (bug) {
                    let tags = "";
                    bug.tags.forEach(tag => {
                      tags += '<span class="mx-1 my-1 badge badge-' + tag.colour + '">' + tag.name + '</span>'
                    });
                    return tags;
                  }
            }
            customElements.define('render-bug-component', BugCardComponent);
    })    
})
