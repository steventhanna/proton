var ipc = require('ipc');

ipc.on('fileContent', fileData => {
  console.log("GOT FILE CONTENT");
  console.log(fileData);
  var editor = ace.edit("editor");
  editor.setValue(fileData);
});

ipc.on('getSave', fileData => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  console.log(fileData);
  ipc.send('fileSave', fileData);
});

ipc.on('getSaveAs', fileData => {
  console.log("GETSAVETRIGGER");
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  console.log(fileData);
  ipc.send('fileSaveAs', fileData);
});

$(document).ready(function() {

  // Set the scroll positions to equal each other.
  var editor = ace.edit("editor");
  var session = editor.getSession();
  session.on('changeScrollTop', function(scroll) {
    console.log(session.getScreenLength());
    // console.log("SCROLL: " + scroll);
    // console.log((scroll / session.getScreenLength()) * 10);
    window.scrollTo(0, scroll);
  });

  var scrollPercentage = 100 * this.scrollBottom / (this.scrollHeight - this.clientHeight);
  $(window).scroll(function() {
    // session.setScrollTop($(window).scrollTop());
  });

});