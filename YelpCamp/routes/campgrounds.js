var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
        currentUser: req.user
      });
    }
  })
});

//CREATE route
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };

  //campgrounds.push(newCampground);
  Campground.create(newCampground, function(err, newItem) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


//SHOW route
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, cg) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {
        campground: cg
      });
    }
  });
});

//EDIT campground
router.get("/:id/edit", middleware.checkOwnershipOfCampground, function(req, res) {
  //user logged in?
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//UPDATE campground
router.put("/:id", middleware.checkOwnershipOfCampground, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY campground
router.delete("/:id", middleware.checkOwnershipOfCampground, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});




module.exports = router;
