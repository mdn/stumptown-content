(function() {
  var updateButton = document.getElementById('updateDetails');
  var favDialog = document.getElementById('favDialog');
  var outputBox = document.getElementsByTagName('output')[0];
  var selectEl = document.getElementsByTagName('select')[0];
  var confirmBtn = document.getElementById('confirmBtn');

  // “Update details” button opens the <dialog> modally
  updateButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
      favDialog.showModal();
    } else {
      alert("The dialog API is not supported by this browser");
    }
  });
  // "Favorite animal" input sets the value of the submit button
  selectEl.addEventListener('change', function onSelect(e) {
    confirmBtn.value = selectEl.value;
  });
  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  favDialog.addEventListener('close', function onClose() {
    outputBox.value += favDialog.returnValue + " button clicked!\x2028";
  });
})();
