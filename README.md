# LAN_Transfer_WebSite

## 1)The program, how it works.

Enables the device with is hosting the server to save and transfer files to other devices in the same LAN.

When activated the server on terminal, we will redirected to a web page (main.html) that have a simple login form(with username and password by default: admin and 123 respectevly).

When signin it (shows on the server terminal the name of the user, local ip and device name) has 3 options to upload, download, delete file and disconnect.

***UPLOAD***

The upload button send the file previously selected and saves it on a folder named uploads on the device that is hosting the server. Meanwhile in the terminal is visible the name of the file, type, the size in bytes and the user who uploaded.
If the file was sucessufuly uploaded it will return to the home page.

***DOWNLOAD***

In this section it is visible two boxes to fill information about the file we want to download (the name of the file and next the type of the file).

Is also avaliable a button that downloads a simple .txt file that shows the content(name and type of the file) of the uploads folder. With this information we can download the file we pretend to see.

***DELETE FILE***

In this page is very similar with the previous one but instead to fill the info to download a certain file we delete it from the host computer.

***DISCONNECT***

This options logs out from atual page and redirects to main page who we need to do the signin again to re-enter to main menu.

## 2)How to run the server and what you need to properly run it.
