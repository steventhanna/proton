// IPC for communication with main process
const ipc = require('electron').ipcRenderer;
// The marked rendering library
// var marked = require('marked');

/**
 * file-contents
 * Sends contents of markdown file from main process to renderer
 */
ipc.on('file-contents', (event, contents) => {
  var editor = ace.edit("editor");
  editor.setValue(contents);
  document.getElementById('previewText').innerHTML = marked(contents);
  hljs.initHighlightingOnLoad();
});

/**
 * Save function sent from main process to renderer process.
 * Get the file content and send it back to the main process for standard save.
 */
ipc.on('getSave', (event, fileData) => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  ipc.send('fileSave', fileData);
});

/**
 * Save function sent from main process to renderer process.
 * Get the file content and send it back to the main process for exporting to HTML.
 */
ipc.on('getSaveHTML', (event, fileData) => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  ipc.send('fileSaveHTML', fileData);
});


/**
 * getSaveAs function sent from main process to renderer processs.
 * Get the file content and send it back to the main process for save as.
 */
ipc.on('getSaveAs', (event, fileData) => {
  var editor = ace.edit("editor");
  var fileData = editor.getValue();
  ipc.send('fileSaveAs', fileData);
});

ipc.on('check-content', (event, data) => {
  var editor = ace.edit("editor");
  ipc.send("checked-content", editor.getValue());
});

/**
 * error function handles errors sent from the main process.
 * Errors should appear on the rendered side of the display.
 */
ipc.on('error', (event, errorMessage) => {
  var type = errorMessage.type;
  var message = errorMessage.message;
  document.getElementById('error').innerHTML = '<div style="margin-right: 10px; position: relative;" class="alert alert-' + type + ' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>';
  $("#error").fadeIn();
  window.setTimeout(function() {
    var alertT = '.alert-' + type;
    // TODO :: Implement JQuery fade out of alert.
    $("#error").fadeOut();
    // $(alertT).alert('close');
  }, 3000);
});


/**
 * When the document is loaded... Styling and editor specific code.
 */
$(document).ready(function() {
  // Init Ace editor
  ipc.send('get-settings');
  var editor = ace.edit("editor");
  // editor.setTheme("ace/theme/tomorrow_night_eighties");
  editor.getSession().setUseWrapMode(true);
  editor.setShowPrintMargin(false);
  editor.renderer.setShowGutter(false);
  document.getElementById('editor').style.fontFamily = 'Hack, monospace';
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
  });
  // document.getElementById('editor').style.fontSize = '14px';
  // Render on each change
  hljs.initHighlightingOnLoad();
  editor.$blockScrolling = Infinity;
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

  ipc.on('page-settings', (event, data) => {
    console.log(data);
    if (data.theme != undefined) {
      changed = true;
      var temp = data.theme.toLowerCase();
      while (temp.includes(" ")) {
        temp = temp.replace(" ", "_");
      }
      console.log(temp);
      editor.setTheme('ace/theme/' + temp);
    }
    editor.setFontSize(data.fontSize + "px");
    editor.renderer.setShowGutter(data.lineNumbers);
    editor.session.setTabSize(data.tabSize);
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
    // console.log("SCROLL: " + scroll);
    // console.log((scroll / session.getScreenLength()) * 10);
    window.scrollTo(0, scroll);
  });

});
