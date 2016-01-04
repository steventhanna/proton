// Module to control application life.
var app = require('app');
// Module to create native browser window.
var BrowserWindow = require('browser-window');
// Module to create the application menu
var Menu = require('menu');
// Module to create the individual items within the menu
var MenuItem = require('menu-item');
// Module to handle communication between main and renderer processes
var ipc = require('ipc');
// Module to handle native dialog boxes
var dialog = require('dialog');
// Module to control file creation
var fs = require('fs');
// Module to create a PDF from HTML content
var pdf = require('html-pdf');
// Module to render Markdown into HMTL
var marked = require('marked');
// Module to manage desktop integration
var shell = require('shell');

// Set marked renderer settings
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

// Initialize the menu
var menu = new Menu();

// Report crashes to the Electron server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var init = false;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // Checks to see if app.on('ready') has been run yet
  if (init == true) {
    app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  init = true;
  mainWindow = new BrowserWindow({
    // These values really don't matter, since the window will just be maximized
    width: 800,
    height: 600,
    icon: "proton.png"
  });

  // Make the window fill the screen
  mainWindow.maximize();

  // Load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');


  // Open the DevTools.
  // mainWindow.openDevTools();

  // Global filename
  var filename;
  // Global Extension
  var extension;

  /**
   * save file function
   * @param arg :: Not going to lie... I don't remember what arg does.
   */
  function save(arg) {
    if (filename != undefined) {
      fs.writeFile(filename, arg, 'utf8', function(err) {
        if (err) {
          // There was an error in the process of saving the file
          console.log(err);
          error('danger', "<strong>Uh-Oh!</strong> The file could not be saved");
          throw err;
        } else {
          error('success', "<strong>Success!</strong> File Saved");
          return true;
        }
      });
    } else {
      // Most likely, the save was aborted by the user
      return false;
    }
  }

  /**
   * error function.  Sends an error message to the renderer process
   * @param type :: common bootstrap error types.  'succcess', 'danger', 'warning'
   * @param message :: the message of the error
   */
  function error(type, message) {
    var data = {
      type: type,
      message: message
    };
    mainWindow.send('error', data);
  }

  // The menu.  This is where most of the work is being done.
  var appmenu_template = [{
    label: 'Proton',
    submenu: [{
        // About the project
        label: 'About Proton',
        click: function() {
          shell.openExternal('https://steventhanna.github.io/proton');
        }
      }, {
        type: 'separator'
      }, // {
      // Preferences
      // TODO :: Implement this
      // label: 'Preferences',
      // accelerator: 'CmdOrCtrl+,',
      // click: function() {
      //   console.log("Preferences");
      // }
      /* }, */
      {
        // Quit the application
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          app.quit();
        }
      }
    ]
  }, {
    label: 'File',
    submenu: [{
      // Open a file and send its data to the renderer process
      label: 'Open File',
      accelerator: 'CmdOrCtrl+O',
      click: function() {
        var fileArray = dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{
            name: 'Markdown',
            extensions: ['md']
          }],
        });
        // Since we do not have multiple selections enabled, only take first
        // item in first index
        if (fileArray != undefined && fileArray.length !== 0) {
          filename = fileArray[0];
          filenameArr = filename.split('.');
          // Extension is really not needed, but I'll leave it here for now.
          extension = filenameArr[1];
        } else {
          // error('danger', "There was a problem.");
          // Opening was probably aborted
          console.log("Well, there seems to be a problem with the file array");
          return;
        }
        console.log(filename);
        if (filename == undefined) {
          error('danger', "<strong>Uh-Oh!</strong> The file could not be opened.");
          // dialog.showErrorBox("Uh-Oh!", "The file could not be opened. -1");
        } else {
          try {
            var data = fs.readFile(filename, 'utf8', function(err, data) {
              if (err) {
                error('danger', "<strong>Uh-Oh!</strong> The file could not be opened.");
                throw err;
              }
              if (mainWindow.send('fileContent', data)) {
                mainWindow.send('extension', extension);
              }
              mainWindow.setTitle(filename + " | Proton");
            });
          } catch (err) {
            // dialog.showErrorBox("Uh-Oh!", "The file could not be opened. -2");
            error('danger', "<strong>Uh-Oh!</strong> The file could not be opened.");
            console.log(err);
          }
        }
      }
    }, {
      label: 'New File',
      accelerator: 'CmdOrCtrl+N',
      click: function() {
        console.log(filename);
        // Ready var to see if saving is complete
        var ready = false;
        if (filename != undefined) {
          // Save the filename
          mainWindow.send('getSave');
          ipc.on('fileSave', function(event, arg) {
            // Error's are handled internally in the save function
            save(arg);
          });
          ready = true;
        } else {
          // Check if there is any content
          mainWindow.send('getSave');
          ipc.on('fileSave', function(event, arg) {
            // There is content, and the file has not been previously saved
            if (arg.length !== 0) {
              // Prompt the user if they would like to save
              var options = {
                type: "question",
                buttons: ["Save", "Cancel"],
                message: "Do you want to save?",
                detail: "The file has not been saved.",
              }
              dialog.showMessageBox(mainWindow, options, function(response) {
                if (response == 0) {
                  // 'Save as' the file
                  var file;
                  dialog.showSaveDialog(mainWindow, function(fileName) {
                    file = fileName;
                    filename = file;
                    mainWindow.send('getSaveAs');
                  });
                  ipc.on('fileSaveAs', function(event, arg) {
                    save(arg);
                    ready = true;
                    mainWindow.send('fileContent', "");
                  });
                }
              });
            }
          });
        }

        if (ready == true) {
          mainWindow.setTitle("Proton");
          filename = undefined;
          mainWindow.send('fileContent', "");
        }
      }
    }, {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: function() {
        if (filename == undefined) {
          error('warning', "The file not been saved yet.  Use <strong>Save As</strong>");
        }
        console.log("Starting file save");
        mainWindow.send('getSave');
        ipc.on('fileSave', function(event, arg) {
          // Error's are handled internally in the save function
          save(arg);
        });
      },
    }, {
      label: 'Save As',
      accelerator: 'CmdOrCtrl+Shift+S',
      click: function() {
        var file;
        dialog.showSaveDialog(mainWindow, function(fileName) {
          file = fileName;
          filename = file;
          mainWindow.send('getSaveAs');
        });
        ipc.on('fileSaveAs', function(event, arg) {
          if (save(arg)) {
            var data = fs.readFile(filename, 'utf8', function(err, data) {
              if (err) {
                error('danger', "<strong>Uh-Oh!</strong> The file could not be loaded.");
                throw err;
              }
              mainWindow.send('fileContent', data);
            });
          }
          mainWindow.setTitle(filename + " | Proton");
        });
      }
    }, {
      label: 'Export to PDF',
      accelerator: 'CmdOrCtrl+E',
      click: function() {
        var options = {
          format: 'Letter',
          border: {
            top: '.5in',
            right: '.25in',
            bottom: '.5in',
            left: '.25in'
          },
        };
        if (filename == undefined) {
          error('danger', "<strong>Uh-Oh!</strong> No active file to export.");
        } else {
          dialog.showSaveDialog(mainWindow, function(destination) {
            if (filename != undefined && destination != undefined) {
              fs.readFile(filename, 'utf8', function(err, data) {
                // if (err) throw err;
                var info = marked(data);
                info = '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/styles/default.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script><link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/css/bootstrap-markdown.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/js/bootstrap-markdown.min.js"></script><style>.markdown-body{min-width:200px;max-width:790px;margin:0 auto;padding:30px}</style><div class="container"><div class="markdown-body">' + info + "</div></div>";
                // Remove exention
                pdf.create(info, options).toFile(destination, function(err, res) {
                  if (err) {
                    error('danger', "<strong>Uh-Oh!</strong> There was an error exporting to PDF.");
                    throw err;
                  } else {
                    error('success', "<strong>Success!</strong> Markdown has been converted to PDF.");
                  }
                  console.log(res);
                });
              });
            }
          });
        }
      }
    }, {
      label: 'Export to HTML',
      accelerator: 'CmdOrCtrl+Shift+E',
      click: function() {
        var options = {
          format: 'Letter',
          border: {
            top: '.5in',
            right: '.25in',
            bottom: '.5in',
            left: '.25in'
          },
        };
        if (filename == undefined) {
          error('danger', "<strong>Uh-Oh!</strong> No active file to export.");
        } else {
          dialog.showSaveDialog(mainWindow, function(destination) {
            if (filename != undefined && destination != undefined) {
              fs.readFile(filename, 'utf8', function(err, data) {
                // if (err) throw err;
                var info = marked(data);
                info = '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/styles/default.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script><link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/css/bootstrap-markdown.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/js/bootstrap-markdown.min.js"></script><style>.markdown-body{min-width:200px;max-width:790px;margin:0 auto;padding:30px}</style><div class="container"><div class="markdown-body">' + info + "</div></div>";
                // Write the data
                fs.writeFile(destination, info, function(err) {
                  if (err) {
                    error('danger', "<strong>Uh-Oh!</strong> There was an error exporting to HTML.");
                    throw err;
                  } else {
                    error('success', "<strong>Success!</strong> Markdown has been converted to HTML.");
                  }
                });
              });
            }
          });
        }
      }
    }]
  }, {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }, ]
  }, {
    label: 'Window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'Command+M',
      click: function() {
        if (mainWindow.isMinimized() == true) {
          mainWindow.restore();
        } else {
          mainWindow.minimize();
        }
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: 'Command+Enter',
      click: function() {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  }, {
    label: 'Help',
    submenu: [{
      label: 'Report Issue',
      click: function() {
        shell.openExternal('https://github.com/steventhanna/proton/issues');
      }
    }, {
      label: 'View Source Code on GitHub',
      click: function() {
        shell.openExternal('https://github.com/steventhanna/proton/');
      }
    }]
  }]
  var appmenu = Menu.buildFromTemplate(appmenu_template)
  Menu.setApplicationMenu(appmenu)

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});