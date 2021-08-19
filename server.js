/*npm express-fileupload*/
const express = require('express')
const upload = require('express-fileupload')
var fs = require("fs"); //load filesystem module
const app = express();

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/* Upload */
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
                res.sendFile(__dirname + '/index.html');
            }
        });
    }
})

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});

/* https://www.youtube.com/watch?v=jlDfT57QzP4 html download */


/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */