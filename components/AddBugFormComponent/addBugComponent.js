fetch("/components/AddBugFormComponent/addBugComponent.html").then((response) => {
  response.text().then((res) => {
    class AddBugComponent extends HTMLElement {
      constructor() {
        super();
        const parser = new DOMParser();
        let html = parser.parseFromString(res, "text/html");

        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(
          html.getElementById("addBugTemplate").content.cloneNode(true)
        );
        this.container = shadowRoot.getElementById("addBugContents");
        this.setEventListeners();
      }

      setEventListeners() {
        let addNewBugButton = this.container.querySelector('#addNewBugButton');
        addNewBugButton.addEventListener('click', (e) => {          
            this.toggleAddBugComponent(addNewBugButton);
        });

        let addBugFormTextarea = this.container.querySelector('#addBugFormTextarea');
        addBugFormTextarea.addEventListener('blur', (e) => {
            
            this.addBug(addBugFormTextarea);
            this.toggleAddBugComponent(addBugFormTextarea);
        });

        let addBugFormButton = this.container.querySelector('#addBugFormButton');
        addBugFormButton.addEventListener('click', (e) => {
            this.addBug();
            this.toggleAddBugComponent(addBugFormButton);
        });

        let addBugFormClose = this.container.querySelector('#addBugFormClose');
        addBugFormClose.addEventListener('click', (e) => {
            this.toggleAddBugComponent(addBugFormClose);
        });
      }

      toggleAddBugComponent(element) {
        let formTemplate = this.container.querySelector('#addBugFormTemplate');
        let addNewBugButton = this.container.querySelector('#addNewBugButton');
        addNewBugButton.toggleAttribute('hidden');
        formTemplate.toggleAttribute('hidden');
    
        if(element.classList.contains('close')) {
          console.log('Closing');
          return;
        }
        console.log("We Called Add Card Mini With The Status: "+this.container.getAttribute('status'));
      }

        addBug(element) {
        setTimeout(1000);
        console.log(this.getElementsByTagName('textarea'));
        let title = this.container.querySelector('#addBugFormTextarea').value;
        let status = this.container.getAttribute('status');
        let author = "Michael Richards";
        AddBug(
          {
            name: title,
            author: author,
            status: status,
          } 
         )
         
         loadBugs();
        return;
        
      }
    }
    customElements.define("bug-new-button", AddBugComponent);
  });
});