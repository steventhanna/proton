var ipc = require('ipc');

ipc.on('fileContent', fileData => {
  var editor = ace.edit("editor");
  editor.setValue(fileData);
});

ipc.on('getSave', fileData => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  console.log(fileData);
  ipc.send('fileSave', fileData);
});

// // Send data for save
// $(document).ready(function() {
//
//   var editor = ace.edit("editor");
//   // Hackish thing to do
//   while (true) {
//     var fileData = editor.getValue();
//     console.log(fileData);
//     // alert(fileData);
//     ipc.send('fileSave', fileData);
//   }
// });

$(document).ready(function() {

  // Set the scroll positions to equal each other.
  var editor = ace.edit("editor");
  var session = editor.getSession();
  session.on('changeScrollTop', function(scroll) {
    window.scrollTo(0, scroll);
  });
});