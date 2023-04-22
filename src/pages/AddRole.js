import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRole } from '../redux/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 50,
        "& > *": {
            margin: theme.spacing(1),
            width: "50ch",
            marginLeft: "350px",
        },
    },
}));
const useButtonStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const AddRole = () => {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let history = useNavigate(); 
    let dispatch = useDispatch();

    const [error, setError] = React.useState('');
    const [state, setState] = useState({
        roleLabel: "",
        rolekey: ""
    });

    const { roleLabel, rolekey } = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        console.log("name", name);
        setState({ ...state, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roleLabel || !rolekey) {
            setError("Please input all input fields");            
        } 
        else {
            dispatch(addRole(state));
            history("/roles");
            setError("");
        }
    }; 
    
    

  return (
    <div className='container'>
        <div className={buttonStyles.root}>
        <Button 
        style={{width: "100px", marginTop: "20px"}}
        variant='contained' 
        color='secondary'
        onClick={() => history("/roles")}
        >
        Go Back
        </Button>
        <h2>Add Roles</h2>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
            id='standard-basic' 
            name="roleLabel"
            label='Role Label' 
            value={roleLabel} 
            type='text'
            onChange={handleInputChange} 
            />
            <br />
            <TextField 
            id='standard-basic' 
            name="rolekey" 
            label='Role Key' 
            value={rolekey} 
            type='text' 
            onChange={handleInputChange} 
            />
            <br />
            <Button 
            style={{width: "100px"}}
            variant='contained' 
            color='primary' 
            type='submit'
            >
            Submit
            </Button>
        </form>
    </div>    
  );
};

export default AddRole;