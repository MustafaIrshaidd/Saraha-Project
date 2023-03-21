import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import findUser from "../../Utils/findUser";
import axios from "axios";
import UserProfile from "../UserProfile/UserProfile";
import styles from "./styles.module.css"
import {toast } from 'react-toastify';
import copy from "copy-to-clipboard"


const MyProfile = ({ user, users }) => {
  const [profileUser, setProfileUser] = useState({});
  const [messages, setMessages] = useState([]);

  const tokenApi = "tariq__" + user;

  const getUser = () => {
    const decoded = jwtDecode(user);
    setProfileUser(findUser(users, decoded.id));
  };

  const getMessages = async () => {
    
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages",
      { headers: { token: tokenApi } }
    );
    if (result.data.message === "success") {
      setMessages(result.data.messages);
    }
  };

  const shareProfile=(e,url)=>{
    e.preventDefault();
    copy(url);
  }

  const deleteMessage = async (id)=>{
    const result = await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{headers:{token:tokenApi}})

    if(result.data.message === "success"){
      getMessages();
      toast.success('Deleted Successfully')
    }
  }

  

  useEffect(() => {
    getUser();
    getMessages();
  }, []);

  return (
    <React.Fragment>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="/assets/images/avatar.png" className="avatar" alt />
          </a>
          <h3 className="py-2">{profileUser.userName}</h3>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e)=>shareProfile(e,`http://localhost:3000/profile/${profileUser._id}`)}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </button>
        </div>
      </div>

      <div>
        <div
          className="modal fade"
          id="profile"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change photo
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form action method="post">
                    <label htmlFor className="text-muted">
                      The file size of the photo should not exceed 7 MB
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="photo"
                      id
                    />
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-info">
                  Upload
                </button>
                <button type="button" className="btn btn-outline-danger">
                  Remove Photo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="share"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Share Profile
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>host/messages/id</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center my-5 text-center">
          {messages.length == 0 ? (
            <div className="row">
              <div className="col-md-12">
                <div className="card py-5">
                  <p>You don't have any messages... </p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              return(<div className="row py-2">
              <div className="col-md-12">
                <div className="card py-5 position-relative text-center">
                  <p>{message.text}</p>
                  <div className={styles.deleteIcon} onClick={()=>deleteMessage(message._id)}>
                      <i className="fa-solid fa-trash" />
                  </div>
                </div>
                
              </div>
            </div>)
              
            })
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
