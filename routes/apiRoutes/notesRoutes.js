const router = require('express').Router();
const { findById,filterByQuery,  createNewNotes, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    console.log("no id found");
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  console.log("I'm creating a new note in notesRoutes.js");
  if (!validateNote(req.body)) {
    res.status(400).send('The notes is not properly formatted.');
  } else {
    const note = createNewNotes(req.body, notes);
    res.json(note);
  }
});

function deleteNotes(body, notesArray) {
    const note = body;
    notesArray.splice(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray}, null, 2)
    );
    return note;
  }

router.delete('/notes/:id', (req, res) => {
    
    const note = notes.find(n => n.id === parseInt(req.params.id));

    const index = notes.indexOf(note);
    notes.splice(index,1);
    
    console.log("I'm deleting a new note in notesRoutes.js");
    if (!note) {
      res.status(400).send('The notes is not properly formatted.');
    } else {
      const note = deleteNotes(req.body, notes);
      res.json(note);
    }
  });

module.exports = router;