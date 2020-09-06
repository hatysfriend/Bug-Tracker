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

async function UpdateBug(bugId, updateObject) {
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
  console.log("Anything?");
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
