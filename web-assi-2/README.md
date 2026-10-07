# Student Management REST API

## Lab Assignment 2 – Web Dev III (Node.js & Express Backend)

This project implements the Student Management REST API required for the assignment.

### Technology
- Node.js
- Express.js
- Postman for API testing

### Restrictions followed
- No MongoDB/MySQL
- No Mongoose
- Uses only JavaScript array and JSON data

## Project Structure

```text
student-management-rest-api/
├── app.js
├── package.json
├── README.md
├── .gitignore
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
└── data/
    └── students.js
```

## How to Run

1. Install Node.js.
2. Open this project folder in VS Code.
3. Open the terminal.
4. Run:

```bash
npm install
npm start
```

5. The API will run at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/students` | Get all students | 200 |
| GET | `/students/:id` | Get one student | 200 |
| POST | `/students` | Add a student | 201 |
| PUT | `/students/:id` | Update a student | 200 |
| DELETE | `/students/:id` | Delete a student | 200 |

## POST Request Body

```json
{
  "name": "Neha Gupta",
  "age": 20,
  "course": "B.Tech CSE",
  "email": "neha@example.com"
}
```

## PUT Request Body

```json
{
  "name": "Neha Gupta Updated",
  "age": 21,
  "course": "B.Tech IT",
  "email": "neha.updated@example.com"
}
```

## Error Status Codes

- `400 Bad Request` – invalid input or invalid student ID
- `404 Not Found` – student or route does not exist
- `200 Success` – successful GET, PUT, or DELETE
- `201 Created` – successful POST

## Postman Testing

Use these requests after starting the server:

### 1. Get all students
```text
GET http://localhost:3000/students
```

### 2. Get student by ID
```text
GET http://localhost:3000/students/1
```

### 3. Create student
```text
POST http://localhost:3000/students
Content-Type: application/json
```

Body:
```json
{
  "name": "Neha Gupta",
  "age": 20,
  "course": "B.Tech CSE",
  "email": "neha@example.com"
}
```

### 4. Update student
```text
PUT http://localhost:3000/students/1
Content-Type: application/json
```

Body:
```json
{
  "name": "Aarav Sharma Updated",
  "age": 21,
  "course": "B.Tech IT",
  "email": "aarav.updated@example.com"
}
```

### 5. Delete student
```text
DELETE http://localhost:3000/students/1
```

## Notes

Because this assignment intentionally uses an in-memory array, changes are lost when the server restarts.

The custom logger prints each request's timestamp, method, URL, status code, and response time in the terminal.
