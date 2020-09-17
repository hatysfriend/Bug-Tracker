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
                    this.container = this.shadowDom.getElementById('addBugModal');

                    this.commentEntry = document.createElement('comment-entry-component');
                    this.container.querySelector('#commentEntryContainer').appendChild(this.commentEntry);
                }

                setEventListeners() {
                    let name = this.container.querySelector('#title');
                    name.addEventListener('click', (e) => {
                        this.ClickHandler(name, 'title');
                    });

                    let nameText = this.container.querySelector('#titleText');
                    nameText.addEventListener('blur', (e) => {
                        this.FocusOutHandler(nameText, 'title');
                    });

                    let desc = this.container.querySelector('#description');
                    desc.addEventListener('click', (e) => {
                        this.ClickHandler(desc, 'description');
                    });

                    let descText = this.container.querySelector('#descriptionText');
                    descText.addEventListener('blur', (e) => {
                        this.FocusOutHandler(descText, 'description');
                    });

                    let archiveButton = this.container.querySelector('#archive');
                    archiveButton.addEventListener('click', (e) => {
                        $('#addBugModal').modal('hide');
                        UpdateBug(this.bug._id, {archived: true});
                        loadBugs();
                    })
                }
    
                initializeTemplate(bug) {
                    this.container.querySelector('#bugId').setAttribute('value', bug._id);
                    this.container.querySelector('#title').innerHTML = bug.name;               
                    this.container.querySelector('#status').innerHTML = '<span class="fas fa-bug text-' + this.bugColour(bug) + ' mr-2"></span>' + bug.status;
                    this.container.querySelector('#description').textContent = bug.description?.length > 0 ? bug.description : "Enter Description Here...";               
                    this.container.querySelector('#modalTagList').innerHTML = this.tags(bug);
                    this.container.querySelector('#author').innerHTML = '<span class="badge badge-pill badge-light mr-2">' + bug.author.charAt(0) + '</span>' + bug.author;
                    this.container.querySelector('#prevTitle').value = bug.name;
                    let date = new Date(bug.date).toLocaleDateString();
                    this.container.querySelector('#date').innerHTML = date;
                    this.commentEntry.bug = bug;
                    this.setEventListeners();
                }

                ClickHandler(element, name) {
                    let parent = element.closest('#'+name+'Div');
                    let div = parent.querySelector(`#${name}`);
                    let text = parent.querySelector(`#${name}Text`);
                    text.value = div.innerHTML;
                    text.removeAttribute('hidden');
                    div.setAttribute('hidden', true);
                    text.focus();
                }

                FocusOutHandler(element, name) {
                    let parent = element.closest(`#${name}Div`);
                    let div = parent.querySelector('#'+name);
                    let text = parent.querySelector(`#${name}Text`);
                    div.innerHTML = text.value;
                    updateDescription();
                    div.removeAttribute('hidden');
                    text.setAttribute('hidden', true);
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