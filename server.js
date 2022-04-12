//Modules (npm)  **********
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express')
const upload = require('express-fileupload')
//var alert = require("alert-node")
//const flash = require('connect-flash');
var fs = require("fs"); //load filesystem module
var path = require('path');
var router = express.Router()
var mysql = require('mysql')
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
var port = 8080 //PORT 80 HTTP: visible with only the local IP on the browser
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
var file = "";
var filename = "";
var fileSize = 0; //Bytes

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_db"
})

con.connect((err) =>{
    if(err) throw err;
    console.log("Data Base Connected!")
})

//Email Configuration(node mailer)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lantransferwebsite@xxx.com',
        pass: 'xxx'
    }
});
//Send Email with code to delete all files
var mailOptionsCodeDelete = { 
    from: 'lantransferwebsite@gmail.com',
    to: emailUser,
    subject: 'VerifyCode',
    text: "Code: " + checkCode
};

global.auth = false; //True if login sucessufuly
global.username = "";
global.sendCode = "";
global.date_ob = new Date()


//CODE **********

app.use(device.capture())

app.use(upload())

app.use(express.static(__dirname + '/')); //Display .CSS file

app.engine('html', require('ejs').renderFile); //Alows render a page with variables on this javascript file to html



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/connection.html');
})

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/createUser', (req, res) =>{
    res.sendFile(__dirname + "/view/createUser.html")
})

//Route para teste
/*
app.get('/teste', (req, res)=>{
    con.query("SELECT username FROM user WHERE username = 'teste' ", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        if(result[0] == null ||  result[0] == ""){
            console.log("Nenhum")
        }
        else{
            console.log("tEM!!")
        }
    });
})*/

app.post('/createUser', (req, res) =>{
    username = req.body.nameUser
    password = req.body.passUser
    emailUser = req.body.emailUser
    
    let query = "SELECT username_db, email_db FROM user WHERE username_db='"+username+"' AND email_db='"+ emailUser +"' "
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        if ((result[0] == null ||  result[0] == "") && (result[1] == null || result[1] == "")) {
            let new_account_query = "INSERT INTO `user` (`id`, `username_db`, `email_db`, `password_db`) VALUES (NULL,'" + username + "', '"+ emailUser +"','" + password+"');"
            con.query(new_account_query, function (err, result, fields) {
                if (err) throw err;
                console.log("Registration completed!")
                res.send('/')
            })
        }
        else if((result[0] != null ||  result[0] != "" || result[0] != undefined ) || (result[1] != undefined||result[1] != null || result[1] != "")){
            console.log("Existe uma conta!")
        }
    });
})


app.post('/login', function (req, res) {
    let username_i = req.body.name_input
    let password_i = req.body.password_input
    let login_query = "SELECT username_db, password_db FROM user WHERE username_db='"+username_i+"' AND password_db='"+ password_i +"' ";

    con.query(login_query, function (err, result, fields) {
        try{
            if (err) throw err;
            if ((result[0].username_db == username_i) && (result[0].password_db == password_i)) {
                auth = true;
                username = username_i
                res.redirect('/connect')
            }
        }
        catch(e){
            res.sendFile(__dirname + '/view/connection.html');
        }
    });

});

app.get('/connect', (req, res)=>{
    if(!auth){res.redirect('/')}
    else{
        userIp = req.connection.remoteAddress
        console.log("*** User Connected ***\nUsername: " + username +"\nIP: " + req.connection.remoteAddress+"\nDevice: "+req.device.type.toUpperCase())
        res.redirect('/mainmenu')
    }
})

app.get('/mainmenu', (req, res) => {
    if(!auth){res.redirect('/')}
    else{
        res.render(__dirname + '/view/main.html', {username:username,Hostip:Hostip,userIp:userIp})
    }
})

//Logout from the website
app.get('/disconnect', (req, res)=>{
    if(!auth){res.redirect('/')}
    else{
        //??? 2x auth = false?
        auth = false
        console.log("\n*** User Disconnected ***\nUsername: " + username +"\nIP: " + req.connection.remoteAddress+"\nDevice: "+req.device.type.toUpperCase())
        auth = false;
        res.redirect('/');
    }

})

//Redirect to 'download.html' file
app.get('/download', (req, res) => {
    !auth?res.redirect('/'):res.render(__dirname + '/view/download.html', {username:username});
})

//Delete all files option
app.get('/deleteCheck', (req, res) =>{
    if(auth){
        //console.log("aaaaa1")
        //res.sendFile(__dirname + '/view/caution.html')
        res.render(__dirname + '/view/caution.html', {username:username})
    }else{
        res.redirect('/')
    }
})

//Verify with code sent by email is the same inserted by the user
app.post('/deleteCheck', (req, res)=>{
    if(!auth){res.redirect('/')}
    res.redirect('/deleteall');
})


//Deletes all files in 'uploads' folder
//List all files in a path and delete every file in it
app.get('/deleteall', (req, res) =>{
    if(!auth){res.redirect('/')} 
    var fileSeq = 0;
    //number of files in the upload folder
    fs.readdir(__dirname + '/uploads', function(err, files){
        if (err){console.log(err)}
        console.log("Number of files: " + files.length +"\n");//number of files in the 'upload' folder
        uploadSize = files.length;
        files.forEach(function(file){
        //fileSeq++;
        //console.log("SEQ: " + fileSeq)
            if(fileSeq != files.length){
                fs.unlink(__dirname + '/uploads/'+ file, (err)=>{
                    if (err) {console.error(err)}
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
    console.log("ALL " + uploadSize + " FILES DELETED\n")
    res.redirect('/mainmenu');
})

//Write a .txt file with all files in the 'reports' folder
app.get('/files', (req, res)=>{
    if(!auth){
        res.redirect('/')
    }
    else{
        var i = 0;
        var directoryPath = path.join(__dirname, '/uploads/');
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
    }
})

//Page with all the files on 'uploads'
app.get('/contentHtml', (req, res)=>{
    if(!auth){
        res.redirect('/')
    }
    res.render(__dirname + '/view/content.html', {fileText:fileText, uploadSize:uploadSize, fileArray:fileArray, username:username})
})

//To download file
app.post('/downloads', (req, res)=>{
    if(!auth){res.redirect('/')}
    else if(req.body.namefile == "" || req.body.typefile == ""){
        res.redirect('/download')
    }
    else{
        Namefile = req.body.namefile
        Typefile = req.body.typefile
        res.download(__dirname + '/uploads/'+Namefile + "." + Typefile)
        console.log("***File Downloaded***")
        console.log("Username: " + username)
        console.log("File: "+Namefile + "." + Typefile+"\n")
    }
})

//Delete a file - option
app.get('/delete', (req, res)=>{
    if(!auth){res.redirect('/')}
    res.render(__dirname + '/view/delete.html', {username:username})
    //res.sendFile(__dirname + '/view/delete.html')     
})

//Delete a certain file by inserting the name and the type of the file
app.post('/deletefile', (req, res)=>{
    //!auth?res.redirect('/'):null;
    if(!auth){res.redirect('/')}
    try{
        Namefile = req.body.namefile
        Typefile = req.body.typefile;
        app.delete(__dirname + '/uploads/'+Namefile + "." + Typefile)
    
        fs.unlink(__dirname + '/uploads/'+Namefile + "." + Typefile, (err)=>{
            if(err){res.send(err)}
            console.log("***File Deleted***")
            console.log("Username: " + username)
            console.log("File: "+Namefile + "." + Typefile+"\n")
            res.redirect('/delete')
        })

        for (i = 0; i<fileArray.length; i++){
            if(fileArray[i]==Namefile+Typefile){
                fileArray.splice(i,i);
            }
        }

    }catch(e){
        console.log("ERROR while deleting a file")
    }
    
})


app.get('/upload', (req, res) => {
    if(!auth){
        res.redirect('/')
    }
    else{
        res.render(__dirname + '/view/upload.html', {username:username})
        //res.sendFile(__dirname + '/view/upload.html')
    }
    //console.log("entering upload");
})

/* https://stackoverflow.com/questions/40509666/sending-whole-folder-content-to-client-with-express */

/* Upload file*/
app.post('/uploadFile', (req, res) =>{
    if(auth){
        if(req.files){
            //file = req.files.file;
            //filename = file.name;
            
            //fileSize = file.size; //Bytes
            /*console.log(req.files.file)
            console.log(req.files.file.name)
            console.log(req.files.file.size)
            console.log("--------------------")*/
    
            req.files.file.mv(__dirname + '/uploads/' + req.files.file.name, function (err){ //192.168.0.X./uploads?
                //console.log("File:" + file); //[object Object]
                if(err){res.send(err)}      
                //res.send("file uploaded with sucess")
                console.log("\n*** File uploaded ***")
                console.log("User: " + username)
                console.log("Filename: " + req.files.file.name);
                console.log("Size: " + req.files.file.size + " Bytes")
                //console.log("File:" + file); //[object Object]
                console.log("File Uploaded successfuly!\n");
                //console.log("******")
            });
            //res.render(__dirname + '/view/main.html', {username:username,Hostip:Hostip,userIp:userIp})
        }
        else{
            console.log("Cannot upload an empty file")
            res.redirect('/mainmenu')
        }
    }
    else{
        res.redirect('/')
    }
})

app.listen(port, function(){
    console.log("**************")
    console.log("SERVER ONLINE\nListening on Port " + port +"\nTo terminate the server press: CTRL + C\nServer Local IP: " + ip.address()+"\n")
});
