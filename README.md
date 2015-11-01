# Proton
A stand-alone application to quickly preview and edit Markdown files using Electron.

![Proton Screenshot](http://steventhanna.github.io/proton/proton-image.png)

## Purpose
As a college student, I needed a way to quickly take rich notes in class.  I have long been a proponent of the Markdown Language, so I decided to download [MacDown](http://macdown.uranusjr.com/) for easy rendering and viewing.  However, upon an OS update on my local machine, the Markdown rendering broke.  Thus, I decided to build my own open-sourced version that is supported on Windows, OSX, and Linux machines using the [Electron Framework](https://github.com/atom/electron).

## Installing
### Mac OS X
1. Download the [Zip File](https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-OSX.zip). 
2. Unzip the file.
3. Move `Proton.app` to your Applications Folder. 

### Windows
1. Download the [Zip File](https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-Windows.zip).
2. Unzip the file.
3. Move the `Proton.exe` to your desired destination for installed applications.

### Linux
#### Ubuntu (From PPA)
_Coming soon_

#### Ubuntu (.deb)
1. Download the [.deb file](https://github.com/steventhanna/proton/releases/download/v0.1.0/proton_0.1.0_amd64.deb) (amd64 only -- _more support coming soon_)
    ```shell 
        $: cd ~/Downloads
        $: wget https://github.com/steventhanna/proton/releases/download/v0.1.0/proton_0.1.0_amd64.deb
    ```
2. Install Proton from the .deb file.
    ```shell
        sudo dpkg -i proton_0.1.0_amd64.deb
    ```
    
#### Linux (Binary)
1. Download and Install the Binary. ([x64](https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-Linux_0.1.0_x64.tar.gz)) ([ia32](https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-Linux_0.1.0_ia32.tar.gz))
    ```shell
        $: cd ~/Download
        
        # For x64
        $: wget https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-Linux_0.1.0_x64.tar.gz
        $: tar -xzf Proton-Linux_0.1.0_x64.tar.gz
        $: mkdir /opt/Proton
        $: cd /opt/Proton
        $: mv ~/Downloads/Proton-Linux_0.1.0_x64/* .
        
        # For ia32
        $: wget https://github.com/steventhanna/proton/releases/download/v0.1.0/Proton-Linux_0.1.0_ia32.tar.g
        $: tar -xzf Proton-Linux_0.1.0_ia32.tar.gz
        $: mkdir /opt/Proton
        $: cd /opt/Proton
        $: mv ~/Downloads/Proton-Linux_0.1.0_ia32/* .
    ```

## Building
1. Clone repo: `git clone git@github.com:steventhanna/proton.git`
2. Change to repo: `cd PATH$TO$REPO`
3. Install dependencies: `npm install`

### Usage
1. Start electron: `electron .`

## Tests
_Coming Soon_

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout my-new-feature`
3. Commit your changes
4. Submit a pull request

## License
Proton is licensed under the GNU General Public License.  Read the license [here](https://github.com/steventhanna/proton/blob/master/license).

## Built On
- [Electron](https://github.com/atom/electron)
- [Bootstrap](http://getbootstrap.com)
- [Marked.js](https://github.com/chjj/marked)
- [Ace Editor](http://ace.c9.io/#nav=about)
- [Hack Typeface](https://github.com/chrissimpkins/Hack)
- [html-pdf](https://github.com/marcbachmann/node-html-pdf)
