class UserStatus extends HTMLElement {
    constructor() {
        super();
        this.InitializeComponent();
    }

async InitializeComponent() {
        let name = await GetUserName();
        let html = 
        `<link rel="stylesheet" href="/css/custom.css">
        <div>
            <label id="username">${name}</label>
            <a href="/auth/logout" class="btn btn-warning">Logout</a>
        </div>`;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = html;
    }
}
customElements.define('user-status', UserStatus);

