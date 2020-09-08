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
      }

      connectedCallback() {
        console.log("Add Bug Connected");
      }
    }
    customElements.define("bug-new-button", AddBugComponent);
  });
});
