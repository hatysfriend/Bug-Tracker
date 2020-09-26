let showBugModal = () => {
    $('#addBugModal').modal('show');
}

function logoAnimation() {

}

let flashDisplay = () => {
  let flashComponent = document.getElementById('flashComponent');
  let flashMessage = flashComponent.getAttribute('flash');
  if(flashMessage.length > 0) {
    flashComponent.innerHTML = `<alert class="alert alert-success">${flashMessage}</alert>`
    $('#flashComponent').toast('show');
  }
}

let CreateUserStatus = () => {
  let userStatus = document.createElement('user-status');
  document.getElementById('userStatusContainer').appendChild(userStatus);
}

let editClick = async (bugId) => {
  let bug = await GetBugById(bugId);
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

let getButtonTemplate = (status) => {
  let button = document.createElement("bug-new-button");
  let shadowButton = button.shadowRoot.firstElementChild;
  shadowButton.setAttribute("status", status);
  return shadowButton;
}

let bugStatusUpdater = async (bugID, status) => {
  await UpdateBug(bugID, {status: status});
};

let dragger = () => {
  dragula([
    document.querySelector("#Created"),
    document.querySelector("#In-Progress"),
    document.querySelector("#Fixed"),
  ]).on("drop", async function (el, target) {
    await bugStatusUpdater(el.getAttribute("bugid"), target.getAttribute("id"));
  });
  console.log("Loaded");
};

let initialize = async () => {
  await loadBugs();
  await dragger();
  CreateUserStatus();
  flashDisplay();
  logoAnimation();

  document.addEventListener('update-modal', async (e) => {
    await loadBugs();
    await editClick(e.detail._id);
    console.log("We Recieved the event Modal@!");
  }, {capture: true});

  document.addEventListener('update-containers', async (e) => {
    console.log("We Recieved the bubble@ Containers!");
    // $('#addBugModal').modal('hide');         
    loadBugs();
  }, {capture: true});
};

window.onload = initialize;
