import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch} from "react-redux";
import { deleteRole, loadRoles } from '../redux/actions';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import EditRole from './EditRole';

const useButtonStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const headButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '800px',
    marginTop: '20px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
        },
    },
  }))(TableRow);
  
  

  const useStyles = makeStyles({
    table: {
        marginTop: 50,
        minWidth: 900
    },
  });

const Roles = () => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const headButton = headButtonStyles();
  let dispatch = useDispatch();
  let history = useNavigate(); 
  const { roles } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadRoles());
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure wanted to delete the row data")) {
      dispatch(deleteRole(id));
    }
  };

  const handleEdit = (id) => {
    history(`/roles/${id}`)
    setShow(true)
  }


  return (
    <div>
      <h5 style={{marginBottom: "-50px", marginTop: "20px"}}>Role Listing</h5>
      <div className={headButton.root}>
      <Button
        variant='contained' 
        color='secondary'
        onClick={() => history("/")}
        >
        Go Back
        </Button>
      <Button 
      variant='contained' 
      color='primary' 
      onClick={() => history("/addRole")}
      >
        Add Role
      </Button>
      </div>

      <div>
       {show && show == true ?
            <EditRole show={setShow}/>
            : ""
        }        
      </div>
      
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Role Label</StyledTableCell>
            <StyledTableCell align="center">Role Key</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles && roles.map((role) => (
            <StyledTableRow key={role.id}>
              <StyledTableCell align="center">{role.roleLabel}</StyledTableCell>
              <StyledTableCell align="center">{role.rolekey}</StyledTableCell>
              <StyledTableCell align="center">
                <div className={buttonStyles.root}>
      
                  <Button
                  variant="outlined" 
                  style={{marginRight: "5px"}} 
                  color='primary'
                  onClick={() => handleEdit(role.id)}
                  >
                    Edit
                  </Button>
                  <Button
                  variant="outlined" 
                  color='secondary'
                  onClick={() => handleDelete(role.id)}
                  >Delete</Button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{marginBottom: "30px"}}></div>
    </div>
  );
};

export default Roles;