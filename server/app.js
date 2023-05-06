const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer');
const removebg = require('remove.bg');

const path = require('path');
const corsOrigin = process.env.PORT || "http://localhost:3000";
var paths = __dirname + '/../public/images/';
var outputFile = __dirname + '/../public/images/';
var filename;

app.use(express.static(__dirname + "../public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../public/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        filename=file.fieldname + '-' + uniqueSuffix +file.originalname;
        cb(null, filename);
        
    }
})

const Imageupload = multer({ storage: storage })

app.post('/image-upload', Imageupload.array("my-image-file"), async function (req, res) {
    console.log("req.body=", req.body);
    console.log(filename);
    paths = paths + filename;
    outputFile = outputFile + "removed-" + filename;
    
   await myRemoveBgFunction(paths, outputFile);
    console.log("got a post request");
    res.send("got a post request");
})
app.get('/api/image',function (req,res)
{
    console.log("/api/image got triggered");
    console.log({"path":filename});
    res.json({"path":filename});
    paths = __dirname + '/../public/images/';
    outputFile = __dirname + '/../public/images/';

})



async function myRemoveBgFunction(path, outputFile) {
    console.log("sadlife api got used u got one chance less now ");
    const result = await removebg.removeBackgroundFromImageFile({
        path,
        apiKey: "1bNtgP9RRgGMg8EeQmdHBo7L",
        size: "regular",
        type: "person",
        crop: true,
        scale: "50%",
        outputFile
    });
    paths = __dirname + '/../public/images/';
    outputFile = __dirname + '/../public/images/';


}

app.listen(process.env.PORT || 4000, function () {
    console.log("server is running }");
});

