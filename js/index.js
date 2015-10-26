// IPC for communication with main process
var ipc = require('ipc');
// The marked rendering library
var marked = require('marked');

/**
 * FileContent sent from main process.  To be sent to user.
 */
ipc.on('fileContent', fileData => {
  // console.log("GOT FILE CONTENT");
  // console.log(fileData);
  var editor = ace.edit("editor");
  editor.setValue(fileData);
  var text = editor.getValue();
  document.getElementById('previewText').innerHTML = marked(text);
  hljs.initHighlightingOnLoad();
});

/**
 * Save function sent from main process to renderer process.
 * Get the file content and send it back to the main process for standard save.
 */
ipc.on('getSave', fileData => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  // console.log(fileData);
  ipc.send('fileSave', fileData);
});

/**
 * getSaveAs function sent from main process to renderer processs.
 * Get the file content and send it back to the main process for save as.
 */
ipc.on('getSaveAs', fileData => {
  console.log("GETSAVETRIGGER");
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  // console.log(fileData);
  ipc.send('fileSaveAs', fileData);
});

/**
 * error function handles errors sent from the main process.
 * Errors should appear on the rendered side of the display.
 */
ipc.on('error', errorMessage => {
  var type = errorMessage.type;
  var message = errorMessage.message;
  document.getElementById('error').innerHTML = '<div style="margin-right: 10px;" class="alert alert-' + type + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>';
  window.setTimeout(function() {
    var alertT = '.alert-' + type;
    // TODO :: Implement JQuery fade out of alert.
    // $("#error").fadeOut();
    $(alertT).alert('close');
  }, 2000);
});


/**
 * When the document is loaded... Styling and editor specific code.
 */
$(document).ready(function() {
  // Init Ace editor
  var editor = ace.edit("editor");
  // Get Ace editor session
  var session = editor.getSession();
  // Set language
  editor.getSession().setMode("ace/mode/markdown");
  // Set markeded renderer options
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
  marked.setOptions({
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  });
  // First initial render becuase of data injection from main process
  var text = editor.getValue();
  document.getElementById('previewText').innerHTML = marked(text);
  // Continous render on every change as recognized by ace editor
  editor.getSession().on('change', function(e) {
    var text = editor.getValue();
    document.getElementById('previewText').innerHTML = marked(text);
    hljs.initHighlightingOnLoad();
  });

  // Attempted implementation of matching scroll positions
  // TODO :: Change from actual position to a ratio.  That might work better
  session.on('changeScrollTop', function(scroll) {
    console.log(session.getScreenLength());
    // console.log("SCROLL: " + scroll);
    // console.log((scroll / session.getScreenLength()) * 10);
    window.scrollTo(0, scroll);
  });

  // Scroll percentage from TODO attmepted.
  /*
  var scrollPercentage = 100 * this.scrollBottom / (this.scrollHeight - this.clientHeight);
  $(window).scroll(function() {
    // session.setScrollTop($(window).scrollTop());
  });
  */
});