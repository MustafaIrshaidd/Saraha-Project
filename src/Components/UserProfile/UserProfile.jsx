import axios from "axios";
import React,{useState} from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard"
import findUser from "../../Utils/findUser"
import { toast } from "react-toastify";
import LoaderBtn from "../LoaderBtn/LoaderBtn";


const UserProfile = ({users}) => {
    const {id} = useParams();
    const [inputField,setInputField]=useState("");
    const [user,setUser] = useState(findUser(users,id))
    const [loader,setLoader] = useState(false)

    const onchange=(event)=>{
        const {value}=event.target;
        setInputField(value);
    }

    const sendMessage=async (event)=>{
        event.preventDefault();
        setLoader(true);
        const url = `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`;
        const result = await axios.post(url,{message:inputField})

        toast.success("Massege sent successfully !");
        setLoader(false);

    }

    

    const shareProfile=(e,url)=>{
        e.preventDefault();
        copy(url);
        toast.success("Check your clipboard !")
    }

  return (
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="/assets/images/avatar.png" className="avatar" alt/>
          </a>
          <h3 className="py-2">{user.userName}</h3>
          <div className="container w-50 m-auto">
            <form action method="post" onSubmit={sendMessage}>
              <textarea
                className="form-control"
                name
                id
                cols={10}
                rows={9}
                placeholder="Write your message"
                onChange={onchange}
                defaultValue={inputField}
              />
              {loader ? <LoaderBtn/>
              :
              (<button className="btn btn-outline-info mt-3">
                <i className="far fa-paper-plane" /> Send
              </button>) 
              }
              
            </form>
          </div>
        </div>
        <button
          data-toggle="modal"
          data-target="#share"
          className="btn btn-default-outline share "
          onClick={(e)=>shareProfile(e,window.location)}
        >
          <i className="fas fa-share-alt" /> Share Profile
        </button>
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
    </div>
  );
};

export default UserProfile;
