import React, { useState, useEffect } from "react";
import Tagline from "../components/Tagline";
// import Button from "../components/Button";
import ListGroup from "../components/ListGroup";
// import TestList from "../components/TestList";

// import Post from "../components/Post";
import API from "../utils/API";
import "./sass/style.scss";
import categories from "../utils/categories.json"

function Categories() {

   const [userCategories, setCategories] = useState({})

   useEffect(() => {
      getUser();
      getUserCategories();
   }, [])

   let usernameStored;
   function getUser() {
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("usernameStored: " + usernameStored)
      API.getUser(usernameStored);
   }

   function getUserCategories() {
      usernameStored = localStorage.getItem("usernameMOAT");
      console.log("usernameStored: " + usernameStored)
      console.log(usernameStored)
      API.getUserCategories(usernameStored)
         .then(res => {
            console.log(res.data)
            setCategories(res.data)
            console.log(userCategories)
         })
         .catch(err => console.log(err));
   }
   console.log(userCategories)


   return (
      <div className="container" id="dashboardPage" style={{ marginTop: "30px", marginBottom: "100px", minHeight: "100vh" }}>
         <div className="hero row p-5 mb-3">
            {/* <div className="col-md-6">
                    <Tagline lineNum={[{ 1: "Welcome to" }, 2]} />
                </div>
                <div className="col-md-6">
                    <Tagline lineNum={[3]} />
                </div> */}
            <div className="col-12">
               <div className="wrapper">
                  <div className="welcome">
                     <h1>Categories</h1>
                     <h4 className="tagline">Master of All Trades</h4>
                  </div>
                  <p>A place to learn just about anything. Choose your trades and master them.</p>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="categories">
               <ul class="list-group">
                  <li class="list-group-item font-weight-bold">Your Categories</li>
                  {userCategories.length > 0 ? userCategories.map(post =>
                     <li className="list-group-item">{post}  <button id="test">X</button></li>) : (
                        <li className="list-group-item"><div className="row">It looks like you don't have any categories yet.</div><br></br><div className="row">Just click some categories that you are interested in to get started</div></li>
                     )}
                     <button>Save</button>
               </ul>
               
            </div>
            <div className="trending">
               <p className="mb-3 text-center font-weight-bold">Trending</p>
               <ul class="list-group">
                  {categories.sort().map(category =>
                     <li className="list-group-item">{category}</li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );

}

export default Categories;
