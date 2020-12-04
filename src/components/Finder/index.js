import React, {useState, useEffect} from 'react';
import {FETCH_USERS} from "../Store/Reducers/UserReducer";

import {connect} from "react-redux";
import Axios from "axios";

function Finder(props){
  const [value, setValue] = useState("");

  useEffect(() => {
    Axios.get(`http://www.mocky.io/v2/5ba8efb23100007200c2750c`).then((response) => {
      props.fetchUsers({
        type: FETCH_USERS,
        payload: response
      })
    });
  }, []);

  useEffect(() => {
    console.log(props.data);
    search(value);
  }, [value]);

  function search(query){
    console.log("searching", query)
  }

  return(
    <div className="finder-container">

      <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}}/>


    </div>
  )
}
const mapStoreToProps = store => {
  return {
    data: store.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: (action) => {dispatch(action)}
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(Finder);
