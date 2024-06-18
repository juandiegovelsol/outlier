const tasks = [
  {
    id: 1,
    name: "Task A",
    duration: 3,
    dependencies: [],
    deadline: new Date("2024-07-15"),
  },
  {
    id: 2,
    name: "Task B",
    duration: 2,
    dependencies: [1],
    deadline: new Date("2024-07-10"),
  },
  {
    id: 3,
    name: "Task C",
    duration: 4,
    dependencies: [1],
    deadline: new Date("2024-07-20"),
  },
  {
    id: 4,
    name: "Task D",
    duration: 2,
    dependencies: [2, 3],
    deadline: new Date("2024-07-25"),
  },
];

const teams = [
  {
    id: 1,
    name: "Team 1",
    members: ["Alice", "Bob", "Charlie"],
    availability: 5,
  },
  { id: 2, name: "Team 2", members: ["David", "Eve"], availability: 4 },
];

function assignTasks(tasks, teams) {
  let schedule = [];
  let taskMap = {};
  let dependencies = {};

  tasks.forEach((task) => {
    taskMap[task.id] = task;
    dependencies[task.id] = task.dependencies;
  });

  let sortedTasks = topologicalSort(dependencies);

  sortedTasks.forEach((taskId) => {
    let task = taskMap[taskId];
    let availableTeams = teams.filter(
      (team) => team.availability >= task.duration
    );
    availableTeams.sort((a, b) => a.availability - b.availability);

    if (availableTeams.length > 0) {
      let assignedTeam = availableTeams[0];
      schedule.push({ task: task.name, team: assignedTeam.name });
      assignedTeam.availability -= task.duration;
    } else {
      console.log(
        `Task '${task.name}' cannot be assigned to any team due to lack of availability.`
      );
    }
  });
  return schedule;
}

function topologicalSort(dependencies) {
  let visited = {};
  let sorted = [];

  function visit(node) {
    if (visited[node]) {
      return;
    }
    visited[node] = true;

    dependencies[node].forEach((dependency) => {
      visit(dependency);
    });

    sorted.push(node);
  }

  for (let node in dependencies) {
    visit(node);
  }

  return sorted;
}

const schedule = assignTasks(tasks, teams);
console.log(schedule);
