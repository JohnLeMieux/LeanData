import React, {useRef, useState} from 'react';

function Vacations(props) {
    const userid = useRef();
    const defaultStart = useRef();
    const defaultEnd = useRef();
    const [currentVacation, setCurrentVacation] = useState({
      userid: null,
      startdate: '',
      enddate: ''
    });
  
    const handleUserChange = () => {
      setCurrentVacation({...currentVacation, userid: userid.current.value})
    };
  
    const handleInputChange = e => {
      setCurrentVacation({...currentVacation, [e.target.name]: e.target.value, userid: userid.current.value});
    };
  
    const addVacation = vacation => {
      props.addVacation(vacation);
      defaultStart.current.value = null;
      defaultEnd.current.value = null;
    }
  
    const getUserName = id => {
      const user = props.users.filter(user => user.id == id)[0];
      if (!user) return '';
      return user.firstname + ' ' + user.lastname;
    }
  
    return (
      <table>
          <caption>Vacations</caption>
          <thead>
            <tr>
              <th>User</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            <tr key={Vacations.length + 1}>
              <td>
                <select name="user" ref={userid} onChange={handleUserChange}>
                  {props.users.map(user => (
                    <option value={user.id} key={user.id}>{user.firstname + ' ' + user.lastname}</option>
                  ))}
                </select>
              </td>
              <td><input type="date" name="startdate" ref={defaultStart} onChange={handleInputChange}/></td>
              <td><input type="date" name="enddate" ref={defaultEnd} onChange={handleInputChange}/></td>
              <td><input type="button" value="Add" onClick={() => addVacation(currentVacation)}/></td>
            </tr>
            {props.vacations.map(vacation => (
              <tr key={vacation.id}>
                <td>{getUserName(vacation.userid)}</td>
                <td>{vacation.startdate}</td>
                <td>{vacation.enddate}</td>
                <td>
                  <input type="button" value="Edit" className="hidden"/>
                  <input type="button" value="Delete" onClick={() => props.deleteVacation(vacation.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
  }

  export default Vacations;