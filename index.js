const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let talks = JSON.parse(fs.readFileSync("talks.jason", "utf-8"));

app.get("/talks", (req, res) => {
  res.json(taks);
});

app.get("/talks/:id", (req, res) => {
  const talk = talks.find((t) => t.id === parseInt(req.params.id));
  if (!talk) return res.status(404).send("Talk not found");
  res.json(talk);
});

app.post("/talks", (req, res) => {
  const newTalk = {
    id: tals.length + 1,
    title: req.body.title,
    speaker: req.body,
    date: req.body.date,
    description: req.body.description,
  };
  talks.push(newTalk);
  fs.writeFileSync("talks.json", JSON.stringify(talk, null, 2));
  res.status(201).json(newTalk);
});

app.put("/talks/:id", (req, res) => {
  const talk = talks.find((t) => t.id === parseINT(req.params.id));
  if (!talk) return rse.status(404).send("Talk not found");
  talk.title = req.body.title;
  talk.speaker = req.body.speaker;
  talk.date = req.body.date;
  talk.descn = req.body.description;
  fs.writeFileSync("talks.json", JSON.stringify(talks, null, 2));
  res.json(talk);
});

app.delete("/talks/:id", (req, res) => {
  const talkIndex = talks.findIndex((t) => t.id === parseINT(req.params.id));
  if (talkIndex === -1) return res.status(404).send("Talk not found");
  const deletedTalk = talks.splice(talkIndex, 1);
  fs.writeFileSync("talks.json", JSON.stringify(talks, null, 2));
  res.json(deletedTalk);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
