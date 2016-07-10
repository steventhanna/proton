/**
 * Proton
 * A stand-alone application to quickly preview and edit Markdown files using Electron
 * @author Steven T Hanna :: github.com/steventhanna
 */

"use strict";

const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const Menu = electron.Menu;
const dialog = electron.dialog;

const ipc = require('electron').ipcMain;

// Module for file handling
const fs = require('fs');

// Module to control application life.
const {
    app
} = electron;
// Module to create native browser window.
const {
    BrowserWindow
} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Global reference of the current file path
var globalFilePath;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    win.once('ready-to-show', () => {
        win.maximize();
        win.show();
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

app.on('browser-window-created', function() {
    let reopenMenuItem = findReopenMenuItem();
    if (reopenMenuItem) reopenMenuItem.enabled = false;
});

app.on('window-all-closed', function() {
    let reopenMenuItem = findReopenMenuItem();
    if (reopenMenuItem) reopenMenuItem.enabled = true;
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

/**
 * Read File
 * Reads a file and returns the specificed contents
 * @param filePath :: the path of the file requested
 * @param calback :: contents :: the contents of the file
 */
function readFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            sendErrorMessage(err);
            callback();
        } else {
            callback(data);
        }
    });
}

/**
 * Write file
 * Write a file to the specified location
 * @param filePath :: the path to write the file too
 * @param contents :: the contents to put in the file
 */
function writeFile(filePath, contents) {
    if (filePath != undefined) {
        fs.writeFile(filePath, contents, (err) => {
            if (err) {
                error('danger', "<strong>Uh-Oh!</strong> There was an error saving the file.");
            } else {
                error("success", "<strong>Success!</strong> The file has been saved.");
            }
        });
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
    win.webContents.send('error', data);
}

/**
 * Select File Dialog
 * The standard dialog to select a file
 * @return callback :: the path of the file selected
 */
function selectFileDialog(callback) {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
            name: 'Markdown',
            extensions: ['md']
        }]
    }, function(file) {
        if (file == undefined) {
            sendErrorMessage("There was an error finding the file");
            callback();
        } else {
            callback(file[0]);
        }
    });
}

/**
 * Save File Dialog
 * The standard dialog to save a file
 * @return callback :: the path of the file to save
 */
function saveFileDialog(callback) {
    dialog.showSaveDialog({
        filters: [{
            name: 'Markdown',
            extensions: ['md']
        }]
    }, function(filePath) {
        // Get the content from the renderer
        win.webContents.send('getSaveAs');
        ipc.on('fileSaveAs', function(event, data) {
            writeFile(filePath, data, function(callback) {
                error('success', "<strong>Success!</strong> File Saved");
                callback();
            });
        });
        callback();
    });
}

ipc.on('fileSave', function(event, data) {
    writeFile(globalFilePath, data);
});



let menuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: function() {
            if (globalFilePath != undefined) {
                win.webContents.send('getSave');
                globalFilePath = undefined;
                win.webContents.send('file-contents', "");
            } else {
                // Check if there is any content
                win.webContents.send('check-content');
                ipc.on('checked-content', function(event, data) {
                    if (data == undefined || data.length == 0) {
                        // No data to be saved
                        win.webContents.send('file-contents', "");
                    } else {
                        // Find out if the content should be saved
                        var options = {
                            type: 'question',
                            buttons: ["Save", "Cancel"],
                            message: "Do you want to save?",
                            detail: "There are unsaved changes, and the file has not yet been saved."
                        };
                        dialog.showMessageBox(options, function(index) {
                            if (index == 0) {
                                // Save as the file
                                saveFileDialog(function() {
                                    win.webContents.send('file-contents', "");
                                });
                            } else {
                                win.webContents.send('file-contents', "");
                            }
                        });
                    }
                });
            }

        }
    }, {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function() {
            // Open a new file and either put it in the same window
            // or put it in a new window
            selectFileDialog((files) => {
                globalFilePath = files;
                readFile(files, (content) => {
                    // Send to page
                    win.webContents.send('file-contents', content);
                });
            });
        }
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function() {
            // Save a file
            if (globalFilePath == undefined) {
                error('danger', "<strong>Uh-Oh!</strong> Use Save-As instead");
            } else {
                win.webContents.send('getSave');
            }
        }
    }, {
        label: 'Save As',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function() {
            // Save as a new file
            saveFileDialog();
        }
    }, {
        type: 'separator'
    }, {
        label: 'Export to PDF',
        accelerator: 'CmdOrCtrl+E',
        click: function() {
            // TODO :: Export to PDF
        }
    }, {
        label: "Export to HTML",
        accelerator: 'CmdOrCtrl+R',
        click: function() {
            // TODO :: Export to HTML
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
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function(win) {
                        if (win.id > 1) {
                            win.close();
                        }
                    });
                }
                focusedWindow.reload();
            }
        }
    }, {
        label: 'Toggle Full Screen',
        accelerator: (function() {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F';
            } else {
                return 'F11';
            }
        })(),
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        }
    }, {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }
    }, {
        type: 'separator'
    }, {
        label: 'App Menu Demo',
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                const options = {
                    type: 'info',
                    title: 'Application Menu Demo',
                    buttons: ['Ok'],
                    message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
                }
                electron.dialog.showMessageBox(focusedWindow, options, function() {})
            }
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function() {
            app.emit('activate');
        }
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'Learn More',
        click: function() {
            electron.shell.openExternal('https://github.com/steventhanna/proton');
        }
    }]
}]

function addUpdateMenuItems(items, position) {
    if (process.mas) return;

    const version = electron.app.getVersion();
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }, {
        label: 'Checking for Update',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'Check for Update',
        visible: false,
        key: 'checkForUpdate',
        click: function() {
            require('electron').autoUpdater.checkForUpdates();
        }
    }, {
        label: 'Restart and Install Update',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function() {
            require('electron').autoUpdater.quitAndInstall();
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu();
    if (!menu) return;

    let reopenMenuItem;
    menu.items.forEach(function(item) {
        if (item.submenu) {
            item.submenu.items.forEach(function(item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item;
                }
            });
        }
    });
    return reopenMenuItem;
}

if (process.platform === 'darwin') {
    const name = electron.app.getName();
    menuTemplate.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
                app.quit()
            }
        }]
    });

    // Window menu.
    menuTemplate[3].submenu.push({
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    });

    addUpdateMenuItems(menuTemplate[0].submenu, 1);
}

if (process.platform === 'win32') {
    const helpMenu = menuTemplate[menuTemplate.length - 1].submenu;
    addUpdateMenuItems(helpMenu, 0);
}
