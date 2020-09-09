function showBugModal() {
    $('#addBugModal').modal('show');
}

let editClick = async (bugId) => {
  let bug = await GetBugById(bugId);

  (async function createModalComponent() {
    let modalContainer = document.getElementById("modalContainer");
    let modalComponent = document.createElement("bug-modal-component");
    modalComponent.bug = bug;
    modalContainer.textContent = '';
    modalContainer.appendChild(modalComponent.shadowRoot.firstElementChild);

    //Force Close The Modal Backdrop If It Is Still There
    let backdrop = document.getElementsByClassName("modal-backdrop")[0];
    if (backdrop) {
      backdrop.remove();
    }
    showBugModal();
  })();
};

let loadBugs = async () => {
  let json = await GetAllBugs();

  let created = document.getElementById("Created");
  let inProgress = document.getElementById("In-Progress");
  let fixed = document.getElementById("Fixed");

  created.innerHTML = null;
  inProgress.innerHTML = null;
  fixed.innerHTML = null;

  json.forEach((bug) => {
    if (bug.status === "Created") {
      created.appendChild(InitializeTemplate(bug));
    }
    if (bug.status === "In-Progress") {
      inProgress.appendChild(InitializeTemplate(bug));
    }
    if (bug.status === "Fixed") {
      fixed.appendChild(InitializeTemplate(bug));
    }
  });

  function InitializeTemplate(bug) {
    let button = document.createElement("render-bug-component");
    button.bug = bug;
    return button.shadowRoot.firstElementChild;
  }

  let addButtonCreatedNode = document.getElementById("addButtonContainerCreated");
  let addButtonInProgressNode = document.getElementById("addButtonContainerIn-Progress");
  let addButtonFixedNode = document.getElementById("addButtonContainerFixed");

  addButtonCreatedNode.innerHTML = null;
  addButtonInProgressNode.innerHTML = null;
  addButtonFixedNode.innerHTML = null;

  addButtonCreatedNode.appendChild(getButtonTemplate("Created"));
  addButtonInProgressNode.appendChild(getButtonTemplate("In-Progress"));
  addButtonFixedNode.appendChild(getButtonTemplate("Fixed"));
};

function getButtonTemplate(status) {
  let button = document.createElement("bug-new-button");
  let shadowButton = button.shadowRoot.firstElementChild;
  shadowButton.setAttribute("status", status);
  return shadowButton;
}

let bugStatusUpdater = async (bugID, status) => {
  UpdateBug(bugID, {status: status});
};

let dragger = () => {
  dragula([
    document.querySelector("#Created"),
    document.querySelector("#In-Progress"),
    document.querySelector("#Fixed"),
  ]).on("drop", function (el, target) {
    bugStatusUpdater(el.getAttribute("bugid"), target.getAttribute("id"));
  });
  console.log("Loaded");
};

let initialize = () => {
  loadBugs();
  dragger();
};

window.onload = initialize;
