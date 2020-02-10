import React, {useRef, useState} from 'react';

function Users(props) {
    const loc = useRef();
    const [currentUser, setCurrentUser] = useState({
      firstname: '',
      lastname: '',
      location: '',
      birthdate: '',
      edit: false
    });
  
    const handleInputChange = e => {
      setCurrentUser({...currentUser, [e.target.name]: e.target.value, [loc.current.name]: loc.current.value});
    }
  
    const handleLocationChange = () => {
      setCurrentUser({...currentUser, [loc.current.name]: loc.current.value})
    }
  
    const addUser = () => {
      props.addUser(currentUser);
    }
  
    const toggleEdit = target => {
      const id = target.name;
      const user = props.users.filter(user => user.id == id)[0];
      const edit = user.edit;
      user.edit = !edit;
      console.log(user);
      setCurrentUser(user);
    }
  
    const editUser = target => {
      const id = target.parentElement.parentElement.id;
      console.log(currentUser.id, id, currentUser.edit);
      if (currentUser.id != id || !currentUser.edit)
        return;
      const key = target.name;
      const value = target.value;
      setCurrentUser({...currentUser, [key]: value});
      props.editUser(currentUser);
    }
  
    return (
      <table>
          <caption>Users</caption>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Birthdate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={props.users.length + 1} name={props.users.length + 1}>
              <td><input type="text" name="firstname" onChange={handleInputChange}/></td>
              <td><input type="text" name="lastname" onChange={handleInputChange}/></td>
              <td>
                <select name="location" ref={loc} onChange={handleLocationChange}>
                  <option value="Sunnyvale">Sunnyvale</option>
                  <option value="Atlanta">Atlanta</option>
                </select>
              </td>
              <td><input type="date" name="birthdate" onChange={handleInputChange}/></td>
              <td><input type="button" value="Add" onClick={addUser}/></td>
            </tr>
            {props.users.map(user => (
                <tr key={user.id} id={user.id}>
                  <td><input type="text" name="firstname" value={user.firstname} onChange={e => editUser(e.currentTarget)}/></td>
                  <td><input type="text" name="lastname" value={user.lastname} onChange={e => editUser(e.currentTarget)}/></td>
                  <td>{user.location}</td>
                  <td><input type="text" name="birthdate" value={user.birthdate}/></td>
                  <td>
                    <input type="button" value="Edit" name={user.id} onClick={e => toggleEdit(e.currentTarget)}/>
                    <input type="button" value="Delete" onClick={() => props.deleteUser(user.id)}/>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    );
  }

  export default Users;