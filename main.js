var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require('menu');
var MenuItem = require('menu-item');
var ipc = require('ipc');
var dialog = require('dialog');
var fs = require('fs');
var pdf = require('html-pdf');
var marked = require('marked');
var markdownpdf = require('markdown-pdf');

// Init marked
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

var menu = new Menu();

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Make the window fill the screen
  mainWindow.maximize();

  // and load the index.html of the app.
  // Determine extension type
  // I should eventually make a splashscreen
  mainWindow.loadUrl('file://' + __dirname + '/markdown.html');


  // Open the DevTools.
  mainWindow.openDevTools();

  // Global filename
  var filename;
  // Global Extension
  var extension;

  /** Save function **/
  function save(arg) {
    if (filename != undefined) {
      fs.writeFile(filename, arg, 'utf8', function(err) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          return true;
        }
      });
    } else {
      return false;
    }
  }

  var appmenu_template = [{
    label: 'Proton',
    submenu: [{
      label: 'About Proton',
      click: function() {
        ipc.send('open-url-in-external', 'http://github/steventhanna/proton/')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
      click: function() {
        console.log("Preferences");
      }
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function() {
        app.quit();
      }
    }]
  }, {
    label: 'File',
    submenu: [{
      label: 'Open File',
      accelerator: 'CmdOrCtrl+O',
      click: function() {
        var fileArray = dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{
            name: 'Markdown, LaTeX',
            extensions: ['md', 'tex']
          }],
        });
        // Since we do not have multiple selections enabled, only take first
        // item in first index
        if (fileArray != undefined && fileArray.length !== 0) {
          filename = fileArray[0];
          filenameArr = filename.split('.');
          extension = filenameArr[1];
        } else {
          console.log("Well, there seems to be a problem with the file array");
          return;
        }
        console.log(filename);
        if (filename == undefined) {
          dialog.showErrorBox("Uh-Oh!", "The file could not be opened. -1");
        } else {
          try {
            var data = fs.readFile(filename, 'utf8', function(err, data) {
              if (err) throw err;
              if (mainWindow.send('fileContent', data)) {
                mainWindow.send('extension', extension);
              }
              mainWindow.setTitle(filename + " | Proton");
            });
          } catch (err) {
            dialog.showErrorBox("Uh-Oh!", "The file could not be opened. -2");
            console.log(err);
          }
        }
      }
    }, {
      // TODO :: Implement New File
      label: 'New File',
      accelerator: 'CmdOrCtrl+N',
      click: function() {
        console.log("NEW FILE CLICKED");
      }
    }, {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: function() {
        console.log("Starting file save");
        mainWindow.send('getSave');
        ipc.on('fileSave', function(event, arg) {
          if (save(arg)) {
            // Put a banner or a notification in here
          }
        });
      },
    }, {
      label: 'Save As',
      accelerator: 'CmdOrCtrl+Shift+S',
      click: function() {
        var file;
        dialog.showSaveDialog(mainWindow, function(fileName) {
          console.log("DIALOG");
          file = fileName;
          filename = file;
          mainWindow.send('getSaveAs');
        });
        ipc.on('fileSaveAs', function(event, arg) {
          console.log("FILETRIGGER");
          if (save(arg)) {
            var data = fs.readFile(filename, 'utf8', function(err, data) {
              if (err) throw err;
              mainWindow.send('fileContent', data);
              mainWindow.setTitle(filename + " | Proton");
            });
          }
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
        dialog.showSaveDialog(mainWindow, function(destination) {
          if (filename !== undefined) {
            fs.readFile(filename, 'utf8', function(err, data) {
              // if (err) throw err;
              var info = marked(data);
              info = '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/styles/default.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script><link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/css/bootstrap-markdown.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-markdown/2.9.0/js/bootstrap-markdown.min.js"></script><style>.markdown-body{min-width:200px;max-width:790px;margin:0 auto;padding:30px}</style><div class="container"><div class="markdown-body">' + info + "</div></div>";
              // Remove exention
              pdf.create(info, options).toFile(destination, function(err, res) {
                if (err) throw err;
                console.log(res);
              });
            });
          }
        });
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
        ipc.send('open-url-in-external', 'https://github.com/steventhanna/proton/issues')
      }
    }, {
      label: 'View Source Code on GitHub',
      click: function() {
        ipc.send('open-url-in-external', 'https://github.com/steventhanna/proton')
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