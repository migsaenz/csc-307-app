import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
app.use(express.json());

const addUser = (user) => {
	users["users_list"].push(user);
  return user;
};

const removeUser = (user) => {
	users.users_list.pop(user);
}

const findUserByNameAndJob = (name, job) => {
return users["users_list"].filter(
	(user) => user["name"] === name).filter(
		(user) => user["job"] === job
	);
};

function newId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomString += letters[randomIndex];
  }

  for (let i = 0; i < 3; i++) {
    randomString += Math.floor(Math.random() * 10);
  }

  return randomString;
}

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {	
  const userToAdd = req.body;
  userToAdd.id = newId();
  addUser(userToAdd);		
  res.status(201).send(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
	  if (job != undefined){
	  	let result = findUserByNameAndJob(name, job);
	  	result = {users_list: result };
		res.send(result);
	  }
	  else {
	  	let result = findUserByName(name);
		result = {users_list: result };
		res.send(result);
	  }
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.delete("/users/:id", (req, res) => {
	const id = req.params["id"]; 
	let result = findUserById(id);
	if(result === undefined){
		res.status(404).send("Resource not found.");
	}
	else {
		removeUser(result);
		res.status(204).send();
	}

});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
})
