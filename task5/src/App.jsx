import React, { useState } from "react";
import UserCard from "./UserCard";

function App() {
  const [users, setUsers] = useState([
    { userEdit: false, userName: "John", lastName: "Doe" },
    { userEdit: false, userName: "Jane", lastName: "Doe" },
  ]);

  const handleUserEdit = (index) => {
    setUsers((prev) => {
      let newUsers = [...prev];
      newUsers[index] = {
        userEdit: !newUsers[index].userEdit,
        userName: newUsers[index].name,
        lastName: newUsers[index].lastName,
      };
    });
  };

  return (
    <div>
      {users.map(({ userEdit, userName, lastName }, index) => {
        <div key={index}>
          <UserCard
            email="johndoe@example.com"
            userName={userName}
            lastName={lastName}
            handleUserEdit={handleUserEdit}
            userEdit={userEdit}
            setUserName={setUsers}
            setLastName={setUsers}
          />
        </div>;
      })}
    </div>
  );
}

export default App;
