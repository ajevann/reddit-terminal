var program = "bash";
//var program = "command-prompt";
var command = "";

$( ".terminal" ).keypress(function() {
  if (event.which == 13) {
    event.preventDefault();
    console.log(command);
    parseCommand(command, reset);
  }
  else {
    command += String.fromCharCode(event.which);
  }
});  

function reset() {    
  command = "";

  if (program == "command-prompt") 
    $( ".terminal#command-prompt" ).val($( ".terminal#command-prompt" ).val() + "\nC:\\Users\\avann\\>" );
  else if (program == "bash") 
    $( ".terminal#bash" ).val($( ".terminal#bash" ).val() + "\nAlexs-Air:~Alex$ " );
}

function parseCommand(command, callback) {
  if (command.indexOf("cd ") == 0) {
    console.log("change directory");

    $.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", function(data) { 
      $.each(data.data.children, function(i,item){
        if (program == "command-prompt") 
          $( ".terminal#command-prompt" ).val($( ".terminal#command-prompt" ).val() + "\n" + item.data.url );
        else if (program == "bash") 
          $( ".terminal#bash" ).val($( ".terminal#bash" ).val() + "\n" + item.data.url );
      });
      
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