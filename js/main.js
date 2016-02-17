var program = "bash";
//var program = "command-prompt";
var command = "";
var currentData = [];

$( ".terminal" ).keyup(function() {
  if (event.which == 13) {
    event.preventDefault();
    console.log(command);
    parseCommand(command, reset);
  }
  else if (event.which == 8) {
    event.preventDefault();
    command = command.slice(0, -1);
  }
  else {
    command += String.fromCharCode(event.which);
  }

  console.log(command);
});  

function reset() {    
  command = "";

  if (program == "command-prompt") 
    $( ".terminal#command-prompt" ).val($( ".terminal#command-prompt" ).val() + "\nC:\\Users\\avann\\>" );
  else if (program == "bash") 
    $( ".terminal#bash" ).val($( ".terminal#bash" ).val() + "\nAlexs-Air:~Alex$ " );
}

function parseCommand(commandString, callback) {
  var commandArray = commandString.split(" ");
  if (commandArray[0] == "CD") {
    if (commandArray[1] == "-C") {
      
    }
    else {
      getData(commandArray[1], function(){
        $.each(currentData.data.children, function(i,item){
          if (program == "command-prompt") {
            $( ".terminal#command-prompt" ).val($( ".terminal#command-prompt" ).val() + "\n [" + item.data.score + "] " + item.data.title );
          }
          else if (program == "bash") {
            $( ".terminal#bash" ).val($( ".terminal#bash" ).val() + "\n [" + item.data.score + "] " + item.data.title);
          }
        });

        console.log(currentData);
        callback();
      });
    }
  }
}

function getData(subreddit, callback) {
  if (subreddit != "") {
    $.getJSON("http://www.reddit.com/r/" + subreddit + "/.json?jsonp=?", function(data) { 
      // $.each(data.data.children, function(i,item){

      // });
      
      currentData = data;
      callback();
    });
  }
}

function init() {
  if (program == "bash") { 
    $( "#bash" ).show(); 
    $( "#command-prompt" ).hide(); 
  }
  else if (program == "command-prompt") { 
    $( "#command-prompt" ).show(); 
    $( "#bash" ).hide(); 
  }

  $("#bash").contentEditable = "true";
  $("#command-prompt").contentEditable = "true";

}

init();