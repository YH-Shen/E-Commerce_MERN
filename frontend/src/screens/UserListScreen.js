import React, {useState, useEffect} from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import Loader from '../components/Loader/Loader';
import { listUsers } from '../actions/userActions';

const UserListScreen = () => {
    // pass in action
    const dispatch = useDispatch();
    // pass in state
    const userList = useSelector( state => state.userList);
    // get loading, error, adn users from state
    const { loading, error, users } = userList;

    // useEffect to dispatch action
    useEffect(() => {
        disptach(listUsers());
    }, [disptach]);

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> 
                : error 
                ? <Message variant="danger">{error}</Message> : (
                    <Table tripped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map( user => (
                                <tr>
                                    <th>{user.id}</th>
                                    <th>{user.name}</th>
                                    <th>{user.email}</th>
                                    <th>{user.isAdmin}</th>
                                    
                                    <th></th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default UserListScreen;
