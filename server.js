//Modules (npm)  **********
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express')
const upload = require('express-fileupload')
//var alert = require("alert-node")
//const flash = require('connect-flash');
var fs = require("fs"); //load filesystem module
var path = require('path');
var router = express.Router()
const app = express();
var device = require('express-device')//npm i --S express-device , npm install i --S express-device
var nodemailer = require("nodemailer") //npm install nodemailer -> to send emails
var ip = require("ip");//npm install ip
var crypto = require("crypto"); //to generate random letters
const bodyParser = require('body-parser');
const { strictEqual } = require('assert');
//install npm install ejs


//Variables and Constants **********
var i = 0 //Variable that control the number of report + i files
var userNumbers = 0 //Variable that control the number of users 
var port = 80 //PORT 80 HTTP: visible with only the local IP on the browser
var username = "" //Variable to store the username (WITH VERIFICATION)
var password = ""  //Variable to store the password (WITH VERIFICATION)
var emailUser = "" //Variable to store the email (WITH VERIFICATION)
var text1 = "" //Variable that saves the text that will be saved on .txt files
var Hostip = ip.address() //Server IP address
var userIp; //User IP
var uploadSize = 0; //Size of file uploaded
var fileText = ""; //NOT USING??
var fileArray = []; //Stores all file names on upload folder
global.checkCode  = crypto.randomBytes(20).toString('hex'); //Generate 20 caracter code

//Email Configuration(node mailer)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lantransferwebsite@gmail.com',
        pass: 'webserver123'
    }
});
//Send Email with code to delete all files
var mailOptionsCodeDelete = { 
    from: 'lantransferwebsite@gmail.com',
    to: emailUser,
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

global.auth = false; //True if login sucessufuly
global.username = "";
global.sendCode = "";
global.date_ob = new Date()


//CODE **********

app.use(device.capture())

app.use(upload())

app.use(express.static(__dirname + '/'));

app.engine('html', require('ejs').renderFile); //Alows render a page with variables on this javascript file to html



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

/*
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
        //console.log("1")
        //handling error
        text1 = "User: " + username + " / " + " Password: " + password + " / " + " Email: " + emailUser
        if (err) {
            return console.log('Unable to scan directory: ' + err);
            
        }
        else{
            //var fileControl = 0;
            //listing all files using forEach
            //console.log("Entrou com");
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
})*/

/*
//Verifies if a specific file contains a certain string
function verifyInput(directoryPathAndFile, input){
    fs.readFile(directoryPathAndFile, (err, data) => {
        if (err) throw err;
        if(data.includes(input)){
            return true
        }
    })
}*/

app.post('/login', function (req, res) {
    username = req.body.name
    auth = true;
    res.redirect('/connect')


    //var directoryPath = path.join(__dirname, '/users/');
    /*
    //Verify Login
    fs.readdir(directoryPath, function (err, files) {
        files.forEach(function (file) {
            //console.log(vari + files[0])
            actualFile = files[vari]
            var text = fs.readFileSync(__dirname + "/users/" + actualFile, 'utf-8');
            var textByLine = text.split('\n')
            //console.log("file in avaluiation: " + actualFile)
            if (err) {
                return console.log('Unable to scan directory: ' + err);     
            }
            else{ //Scan all .txt files in users to verify if user has an account created
                //console.log(String(textByLine))
                //console.log(String(usernameInput))
                //console.log(String(textByLine).indexOf(String(usernameInput)))
                if(String(textByLine).indexOf(String(usernameInput)) != -1 && String(textByLine).indexOf(String(passwordInput)) != -1){
                    auth = true;       
                    return
                }
            }
            vari ++
        })
        res.redirect('/connect')
    })*/
});

app.get('/connect', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        //console.log("fileName: " + req.body.filename)
        //console.log("Name: " + req.body.name)
        userIp = req.connection.remoteAddress
        console.log("*** User Connected ***")
        console.log("Username: " + username)
        console.log("IP: " + req.connection.remoteAddress)
        console.log("Device: "+req.device.type.toUpperCase())
        console.log("");
        res.redirect('/mainmenu')
    }
})

app.get('/mainmenu', (req, res) => {
    if(auth==false){
        res.redirect('/')
    }
    else{
        //res.sendFile(__dirname + '/view/main.html')
        res.render(__dirname + '/view/main.html', {username:username,Hostip:Hostip,userIp:userIp})
    }
})

//Logout from the website
app.get('/disconnect', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        auth = false
        console.log("")
        console.log("*** User Disconnected *** ")
        console.log("Username: " + username)
        console.log("IP disconected: " + req.connection.remoteAddress)
        console.log("Device: "+req.device.type.toUpperCase())
        console.log("")
        auth = false;
        res.redirect('/');
    }

})

//Redirect to 'download.html' file
app.get('/download', (req, res) => {
    if(auth==false){
        res.redirect('/')
    }
    else{
        res.sendFile(__dirname + '/view/download.html')
    }

})

/*
//Verify user by sending email (previously inserted - above) with 20 caracters code. If correct inserted then it deletes all files
app.get('/deleteCheck', (req, res) =>{
    if(auth == true){
        res.sendFile(__dirname + '/view/sendCode.html')
    }else{
        res.redirect('/')
    }
})

//Sends code the email
app.post('/sendCode', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    emailUser = req.body.sendCode
    console.log("emailUser " + emailUser)
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
    res.redirect('/deleteCheckPage')
})*/

//Delete all files option
app.get('/deleteCheck', (req, res) =>{
    if(auth){
        //console.log("aaaaa1")
        res.sendFile(__dirname + '/view/caution.html')
    }else{
        res.redirect('/')
    }
})

//Verify with code sent by email is the same inserted by the user
app.post('/deleteCheck', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    res.redirect('/deleteall');
    /*
    //checkCode = crypto.randomBytes(20).toString('hex');// random code generated by email
    console.log("Check code: " + checkCode)
    if(req.body.verifyCode == checkCode){
        //console.log("post1: " + req.body.verifyCode)
        res.redirect('/deleteall')
    }else{
        //console.log("post2: " + req.body.verifyCode)
        res.redirect('/')
    }*/
})


//Deletes all files in 'uploads' folder
//List all files in a path and delete every file in it
app.get('/deleteall', (req, res) =>{
    if(auth==false){
        res.redirect('/')
    }
    
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
        //res.redirect('/deletedallfiles');
    })
    //console.log("ALL " + fileSeq + " FILES DELETED")
    res.redirect('/deletedallfiles');
})

//when deleted all files
app.get('/deletedallfiles', (req, res)=>{
    console.log("ALL " + uploadSize + " FILES DELETED")
    console.log("")
    res.redirect('/mainmenu');
})

//Write a .txt file with all files in the 'reports' folder
app.get('/files', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
        var i = 0;
        var directoryPath = path.join(__dirname, '/reports/');
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

//Page with all the files on 'uploads'
app.get('/contentHtml', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
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

//Delete a file - option
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
    console.log("")  
});
