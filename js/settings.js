// IPC for communication with main process
const ipc = require('electron').ipcRenderer;
// The marked rendering library
// var marked = require('marked');


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

function themeChange(value) {
  ipc.send('update-theme', value);
}

/**
 * When the document is loaded... Styling and editor specific code.
 */
$(document).ready(function() {
  ipc.send('get-settings');

  $("#keyboardHandler").on('change', function(e) {
    ipc.send('update-key-handler', $(this).val());
  });

  $("#theme").on('change', function(e) {
    ipc.send('update-theme', $(this).val());
  });

  $("#fontSize").on("input", function() {
    ipc.send('update-font-size', $("#fontSize").val());
  });

  $("#tabSize").on("input", function() {
    ipc.send('update-tab-size', $("#tabSize").val());
  });

  $("#lineNumbers").on('change', function() {
    if ($("#lineNumbers").prop('checked')) {
      ipc.send('update-line-numbers', true);
    } else {
      ipc.send('update-line-numbers', false);
    }
  });

  ipc.on('page-settings', (event, data) => {
    // Set the settings attribute
    $("#theme").val(data.theme);
    $("#fontSize").val(data.fontSize);
    document.getElementById('lineNumbers').checked = data.lineNumbers;
    $("#tabSize").val(data.tabSize);
    $("#keyboardHandler").val(data.keyboardHandler);
  });
});
