import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

import  sql from 'mssql';

//Test database connection
(async () => {
    try {
        await sql.connect('Server=hqstg-sql-ag01;Database=Academic_Main;User Id=MOHE-DOMAIN\\putyourusername;Password=putyourpassword;Encrypt=true;TrustServerCertificate=True')
        //test: extract top 10 student names in english
        const result = await sql.query`SELECT TOP 10 Student_Name_En,Student_CID, Student_Accepted_Date,  Student_Graduate_Year, Student_Plan_Desc,Student_Plan_Year, Stop_Scholarship_Flag, Stop_Scholarship_Date FROM tbl_Master_Student_Accepted`
        console.dir(result)
    } catch (err) {
        // ... error checks
        console.dir(err)

    }
})()


// In-memory data test db
let students = [
  {
    "cid":1,
    "StudentName":"Maha Faisal",
    "Status":"none",
    "Debt": "none",
    "UpdateDate": "13546"
  },
  {
    "cid":2,
    "StudentName":"Ahmad abdullah",
    "Status":"none",
    "Debt": "yes",
    "UpdateDate": "13546"

  },
{
      "cid":3,
    "StudentName":"Fajir Ali",
    "Status":"none",
    "Debt": "yes",
    "UpdateDate": "13546"
}

];


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all students
app.get("/students", (req, res) => {
  console.log(students);
  res.json(students);
});

// GET a specific student by id
app.get("/students/:cid", (req, res) => {
  console.log("in student");

  const student = students.find((s) => s.cid === parseInt(req.params.cid));
  
  if (!student) return res.status(404).json({ message: "students not found" });
  console.log(student);
  res.json(student);
});


// GET a specific student by id
app.get("/search/:cid", (req, res) => {

  console.log("reached search from backend");
  console.log("passed id from front end: ",req.params.cid);
  
  //search the id in the db
  const student = students.find((s) => s.cid === parseInt(req.params.cid));
  
  console.log(student);
  if (!student) return res.status(404).json({ message: "students not found" });
  console.log(student);
  res.json(student);
});

/*
//3. GET a student by filtering the status
app.get("/filter", (req, res) => {
  const type = req.query.type;//here we use query  
  const filteredStudents = students.filter((student) => student.status === type);
  res.json(filteredStudents);
});

*/


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
