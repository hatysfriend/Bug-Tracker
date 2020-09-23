async function AddTag(bugId, tag) {
  return await fetch("/bugs/addTag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: bugId,
      tag: tag,
    }),
  });
}

async function AddBug(bug) {
  return await fetch('/bugs/addbug', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bug: bug
    })
  });
}

async function UpdateBug(bugId, updateObject) {
  console.log("The updated Bug" + JSON.stringify(updateObject));
  return await fetch("/bugs/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: bugId,
      updateObject: updateObject,
    }),
  });
}

async function GetAllBugs() {
  let bugs = await fetch("/bugs/getBugsJson");
  return await bugs.json();
}

async function GetBugById(bugId) {
  let result = await fetch("/bugs/getBugByIdJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugID: bugId,
    }),
  });
  return await result.json();
}

async function GetAllComments(bugId) {
  return result = await fetch("/comments/getall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId
    })
  });
}

async function GetUserName() {
  let result = await fetch("/auth/getusername");
  return await result.text();
}

async function CreateComment(bugId, comment) {
  let commentObj = {comment: comment};
  return await fetch("/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId,
      comment: commentObj
    })
  });
}

async function UpdateComment(bugId, commentObj) {
  return await fetch("/comments/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId,
      comment: commentObj,
    }),
  });
}

  async function DeleteComment(bugId, commentId) {
    console.log("DID WE GET HERE?");
    return await fetch("/comments/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bugId: bugId,
        commentId: commentId
      })
    });
  }
