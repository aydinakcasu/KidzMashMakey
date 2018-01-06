function debug(text) {
    var msg = document.getElementById('message');
    msg.textContent = text;
}

// asx!, s!, as., asd+
var child
    = {
        name: "child"
        , score: 0
        , pass: null
        , match: ""
        , expect: " ,"
        , initialize: function () {
            this.score = 0;
            return this;
        }
        , reset: function () {
            this.pass = null;
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
                tthis.score += (tthis.pass ? 1 : 0);
                displayWinner();
            }
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
                tthis.score += (tthis.pass ? 1 : 0);
                displayWinner();
            }
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
function reset() {
    child.reset();
    adult.reset();
    adult.shuffle();

    displayInitialize();
    displayWinner();
}

var lookup =
    [{ key: 'x', action: function () { alert("DONE:"); } }

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
    ];

var dictionary = listToDictionary(lookup);
var dictionary = lookup.listToDictionary();

function keyPressInitialize() {
    var debugHtml = $("#debugHtml");
    document.body.addEventListener
        ('keydown'
        , function (e) {
            debugHtml.text('keydown:' + e.key + e.keyCode);
            var keyObject = dictionary[e.key];
            if (keyObject == null) { return; }
            keyObject.action();
        }
        );
}

