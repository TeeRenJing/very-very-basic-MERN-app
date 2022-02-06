import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [usersList, setusersList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    //Axios.get returns a promise
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setusersList(response.data);
    });
  }, []);

  const createUser = (e) => {
    //Axios.post returns a promise
    // first arg post URL, sec arg post body
    // for the second arg, {name: name, age: age, username: username} can be written as {name, age, username}

    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      alert("USER CREATED");
      setusersList([...usersList, { name, age, username }]);
    });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        {usersList.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button type="submit" onClick={createUser}>
          Create User
        </button>
      </div>
    </div>
  );
}

export default App;
