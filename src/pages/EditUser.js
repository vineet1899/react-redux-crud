import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';
import { loadRoles } from '../redux/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30,
        "& > *": {
            margin: theme.spacing(1),
            width: "50ch",
            marginLeft: "50px",
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

const EditUser = (props) => {
    const { show } = props;
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let history = useNavigate(); 
    let dispatch = useDispatch();
    const { roles } = useSelector(state => state.data);
    const [error, setError] = React.useState('');
    let { id } = useParams();
    const {user} = useSelector(state => state.data);
    const [state, setState] = useState({
        name: "",
        email: "",
        username: "",
        mobile: "",
        rolekey: "",
        password: ""
    });

    const { name, email, username, mobile, rolekey, password } = state;

    useEffect(() => {
        dispatch(loadRoles());
      }, []);

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []); 
    
    useEffect(() => {
        if(user) {
            setState({ ...user });
        }
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        console.log("name", name);
        setState({ ...state, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !username || !mobile || !rolekey || !password) {
            setError("Please input all input fields");            
        } 
        else {
            dispatch(updateUser(state, id));
            history("/");
            setError("");
            show(false);
        }
    }; 
    

  return (
    <div className='container' style={{borderTop: 'double'}}>
        <div className={buttonStyles.root}>
        <h2>Edit Users</h2>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
            id='standard-basic' 
            name="name"
            label='Name' 
            value={name || ""} 
            type='text'
            onChange={handleInputChange} 
            />
            <TextField 
            id='standard-basic' 
            name="email" 
            label='Email' 
            value={email || ""} 
            type='email' 
            onChange={handleInputChange} 
            />
            <TextField 
            id='standard-basic' 
            name="username" 
            label='User Name' 
            value={username || ""} 
            type='text' 
            onChange={handleInputChange} 
            />
            <TextField 
            id='standard-basic' 
            name="mobile" 
            label='Mobile' 
            value={mobile || ""} 
            type='number' 
            onChange={handleInputChange} 
            />
            <InputLabel id="standard-basic">Role</InputLabel>
            <Select
            id="standard-basic"
            name="rolekey"
            value={rolekey || ""}
            onChange={handleInputChange}                
            >
            {roles && roles.map((role) => (
                <MenuItem value={role.roleLabel}>{role.roleLabel}</MenuItem>
            ))}
            </Select>
            <TextField
            style={{marginTop: "-8px"}} 
            id='standard-basic' 
            name="password" 
            label='Password' 
            value={password || ""} 
            type='text' 
            onChange={handleInputChange} 
            />
            <br />
            <Button 
            style={{width: "100px", left: "800px"}}
            variant='contained' 
            color='primary' 
            type='submit'
            >
            Update
            </Button>
        </form>
    </div>    
  );
};

export default EditUser;