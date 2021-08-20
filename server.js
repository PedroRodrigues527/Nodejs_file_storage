/*npm express-fileupload*/
const express = require('express')
const upload = require('express-fileupload')
//var alert = require("alert-node")
//const flash = require('connect-flash');
var fs = require("fs"); //load filesystem module
var router = express.Router()
const app = express();

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
            if(err){
                res.send(err)
            }else{
                //res.send("file uploaded with sucess")
                console.log("File Uploaded successfuly");
                res.sendFile(__dirname + '/main.html');
                res.sendFile(__dirname + 'alertJSUpload');
                //res.render("", {message: "File Uploaded successfuly"})
            }
        });
    }
})

app.listen(8000, function(){
    console.log("Listening on Port 8000");
});

/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */