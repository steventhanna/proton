var ipc = require('ipc');
var marked = require('marked');

ipc.on('fileContent', fileData => {
  console.log("GOT FILE CONTENT");
  console.log(fileData);
  // Set editor language
  var editor = ace.edit("editor");
  editor.setValue(fileData);
  ipc.on('extension', extension => {
    if (extension == "tex") {
      // Iniital Render
      editor.getSession().setMode("ace/mode/tex");
      var latex = editor.getValue();
      var result = document.getElementById("previewText");
      typejax.updater.init(latex, latex.length, result);
      // Continous render
      editor.getSession().on('change', function(e) {
        var latex = editor.getValue();
        var result = document.getElementById("previewText");
        typejax.updater.init(latex, latex.length, result);
      });
    } else {
      editor.getSession().setMode("ace/mode/markdown");
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true
      });
      // First initial render
      var text = editor.getValue();
      document.getElementById('previewText').innerHTML = marked(text);
      // Continous render
      editor.getSession().on('change', function(e) {
        // e.type, etc
        var text = editor.getValue();
        document.getElementById('previewText').innerHTML = marked(text);
      });
    }
  });
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