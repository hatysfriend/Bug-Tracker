let AddTag = async (bugId, tag) => {
  return await fetch("/bugs/addTag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: bugId,
      tag: tag,
    }),
  })
  .catch( (err)=> {
    console.log("Add Tag FETCH ERROR" + err);
  });
}

let AddBug = async (bug) => {
  return await fetch('/bugs/addbug', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bug: bug
    })
  })
  .catch( (err)=> {
    console.log("Add Bug FETCH ERROR" + err);
  });
}

let UpdateBug = async (bugId, updateObject) => {
  console.log("The updated Bug" + JSON.stringify(updateObject));
  return await fetch("/bugs/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: bugId,
      updateObject: updateObject,
    }),
  })
  .catch( (err)=> {
    console.log("Update Bugs FETCH ERROR" + err);
  });
}

let GetAllBugs = async () => {
  let bugs = await fetch("/bugs/getBugsJson")
  .catch( (err)=> {
    console.log("GET ALL BUGS FETCH ERROR" + err);
  });
  return await bugs.json();
}

let GetBugById = async (bugId) => {
  let result = await fetch("/bugs/getBugByIdJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugID: bugId,
    }),
  })
  .catch( (err)=> {
    console.log("GET Bugs by Id FETCH ERROR" + err);
  });
  return await result.json();
}

let GetAllComments = async (bugId) => {
  return result = await fetch("/comments/getall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId
    })
  })
  .catch( (err)=> {
    console.log("GET ALL Comments FETCH ERROR" + err);
  });
}

let GetUserName = async() => {
  let result = await fetch("/auth/getusername")
  .catch( (err)=> {
    console.log("GET Username FETCH ERROR" + err);
  });
  return await result.text();
}

let CreateComment = async(bugId, comment) => {
  let commentObj = {comment: comment};
  return await fetch("/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId,
      comment: commentObj
    })
  })
  .catch( (err)=> {
    console.log("Create Comment FETCH ERROR" + err);
  });
}

let UpdateComment = async (bugId, commentObj) => {
  return await fetch("/comments/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bugId: bugId,
      comment: commentObj,
    }),
  })
  .catch( (err)=> {
    console.log("Update Comment FETCH ERROR" + err);
  });
}

  let DeleteComment = async (bugId, commentId) => {
    return await fetch("/comments/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bugId: bugId,
        commentId: commentId
      })
    })
    .catch( (err)=> {
      console.log("Delete Comment FETCH ERROR" + err);
    });
  }

  let GetCurrentUser = async() => {
    let result = await fetch("/auth/getUser")
    .catch( (err)=> {
      console.log("GET Current USER FETCH ERROR" + err);
    });
    return await result.json();
  }
