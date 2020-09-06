let bugColour = (bug) => {
  if (bug.status === "Created") {
    return "danger";
  }
  if (bug.status === "In-Progress") {
    return "warning";
  }
  if (bug.status === "Fixed") {
    return "success";
  }
};

function showBugModal() {
    $('#addBugModal').modal('show');
}

let editClick = async (bugId) => {
  let bug = await GetBugById(bugId);

  (async function createModalComponent() {
    let modalContainer = document.getElementById("modalContainer");
    let modalComponent = document.createElement("bug-modal-component");
    modalComponent.bug = bug;
    modalContainer.innerHTML = modalComponent.shadowRoot.firstElementChild.outerHTML;

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
    console.log(bug);
    if (bug.status === "Created") {
      created.innerHTML += InitializeTemplate(bug);
    }
    if (bug.status === "In-Progress") {
      inProgress.innerHTML += InitializeTemplate(bug);
    }
    if (bug.status === "Fixed") {
      fixed.innerHTML += InitializeTemplate(bug);
    }
  });

  function InitializeTemplate(bug) {
    let button = document.createElement("render-bug-component");
    button.bug = bug;
    return button.shadowRoot.firstElementChild.outerHTML;
  }

  document.getElementById("addButtonContainerCreated").innerHTML = getButtonTemplate("Created");
  document.getElementById("addButtonContainerIn-Progress").innerHTML = getButtonTemplate("In-Progress");
  document.getElementById("addButtonContainerFixed").innerHTML = getButtonTemplate("Fixed");
};

function getButtonTemplate(status) {
  let button = document.createElement("bug-new-button");
  let shadowButton = button.shadowRoot.firstElementChild;
  shadowButton.setAttribute("status", status);
  return shadowButton.outerHTML;
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
