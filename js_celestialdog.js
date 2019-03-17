// Simulation Variables
/////////////////////
// Config

/*
This criterion is linked to a Learning Outcome Functionality - Variables
At least 1 variables in the entire scenario, each of which are modified by decisions by the interactor
*/
var shouldDebug = true;
var feedCount;
var petCount;
var playCount;
var feeding = new Sayings(
  [
    "WOW he's really great",
    "He's getting really full",
    "Oh no! He's about to explode!"
  ]
);
var playing = new Sayings(
  [
    "He's having a great time.",
    "He's getting a little tired.",
    "What's happening?? Is he imploding?"
  ]
);

var petting = new Sayings(
  [
    "he loves the pets",
    "wow wow so many pets.",
    "pet pet pet!"
  ]
);

// State
var timeStep = 0;
var chosenAction;

// Bookkeeping
var initialized = false;
var simState;


// Starting Function
/////////////////////
$(document).ready(function() {
  simState = new StateMachine();
  simState.Start();

  $("#bttn").click(function() {
    simState.Update();
  });
});

// State Machine ////
///////////////////////////////////////////////
var StateMachine = function(){
  this.states = { // Add/Remove States Here
    "Init" : new Init(this),
    "Play" : new Play(this),
    "Feed" : new Feed(this),
    "Pet" : new Pet(this),
    "Explode" : new Explode(this),
    "Implode" : new Implode(this),
  };
  this.currentState = this.states["Init"]; //sets initial statemachine
  var nextState;

  // Largely don't mess with this section
  this.Start = function () {
    this.currentState.Enter();
    if (shouldDebug) this.Debug();
  };
  this.Update = function () {
    this.currentState.Update(function() {
      this.Transition();
    }.bind(this));
    if (shouldDebug) this.Debug();
  };
  this.Change = function (state) {
    nextState = state;
  };
  this.Transition = function() {
    if (nextState !== undefined) {
      this.currentState.Exit();
      this.currentState = nextState;
      nextState = undefined;
      this.currentState.Enter();
    }
  }
  // Down to here
  this.Debug = function () { // Edit this function with important variables from your code
    console.log("-------------------------");
    console.log("timeStep = " + timeStep);
    console.log("Feed " + feedCount);
    console.log("Play " + playCount);
    console.log("Pet " + petCount);
    console.log("----------------");
    console.log("State = " + this.currentState.name);
    console.log("----------------");
  };
};

var Init = function (machine) {
  this.name = this.constructor.name;
  var fsm = machine;
  playCount = 0;
  feedCount = 0;
  petCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter1");
    $("#pick").show();
    $("#restart").hide();
    playCount = 0;
    feedCount = 0;
    petCount = 0;

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog-01.png" alt="Celestial Dog">');
    // $("#pick").show();
    $("#pic").fadeIn();

    // if (chosenAction == playing) {
    //   $("#target").fadeOut(function() {
    //     fsm.Change(fsm.states["Play"]);
    //
    //     if (callback !== undefined) callback();
    //   });
    // }
    //   else if (chosenAction == petting) {
    //   $("#target").fadeOut(function() {
    //     fsm.Change(fsm.states["Pet"]);
    //
    //     if (callback !== undefined) callback();
    //   });
    // }
    //   else if (chosenAction == feeding) {
    //   $("#target").fadeOut(function() {
    //     fsm.Change(fsm.states["Feed"]);
    //
    //     if (callback !== undefined) callback();
    //   });
    // }
    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update1");
    if (chosenAction == playing) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Play"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == petting) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Pet"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == feeding) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Feed"]);

        if (callback !== undefined) callback();
      });
    }

    if (callback !== undefined) callback();
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    //$("#pick").hide();
    $("#input").show();

    if (callback !== undefined) callback();
  };
};


var Play = function (machine) {
  this.name = this.constructor.name;
  this.line = 0;
  var fsm = machine;
  playCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
      /*
      This criterion is linked to a Learning Outcome Functionality Variable Changes
      At least 1 variable must be modified by more than 1 decision event on the same playthrough
      */
    playCount++;
    feedCount = 0;
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    if (shouldDebug) console.log(chosenAction.lines[playCount-1]);

    // playCount ++;
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[playCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog_play1-02.png" alt="Celestial Dog Playing">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
      if (shouldDebug) console.log("---- " + this.name + " Update2");
    if (chosenAction == playing) {
      playCount++;
      if (playCount < 4) {
          ClearByID("#target");
          DrawInID("#target", chosenAction.lines[playCount-1]);
          $("#pick").show();
          $("#target").fadeIn();
          if (shouldDebug) console.log(chosenAction.lines[playCount-1]);
      }
    }
     else if (chosenAction == feeding) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Feed"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == petting) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Pet"]);

        if (callback !== undefined) callback();
      });
    }
    // playCount++;
    if (playCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="celestialdog_play2-03.png" alt="Celestial Dog Getting Tired">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (playCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="celestialdog_play3-04.png" alt="Celestial Dog About to Implode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }
    if (playCount == 4) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Implode"]);

        if (callback !== undefined) callback();
      });
    }
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};


var Feed = function (machine) {
  this.name = this.constructor.name;
  this.line = 1;
  var fsm = machine;
  feedCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
    feedCount++;
    playCount = 0;
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[feedCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog_feed1-05.png" alt="Celestial Dog Fed">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (shouldDebug) console.log(chosenAction.lines[feedCount-1]);

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    // feedCount++;
if (chosenAction == feeding) {
      feedCount++;
      if (feedCount < 4) {
          ClearByID("#target");
          DrawInID("#target", chosenAction.lines[feedCount-1]);
          $("#pick").show();
          $("#target").fadeIn();
          if (shouldDebug) console.log(chosenAction.lines[feedCount-1]);
      }
    }
        else if (chosenAction == playing) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Play"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == petting) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Pet"]);

        if (callback !== undefined) callback();
      });
    }
    if (feedCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="celestialdog_feed2-08.png" alt="Celestial Dog Fat">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (feedCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="celestialdog_feed3-07.png" alt="Celestial Dog About to Explode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }
    if (feedCount == 4) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Explode"]);

        if (callback !== undefined) callback();
      });
    }
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};


var Pet = function (machine) {
  this.name = this.constructor.name;
  var fsm = machine;

  // Happens once when state is entered
  this.Enter = function (callback) {
    feedCount = 0;
    playCount = 0;
    petCount++;
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[petCount%3]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog_pet-06.png" alt="Celestial Dog Being Pet">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    // petCount++;
    ClearByID("#target");
    // DrawInID("#target", chosenAction.lines[petCount]);
    $("#pick").show();
    $("#target").fadeIn();
    if (chosenAction == playing) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Play"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == petting) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Pet"]);

        if (callback !== undefined) callback();
      });

    } else if (chosenAction == feeding) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Feed"]);

        if (callback !== undefined) callback();
      });
    }
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};

var Implode = function (machine) {
  this.name = this.constructor.name;
  this.line = 4;
  var fsm = machine;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    $("#pick").hide();
    $("#restart").show();
    DrawInID("#target", "He imploded!!!!");
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog_implode-09.png" alt="Celestial Dog Imploded">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    $("#target").fadeOut(function() {
      ClearByID("#target");
      fsm.Change(fsm.states["Init"]);

      if (callback !== undefined) callback();
    });
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");

    if (callback !== undefined) callback();
  };
};

var Explode = function (machine) {
  this.name = this.constructor.name;
  this.line = 4;
  var fsm = machine;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    DrawInID("#target", "He exploded!!!!!");
    $("#pick").hide();
    $("#restart").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="celestialdog_explode-10.png" alt="Celestial Dog Exploded">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    $("#target").fadeOut(function() {
      ClearByID("#target");
      fsm.Change(fsm.states["Init"]);

      if (callback !== undefined) callback();
    });
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");

    if (callback !== undefined) callback();
  };
};




// Helpers /////////
///////////////////////////////////////////////
// I put misc functions that are used in many different places in a group I just called Helper
function PickAction(choice) {
  chosenAction = choice;
  simState.Update();
}

function changeState(machine, choice) {
  var fsm = machine;
  if (choice == feeding) {
    fsm.Change(fsm.states["Feed"]);
    console.log("feeding");
  }
  if (choice == playing) {
    fsm.Change(fsm.states["Play"]);
  }
  if (choice == petting) {
    fsm.Change(fsm.states["Pet"]);
  }
}

// Data /////////
///////////////////////////////////////////////
// It's useful to treat user input in some standardized way. This function works as data storage object for user actions
// Edit this structure with whatever actions you want to happen
function Sayings(lines) {
  this.lines = lines;
}
// Draw /////////////
///////////////////////////////////////////////
function ClearByID(id) {
  $(id).html($([]));
}
function FadeByID(id, state) {
  if (state) {
    $(id).fadeIn();
  } else {
    $(id).fadeOut();
  }

}
function DrawInID(id, stateName) {
  $(id).append(
    "<p class='d-inline-block py-1 my-1'>" + stateName + "</p>"
  );
}
