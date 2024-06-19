import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

let members = [
  {
    id: 1,
    name: "Alice",
    observations: [
      {
        id: 1,
        timestamp: "2023-10-01T10:00:00Z",
        location: "New York",
        description: "Sunny",
      },
      {
        id: 2,
        timestamp: "2023-10-02T12:00:00Z",
        location: "New York",
        description: "Cloudy",
      },
      {
        id: 3,
        timestamp: "2023-10-03T14:00:00Z",
        location: "Los Angeles",
        description: "Rainy",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    observations: [
      {
        id: 1,
        timestamp: "2023-10-01T09:00:00Z",
        location: "Los Angeles",
        description: "Foggy",
      },
      {
        id: 2,
        timestamp: "2023-10-02T10:00:00Z",
        location: "Chicago",
        description: "Windy",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    observations: [
      {
        id: 1,
        timestamp: "2023-10-01T11:00:00Z",
        location: "New York",
        description: "Rainy",
      },
      {
        id: 2,
        timestamp: "2023-10-02T13:00:00Z",
        location: "Chicago",
        description: "Cloudy",
      },
    ],
  },
];

// GET /members
app.get("/members", (req, res) => res.json(members));

// POST /members
app.post("/members", (req, res) => {
  const newMember = { id: members.length + 1, ...req.body, observations: [] };
  // Push is a method, not a property, so it should be called with parentheses
  members.push(newMember);
  res.status(201).json(newMember);
});

// PUT /members/:id
app.put("/members/:id", (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (member) {
    // Object.assign should be called with req.body, not req
    Object.assign(member, req.body);
    res.json(member);
  } else {
    res.status(404).send("Member not found");
  }
});

// DELETE /members/:id
app.delete("/members/:id", (req, res) => {
  members = members.filter((m) => m.id !== parseInt(req.params.id));
  res.status(204).send();
});

// GET /members/:id/observations
app.get("/members/:id/observations", (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (member) {
    res.json(member.observations);
  } else {
    res.status(404).send("Member not found");
  }
});

// POST /members/:id/observations
app.post("/members/:id/observations", (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (member) {
    const newObservation = { id: member.observations.length + 1, ...req.body };
    member.observations.push(newObservation);
    res.status(201).json(newObservation);
  } else {
    res.status(404).send("Member not found");
  }
});

// PUT /members/:id/observations/:obsId
app.put("/members/:id/observations/:obsId", (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (member) {
    const observation = member.observations.find(
      (o) => o.id === parseInt(req.params.obsId)
    );
    if (observation) {
      Object.assign(observation, req.body);
      res.json(observation);
    } else {
      res.status(404).send("Observation not found");
    }
  } else {
    res.status(404).send("Member not found");
  }
});

// DELETE /members/:id/observations/:obsId
app.delete("/members/:id/observations/:obsId", (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (member) {
    member.observations = member.observations.filter(
      (o) => o.id !== parseInt(req.params.obsId)
    );
    res.status(204).send();
  } else {
    res.status(404).send("Member not found");
  }
});

// GET /observations
app.get("/observations", (req, res) => {
  const location = req.query.location;
  if (!location) {
    res.status(400).send("Location query is required");
  } else {
    const observations = members.flatMap((member) =>
      member.observations
        .filter((o) =>
          o.location.toLowerCase().includes(location.toLowerCase())
        )
        .map((o) => ({
          timestamp: o.timestamp,
          description: o.description,
          memberId: member.id,
          memberName: member.name,
        }))
    );
    res.json(observations);
  }
});

// GET /observations?location=<location>
/* app.get("/observations", (req, res) => {
  const location = req.query.location.toLowerCase();
  const observations = members.reduce((acc, member) => {
    const memberObservations = member.observations.filter((observation) =>
      observation.location.toLowerCase().includes(location)
    );
    return acc.concat(
      memberObservations.map((observation) => ({
        timestamp: observation.timestamp,
        description: observation.description,
        memberId: member.id,
        memberName: member.name,
      }))
    );
  }, []);
  res.json(observations);
}); */

app.listen(port, () => console.log(`Server running on port ${port}`));
