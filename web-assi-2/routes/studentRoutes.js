const express = require("express");
const router = express.Router();
const students = require("../data/students");

// GET /students - Get all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - Get a student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a valid integer"
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.status(200).json(student);
});

// POST /students - Create a student
router.post("/", (req, res) => {
  const { name, age, course, email } = req.body;

  if (!name || age === undefined || !course || !email) {
    return res.status(400).json({
      error: "name, age, course, and email are required"
    });
  }

  const numericAge = Number(age);

  if (!Number.isInteger(numericAge) || numericAge <= 0) {
    return res.status(400).json({
      error: "age must be a positive integer"
    });
  }

  const emailExists = students.some(
    (student) => student.email.toLowerCase() === String(email).toLowerCase()
  );

  if (emailExists) {
    return res.status(400).json({
      error: "A student with this email already exists"
    });
  }

  const newId =
    students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1;

  const newStudent = {
    id: newId,
    name: String(name).trim(),
    age: numericAge,
    course: String(course).trim(),
    email: String(email).trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent
  });
});

// PUT /students/:id - Update a student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a valid integer"
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const { name, age, course, email } = req.body;

  if (!name || age === undefined || !course || !email) {
    return res.status(400).json({
      error: "name, age, course, and email are required"
    });
  }

  const numericAge = Number(age);

  if (!Number.isInteger(numericAge) || numericAge <= 0) {
    return res.status(400).json({
      error: "age must be a positive integer"
    });
  }

  const emailExists = students.some(
    (s) =>
      s.id !== id &&
      s.email.toLowerCase() === String(email).toLowerCase()
  );

  if (emailExists) {
    return res.status(400).json({
      error: "A student with this email already exists"
    });
  }

  student.name = String(name).trim();
  student.age = numericAge;
  student.course = String(course).trim();
  student.email = String(email).trim();

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

// DELETE /students/:id - Delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Student ID must be a valid integer"
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;
