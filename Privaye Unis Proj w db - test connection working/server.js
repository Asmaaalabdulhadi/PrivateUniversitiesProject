import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;
const API_URL = "http://localhost:3000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Someone want to use my APO, like lesson: Server side api requests 
//website front end

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/students`);
   // console.log(response);
    res.render("index.ejs", { students: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/students/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/students/`);
    console.log(response);
    res.render("index.ejs", { students: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});


app.get("/search/", async (req, res) => {
  console.log("search from front end server");

    console.log("////////////////////");
const cid=req.query.cid;
 console.log("cid", cid);

  try {
    const response = await axios.get(`${API_URL}/search/${cid}`);
    console.log(response);
    res.render("index.ejs", { students: response.data });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});
