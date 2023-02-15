import React,{useState, useRef} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import Errormodal from "../UI/ErrorModal";

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();
    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState()
    

        // const usernameChangeHandler = (event) => {
        //     setEnteredUsername(event.target.value)
        // }
        // const ageChangeHandler = (event) => {
        //     setEnteredAge(event.target.value)
        // }
    const addUserHandler = (event) => {
       const enteredName = nameInputRef.current.value;
       const enteredUserAge = ageInputRef.current.value
    event.preventDefault();
    if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid name and age (non-empty values).'
        })
        return
    }
    if(+enteredUserAge < 1){
        setError({
            title: 'Invalid Age',
            message: 'Please enter a valid age ( > 0)).'
        })
        return
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
   
    };

    const errorHandler = () => {
        setError(null);
    }
  return (
    <React.Fragment>
    {error && <Errormodal title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" ref={nameInputRef}/>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageInputRef}/>
        <Button type="sumbit">Add User</Button>
      </form>
    </Card>
    </React.Fragment>
  );
};

export default AddUser;
