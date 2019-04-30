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
var walkCount;
var treatCount;

var happiness;
var health;
var hunger;

var buttonCount;

var feeding = new Sayings(
  [
    "WOW he's really great",
    "munch munch munch",
    "man he loves that kibble",
    "He's getting really full",
    "like really really full",
    "Oh no! He's about to explode!"
  ]
);
var playing = new Sayings(
  [
    "He's having a great time.",
    "wow does he love chasing balls",
    "is he running away with the frisbee????",
    "where is he going??",
    "He's getting a little tired.",
    "What's happening?? Is he imploding?"
  ]
);

var petting = new Sayings(
  [
    "he loves the pets",
    "wow wow so many pets.",
    "pet pet pet!",
    "squiggly butt",
    "more pets! more pets!",
    "wag wag waggy tail",
  ]
);

var walking = new Sayings(
  [
    "so excited for walk",
    "did someone say walk!?!?",
    "nice little mozy down the block",
    "another dog out for a walk through the star system",
    "must be nice to walk through the stars",
    "oh he's slowing down"
  ]
);

var treat = new Sayings(
  [
    "num num num num num",
    "crunch crunch yum yum.",
    "licks his lips and is ready for more",
    "treats are his fave. he's like a black hole for them",
    "tummy grumbles from all the treats",
    "grumbly grumbly, grumble grumble"
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
    "Walk" : new Walk(this),
    "Treat" : new Treat(this),
    "Medicine" : new Medicine(this),
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
  /*
  This criterion is linked to a Learning Outcome Interactive - Console Output
  Must display current state of values in console
  */
  // Down to here
  this.Debug = function () { // Edit this function with important variables from your code
    console.log("-------------------------");
    console.log("timeStep = " + timeStep);
    console.log("Feed " + feedCount);
    console.log("Play " + playCount);
    console.log("Pet " + petCount);
    console.log("Walk " + walkCount);
    console.log("Treat " + treatCount);
    console.log("----------------");
    console.log("happiness " + happiness);
    console.log("hunger " + hunger);
    console.log("health " + health);
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
  walkCount = 0;
  treatCount = 0;
  hunger = 3;
  happiness = 3;
  health = 3;
  buttonCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter1");
    $("#pick").show();
    $("#restart").hide();
    $("#medicine").hide();
    playCount = 0;
    feedCount = 0;
    petCount = 0;
    walkCount = 0;
    treatCount = 0;
    buttonCount = 0;

    changeBar();

/*
This criterion is linked to a Learning Outcome Design - Images
All images have proportional aspect ratios, are free of artifacting (i.e. not blurry), and have ALT tags
*/
    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_neutral-12.png"  style="width:500px" alt="Celestial Dog">');
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
      else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }

    if (callback !== undefined) callback();

    changeBar();
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
  feedCount = 0;
  walkCount = 0;
  treatCount = 0;
  petCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
      /*
      This criterion is linked to a Learning Outcome Functionality Variable Changes
      At least 1 variable must be modified by more than 1 decision event on the same playthrough
      */
    playCount++;
    feedCount = 0;
    walkCount = 0;
    treatCount = 0;
    petCount = 0;
    buttonCount++;

    changeBar();

    if (happiness < 6) {
     happiness++;
    }
    if (hunger > 0) {
      hunger--;
    }
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("Walk " + walkCount);
          console.log("Treat " + treatCount);
          console.log("----------------");
          console.log("happiness " + happiness);
          console.log("hunger " + hunger);
          console.log("health " + health);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    if (shouldDebug) console.log(chosenAction.lines[playCount-1]);

    // playCount ++;
    /*
    This criterion is linked to a Learning Outcome Interactive - Visible Variable
At least 1 variable must be visible to interactor during playthrough
    */
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[playCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Playing">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
      if (shouldDebug) console.log("---- " + this.name + " Update2");
    if (chosenAction == playing) {
      playCount++;
      if (happiness < 6) {
         happiness++;
      }
      if (hunger > 0) {
        hunger--;
      }
      if (playCount < 5) {
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
    else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }
    // playCount++;
    if (playCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_bad-14.png" style="width:500px;" alt="Celestial Dog Getting Tired">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (playCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_dying-15.png" style="width:500px;" alt="Celestial Dog About to Implode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }

    //logic for health, happiness, hunger
    if (health == 0 && hunger <=2) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Implode"]);

        if (callback !== undefined) callback();
      });
    }
    else if (hunger <2) {
      health--;
    }
    else if (2 < happiness && 2 < hunger < 5 && health < 6) {
      health ++;
    }
    else if (buttonCount/3 == 0) {
      happiness--;
    } else if (buttonCount/2 == 0 ) {
      hunger--;
    }
    if (health <= 2) {
      $("#medicine").show();
    }
    else {
      $("medicine").hide();
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
  playCount = 0;
  walkCount = 0;
  treatCount = 0;
  petCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
    feedCount++;
    playCount = 0;
    walkCount = 0;
    treatCount = 0;
    petCount = 0;
    buttonCount++;

    if (hunger < 6) {
      hunger++;
    }
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("Walk " + walkCount);
          console.log("Treat " + treatCount);
          console.log("----------------");
          console.log("happiness " + happiness);
          console.log("hunger " + hunger);
          console.log("health " + health);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[feedCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Fed">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (shouldDebug) console.log(chosenAction.lines[feedCount-1]);

    if (callback !== undefined) callback();
    changeBar();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    // feedCount++;
    if (chosenAction == feeding) {
      feedCount++;
      if (hunger < 6) {
        hunger++;
      }
      if (feedCount < 5) {
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
    else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }
    if (feedCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_bad-14.png" style="width:500px;" alt="Celestial Dog Fat">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (feedCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_dying-15.png" style="width:500px;" alt="Celestial Dog About to Explode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }
   if (health == 0 && hunger >= 4) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Explode"]);

        if (callback !== undefined) callback();
      });
    }
    if (hunger >5 || happiness <=2) {
      health--;
    }
    else if (2 < happiness && 2 < hunger < 5 && health < 6) {
      health ++;
    }
    else if (buttonCount/3 == 0) {
      happiness--;
    } else if (buttonCount/2 == 0 ) {
      hunger--;
    }
    if (health <= 2) {
      $("#medicine").show();
    }
     else {
      $("medicine").hide();
    }

    changeBar();
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
    walkCount = 0;
    treatCount = 0;
    petCount++;
    buttonCount++;

    if (happiness <6) {
       happiness++;
    }
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("Walk " + walkCount);
          console.log("Treat " + treatCount);
          console.log("----------------");
    console.log("happiness " + happiness);
    console.log("hunger " + hunger);
    console.log("health " + health);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[petCount%3]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Being Pet">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
    changeBar();
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
      if (happiness < 6) {
         happiness++;
      }
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
    else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }
     //logic for health, hunger, and happiness
   if (2 < happiness && 2 < hunger < 5  && health < 6) {
      health ++;
    }
    else if (buttonCount/3 == 0) {
      happiness--;
    } else if (buttonCount/2 == 0 ) {
      hunger--;
    }

    //medicine
    if (health <= 2) {
      $("#medicine").show();
    }
     else {
      $("medicine").hide();
    }
    changeBar();
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};
/*
This criterion is linked to a Learning Outcome Interactive - Different Outcomes
At least 2 different, distinct outcomes (i.e. cannot only be a different value at the end, but must change narrative, etc. as well)

This criterion is linked to a Learning Outcome Interactive - Visible Changes
Clearly legible end state: the end of a visible, finite counter (e.g. 0 days remaining); and/or crossing the threshold of a visible variable (e.g. hunger hits 0, fatigue is over 100)
*/

var Walk = function (machine) {
  this.name = this.constructor.name;
  this.line = 0;
  var fsm = machine;
  playCount = 0;
  petCount = 0;
  feedCount = 0;
  treatCount = 0;

  // Happens once when state is entered
  this.Enter = function (callback) {
      /*
      This criterion is linked to a Learning Outcome Functionality Variable Changes
      At least 1 variable must be modified by more than 1 decision event on the same playthrough
      */
    walkCount++;
    feedCount = 0;
    treatCount = 0;
    playCount = 0;
    petCount = 0;
    buttonCount++;

    if (happiness < 6) {
      happiness++;
    }
    if (hunger > 0) {
      hunger--;
    }
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("Walk " + walkCount);
          console.log("Treat " + treatCount);
          console.log("----------------");
    console.log("happiness " + happiness);
    console.log("hunger " + hunger);
    console.log("health " + health);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    if (shouldDebug) console.log(chosenAction.lines[walkCount-1]);

    // playCount ++;
    /*
    This criterion is linked to a Learning Outcome Interactive - Visible Variable
At least 1 variable must be visible to interactor during playthrough
    */
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[walkCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Playing">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (callback !== undefined) callback();
    changeBar();
  };
  this.Update = function (callback) {
      if (shouldDebug) console.log("---- " + this.name + " Update2");
    if (chosenAction == walking) {
      walkCount++;
      if (happiness < 6) {
      happiness++;
    }
    if (hunger > 0) {
      hunger--;
    }
      if (walkCount < 5) {
          ClearByID("#target");
          DrawInID("#target", chosenAction.lines[walkCount-1]);
          $("#pick").show();
          $("#target").fadeIn();
          if (shouldDebug) console.log(chosenAction.lines[walkCount-1]);
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
      else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == playing) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Play"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }
    // playCount++;
    if (walkCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_bad-14.png" style="width:500px;" alt="Celestial Dog Getting Tired">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (walkCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_dying-15.png" style="width:500px;" alt="Celestial Dog About to Implode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }


    if (health == 0 && hunger <=2) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Implode"]);

        if (callback !== undefined) callback();
      });
    }

     //logic for health, hunger, and happiness
    if (hunger < 2 || happiness <=2) {
      health--;
    }
    else if (2 < happiness && 2 < hunger < 5 && health < 6) {
      health ++;
    } else if (buttonCount/3 == 0) {
      happiness--;
    } else if (buttonCount/2 == 0 ) {
      hunger--;
    }

    if (health <= 2) {
      $("#medicine").show();
    }
     else {
      $("medicine").hide();
    }
    changeBar();
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};

var Treat = function (machine) {
  this.name = this.constructor.name;
  this.line = 1;
  var fsm = machine;
  playCount = 0;
  petCount = 0;
  walkCount = 0;
  feedCount = 0;
  buttonCount++;

  // Happens once when state is entered
  this.Enter = function (callback) {
    treatCount++;
    playCount = 0;
    petCount = 0;
    walkCount = 0;
    feedCount = 0;

    if (hunger < 6) {
      hunger++;
    }
    if (happiness < 6) {
      happiness++;
    }
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
          console.log("Walk " + walkCount);
          console.log("Treat " + treatCount);
          console.log("----------------");
    console.log("happiness " + happiness);
    console.log("hunger " + hunger);
    console.log("health " + health);
          console.log("----------------");
          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", chosenAction.lines[treatCount-1]);
    $("#pick").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Fed">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (shouldDebug) console.log(chosenAction.lines[treatCount-1]);

    if (callback !== undefined) callback();
    changeBar();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    // feedCount++;
if (chosenAction == treat) {
      treatCount++;
      if (hunger < 6) {
        hunger++;
      }
      if (happiness < 6) {
        happiness++;
      }
      if (treatCount < 5) {
          ClearByID("#target");
          DrawInID("#target", chosenAction.lines[treatCount-1]);
          $("#pick").show();
          $("#target").fadeIn();
          if (shouldDebug) console.log(chosenAction.lines[treatCount-1]);
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
      else if (chosenAction == feeding) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Feed"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == medicine) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Medicine"]);

        if (callback !== undefined) callback();
      });
    }
    if (treatCount == 2) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_bad-14.png" style="width:500px;" alt="Celestial Dog Fat">');
        // $("#pick").show();
        $("#pic").fadeIn();
    } else if (treatCount == 3) {
        ClearByID("#pic");
        DrawInID("#pic", '<img src="Round2/celestialdog_dying-15.png" style="width:500px;" alt="Celestial Dog About to Explode">');
        // $("#pick").show();
        $("#pic").fadeIn();
    }
    if (treatCount == 4) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Explode"]);

        if (callback !== undefined) callback();
      });
    }

     //logic for health, hunger, and happiness
    if (health == 0 && hunger >= 5) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Explode"]);

        if (callback !== undefined) callback();
      });
    }
    if (hunger ==6) {
      health--;
    }
    else if (2 < happiness && 2 < hunger < 5 && health < 6) {
      health ++;
    } else if (buttonCount/3 == 0) {
      happiness--;
    } else if (buttonCount/2 == 0 ) {
      hunger--;
    }

    if (health <= 2) {
      $("#medicine").show();
    }
     else {
      $("medicine").hide();
    }
    changeBar();
  };
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    ClearByID("#target");
    if (callback !== undefined) callback();
  };
};

var Medicine = function (machine) {
  this.name = this.constructor.name;
  this.line = 1;
  var fsm = machine;
  feedCount = 0;
  treatCount = 0;
  playCount = 0;
  walkCount = 0;
  petCount = 0;
  buttonCount++;


  // Happens once when state is entered
  this.Enter = function (callback) {
    feedCount = 0;
    treatCount = 0;
    playCount = 0;
    walkCount = 0;
    petCount = 0;
    health = health + 2;
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    if (shouldDebug)
        { // Edit this function with important variables from your code
          console.log("-------------------------");
          console.log("timeStep = " + timeStep);
          console.log("Feed " + feedCount);
          console.log("Play " + playCount);
          console.log("Pet " + petCount);
                   console.log("----------------");
    console.log("happiness " + happiness);
    console.log("hunger " + hunger);
    console.log("health " + health);
          console.log("----------------");

          console.log("State = " + this.name);
          console.log("----------------");
        };
    ClearByID("#target");
    DrawInID("#target", "Celestial Dog feels better!");
    $("#pick").show();
    $("#medicine").hide();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_happy-13.png" style="width:500px;" alt="Celestial Dog Fed">');
    // $("#pick").show();
    $("#pic").fadeIn();

    if (shouldDebug) console.log("has been medicated");

    if (callback !== undefined) callback();
    changeBar();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    // feedCount++;
    if (chosenAction == feeding) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Feed"]);

        if (callback !== undefined) callback();
      });
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
      else if (chosenAction == treat) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Treat"]);

        if (callback !== undefined) callback();
      });
    }
      else if (chosenAction == walking) {
      $("#target").fadeOut(function() {
        fsm.Change(fsm.states["Walk"]);

        if (callback !== undefined) callback();
      });
    }
    changeBar();
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
    $("#medicine").hide();
    $("#restart").show();
    DrawInID("#target", "He imploded!!!!");
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_implode-20.png" style="width:500px;" alt="Celestial Dog Imploded">');
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
/*
This criterion is linked to a Learning Outcome Interactive - Different Outcomes
At least 2 different, distinct outcomes (i.e. cannot only be a different value at the end, but must change narrative, etc. as well)

This criterion is linked to a Learning Outcome Interactive - Visible Changes
Clearly legible end state: the end of a visible, finite counter (e.g. 0 days remaining); and/or crossing the threshold of a visible variable (e.g. hunger hits 0, fatigue is over 100)
*/
var Explode = function (machine) {
  this.name = this.constructor.name;
  this.line = 4;
  var fsm = machine;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter");
    DrawInID("#target", "He exploded!!!!!");
    $("#pick").hide();
    $("#medicine").hide();
    $("#restart").show();
    $("#target").fadeIn();

    ClearByID("#pic");
    DrawInID("#pic", '<img src="Round2/celestialdog_explode-21.png" style="width:500px;" alt="Celestial Dog Exploded">');
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

function changeBar() {
    document.getElementById("u15").style.opacity = "0.2";
    document.getElementById("u16").style.opacity = "0.2";
    document.getElementById("u17").style.opacity = "0.2";
    document.getElementById("u18").style.opacity = "0.2";
    document.getElementById("u19").style.opacity = "0.2";
    document.getElementById("u20").style.opacity = "0.2";
    if (happiness == 1) {
        document.getElementById("u15").style.opacity = "1.0";
    } else if (happiness == 2) {
        document.getElementById("u16").style.opacity = "1.0";
    } else if (happiness == 3) {
        document.getElementById("u17").style.opacity = "1.0";
    } else if (happiness == 4) {
        document.getElementById("u18").style.opacity = "1.0";
    } else if (happiness == 5) {
        document.getElementById("u19").style.opacity = "1.0";
    } else if (happiness == 6) {
        document.getElementById("u20").style.opacity = "1.0";
    }

    document.getElementById("u21").style.opacity = "0.2";
    document.getElementById("u22").style.opacity = "0.2";
    document.getElementById("u23").style.opacity = "0.2";
    document.getElementById("u24").style.opacity = "0.2";
    document.getElementById("u25").style.opacity = "0.2";
    document.getElementById("u26").style.opacity = "0.2";
    if (health == 1) {
        document.getElementById("u21").style.opacity = "1.0";
    } else if (health == 2) {
        document.getElementById("u22").style.opacity = "1.0";
    } else if (health == 3) {
        document.getElementById("u23").style.opacity = "1.0";
    } else if (health ==4) {
        document.getElementById("u24").style.opacity = "1.0";
    } else if (health == 5) {
        document.getElementById("u25").style.opacity = "1.0";
    } else if (health == 6) {
        document.getElementById("u26").style.opacity = "1.0";
    }

    document.getElementById("u9").style.opacity = "0.2";
    document.getElementById("u10").style.opacity = "0.2";
    document.getElementById("u11").style.opacity = "0.2";
    document.getElementById("u12").style.opacity = "0.2";
    document.getElementById("u13").style.opacity = "0.2";
    document.getElementById("u14").style.opacity = "0.2";
    if (hunger == 1) {
        document.getElementById("u9").style.opacity = "1.0";
    } else if (hunger == 2) {
        document.getElementById("u10").style.opacity = "1.0";
    } else if (hunger ==3) {
        document.getElementById("u11").style.opacity = "1.0";
    } else if (hunger ==4 ) {
        document.getElementById("u12").style.opacity = "1.0";
    } else if (hunger == 5) {
        document.getElementById("u13").style.opacity = "1.0";
    } else if (hunger ==6) {
        document.getElementById("u14").style.opacity = "1.0";
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
