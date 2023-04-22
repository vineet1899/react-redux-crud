import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRole, updateRole } from '../redux/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30,
        "& > *": {
            margin: theme.spacing(1),
            width: "50ch",
            marginLeft: 350
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

const EditRole = (props) => {
    const {show} = props;
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let history = useNavigate(); 
    let dispatch = useDispatch();
    const { role } = useSelector(state => state.data);
    const [error, setError] = React.useState('');
    let { id } = useParams();
    const [state, setState] = useState({
        roleLabel: "",
        rolekey: ""
    });

    const { roleLabel, rolekey } = state;

    
    useEffect(() => {
        dispatch(getSingleRole(id))
    }, []); 
    
    useEffect(() => {
        if(role) {
            setState({ ...role });
        }
    }, [role]);

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
            dispatch(updateRole(state, id));
            history("/roles");
            setError("");
            show(false);
        }
    }; 
    
    

  return (
    <div className='container' style={{borderTop: 'double'}}>
        <div className={buttonStyles.root}>
        <h2>Edit Role</h2>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
            id='standard-basic' 
            name="roleLabel"
            label='Role Label' 
            value={roleLabel || ""} 
            type='text'
            onChange={handleInputChange} 
            />
            <TextField 
            id='standard-basic' 
            name="rolekey" 
            label='Role Key' 
            value={rolekey || ""} 
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
            Update
            </Button>
        </form>
    </div>    
  );
};

export default EditRole;