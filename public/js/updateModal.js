
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

  async function updateDescription() {
    let desc = document.getElementById('description').textContent;
    let title = document.getElementById('title').textContent;
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
