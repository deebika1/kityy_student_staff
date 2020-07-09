const express = require("express");
const app = express();
const body = require("body-parser");
app.use(body.json());
const port = process.env.PORT || 3000;
let student = [];
let staff = [];
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
app.get("/staff", (req, res) => {
  console.log("staff data is created");
  res.json(staff);
});
app.post("/staffDetails", (req, res) => {
  staff.push(req.body);
  console.log(staff);
  res.json({
    message: "staff-details are created",
  });
});
app.get("/student", (req, res) => {
  student.push(req.body);
  console.log("students data is created");
  console.log(student);
  res.json(student);
});
app.post("/studentDetails", (req, res) => {
  student.push(req.body);
  res.json({ message: "students-details are created" });
});

app.put("/api/staff/:id", (req, res) => {
  let Id = req.params.id;

  console.log(Id);
  let c = 0;
  let staffIndex = staff.find((value, index) => {
    return value.id == Id;
  });
  let count = student.reduce((acc, cur) => {
    if (cur.staffId == Id) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  staffIndex.studentCount = count;
  res.json({
    message: "id created",
  });
});

app.delete("/api/student/:id", (req, res) => {
  let studentId = req.params.id;
  console.log(studentId);

  let studentfilter = student.filter((element) => {
    return element.id == studentId;
  })[0];

  const index = student.indexOf(studentfilter);

  student.splice(index, 1);
  console.log(student);

  res.json({ message: `User ${studentId} deleted.` });
});
