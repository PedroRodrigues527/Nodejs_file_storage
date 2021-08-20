/*npm express-fileupload*/
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const express = require('express')
const upload = require('express-fileupload')
//var alert = require("alert-node")
//const flash = require('connect-flash');
var fs = require("fs"); //load filesystem module
var router = express.Router()
const app = express();
var i = 0
var port = 3000

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html')
})

app.get('/download', (req, res) => {
    //console.log("entering download");
    res.sendFile(__dirname + '/download.html')
})

app.get('/upload', (req, res) => {
    //console.log("entering upload");
    res.sendFile(__dirname + '/upload.html')
})


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

        console.log("Name: " + filename);
        console.log("Size: " + fileSize + " Bytes")
        file.mv('./uploads/' + filename, function (err){ //192.168.0.X./uploads?
            console.log("Filename:" + filename);
            //console.log("File:" + file); //[object Object]
            if(err){
                res.send(err)
            }         
            else{
                //res.send("file uploaded with sucess")
                console.log("File Uploaded successfuly");
                var text1 = "Filename: " + filename + ", Size(Bytes): " + fileSize 
                res.attachment('Upload Report ' + i + '.txt')
                res.type('txt')
                res.send(text1)
                i++;
                console.log("*********")
                res.sendFile(__dirname + '/main.html');
                //res.sendFile(__dirname + 'alertJSUpload');
                //res.render("", {message: "File Uploaded successfuly"})
            }
        });
    }
})

app.listen(port, function(){
    console.log("**************")
    console.log("SERVER ONLINE")
    console.log("Listening on Port " + port);
});


/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */