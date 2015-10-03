var ipc = require('ipc');

ipc.on('fileContent', fileData => {
  var editor = ace.edit("editor");
  editor.setValue(fileData);
});