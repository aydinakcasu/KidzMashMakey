function debug(text) {
    var msg = document.getElementById('message');
    msg.textContent = text;
}

// asx!, s!, as., asd+
var child
    = {
        name: "child"
        , pass: null
        , match: ""
        //, expect: "w,"
        , expect: " ,"
        , reset: function () {
            this.pass = null;
            this.match = "";
            checkWinner();
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
                checkWinner();
            }
        }
    };
var adult
    = {
        name: "adult"
        , pass: null
        , match: ""
        , matchCount: 0
        //, expect: "a,s,d,f,"
        , expect: "ArrowUp,ArrowDown,ArrowRight,ArrowLeft,"
        , expectCount: 4
        , reset: function () {
            this.pass = null;
            this.match = "";
            this.matchCount = 0;
            checkWinner();
        }
        , add: function (c) {
            if (this.pass == false) this.reset();
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
                tthis.add(this.key);
                checkWinner();
            }
        }
    };

//add.call(adult, c);
var displayUpdate = null;;

function checkWinner() {
    if (displayUpdate != null) displayUpdate();
}
child.reset();
adult.reset();

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
