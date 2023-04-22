import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const getRoles = (roles) => ({
    type: types.GET_ROLES,
    payload: roles,
});

const userDeleted = () => ({
    type: types.DELETE_USER
});

const roleDeleted = () => ({
    type: types.DELETE_USER
});

const userAdded = () => ({
    type: types.ADD_USER
});

const roleAdded = () => ({
    type: types.ADD_ROLE
});

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
});

const getRole = (role) => ({
    type: types.GET_SINGLE_ROLE,
    payload: role,
});

const userUpdated = () => ({
    type: types.UPDATE_USER,
});

const roleUpdated = () => ({
    type: types.UPDATE_ROLE,
});


export const loadUsers = () => {
    return function(dispatch) {
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(getUsers(resp.data))
        })
        .catch((error) => console.log(error));
    };
    
};

export const loadRoles = () => {
    return function(dispatch) {
        axios
        .get(`http://localhost:5000/role`)
        .then((resp) => {
            console.log("APIroles", resp);
            dispatch(getRoles(resp.data))
        })
        .catch((error) => console.log(error));
    };
    
};

export const deleteUser = (id) => {
    return function(dispatch) {
        axios
        .delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(userDeleted());
            dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
    
};

export const deleteRole = (id) => {
    return function(dispatch) {
        axios
        .delete(`http://localhost:5000/role/${id}`)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(roleDeleted());
            dispatch(loadRoles());
        })
        .catch((error) => console.log(error));
    };
    
};

export const addUser = (user) => {
    return function(dispatch) {
        axios
        .post(`${process.env.REACT_APP_API}`, user)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(userAdded());
            //dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
    
};

export const addRole = (role) => {
    return function(dispatch) {
        axios
        .post(`http://localhost:5000/role`, role)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(roleAdded());
            //dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
    
};

export const getSingleUser = (id) => {
    return function(dispatch) {
        axios
        .get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(getUser(resp.data));
        })
        .catch((error) => console.log(error));
    };
    
};

export const getSingleRole = (id) => {
    return function(dispatch) {
        axios
        .get(`http://localhost:5000/role/${id}`)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(getRole(resp.data));
        })
        .catch((error) => console.log(error));
    };
    
};

export const updateUser = (user, id) => {
    return function(dispatch) {
        axios
        .put(`${process.env.REACT_APP_API}/${id}`, user)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(userUpdated());
            dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
    
};

export const updateRole = (role, id) => {
    return function(dispatch) {
        axios
        .put(`http://localhost:5000/role/${id}`, role)
        .then((resp) => {
            console.log("resp", resp);
            dispatch(roleUpdated());
            dispatch(loadRoles());
        })
        .catch((error) => console.log(error));
    };
    
};