import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import pagination from "../../Utils/pagination";

const GetUsers = ({ users }) => {
  const [results, setResults] = useState(users);
  const navigate = useNavigate();
  const [pageInfo,setPageInfo]=useState({
    pageNumber:0,
    pageSize:10,
  })

  const changePageNumber=(page)=>{
    setPageInfo({...pageInfo,pageNumber:page})
  };

  const onchange = (e) => {
    const { value } = e.target;

    const tmpArr = [];

    users.map((user) => {
      if (user.userName.toLowerCase().includes(value)) {
        tmpArr.push(user);
      }
    });

    setResults(tmpArr);
    setPageInfo({...pageInfo,pageNumber:0})
  };

  return (
    <div className="container">
      <div className="input-group rounded py-5 w-100 ">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={onchange}
        />
        <span className="input-group-text border-0" id="search-addon">
          <i className="fas fa-search" />
        </span>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Send Message</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {pagination(results,pageInfo.pageNumber,pageInfo.pageSize).map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index}</th>
              <td>{user.userName}</td>
              <td>

                  <button
                    className={styles["btn-send-message"]}
                    onClick={() => {
                      navigate(`/profile/${user._id}`);
                    }}
                  >
                    Send Message
                    <span>
                      <i className="fa-regular fa-paper-plane px-2" />
                    </span>
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination users={results} changePageNumber={changePageNumber} {...pageInfo}/>
    </div>
  );
};

export default GetUsers;
