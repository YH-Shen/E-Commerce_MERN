import React, { useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import Loader from '../components/Loader/Loader';
import { deleteUser, listUsers } from '../actions/userActions';

const UserListScreen = ({ history }) => {
    // pass in action
    const dispatch = useDispatch();
    // pass in state
    const userList = useSelector( state => state.userList);
    // get loading, error, adn users from state
    const { loading, error, users } = userList;

    const userLogin = useSelector( state => state.userLogin);

    // get loading, error, adn users from state
    const { userInfo } = userLogin;

    // pass in state for userDelete
    const userDelete = useSelector( state => state.userDelete);
    // destructure for success and rename it to successDelete
    const { success: successDelete } = userDelete;


    // useEffect to dispatch action
    useEffect(() => {
        // only dispatch users if user is admin
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            // else redirect user to home
            history.push("/login");
        }
        
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        // add a confirm for delete
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> 
                : error 
                ? <Message variant="danger">{error}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IsADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map( user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin 
                                            ? (<i className="fas fa-check" style={{"color": "green"}}/>)
                                            : (<i className="fas fa-times" style={{"color": "red"}}/>)}
                                    </td>
                                    
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant="light" className="btn-sm" >
                                                <i className="fas fa-edit"/>
                                            </Button>
                                        </LinkContainer>
                                        <Button 
                                            variant="danger" 
                                            className="btn-sm" 
                                            onClick={() => {deleteHandler(user._id)}}>
                                            <i className="fas fa-trash"/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default UserListScreen;
