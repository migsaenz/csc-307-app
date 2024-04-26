import express from "express";
import cors from "cors";
import mongo from "./user-services.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {	
  const userToAdd = req.body;
  userToAdd.id = newId();
  mongo.addUser(userToAdd).then(res.status(201).send(userToAdd))
	  .catch((error) => {console.log(error);});		
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  mongo.findUserById(id).then((result) => 
	  {if(result === undefined){
	  	res.status(404).send("Resource not found.");
		}
	   else{
	  	res.send(result);
	   }}).catch((error) => {console.log(error);});
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  mongo.getUsers(name, job).then((found) => {
	  let result = {users_list: found};
  	  res.send(result);}).catch((error) => {console.log(error);});
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.delete("/users/:id", (req, res) => {
	const id = req.params["id"];
	mongo.deleteUserById(id).then((result) => {
		if(result === undefined){
			res.status(404).send("Resource not found.");
		}}).catch((error) => {console.log(error);});
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
