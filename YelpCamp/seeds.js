var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Bukkundu dubbu",
    image: "https://images.pexels.com/photos/33983/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis erat sit amet eros posuere, porttitor iaculis turpis maximus. Fusce id massa ac nibh tincidunt varius. Morbi rhoncus porta purus in placerat. Nam et elit magna. In vel commodo diam. Donec finibus metus at blandit viverra. Quisque ut orci eget quam eleifend dapibus vel id libero. Aliquam vitae velit vel justo consequat rutrum. Aenean arcu ipsum, maximus in ullamcorper nec, ullamcorper et neque."
  },
  {
    name: "Dukklu bukklu",
    image: "https://images.pexels.com/photos/27865/pexels-photo-27865.jpg?h=350&auto=compress&cs=tinysrgb",
    description: "Donec nec elit consequat, pretium enim vitae, semper libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent rhoncus iaculis enim id suscipit. Aenean convallis porta ante vel convallis. Nulla facilisi. Phasellus tincidunt ante eu lorem euismod lobortis. Nunc blandit venenatis elit, vel congue mi interdum at. Duis euismod sapien a volutpat feugiat. Mauris porttitor neque a dapibus euismod. Vivamus porta nibh orci, eget aliquam ipsum commodo vel. Sed aliquam sed risus sed finibus. Etiam volutpat nisi eu purus posuere consectetur. Maecenas malesuada finibus massa condimentum interdum. Sed cursus commodo rhoncus."
  },
  {
    name: "Pingaari pungu",
    image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb",
    description: "Etiam consectetur molestie sem, in suscipit nisl aliquam in. Phasellus ligula lacus, aliquet at leo nec, maximus porta lorem. Duis iaculis sapien in dolor efficitur aliquam. Aliquam non auctor nisl. Nulla sed ullamcorper tellus. Sed ut odio sed lectus dictum porta. Etiam et nunc porta mi lobortis dictum non et ligula. Curabitur tincidunt volutpat ligula, quis ullamcorper augue maximus eget. Nunc sagittis id nunc sed pharetra. Maecenas sit amet aliquam nunc. Nullam finibus viverra ultricies. Duis arcu metus, mattis eu augue eget, dignissim facilisis ipsum. Integer at fringilla tellus. Nunc condimentum venenatis odio bibendum consectetur. Morbi sed ligula a mi ullamcorper accumsan ut ut tortor."
  }
]

function seedDB() {

  //remove all campground
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("campgrounds removed");

    //add campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          Comment.create({
            text: "Such a nice place, nice sight!",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });

  });


}

module.exports = seedDB;
