var express = require("express");
var path = require("path");
var connection = require("./db/connection");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/assets/js/index.js"));
  });
  

// Get all notes 
app.get("/api/notes", function(req, res) {
    console.log("/api/notes");
    connection.query("SELECT * FROM notes", function(err, dbTables) {
        console.log(dbTables);
      res.json(dbTables);
    });
  });


  
  // Save a new notes
  app.post("/api/notes", function(req, res) {
      connection.query("INSERT INTO notes SET ?", req.body, function(err, result) {
        if (err) throw err;
  
        connection.query("SELECT * FROM notes WHERE id = ?", [result.insertId], function(err, dbTables) {
          res.json(dbTables[0]);
        });
      });
    });
  
  
  
  
  // Delete a note
  app.delete("/api/notes/:noteId", function(req, res) {
    connection.query("DELETE FROM notes WHERE ID = ?", req.params.noteId, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  

  


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

