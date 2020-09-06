function addCardMini(element) {
    let bugContents = element.closest('#addBugContents');
    let formTemplate = bugContents.querySelector('#addBugFormTemplate');
    let buttonTemplate = bugContents.querySelector('#buttonTemplate');
    buttonTemplate.toggleAttribute('hidden');
    formTemplate.toggleAttribute('hidden');

    if(element.classList.contains('close')) {
      console.log('Closing');
      return;
    }
    console.log("We Called Add Card Mini With The Status: "+bugContents.getAttribute('status'));
  }

  function addBugFocusOut(textarea) {
    let addBugTemplate = textarea.parentNode;
    let addButton = addBugTemplate.previousElementSibling;
    console.log(addBugTemplate);
    addBugTemplate.toggleAttribute("hidden");
    addButton.toggleAttribute("hidden");
  }