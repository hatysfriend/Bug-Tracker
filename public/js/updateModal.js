
  let tagColour = "";
  function setColour(colour) {
    tagColour = colour;
  }

  async function addTag() {
    let bugId = document.getElementById('bugId').value;
    let tagName = document.getElementById('tag-name').value;

    await AddTag(bugId, {
      name: tagName,
      colour: tagColour
    });

    loadBugs();
    editClick(bugId);
  }

  // async function descClick(elementID) {
  //   let desc = document.getElementById(elementID);
  //   desc.classList.add('form-control');
  //   desc.setAttribute('onclick', 'null');
  //   desc.setAttribute('contenteditable', true);
  //   desc.focus();
  // }

  // async function descFocusOut(elementID) {
  //   let desc = document.getElementById(elementID);
  //   updateDescription();
  //   desc.classList.remove('form-control');
  //   desc.setAttribute('onclick', 'descClick(\'' + elementID + '\')');
  //   desc.setAttribute('contenteditable', false);
  // }

  async function updateDescription() {
    let desc = document.getElementById('description').innerHTML;
    let title = document.getElementById('name').innerHTML;
    let bugId = document.getElementById('bugId').value;
    let prev = document.getElementById('prevTitle').value;
    

    title.trim();
    if (title.length <= 0) {
      title = prev;
    }

    await UpdateBug(bugId, {
        name: title,
        description: desc
    });

    loadBugs();
    editClick(bugId);
  }
