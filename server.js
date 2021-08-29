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
var port = 8000
//npm install nodemailer -> to send emails
var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lantransferwebsite@gmail.com',
        pass: 'webserver123'
    }
});

var mailOptions = {
    from: 'lantransferwebsite@gmail.com',
    to: 'otheremail@email',
    subject: 'Webserver eemail',
    text: 'Some email text',
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

const bodyParser = require('body-parser');


app.get('/', (req, res) => {
   // console.log("IP conected: " + req.connection.remoteAddress)
   // console.log("Device: "+req.device.type.toUpperCase())
   /* app.post('/', function (req, res) {
        var name = req.body
        console.log("user name: "+ name)
    });*/
    res.sendFile(__dirname + '/view/connection.html');
    //console.log("teste1")
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function (req, res) {
    
    username = req.body.name
    password = req.body.password
    console.log("")
    if(username == "admin" && password == "123" || auth == true){
        console.log("*** User Connected ***")
        console.log("Username: "+ username)
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
              console.log("Email sent!")
            }
          });
        //console.log("Email sent!")
        auth = true;
        res.redirect('/connect')
        
    }else{
        console.log("Login incorrect Please try again!")
        console.log("");
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
        res.sendFile(__dirname + '/view/main.html')

    }

    //console.log("IP conected: " + req.connection.remoteAddress)
    //console.log("Device: "+req.device.type.toUpperCase())
})

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

app.get('/files', (req, res)=>{
    if(auth==false){
        res.redirect('/')
    }
    else{
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
        res.download(__dirname + '/uploads/')
    }
})


app.post('/downloads', (req, res)=>{
    if(auth==false){
        res.redirect('/')
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

/* Upload () */
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
                    console.log("******")
                    console.log("")
                    /*
                    //Send a report file to user
                    //var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress
                    res.attachment('Upload Report ' + i + '.txt')
                    res.type('txt')
                    res.send(text1)*/
    
    
                    //needs directory of upload folder
                    fs.writeFile("./uploads/reports/report"+i+".txt", text1 , function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        //console.log("The file was saved!");
                        res.download(__dirname + "/uploads/reports/report"+i+".txt")
                    });
                    //i++;

                    //res.sendFile(__dirname + 'alertJSUpload');
                    //res.render("", {message: "File Uploaded successfuly"})
                }
                //res.download(__dirname + "/uploads/reports/report"+i+".txt")
                i++;
            });
            //return to main menu
            console.log("*********")
            res.sendFile(__dirname + '/view/main.html');
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
    var ip = require("ip");
    console.log("Server Local IP: " + ip.address());  
});


/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */
/*https://www.snel.com/support/initial-server-setup-ubuntu-16-04/ */