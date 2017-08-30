var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("/campgrounds")
      } else {
        //owner of the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error","You do not have the permission!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error","You need to be logged in to perform the operation.");
    res.redirect("back");
  }
}

middlewareObj.checkOwnershipOfCampground = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        req.flash("error","Campground not found!");
        res.redirect("/campgrounds")
      } else {
        //owner of the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error","You do not have the permission!");
          res.redirect("back");
        }
      }
    });
  } else {
    req,flash("error","You need to be logged in to perform the operation.");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error","You need to be logged in to perform the operation.");
  res.redirect("/login");
}


module.exports = middlewareObj;
