# LAN_Transfer_WebSite

## 1)The program, and his functions.

### General overview of the program.
The device that is hosting the server will be able to store and manage files(upload, download, delete and see the content) in the 'uploads' folder in the host machine. Those files in this folder can be accessed by other devices, if they are connected in the same network by using (in the browser) the ip visible in the terminal (Host Ip) (or localhost, if we wanted to access in the host device)

When activated the server on terminal, we will redirected to a web page that have a simple login form, with only the username(optional).

When signin it (shows on the server terminal the name of the user, user lan ip and device name) we will be redirect to main page who has 6 options - show files on host machine, upload, download, delete file, disconnect and delete all files.

### Some functions in the web server.
***SHOW FILES ON SERVER***

On screen will be visible the files that are stored on 'uploads' folder and their respectivly type.

***UPLOAD***

The upload button send the file previously selected and saves it on a folder named 'uploads' on the device that is hosting the server. Meanwhile in the terminal is visible the name of the file, type, the size in bytes and the user who uploaded.
If the file was sucessufuly uploaded it will return to the home page.

***DOWNLOAD***

In this section it is visible two boxes to fill information about the file we want to download (the name of the file and next the type of the file).

Is also avaliable a button that downloads a simple .txt file that shows the content(name and type of the file) of the uploads folder. With this information we can download the file we pretend to see, by filling the form.

***DELETE FILE***

This page is very similar with the previous one but instead filling the info to download a certain file we delete it from the host computer.

***DELETE ALL***

When pressed this option it will show a caution message that say the danger of losing all files on server.

***DISCONNECT***

This options logs out from atual page and redirects to login page who we need to do the signin again to re-enter to main menu.

## 2)How to run the server and what you need to properly run it.

To properly run the server the user need to download node.js (https://nodejs.org/en/). When installed search the server.bat file in folder directory to start the terminal.

Next, enjoy :)
