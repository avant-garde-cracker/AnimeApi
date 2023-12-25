import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const URL = "https://api.trace.moe/search?url=https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg"

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(URL);
        const reslt = response.data.result[Math.floor(Math.random() * response.data.result.length)];
        res.render("index.ejs", {
            animeName: (reslt.filename).replace(".mp4", ""),
            videoLink: reslt.video,
            imageLink: reslt.image
        });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server listening at port:- ${port}`);
});