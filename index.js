
var buttons = ["red", "blue", "green", "yellow"];

var randomPush = [];

 var userClickedColour = [];

 var start = false;

 var level = 0;

 $(document).keypress(function(){
   if (!start){
   $("#level-title").text("level"+level);
   nextSequence();
   start=true;
 }
});

 $(".btn").click(function() {
   var userChosenColour = $(this).attr("id");
   
   userClickedColour.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedColour.length-1);
  
 }
 );

function nextSequence() 
{
   userClickedColour = [];
   level++;
   $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenButton = buttons[randomNumber];
   randomPush.push(randomChosenButton);

   $("#" + randomChosenButton).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenButton)
}
function playSound(name) {
   var audio = new Audio ("sounds/" + name + ".mp3");
   audio.play();
}
function animatePress(currentColor) {
   $("#"+ currentColor).addClass("pressed");
setTimeout(function(){
$("#"+ currentColor ).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel) {
   if (randomPush[currentLevel] === userClickedColour[currentLevel]) 
     { console.log("success");    
   
   if (randomPush.length === userClickedColour.length)
   {
      setTimeout(function ()  {
         nextSequence();
      }, 1000);
   }}
   else{
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over,Press any key to Restart");
      startover(); 
   }
   
}
function startover( ) {
   level=0;
   randomPush=[];
   start=false;
}

  