import React, {useRef, useState} from 'react';
import './App.css';
import Users from './Users';
import Vacations from './Vacations';

function App() {
  const [users, setUsers] = useState([]);
  const [vacations, setVacations] = useState([]);

  const addUser = user => {
    if (!isValidUser(user))
      return;
    user.id = users.length + 1;
    user.edit = false;
    setUsers([...users, user]);
  };

  const isValidUser = user => {
    var msg = '';
    const regex = /^[A-Z][A-Za-z'\- ]*$/;
    if (!regex.test(user.firstname))
      msg += 'Invalid firstname\n';
    if (!regex.test(user.lastname))
      msg += 'Invalid lastname\n';
    if (!user.birthdate)
      msg += 'Must include a birthdate';
    if (msg) {
      alert(msg);
      return false;
    } else
      return true;
  }

  const editUser = user => {
    const id = user.id;
    setUsers([...users.filter(u => u.id != id), user]);
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    setVacations(vacations.filter(vacation => vacation.userid !== id));
  };

  const addVacation = currentVacation => {
    if (isValidVacation(currentVacation)) {
      currentVacation.id = vacations.length + 1;
      setVacations([...vacations, currentVacation]);
    }
  }

  const isValidVacation = vacation => {
    var msg = '';
    if (!vacation.userid)
      msg += 'Vacation must be assigned to a user\n';
    var start = vacation.startdate, end = vacation.enddate;
    if (!start)
      msg += 'Vacation must have a start date\n';
    if (!end)
      msg += 'Vacation must have an end date\n';
    if (start && end && start > end )
      msg += 'Vacation must not end before it starts';
    if (!msg)
      return true;
    alert(msg);
    return false;
  }

  const deleteVacation = id => {
    setVacations(vacations.filter(vacation => vacation.id !== id));
  }

  return (
    <div className="App">
      <Users users={users} addUser={addUser} deleteUser={deleteUser} setUsers={setUsers} editUser={editUser}></Users>
      <Vacations users={users} vacations={vacations} addVacation={addVacation} deleteVacation={deleteVacation}></Vacations>
    </div>
  );
}

export default App;