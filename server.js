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
var port = 3000

app.use(device.capture())

app.use(upload())

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/connection.html');
    //console.log("IP conected: " + req.connection.remoteAddress)
    //console.log("Device: "+req.device.type.toUpperCase())
    //console.log("teste")
})

app.get('/connect', (req, res)=>{
    console.log()
    console.log("IP conected: " + req.connection.remoteAddress)
    console.log("Device: "+req.device.type.toUpperCase())
    res.redirect('/mainmenu')
})

app.get('/mainmenu', (req, res) => {
    res.sendFile(__dirname + '/main.html')
    //console.log("IP conected: " + req.connection.remoteAddress)
    //console.log("Device: "+req.device.type.toUpperCase())
})

app.get('/disconnect', (req, res)=>{
    console.log("***")
    console.log("IP disconected: " + req.connection.remoteAddress)
    console.log("Device: "+req.device.type.toUpperCase())
    res.redirect('/');
})
/*
app.get('/download', (req, res) => {
    //console.log("entering download");
    res.sendFile(__dirname + '/download.html')
})

app.get('/downloads', (req, res)=>{
    console.log("teste!")
    var htmlPath = path.join(__dirname, 'uploads');
    //app.use(express.static(htmlPath));
    //res.sendFile(__dirname, '/uploads/')
    app.use('/uploads', express.static(htmlPath));
})
*/

app.get('/upload', (req, res) => {
    //console.log("entering upload");
    res.sendFile(__dirname + '/upload.html')
})

/* https://stackoverflow.com/questions/40509666/sending-whole-folder-content-to-client-with-express */

/* Upload () */
app.post('/', (req, res) =>{
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
        var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress

        file.mv('./uploads/' + filename, function (err){ //192.168.0.X./uploads?
            console.log("Filename:" + filename);
            console.log("Size: " + fileSize + " Bytes")
            //console.log("File:" + file); //[object Object]
            if(err){
                res.send(err)
            }         
            else{
                //res.send("file uploaded with sucess")
                console.log("File Uploaded successfuly");
                console.log("******")

                /*
                //Send a report file to user
                //var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize + ", IP: " + req.connection.remoteAddress
                res.attachment('Upload Report ' + i + '.txt')
                res.type('txt')
                res.send(text1)*/


                //needs directory of upload folder
                fs.writeFile("./uploads/report"+i+".txt", text1 , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    //console.log("The file was saved!");
                });

                i++;

                //res.sendFile(__dirname + 'alertJSUpload');
                //res.render("", {message: "File Uploaded successfuly"})
            }
        });
        //return to main menu
        console.log("*********")
        res.sendFile(__dirname + '/main.html');
    }else{
        res.redirect('/mainmenu')
    }
})

app.listen(port, function(){
    console.log("**************")
    console.log("SERVER ONLINE")
    console.log("Listening on Port " + port);
});


/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */
/*https://www.snel.com/support/initial-server-setup-ubuntu-16-04/ */