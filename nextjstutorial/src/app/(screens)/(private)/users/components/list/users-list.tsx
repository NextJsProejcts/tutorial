'use client';

import { useStores } from "@/utils/store/config/root-store/root-store-context";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

import './users-list.css';
import { User } from "@/utils/models/models/users";

const UsersList = observer(
    () =>{
    const { usersStoreModel } = useStores();
    const { users, loading } = usersStoreModel;

    const countRef = useRef(users.length);

    useEffect(()=>{
        usersStoreModel.getUsers();
    },[])

    const addNewUser = () =>{
        let newUser = {
            fullname: 'fullname '+ countRef.current,
            username: 'username ' + countRef.current,
            description: 'description'
        } as User;
        countRef.current++;
        usersStoreModel.postUsers(newUser).then(r=>{
            usersStoreModel.getUsers();
        });
    }

    const deleteUser = (user: User) =>{
        usersStoreModel.deleteUser(user.username).then(r=>{
            usersStoreModel.getUsers();
        });
    }
    
    return(
        loading ? <>loading</> : 
        <>
            <div className="container bootdey">
                <div className="row">
                    <div className="col">
                        <div className="user-widget-2">
                            <ul className="list-unstyled">
                                {
                                    users.map((user:User, index: number)=>(
                                        <div key={`user - ${index}`}>
                                            <li className="media">
                                                <img className="rounded-circle d-flex align-self-center" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                <div className="media-body">
                                                    <h3>{user.username}</h3>
                                                    <h5>{user.fullname}</h5>
                                                </div><i className="d-flex align-self-center fa fa-dot-circle-o color-success"></i>
                                                <button onClick={()=>{ deleteUser(user) }}>Delete</button>
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <button onClick={addNewUser}>add new user</button>
            </div>
        </>
    )
})

export default UsersList;