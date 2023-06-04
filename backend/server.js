const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-react",
});

app.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM student", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.post("/create", (req, res) => {
  const { Name, Email } = req.body;
  try {
    db.query(
      "INSERT INTO student (Name, Email) VALUES (?, ?)",
      [Name, Email],
      (err, results) => {
        if (err) {
          console.log("Error while inserting a user into the database", err);
          return res.status(400).json({ error: "Failed to create user" });
        }
        return res
          .status(201)
          .json({ message: "New user successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const Name = req.body.Name;
  const Email = req.body.Email;
  try {
    db.query(
      "UPDATE student SET Name = ?, Email = ? WHERE id = ?",
      [Name, Email, id],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(201).json({ message: "User updated successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    db.query(
      "DELETE FROM student WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No user with that id!" });
        }
        return res.status(200).json({ message: "User deleted successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.listen(8081, () => {
  console.log("listening");
});
