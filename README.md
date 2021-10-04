# LAN_Transfer_WebSite

## 1)The program, and his functions.

### General overview of the program.
The device that is hosting the server will be able to store and manage files(upload, download, delete and see the content) in the 'uploads' folder in the host machine. Those files in this folder can be accessed by other devices, if they are connected in the same network by using (in the browser) the ip visible in the terminal (Host Ip) (or localhost, if we wanted to access in the host device)

![serverstart](https://user-images.githubusercontent.com/61146730/135846159-10ffc2e4-ac52-4d20-88a6-d36602c2330d.PNG)

When activated the server on terminal, we will redirected to a web page that have a simple login form, with only the username(optional).

![1](https://user-images.githubusercontent.com/61146730/135845518-ade374e4-1441-44ae-bd54-4a9f3e28133b.PNG)

When signin it (shows on the server terminal the name of the user, user lan ip and device name) we will be redirect to main page who has 6 options - show files on host machine, upload, download, delete file, disconnect and delete all files.

![login](https://user-images.githubusercontent.com/61146730/135845566-da12e881-e5f0-4735-855b-a6f4658ce3c8.PNG)

![2](https://user-images.githubusercontent.com/61146730/135845537-f6f27019-6b4e-4e29-9da9-9ab67ed06561.PNG)


### Some functions in the web server.
***SHOW FILES ON SERVER***

On screen will be visible the files that are stored on 'uploads' folder and their respectivly type.

![showfilesserver](https://user-images.githubusercontent.com/61146730/135845324-1a5c7097-547d-47f0-bf39-e23144bdf5b8.PNG)

***UPLOAD***

The upload button send the file previously selected and saves it on a folder named 'uploads' on the device that is hosting the server. Meanwhile in the terminal is visible the name of the file, type, the size in bytes and the user who uploaded.
If the file was sucessufuly uploaded it will return to the home page.

![fileUploaded](https://user-images.githubusercontent.com/61146730/135845372-69b2fa6f-7ab8-40f4-a55d-42365887c593.PNG)

***DOWNLOAD***

In this section it is visible two boxes to fill information about the file we want to download (the name of the file and next the type of the file).

Is also avaliable a button that downloads a simple .txt file that shows the content(name and type of the file) of the uploads folder. With this information we can download the file we pretend to see, by filling the form.

![downloadsite](https://user-images.githubusercontent.com/61146730/135845881-6ed77558-1a65-4529-b3af-cebf1e702f15.png)

![downloadterminal](https://user-images.githubusercontent.com/61146730/135845886-d4e3b4ff-618d-4d26-95bc-43d5ce499a2d.png)

***DELETE FILE***

This page is very similar with the previous one but instead filling the info to download a certain file we delete it from the host computer.

![delete](https://user-images.githubusercontent.com/61146730/135845975-e25bbd67-2ab5-4f28-94aa-f80990834e01.PNG)


***DELETE ALL***

When pressed this option it will show a caution message that say the danger of losing all files on server.

![deleteall](https://user-images.githubusercontent.com/61146730/135845418-20402add-cd43-48fe-9143-944fb354d486.PNG)

***DISCONNECT***

This options logs out from atual page and redirects to login page who we need to do the signin again to re-enter to main menu.

![disconnect](https://user-images.githubusercontent.com/61146730/135846034-d3fc5d74-413e-4b8e-9467-f3be8c24b1f3.PNG)


## 2)How to run !
the server and what you need to properly run it.

To properly run the server the user need to download node.js (https://nodejs.org/en/). When installed search the server.bat file in folder directory to start the terminal.

![serverstart](https://user-images.githubusercontent.com/61146730/135845276-30bddca6-bca6-4724-bb9d-ac8accf8913a.PNG)

Next, enjoy :)

