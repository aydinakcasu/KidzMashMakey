function debug(text) {
    var msg = document.getElementById('message');
    msg.textContent = text;
}
var states
    = {
        initializing: 0
        , waiting: 1
        , playing: 2
        , winner: 3
    };
var state = states.initializing;

var winningScore = 5;

var child
    = {
        name: "child"
        , score: 0
        , pass: null
        , verified: false
        , match: ""
        , expect: " ,"
        , initialize: function () {
            this.score = 0;
            return this;
        }
        , reset: function () {
            this.pass = null;
            this.verified = false;
            this.match = "";
        }
        , add: function (c) {
            this.match += c + ',';

            var matchStart = this.expect.startsWith(this.match);
            if (matchStart == false) this.pass = false;

            var match = (this.expect == this.match);
            if (match == true) this.pass = true;
        }
        , check: function () {
            var tthis = this;
            return function () {
                tthis.reset();
                tthis.add(this.key);
                displayWinner();
                setTimeout(function () { tthis.confirm(tthis); }, 0);
            }
        }
        , confirm: function (tthis) {
            if (tthis.pass) {
                if (confirm('Is this correct')) {
                    tthis.score++;
                    tthis.verified = true;
                    state = states.winner;
                }
                else tthis.reset(); 
            }
            displayWinner();
        }
    }.initialize();

var adult
    = {
        name: "adult"
        , score: 0
        , pass: null
        , match: ""
        , matchCount: 0
        , expect: "ArrowUp,ArrowDown,ArrowRight,ArrowLeft,"
        , expectCount: 4
        , initialize: function () {
            this.score = 0;
            this.expectList = this.expect.slice(0, -1).split(",");
            this.expectCount = this.expectList.length;
            this.shuffle();
            return this;
        }
        , reset: function () {
            this.pass = null;
            this.verified = false;
            this.match = "";
            this.matchCount = 0;
        }
        , shuffle: function () {
            this.expect = shuffleArray(this.expectList).join() + ",";
        }
        , add: function (c) {
            this.match += c + ',';

            var matchStart = this.expect.startsWith(this.match);
            if (matchStart == false) { this.pass = false; this.matchCount = 0 }
            else this.matchCount++;
            var match = (this.expect == this.match);
            if (match == true) this.pass = true;
        }
        , check: function () {
            var tthis = this;
            return function () {
                if (tthis.pass == false) tthis.reset();
                tthis.add(this.key);
                displayWinner();
                displayWinner();
                setTimeout(function () { tthis.confirm(tthis); }, 0);
            }
        }
        , confirm: function (tthis) {
            if (tthis.pass) {
                if (confirm('Is this correct')) {
                    tthis.score++;
                    tthis.verified = true;
                    state = states.winner;
                }
                else tthis.reset();
            }
            displayWinner();
        }
    }.initialize();

var displayInitializeUpdate = null;
var displayWinnerUpdate = null;

function displayInitialize() {
    if (displayInitializeUpdate != null) displayInitializeUpdate();
}
function displayWinner() {
    if (displayWinnerUpdate != null) displayWinnerUpdate();
}
function resetSet() {
    state = states.waiting;
    displayInitialize();
    displayWinner();

    setTimeout(function () {
        var name = prompt("Player1: Please enter your name", "");
        child.name = (!name) ? "child" : name;

        var name = prompt("Player2: Please enter your name", "");
        adult.name = (!name) ? "adult" : name;
        displayInitialize();
        displayWinner();
    }, 0);
}
function resetGame() {
    child.reset();
    adult.reset();
    adult.shuffle();

    state = states.playing;
    displayInitialize();
    displayWinner();
}

var makeyKeys =
    [{ key: 'x', action: function () { } }

        , { key: 'ArrowUp', action: adult.check() }
        , { key: 'ArrowLeft', action: adult.check() }
        , { key: 'ArrowRight', action: adult.check() }
        , { key: 'ArrowDown', action: adult.check() }

        , { key: ' ', action: child.check() }

        , { key: 'w', action: child.check() }

        , { key: 'a', action: adult.check() }
        , { key: 's', action: adult.check() }
        , { key: 'd', action: adult.check() }
        , { key: 'f', action: adult.check() }
        , { key: 'g', action: function () { } }
    ].listToDictionary();

function keyPressInitialize() {
    var debugHtml = $("#debugHtml");
    document.body.addEventListener
        ('keydown'
        , function (e) {
            //debugHtml.text('keydown:' + e.key + e.keyCode);
            if (state != states.playing) return;

            var keyObject = makeyKeys[e.key];
            if (keyObject != null)
                keyObject.action();
        }
        );
}

