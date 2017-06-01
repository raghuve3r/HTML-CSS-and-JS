//check off to-do by clicking
$('.mainlist').on('click','.l1',function() {
  var num = $(this).find(".num").text();
  if(num != 0){
    num--;
    if(num == 0){
      $(this).find(".num").text(num);
      $(this).toggleClass("completed");
    }
    else{
      $(this).find(".num").text(num);
    }
  }else{
    $(this).toggleClass("completed");
    $(this).find(".num").text(1);
  }
});


//click on X to delete the item
$('.mainlist').on('click','.delete',function(event){
  //parent method to act upon list item
  $(this).parent().fadeOut(300,function(){
    //this is now the list item which is the parent of span
    $(this).remove();
  });
  //stop propagating to parent elements
  event.stopPropagation();
});

$(".main").keypress(function(event){
  //compare if its 'Enter' key
  if(event.which === 13 && $(this).val() !== ""){
    //store the value entered in the input field
    var todo = $(this).val();
    //create a new list item and add it to ul
    $(".mainlist").append("<li class='l1'><span class='delete'><i class='fa fa-trash'></i></span> "+todo+"</li>");
    $(this).val("");
  }
});

$(".fa-pencil-square-o").click(function(){
  $(".main").fadeToggle(200);
});
