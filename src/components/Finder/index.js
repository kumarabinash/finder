import React, {useState, useEffect, useRef, createRef} from 'react';
import {FETCH_USERS} from "../Store/Reducers/UserReducer";

import {connect} from "react-redux";
import Axios from "axios";
import Highlighted from "./Highlighted";

import {FcAddressBook, FcBusinessman} from "react-icons/fc";

function Finder(props){
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const input = useRef(null);
  const [resultItemRefs, setResultItemRefs] = useState([]);

  // Runs once to fetch data of users
  useEffect(() => {
    Axios.get(`http://www.mocky.io/v2/5ba8efb23100007200c2750c`).then((response) => {
      props.fetchUsers({
        type: FETCH_USERS,
        payload: response
      })
    });
  }, []);

  // Runs when user searches for a query
  useEffect(() => {
    search(value);
  }, [value]);

  // Runs when search results change
  useEffect(() => {
    // Creates array of refs
    setResultItemRefs(resultItemRefs => (
      Array(result.length).fill().map((_, i) => resultItemRefs[i] || createRef())
    ));

    // updates cursor value to -1
    setCursor(-1)
  }, [result]);

  // Runs when highlighted object changes; scrolls into view if needed
  useEffect(() => {
    resultItemRefs[cursor] && resultItemRefs[cursor].current.scrollIntoViewIfNeeded()
  }, [cursor]);

  function search(query){
    // Searches through the entire object
    let search_result = props.data.filter(item => {
      return JSON.stringify(item).toLowerCase().indexOf(query.toLowerCase()) > -1
    });

    // Set search results
    setResult(search_result);
  }

  function navigate(e){
    if([38, 40].indexOf(e.keyCode) > -1){
      if(e.keyCode === 38){
        handleUp()
      } else {
        handleDown()
      }
    }
  }

  function handleUp(){
    if(cursor === -1 || result.length === 0){
      return
    }
    setCursor(cursor => cursor - 1)
  }

  function handleDown(){
    if(cursor === (result.length - 1) || result.length === 0){
      return
    }
    setCursor(cursor => cursor + 1)
  }

  function handleMouseEnter(value) {
    input.current.focus();
    setCursor(value);
  }

  // Returns list of results to be displayed
  function builderResults(){
    return result.map((item, key) => {
      return(
        <div className={`result-item${cursor === key ? ' highlight' : ''}`}
             onMouseEnter={() => {handleMouseEnter(key)}}
             ref={resultItemRefs[key]}
        >
          <div className="item-id"><Highlighted text={item.id} highlight={value} /></div>
          <h3>
            <FcBusinessman /> <Highlighted text={item.name} highlight={value} />
          </h3>
          <p>
            <Highlighted text={item.address} highlight={value} />
            <br />
            <b><Highlighted text={item.pincode} highlight={value} /></b>
          </p>
        </div>
      )
    })
  }

  return(
    <div className="finder-container">

      <input
        className="finder-search-box"
        type="text"
        value={value}
        placeholder="Type to search..."
        ref={input}
        onKeyDown={(e) => {navigate(e)}}
        onChange={(e) => {setValue(e.target.value)}}
      />

      {typeof(value) !== 'undefined' && value !== "" ?

        <div className="finder-results" >
          {result.length ?
            builderResults()
            :
            <div className="no-results">
              No Results Found
            </div>
          }
        </div>
        :
        null
      }
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

