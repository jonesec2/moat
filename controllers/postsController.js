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
         .sort({ date: -1, comments: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   },
   post: function (req, res) {
      console.log(req.body)
      console.log(req.params.id)

      db.NewPost.create(req.body)
         .then(function (dbReview) {
            console.log(dbReview._id)
            res.json(dbReview)
            return db.User.findOneAndUpdate(
               { username: req.params.id },
               { $push: { createdPosts: dbReview._id } },
               { new: true, useFindAndModify: false }
            );
         })
         // .then(function (dbProduct) {
         //    console.log(dbProduct)
         //    // If we were able to successfully update a Product, send it back to the client
         //    res.json(dbProduct);
         // })
         .catch((err) => {
            res.json(err)
         })
   },

   remove: function (req, res) {
      db.Book
         .deleteOne({ _id: req.params.id })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
   }
};
