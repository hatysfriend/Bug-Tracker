class UserStatus extends HTMLElement {
    constructor() {
        super();
        this.InitializeComponent();
    }

async InitializeComponent() {
        let name = await GetUserName();
        let html = 
        `<link rel="stylesheet" href="/css/custom.css"/>
        <div>
            <span class="badge badge-pill badge-light mr-1"><strong>${name.charAt(0).toUpperCase()}</strong></span>
            <label id="username">Hi ${name}!</label>
            <a href="/auth/logout" class="badge badge-warning ml-2">Logout</a>
        </div>`;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = html;
    }
}
customElements.define('user-status', UserStatus);

