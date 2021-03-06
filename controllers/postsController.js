const db = require("../models");
// const router = require("express").Router();
// const express = require("express");
// const passport = require("../passport");


module.exports = {
   // gets all Notes and orders by date and then comment amount.
   // For future we can limit to top 50 results or something
   getTrending: function (req, res) {
      db.NewPost
         .find(req.query)
         .limit(50)
         .sort({ commentsArrayLength: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },

   // creates a post and adds to user's document
   createPost: function (req, res) {
      console.log(req.body)
      console.log(req.params)

      var d = new Date();
      var hour = d.getHours();
      var date = d.getDate();
      var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
      var year = d.getFullYear();
       
      const customDate = ""+year + month + date + hour;
      console.log(customDate)
   

      db.NewPost.create(
         {
            username: req.body.username,
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            profilePicture: req.body.profilePicture,
            categories: req.body.categories,
            date: customDate
         }
      )
         .then(function (newPost) {
            console.log(newPost._id)

            res.json(newPost)
            return db.User.findOneAndUpdate(

               { username : req.body.username },
               {
                  $push: {
                     createdPosts: newPost._id
                  }
               },
               { new: true, useFindAndModify: false }
            );
         })
   },

   // gets a specific post 
   getUserPost: function (req, res) {
      console.log(req.params)

      return db.NewPost.findOne({ username: req.params.id })
         .populate('commentsArray').exec((err, commentsArray) => {
            console.log(commentsArray)
            res.json(commentsArray)
         })
   },

   // finds all the posts by a single user
   getAllUserPosts: function (req, res) {
      console.log("userID " + req.params.id)

      db.NewPost.find({ username: req.params.id })
         .sort({ date: -1})
         .then(allPosts => {
            console.log("all user" + allPosts);
            res.json(allPosts)
         })
         .catch((err) => res.status(422).json(err));
   },


   //
   getAllUserCategories: function (req, res) {
      console.log(req.params);

      db.NewPost.find({ _id: req.params.name, categories: req.params.category })
   },

   // getting a post by specific categories
   getPostByCategories: function (req, res) {
      console.log(req.params)
      db.NewPost.find({ categories: req.params.category || /req.params/i})
      .limit(50)
      .sort({ commentsArrayLength: -1 })
      .then(postCategory => {
         console.log(postCategory)
         res.json(postCategory)
      })
      .catch(err => {
         res.status(422).json(err)
      })
   },
   
   //
   removePost: function (req, res) {
      console.log(req.params.id)

      db.NewPost
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
