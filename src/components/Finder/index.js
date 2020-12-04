import React, {useState, useEffect, useRef} from 'react';
import {FETCH_USERS} from "../Store/Reducers/UserReducer";

import {connect} from "react-redux";
import Axios from "axios";

function Finder(props){
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const input = useRef(null);

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

  useEffect(() => {
    setCursor(-1)
  }, [result]);

  function search(query){
    //  id: a unique id
    //
    // name: user’s name
    //
    // items: list of items ordered by user
    //
    // address: address of the user
    //
    // pincode: user address pin code

    let search_result = props.data.filter(item => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    });

    setResult(search_result);

  }

  function navigate(e){
    if([38, 40].indexOf(e.keyCode) > -1){
      if(e.keyCode == 38){
        console.log("handling up");
        handleUp()
      } else {
        console.log("handling down");
        handleDown()
      }
    }
  }

  function handleUp(){
    if(cursor == -1){
      return
    }
    setCursor(cursor => cursor - 1)
  }

  function handleDown(){
    if(cursor == result.length -1 ){
      return
    }
    setCursor(cursor => cursor + 1)
  }

  function handleMouseEnter(value) {
    input.current.focus();
    setCursor(value);
  }

  return(
    <div className="finder-container">

      <input
        type="text"
        value={value}
        ref={input}
        onKeyDown={(e) => {navigate(e)}}
        onChange={(e) => {setValue(e.target.value)}}
      />

      <div className="finder-results" >
        {result.map((item, key) => {
          return(
            <div className={`result-item${cursor == key ? ' highlight' : ''}`} onMouseEnter={() => {handleMouseEnter(key)}}>
              {item.name}
            </div>
          )
        })}
      </div>
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
