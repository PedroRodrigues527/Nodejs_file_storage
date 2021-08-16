/*npm express-fileupload*/
const express = require('express')
const upload = require('express-fileupload')

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
        console.log(filename);
        
        file.mv('./uploads/' + filename, function (err){ //192.168.0.X./uploads?
            if(err){
                res.send(err)
            }else{
                res.send("file uploaded with sucess")
            }
        });
    }
})

app.listen(3000);

/*https://www.youtube.com/watch?v=ymO_r1hcIXk 4:21 */