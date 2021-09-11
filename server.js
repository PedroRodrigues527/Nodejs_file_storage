/*npm express-fileupload*/
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express')
const upload = require('express-fileupload')
//var alert = require("alert-node")
//const flash = require('connect-flash');
var fs = require("fs"); //load filesystem module
var path = require('path');
var router = express.Router()
const app = express();
/*npm i --S express-device , npm install i --S express-device*/
var device = require('express-device')
var i = 0
var userNumbers = 0
var port = 8000
//npm install nodemailer -> to send emails
var nodemailer = require("nodemailer")

var username = ""
var password = ""
var emailUser = ""

//npm install ip
var ip = require("ip");
var Hostip = ip.address()
var userIp;

var uploadSize = 0;
var fileText = "";
var fileArray = [];

var crypto = require("crypto"); //to generate random letters
global.checkCode  = crypto.randomBytes(20).toString('hex');

//install npm install ejs

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpass'
    }
});

//Send Email with code to delete all files
var mailOptionsCodeDelete = { 
    from: 'youremail@gmail.com',
    to: 'xxx@gmail.com',
    subject: 'VerifyCode',
    text: "Code: " + checkCode,
};

/*
transporter.sendMail(mailOptions, (error,info)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Email sent' + info.response)
    }
});*/


global.auth = false;

global.username = "";

global.date_ob = new Date()

app.use(device.capture())

app.use(upload())

app.use(express.static(__dirname + '/'));

app.engine('html', require('ejs').renderFile);

const bodyParser = require('body-parser');


app.get('/', (req, res) => {
   // console.log("IP conected: " + req.connection.remoteAddress)
   // console.log("Device: "+req.device.type.toUpperCase())
   /* app.post('/', function (req, res) {
        var name = req.body
        console.log("user name: "+ name)
    });*/
    //res.sendFile(__dirname + '/view/createUser.html');
    res.sendFile(__dirname + '/view/connection.html');
    //console.log("teste1")
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/createUser', (req, res) =>{
    res.sendFile(__dirname + "/view/createUser.html")
})

app.post('/createUser', (req, res) =>{
    username = req.body.nameUser
    password = req.body.passUser
    emailUser = req.body.emailUser

    console.log("")
    console.log("Registration")
    console.log("Username: " + username)
    console.log("Password: " + password)
    console.log("Email user: " + emailUser)

    var directoryPath = path.join(__dirname, '/users/');

    //check if exist same name or email **********
    fs.readdir(directoryPath, function (err, files) {
        console.log("1")
        //handling error
        text1 = "User: " + username + " / " + " Password: " + password + " / " + " Email: " + emailUser
        if (err) {
            return console.log('Unable to scan directory: ' + err);
            
        }
        /*
        if(files.length == 0){
            //if not, create file txt that saves info the go to /login **********
            //needs directory of upload folder
            //text1 = "User: " + username + " / " + " Password: " + password + " / " + " Email: " + emailUser
            //console.log("4")
            fs.writeFile(__dirname + "/users/user" + userNumbers + ".txt", text1 , function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Entrou vazio");
                userNumbers++
                res.download(__dirname + "/users/user")
                res.redirect('/')
            });
            //console.log("5")
        }*/
        else{
            //var fileControl = 0;
            //listing all files using forEach
            console.log("Entrou com");
            files.forEach(function (file) {
                //console.log("2")
                fs.readFile(path.join(directoryPath + file), function (err, data) {
                    if (err) return console.log(err);
                    
                    if(data.includes(username) || data.includes(emailUser)){ //exist other account with the same username
                        console.log(data)
                        console.log("already exist same username or email")
                        res.sendFile(__dirname + '/view/connection.html');
                    }
                    else{
                        console.log("Entrou direito");
                        //text1 = "User: " + username + " / " + " Password: " + password + " / " + " Email: " + emailUser
                        //console.log("4")
                        fs.writeFile(directoryPath + "/user" + userNumbers + '.txt', text1 , function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            //console.log("The file was saved!");
                            userNumbers++
                            //res.download(__dirname + "/users/user")
                        });
                    }
                });
            });
        }
    });
    res.redirect('/')
})

app.post('/login', function (req, res) {
    /*username = req.body.name
    password = req.body.password*/

    if(username !="" &&password == "123" || auth == true){
        console.log("")
        console.log("*** User Connected ***")
        console.log("Username: "+ username)

        /*
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
              console.log("Email sent!")
            }
          });*/
        //console.log("Email sent!")
        auth = true;
        res.redirect('/connect')
        
    }else{
        //console.log("Login incorrect Please try again!")
        //console.log("");
        res.redirect('/')
    }
});

app.get('/connect', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        //console.log("fileName: " + req.body.filename)
        //console.log("Name: " + req.body.name)
        userIp = req.connection.remoteAddress
        console.log("IP: " + req.connection.remoteAddress)
        console.log("Device: "+req.device.type.toUpperCase())
        console.log("");
        res.redirect('/mainmenu')
    }
})

//https://www.geeksforgeeks.org/how-to-pass-access-node-js-variable-to-an-html-file-template/
app.get('/mainmenu', (req, res) => {
    if(auth==false){
        res.redirect('/')
    }
    else{
        //res.sendFile(__dirname + '/view/main.html')
        res.render(__dirname + '/view/main.html', {username:username,Hostip:Hostip,userIp:userIp})
    }

    //console.log("IP conected: " + req.connection.remoteAddress)
    //console.log("Device: "+req.device.type.toUpperCase())
})

//Logout from the website
app.get('/disconnect', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        auth = false
        console.log("*** User Disconnected *** ")
        console.log("Username: " + username)
        console.log("IP disconected: " + req.connection.remoteAddress)
        console.log("Device: "+req.device.type.toUpperCase())
        res.redirect('/');
    }

})

//Redirect to 'download.html' file
app.get('/download', (req, res) => {
    if(auth==false){
        res.redirect('/')
    }
    else{
    //console.log("entering download");
    res.sendFile(__dirname + '/view/download.html')
    //res.send(namefile.typefile)
    }

})

//Verify user by sending email (previously inserted - above) with 20 caracters code. If correct inserted then it deletes all files
app.get('/deleteCheck', (req, res) =>{
    if(auth){
        transporter.sendMail(mailOptionsCodeDelete, function(error, info){
            if (error) {
              console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
              console.log("*** CODE REQUEST ***")
              console.log("CODE REQUESTED BY: "+ username )
              console.log("Purpose: DELETE ALL FILES ")
            }
          });
        res.sendFile(__dirname + '/view/verifyCode.html')
    }else{
        res.redirect('/')
    }
})

//Verify with code sent by email is the same inserted by the user
app.post('/deleteCheck', (req, res)=>{
    //checkCode = crypto.randomBytes(20).toString('hex');// random code generated by email
    console.log("Check code: " + checkCode)
    if(req.body.verifyCode == checkCode){
        //console.log("post1: " + req.body.verifyCode)
        res.redirect('/deleteall')
    }else{
        //console.log("post2: " + req.body.verifyCode)
        res.redirect('/')
    }
})

var uploadSize = 0

//Deletes all files in 'uploads' folder
//List all files in a path and delete every file in it
app.get('/deleteall', (req, res) =>{
    var fileSeq = 0;
    //number of files in the upload folder
    fs.readdir(__dirname + '/uploads', function(err, files){
        if (err){
            console.log(err)
        }
        console.log("Number of files: " + files.length);//number of files in the 'upload' folder
        console.log("")
        uploadSize = files.length;
        files.forEach(function(file){
        //fileSeq++;
        //console.log("SEQ: " + fileSeq)
            if(fileSeq != files.length){
                fs.unlink(__dirname + '/uploads/'+ file, (err)=>{
                    if (err) {
                        console.error(err)
                    }
                    console.log(fileSeq+1 + ")" + "File: " + file + " DELETED")
                    fileSeq++;
                    //console.log("fileSeq: " + fileSeq)
                })
                //console.log("ALL " + k + " FILES DELETED")
                
            }
        })
    })
    //console.log("ALL " + fileSeq + " FILES DELETED")

    res.redirect('/deletedallfiles');
})

//when deleted all files
app.get('/deletedallfiles', (req, res)=>{
    console.log("ALL " + uploadSize + " FILES DELETED")
    res.redirect('/mainmenu');
})

//Write a .txt file with all files in the 'uploads' folder
app.get('/files', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        var i = 0;
        const directoryPath = path.join(__dirname, '/uploads/');
        //var fileText = "";

        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            
            uploadSize = files.length;
            //listing all files using forEach
            files.forEach(function (file) {
                fileArray[i] = file  + "    "
                i++;
                //fileText += file + "  /  "
            });

            
            //console.log("all files: " + fileText)
            res.redirect('/contentHtml')
        });
        //res.render(__dirname + '/view/content.html', {fileText:fileText})
        
        /*
        //requiring path and fs modules
        //const path = require('path');
        //const fs = require('fs');
        //joining path of directory 
        const directoryPath = path.join(__dirname, '/uploads/');
        var fileText = "";
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                fileText += file + " / "
            });
            //Send a report file to user
            //var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress
            res.attachment('Files in directory ' + '.txt')
            res.type('txt')
            res.send(fileText)
        });
        res.download(__dirname + '/uploads/')*/
    }
})

app.get('/contentHtml', (req, res)=>{
    res.render(__dirname + '/view/content.html', {fileText:fileText, uploadSize:uploadSize, fileArray:fileArray})
})

//To download file
app.post('/downloads', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else if(req.body.namefile == "" || req.body.typefile == ""){
        //alert user to fill the form
        res.redirect('/download')
        //res.redirect('/download')
    }
    else{
        Namefile = req.body.namefile
        Typefile = req.body.typefile
        //console.log(Namefile);
        //console.log(Typefile);
        res.download(__dirname + '/uploads/'+Namefile + "." + Typefile)
        console.log("***File Downloaded***")
        console.log("Username: " + username)
        console.log("File: "+Namefile + "." + Typefile)
        console.log("")
        //res.redirect('/download')
    }
})

app.get('/delete', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        res.sendFile(__dirname + '/view/delete.html')
    }    
})

//Delete a certain file by inserting the name and the type of the file
app.post('/deletefile', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        Namefile = req.body.namefile
        Typefile = req.body.typefile
        //console.log(Namefile);
        //console.log(Typefile);
        app.delete(__dirname + '/uploads/'+Namefile + "." + Typefile)

        fs.unlink(__dirname + '/uploads/'+Namefile + "." + Typefile, (err)=>{
            if (err) {
                console.error(err)
                return
            }
            console.log("***File Deleted***")
            console.log("Username: " + username)
            console.log("File: "+Namefile + "." + Typefile)
            console.log("")
            res.redirect('/delete')
        })
    }
})


app.get('/upload', (req, res) => {
    if(auth==false){
        res.redirect('/')
    }
    else{
        res.sendFile(__dirname + '/view/upload.html')
    }
    //console.log("entering upload");
})

/* https://stackoverflow.com/questions/40509666/sending-whole-folder-content-to-client-with-express */

/* Upload file*/
app.post('/', (req, res) =>{
    if(auth==true){
        if(req.files){


            var file = req.files.file;
            var filename = file.name;
            
            var fileSize = file.size; //Bytes
    
            /*//Input file size
            var stats = fs.statSync(__dirname + filename)
            var fileSizeBytes = stats.size; //Bytes
            var fileSize = fileSizeBytes / (1024*1024);*/
    
            //console.log("Name: " + filename);
            //console.log("Size: " + fileSize + " Bytes")
            var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress + " ,User: " + username
    
            file.mv('./uploads/' + filename, function (err){ //192.168.0.X./uploads?
                console.log("")
                console.log("*** File uploaded ***")
                console.log("User: " + username)
                console.log("Filename: " + filename);
                console.log("Size: " + fileSize + " Bytes")
                //console.log("File:" + file); //[object Object]
                if(err){
                    res.send(err)
                }         
                else{
                    //res.send("file uploaded with sucess")
                    console.log("File Uploaded successfuly!");
                    //console.log("******")
                    console.log("")
                    /*
                    //Send a report file to user
                    //var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress
                    res.attachment('Upload Report ' + i + '.txt')
                    res.type('txt')
                    res.send(text1)*/
    
    
                    //needs directory of upload folder
                    fs.writeFile("./reports/report"+i+".txt", text1 , function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        //console.log("The file was saved!");
                        res.download(__dirname + "/reports/report"+i+".txt")
                    });
                    //i++;

                    //res.sendFile(__dirname + 'alertJSUpload');
                    //res.render("", {message: "File Uploaded successfuly"})
                }
                //res.download(__dirname + "/reports/report"+i+".txt")
                i++;
            });
            //return to main menu
            //console.log("*********")
            res.render(__dirname + '/view/main.html', {username:username,Hostip:Hostip,userIp:userIp})
        }else{
            res.redirect('/mainmenu')
        }
    }
    else{
        res.redirect('/')
    }
})

app.listen(port, function(){
    console.log("**************")
    console.log("SERVER ONLINE")
    console.log("Listening on Port " + port);
    //npm install ip
    //var Hostip = require("ip");
    console.log("Server Local IP: " + ip.address());  
});


/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */
/*https://www.snel.com/support/initial-server-setup-ubuntu-16-04/ */