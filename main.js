// control vars
var waiting = false; // indicates whether or not waiting for user input
var down = false; // if key held down
var currentDialogue;

// dialogue options
var dialogue = {
    past1: {
        text: "Hello? Who is this?",
        choices: [["Hey! It's me! I'm you from after you escape the prison!", "dialogue.past2"]]
    },
    past2: {
        text: "You're me? ...So you were trapped in this prison too?",
        choices: [["Yep, I was in the furniture maze.",     "dialogue.past3"],
                  ["Yep, I was in the escape tutorial.",    "dialogue.past3"],
                  ["Yep, I was in the reverse prison.",     "dialogue.past3"]]
    },
    past3: {
        text: "That's where I am right now! Oh I'm so glad to know that I get out eventually! What's it like to escape?",
        choices: [["Actually, I'm already forgetting what being in the prison was like...",         "dialogue.past4a"],
                  ["It's strange, but in a way I kind of miss being in the prison.",                "dialogue.past4b"],
                  ["It feels like being completely still and wildly in motion at the same time.",   "dialogue.past4c"]]
    },
    past4a: {
        text: "Really? How long has it been since you got out?",
        choices: [["Years! Like, I've been standing right here working up the nerve to call you!",          "dialogue.past5a"],
                  ["Only a few minutes, but somehow it's already fuzzy, kind of like it never happened.",   "dialogue.past5b"]]
    },
    past4b: {
        text: "Why? Was there anything about it that you felt good about? Being here sucks!",
        choices: [["True, maybe I only like things once I don't have them any more.",       "dialogue.past7a"],
                  ["It was comfortable, I knew its limits, I knew my place.",               "dialogue.past7b"],
                  ["But don't you feel excited about getting out? The promise of freedom?", "dialogue.past7c"]]
    },
    past4c: {
        text: "Do you feel any different? Some times I'm scared I'll get out and then things will be exactly the same as before.",
        choices: [["No, I'm really the same person now as I was back then.",                "dialogue.past11a"],
                  ["It actually does change, I don't feel like the same person at all.",    "dialogue.past11b"]]
    },
    past5a: {
        text: "Years?? I haven't been here for years, I don't think..",
        choices: [["This is really hard to admit, but I was afraid to make this call.", "dialogue.transition"],
                  ["Time moves differently for you than it does for me.",               "dialogue.transition"],
                  ["Maybe the prison is just affecting you in a strange way.",          "dialogue.transition"]]
    },
    past5b: {
        text: "But this is the worst, most desperate thing I've ever been through! How could you possibly forget it?",
        choices: [["Haha, I promise it's not as bad right now as you think it is.", "dialogue.transition"],
                  ["You don't ever forget it, you just stop identifying with it.",  "dialogue.transition"],
                  ["Anything can seem infinite when you're drenched in it.",        "dialogue.transition"]]
    },
    past7a: {
        text: "I do that too I guess... But is that just how I'm going to be forever? I'd really like to change that.",
        choices: [["Maybe?",                                    "dialogue.transition"],
                  ["No, I think you'll find a way to change.",  "dialogue.transition"]]
    },
    past7b: {
        text: "Is that good though? It's comfortable, but it's inhuman. I couldn't live this way...",
        choices: [["You don't need to! You just need to be patient.",                               "dialogue.transition"],
                  ["Having limits is way more important than you probably realize right now...",    "dialogue.transition"],
                  ["You'll see what I'm talking about when you've been there for a while longer.",  "dialogue.transition"]]
    },
    past7c: {
        text: "Excited? It's the only thing that matters to me! It's the only thing keeping me going! \"Excited\" doesn't really do it justice.",
        choices: [["Exactly! You have something you care about! Something to look forward to.", "dialogue.transition"],
                  ["You won't always have something that you care about as much as this.",      "dialogue.transition"],
                  ["Just be with that enthusiasm for a bit, let it ooze into your flesh.",      "dialogue.transition"]]
    },
    past11a: {
        text: "Oh no, that's awful! That's the worst thing I can imagine!",
        choices: [["Don't worry! It's actually not a bad thing! I promise.",                "dialogue.transition"],
                  ["Well, you get something else in exchange.",                             "dialogue.transition"],
                  ["The problem is that you don't actually know who you are right now.",    "dialogue.transition"]]
    },
    past11b: {
        text: "Oh good! That's so nice to hear. That makes me feel...really happy.",
        choices: [["Age just kind of does that, you know?",                         "dialogue.transition"],
                  ["I'm still me, but I'm not somehow. It's hard to describe.",     "dialogue.transition"],
                  ["Remember to enjoy being who you are right now, it won't last.", "dialogue.transition"]]
    },
    transition: {
        text: "Wait, if you're me, then did you get a call from another version of you when you were trapped?",
        choices: [["No, I think I'm the first person to call back.",    "dialogue.past101"],
                  ["Yes, I did get a call, that's how I escaped.",      "dialogue.past102"]]
    },
    past101: {
        text: "Then can you tell me how to get out? Maybe I can come find you! What do I have to do?",
        choices: [["To get out, all you have to do is be sincere.",             "dialogue.sincere1"],
                  ["To get out, you need to tell me how you feel right now.",   "dialogue.feel1"],
                  ["To get out, just talk with me for a bit.",                  "dialogue.talk1"]]
    },
    past102: {
        text: "What did they tell you? What did you have to do to get out?",
        choices: [["All they told me was to be sincere.",               "dialogue.sincere2"],
                  ["They asked me how I felt about being imprisoned.",  "dialogue.feel2"],
                  ["They just talked to me for a while.",               "dialogue.talk2"]]
    },
    sincere1: {
        text: "...what? That will free me? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.sincere4"],
                  ["Just be sincere.",                                                  "dialogue.sincere4"],
                  ["It will make sense.",                                               "dialogue.sincere4"]]
    },
    sincere2: {
        text: "...what? That freed you? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.sincere4"],
                  ["Just be sincere.",                                                  "dialogue.sincere4"],
                  ["It will make sense.",                                               "dialogue.sincere4"]]
    },
    sincere4: {
        text: "Sincere about what?",
        choices: [["That's exactly what you need to figure out in order to escape.",    "dialogue.ending"]]
    },
    feel1: {
        text: "...what? That will free me? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.feel4"],
                  ["Just tell me how you feel.",                                        "dialogue.feel4"],
                  ["It will make sense.",                                               "dialogue.feel4"]]
    },
    feel2: {
        text: "...what? That freed you? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.feel4"],
                  ["Just tell me how you feel.",                                        "dialogue.feel4"],
                  ["It will make sense.",                                               "dialogue.feel4"]]
    },
    feel4: {
        text: "Okay...I feel afraid that nothing will ever change.",
        choices: [["Go on.",   "dialogue.ending"]]
    },
    talk1: {
        text: "...what? That will free me? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.talk4"],
                  ["Just talk to me.",                                                  "dialogue.talk4"],
                  ["It will make sense.",                                               "dialogue.talk4"]]
    },
    talk2: {
        text: "...what? That freed you? How does that work?",
        choices: [["Listen, you can't know until you're out, but I promise it works.",  "dialogue.talk4"],
                  ["Just talk to me.",                                                  "dialogue.talk4"],
                  ["It will make sense.",                                               "dialogue.talk4"]]
    },
    talk4: {
        text: "Okay...I can talk Let's just talk for a bit. Will you be here?",
        choices: [["I will be here for as long as you need.",   "dialogue.ending"]]
    },
    ending: {
        text: "..."
    }
};

// add new dialogue
var changeText = function(text) {
    $('<p class="them">' + text + '</p>')
        .prependTo("#chatlog-content")
        .velocity("scroll", {queue: false, container: $("#chatlog-content"), duration: 500})
        .velocity("fadeIn");
};

// add user dialogue
var userInput = function(i) {
    if (currentDialogue.choices.length > i) {
        waiting = false;
        $("#input").empty();
        $('<p class="user">' + currentDialogue.choices[i][0] + '</p>')
            .prependTo("#chatlog-content")
            .velocity("scroll", {queue: false, container: $("#chatlog-content"), duration: 500})
            .velocity("fadeIn");
        setTimeout(function() { advanceTo(eval(currentDialogue.choices[i][1])); }, 1500);
    };
};

// typing
var userTyping = function(i) {
    if (currentDialogue.choices.length > i) {
        waiting = false;
        $("#input.p").wrapInner('<span class="greyed"></span>');

        var charsTyped = 0;
        while (charsTyped < currentDialogue.choices[i][0].length) {
            $(document).keypress(function(e) {
                //
            })
        };
        
        // while parts of choice are still greyed out
        // if the user presses any key
        // un-grey up to 3-4 characters

        // call userInput()
    };
};

// change choices
var changeChoices = function(choices) {
    if (!choices) {
        waiting = false;
        return;
    };
    setTimeout(function() {
        for (var i = 0; i < choices.length; i++) {
            $('<p>' + (i+1).toString() + '.&emsp;' + choices[i][0] + '</p>')
                .appendTo("#input")
                .velocity("fadeIn");
        };
        waiting = true;
    }, 1000);
};

// advance to next dialogue
var advanceTo = function(d) {
    currentDialogue = d;
    changeText(d.text);
    changeChoices(d.choices);
};

// user input
$(function() {
    $(document).keydown(function(e) {
        if (down) { return; };
        down = true;
        e.preventDefault();
        if (waiting) {
            console.log(down);
            switch(e.which) {
                // option 1
                case 49:
                    userInput(0);
                    break;
                // option 2
                case 50:
                    userInput(1);
                    break;
                // option 3
                case 51:
                    userInput(2);
            };
        };
    });
});

// key up detection
$(function() {
    $(document).keyup(function() {
        down = false;
    });
});

// start
advanceTo(dialogue.past1);