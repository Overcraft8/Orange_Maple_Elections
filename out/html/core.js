
function e(t, n, i) {
    function o(a, c) {
        if (!n[a]) {
            if (!t[a]) {
                var s = "function" == typeof require && require;
                if (!c && s)
                    return s(a, !0);
                if (r)
                    return r(a, !0);
                var d = new Error("Cannot find module '" + a + "'");
                throw d.code = "MODULE_NOT_FOUND",
                d
            }
            var p = n[a] = {
                exports: {}
            };
            t[a][0].call(p.exports, (function(e) {
                var n = t[a][1][e];
                return o(n || e)
            }
            ), p, p.exports, e, t, n, i)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)
        o(i[a]);
    return o
}({
    1: [function(e, t, n) {
        !function() {
            "use strict";
            var e = function(e) {
                if (!e)
                    throw new Error("Assertion failed.")
            }
              , n = function(e, t) {
                for (var n = 0; n < e.length; ++n)
                    t(e[n])
            }
              , i = function(e, t) {
                for (var n in e)
                    t(n, e[n])
            }
              , o = function() {
                for (var e = {}, t = 0; t < arguments.length; ++t) {
                    var n = arguments[t];
                    for (var i in n)
                        e[i] = n[i]
                }
                return e
            }
              , r = function(e) {
                e = e.trim();
                var t = new Function("state","Q",e);
                return t.source = e,
                t
            }
              , a = function(e, t, i) {
                void 0 !== e && n(e, (function(e) {
                    try {
                        e.call(t, i, i.qualities)
                    } catch (e) {
                        console.log("Error:", e)
                    }
                }
                ))
            }
              , c = function(e, t, n, i) {
                var o = t;
                if (void 0 === e)
                    return o;
                try {
                    o = !!e.call(n, i, i.qualities)
                } catch (e) {
                    console.log("Error:", e)
                }
                return o
            }
              , s = function(e, t, n, i) {
                var o = t;
                if (void 0 === e)
                    return o;
                try {
                    o = e.call(n, i, i.qualities)
                } catch (t) {
                    console.log("Error in expression", e, ":", t)
                }
                return o
            }
              , d = function(e) {
                return [{
                    type: "paragraph",
                    content: e
                }]
            }
              , p = function(e) {
                return Math.floor(e) === e && e >= 0 && e <= 12 ? ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][e] : e.toString()
            }
              , l = function(e) {
                if (!(Math.floor(e) === e && e >= 0))
                    return e.toString();
                if (e <= 12)
                    return ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"][e];
                if (e = e.toString(),
                /1[0-9]$/.test(e))
                    return e + "th";
                switch (e.substr(e.length - 1, 1)) {
                case "1":
                    return e + "st";
                case "2":
                    return e + "nd";
                case "3":
                    return e + "rd";
                default:
                    return e + "th"
                }
            }
              , _ = function(e) {
                if (Math.floor(e) !== e)
                    return e.toString();
                if (e > 3)
                    return "superb+" + (e - 3);
                if (e < -3)
                    return "terrible" + (e + 3);
                switch (e) {
                case 3:
                    return "superb";
                case 2:
                    return "great";
                case 1:
                    return "good";
                case 0:
                    return "fair";
                case -1:
                    return "mediocre";
                case -2:
                    return "poor";
                case -3:
                    return "terrible"
                }
            }
              , h = function(e, t) {
                for (var n = 0; n < t.content.length; ++n) {
                    var i = t.content[n]
                      , o = i.min
                      , r = i.max;
                    if ((void 0 === o || o <= e) && (void 0 === r || r >= e))
                        return void 0 !== i.output ? i.output : e.toString()
                }
                return e.toString()
            }
              , u = function(e, t, n, i) {
                n || (n = .6),
                n > 1 && (n /= 100);
                var o = n * (e / t);
                return o > 1 && (o = 1),
                o
            }
              , g = function(e, t, n) {
                n || (n = .1),
                n > 1 && (n /= 100);
                var i = (e - t) * n + .5;
                return i > 1 ? i = 1 : i < n && (i = n),
                i
            }
              , y = function(e) {
                return e <= .1 ? "almost impossible" : e <= .3 ? "high-risk" : e <= .4 ? "tough" : e <= .5 ? "very chancy" : e <= .6 ? "chancy" : e <= .7 ? "modest" : e <= .8 ? "very modest" : e <= .9 ? "low risk" : "straightforward"
            }
              , m = function() {};
            m.prototype.beginGame = function() {}
            ,
            m.prototype.displayContent = function(e, t) {}
            ,
            m.prototype.displayDecks = function(e) {}
            ,
            m.prototype.displayHand = function(e) {}
            ,
            m.prototype.displayPinnedCards = function(e) {}
            ,
            m.prototype.displayChoices = function(e) {}
            ,
            m.prototype.displayGameOver = function() {
                this.displayContent(d("Game Over"))
            }
            ,
            m.prototype.removeChoices = function() {}
            ,
            m.prototype.beginOutput = function() {}
            ,
            m.prototype.endOutput = function() {}
            ,
            m.prototype.newPage = function() {}
            ,
            m.prototype.setStyle = function(e) {}
            ,
            m.prototype.signal = function(e) {}
            ,
            m.prototype.setBg = function(e) {}
            ,
            m.prototype.setSprites = function(e) {}
            ,
            m.prototype.setSpriteStyle = function(e, t) {}
            ,
            m.prototype.audio = function(e) {}
            ,
            m.makeParentOf = function(e) {
                e.prototype = new m,
                e.constructor = e
            }
            ;
            var v = function(e, t) {
                this.ui = e,
                this.game = t
            };
            v.prototype.displayGameOver = function() {
                return this.ui.displayGameOver(),
                this
            }
            ,
            v.prototype.displayChoices = function() {
                var t = this.getCurrentChoices();
                e(t);
                var n = this.getCurrentScene();
                if (n.isHand) {
                    var i = []
                      , o = [];
                    for (var r of t) {
                        var a = this.game.scenes[r.id];
                        a.isDeck ? (this._drawFromDeck(r.id) ? r.canChoose = !0 : (r.canChoose = !1,
                        r.subtitle = r.unavailableSubtitle || "No cards available from deck."),
                        r.isDeck = !0,
                        r.image = a.cardImage,
                        i.push(r)) : a.isPinnedCard && (r.isDeck = !1,
                        r.image = a.cardImage,
                        o.push(r))
                    }
                    this.state.currentHands[this.state.sceneId] || (this.state.currentHands[this.state.sceneId] = []);
                    var c = this.state.currentHands[this.state.sceneId]
                      , s = {};
                    for (var d of c)
                        s[d.id] = d;
                    s = this.__filterViewable(s);
                    for (var p = 0; p < c.length; p++)
                        for (; c[p] && !s[c[p].id]; )
                            c.splice(p, 1);
                    this.ui.displayDecks(i),
                    this.ui.displayHand(c, n.maxCards),
                    this.ui.displayPinnedCards(o)
                } else
                    this.state.enableTranscript && this.transcript.push(t),
                    this.ui.displayChoices(t);
                return this
            }
            ,
            v.prototype.displaySceneContent = function(t) {
                var n = this.getCurrentScene();
                e(n);
                var i = null;
                n.faceImage && (i = n.faceImage);
                var o = n.signal || this.game.sceneSignal;
                if (void 0 !== o && this.ui.signal({
                    signal: o,
                    event: "scene-display",
                    id: this.state.sceneId
                }),
                t ? (this.ui.newPage(),
                this.ui.displayContent(this.state.tempCurrentContent, i),
                this.state.currentContent = this.state.tempCurrentContent.slice()) : n.newPage && (this.ui.newPage(),
                this.state.currentContent = []),
                this.ui.setStyle(n.style),
                this.ui.removeChoices(),
                void 0 !== n.content && !t) {
                    var r = this._makeDisplayContent(n.content, !0);
                    this.state.enableTranscript && (this.transcript = this.transcript.concat(r)),
                    this.state.currentContent = this.state.currentContent.concat(r),
                    this.ui.displayContent(r, i)
                }
                return this._runActions(n.onDisplay),
                this
            }
            ,
            v.prototype.choose = function(t) {
                var n = this.choiceCache;
                if (e(n),
                n.length <= t)
                    throw new Error("No choice at index " + t + ", only " + n.length + " choices are available.");
                var i = n[t];
                if (!i.canChoose)
                    throw new Error("Attempted to choose index " + t + ", but that choice is unavailable.");
                var o = i.id;
                return this.state.enableTranscript && this.transcript.push("> " + i.title),
                delete this.choiceCache,
                this.goToScene(o),
                this
            }
            ,
            v.prototype.chooseSceneId = function(e) {
                return delete this.choiceCache,
                this.goToScene(id),
                this
            }
            ,
            v.prototype.drawCard = function(t) {
                var n = this.state.sceneId
                  , i = this.getCurrentScene();
                e(i);
                var o = this.state.currentHands[n];
                if (i.maxCards <= o.length)
                    return {
                        id: null,
                        title: "no_space_in_hand"
                    };
                var r = this._drawFromDeck(t);
                if (!r)
                    return {
                        id: null,
                        title: "no_card_in_deck"
                    };
                this.state.lastDrawnCard = r;
                var a = this.game.scenes[r.id].cardImage;
                return r.image = a,
                this.state.currentHands[n].push(r),
                this.ui.displayHand(this.state.currentHands[n], i.maxCards),
                r
            }
            ,
            v.prototype.playCard = function(e) {
                for (var t = this.state.sceneId, n = this.state.currentHands[t], i = 0; i < n.length; i++)
                    if (n[i].id == e) {
                        n.splice(i, 1);
                        break
                    }
                this.state.lastPlayedCard = this.game.scenes[e],
                delete this.choiceCache,
                this.goToScene(e)
            }
            ,
            v.prototype.playPinnedCard = function(e) {
                delete this.choiceCache,
                this.goToScene(e)
            }
            ,
            v.prototype.goToScene = function(e) {
                this.state.sceneIdsSinceGoTo = [],
                this.ui.beginOutput(),
                this.__changeScene(e),
                this.ui.endOutput()
            }
            ,
            v.prototype.beginGame = function(e) {
                this.random = e ? f.fromSeeds(e) : f.fromUnique(),
                this.state = {
                    sceneId: null,
                    sceneIdsSinceGoTo: [],
                    rootSceneId: this.game.rootScene || this.game.firstScene || "root",
                    gameOver: !1,
                    visits: {},
                    qualities: {},
                    currentRandomState: null,
                    currentContent: [],
                    tempCurrentContent: [],
                    prevSpecialSceneId: null,
                    prevSceneId: null,
                    prevTopSceneId: null,
                    jumpSceneId: null,
                    achievements: {},
                    bg: null,
                    sceneStack: [],
                    justReturned: !1,
                    justReturnedStart: !1,
                    justReturnedEnd: !1,
                    sprites: {},
                    currentHands: {},
                    lastDrawnCard: null,
                    lastPlayedCard: null,
                    enableTranscript: !1,
                    disableSaves: !1
                },
                this.transcript = [],
                this._setUpQualities(),
                this._loadAchievements(),
                this.ui.beginGame();
                var t = this.game.firstScene || this.state.rootSceneId;
                return this.goToScene(t),
                this
            }
            ,
            v.prototype._loadAchievements = function() {
                if ("undefined" != typeof localStorage && localStorage[this.game.title + "_achievements"])
                    for (var e in this.state.achievements = JSON.parse(localStorage[this.game.title + "_achievements"]),
                    this.state.achievements)
                        this.state.qualities["achievement_" + e] = 1
            }
            ,
            v.prototype.gameOver = function() {
                return this.state.gameOver = !0,
                this.displayGameOver(),
                this
            }
            ,
            v.prototype.isGameOver = function() {
                return this.state.gameOver
            }
            ,
            v.prototype.getCurrentScene = function() {
                var t = this.game.scenes[this.state.sceneId];
                return e(void 0 !== t),
                t
            }
            ,
            v.prototype.getCurrentChoices = function() {
                return this.choiceCache
            }
            ,
            v.prototype.setState = function(e) {
                if (this.state = e,
                this._setUpQualities(),
                this.random = f.fromState(this.state.currentRandomState),
                this._loadAchievements(),
                this.isGameOver())
                    this.displayGameOver();
                else {
                    var t = this.getCurrentScene();
                    this.choiceCache = this._compileChoices(t),
                    this.ui.newPage(),
                    this.ui.removeChoices(),
                    this.ui.displayContent(this.state.currentContent),
                    this.displayChoices(),
                    this.ui.setSprites(this.state.sprites),
                    this.ui.setBg(this.state.bg)
                }
                return this
            }
            ,
            v.prototype.getExportableState = function() {
                return this.state
            }
            ,
            v.prototype._getQDisplay = function(t, n) {
                switch (n) {
                case "cardinal":
                case "number":
                    return p(t);
                case "ordinal":
                    return l(t);
                case "fudge":
                    return _(t);
                default:
                    var i = this.game.qdisplays[n];
                    return e(void 0 !== i),
                    h(t, i)
                }
            }
            ,
            v.prototype._evaluateStateDependencies = function(t) {
                for (var n = [], i = 0; i < t.length; ++i) {
                    var o, r = t[i], a = r.fn;
                    if ("insert" === r.type)
                        o = this._runExpression(a),
                        o = r.qdisplay ? this._getQDisplay(o, r.qdisplay) : o.toString();
                    else
                        e("predicate" === r.type),
                        o = this._runPredicate(a);
                    void 0 !== o.stateDependencies && (o = this._makeDisplayContent(o, !1)),
                    n.push(o)
                }
                return n
            }
            ,
            v.prototype._mergeStateEvalsInArray = function(e, t) {
                Array.isArray(e) || (e = [e]);
                for (var n = [], i = 0; i < e.length; ++i)
                    n = n.concat(this._mergeStateEvals(e[i], t));
                return n
            }
            ,
            v.prototype._mergeStateEvals = function(e, t) {
                if (void 0 === e.type)
                    return [e];
                var n;
                switch (e.type) {
                case "conditional":
                    n = t[e.predicate] ? this._mergeStateEvalsInArray(e.content, t) : [];
                    break;
                case "insert":
                    n = t[e.insert];
                    break;
                default:
                    var i = {
                        type: e.type
                    };
                    i.content = this._mergeStateEvalsInArray(e.content, t),
                    n = [i]
                }
                return n
            }
            ,
            v.prototype._makeDisplayContent = function(e, t) {
                if (void 0 === e.content)
                    return Array.isArray(e) ? e : t ? [{
                        type: "paragraph",
                        content: e
                    }] : [e];
                if (void 0 === e.stateDependencies && void 0 !== e.type)
                    return [e];
                var n = e.stateDependencies
                  , i = e.content;
                if (n && n.length > 0) {
                    var o = this._evaluateStateDependencies(n);
                    Array.isArray(i) || (i = [i]),
                    i = this._mergeStateEvalsInArray(i, o)
                }
                return i
            }
            ,
            v.prototype._setUpQualities = function() {
                var e = this._qualitiesAccessorsPrivate = {}
                  , t = this.state.qualities
                  , n = this;
                i(this.game.qualities, (function(i, o) {
                    var r = o.min
                      , a = o.max
                      , c = o.signal || n.game.qualitySignal
                      , s = o.isValid;
                    (void 0 !== r || void 0 !== a || void 0 !== c || void 0 !== s) && (void 0 !== t[i] && (e[i] = t[i]),
                    t.__defineGetter__(i, (function() {
                        return e[i]
                    }
                    )),
                    t.__defineSetter__(i, (function(t) {
                        void 0 !== r && t < r && (t = r),
                        void 0 !== a && t > a && (t = a);
                        var o = e[i];
                        if (e[i] = t,
                        n._runPredicate(s, !0) || (e[i] = t = o),
                        void 0 !== c && t !== o) {
                            var d = {
                                signal: c,
                                event: "quality-change",
                                id: i,
                                now: t
                            };
                            void 0 !== o && (d.was = o),
                            n.ui.signal(d)
                        }
                    }
                    ))),
                    void 0 !== o.initial && void 0 === t[i] && (t[i] = o.initial)
                }
                ))
            }
            ,
            v.prototype._runActions = function(e) {
                a(e, this, this.state)
            }
            ,
            v.prototype._runPredicate = function(e, t) {
                return c(e, t, this, this.state)
            }
            ,
            v.prototype._runExpression = function(e, t) {
                return s(e, t, this, this.state)
            }
            ,
            v.prototype.__changeScene = function(t) {
                this.state.justReturned && (this.state.justReturned = !1);
                var n = null
                  , i = !1;
                "prevScene" == t ? (this.prevSceneId,
                n = this.game.scenes[this.state.prevSceneId],
                t = this.state.prevSceneId,
                e(n)) : "prevTopScene" == t ? (n = this.game.scenes[this.state.prevTopSceneId],
                t = this.state.prevTopSceneId,
                e(n)) : "jumpScene" == t ? (n = this.game.scenes[this.state.jumpSceneId],
                t = this.state.jumpSceneId,
                e(n)) : "backSpecialScene" === t ? (n = this.game.scenes[this.state.prevSpecialSceneId],
                t = this.state.prevSpecialSceneId,
                i = !0,
                e(n),
                this.state.prevSpecialSceneId = null) : (n = this.game.scenes[t],
                e(n));
                var o = this.state.sceneId
                  , r = this.game.scenes[o];
                if (o) {
                    this.state.prevSceneId = o,
                    r.newPage && (this.state.prevTopSceneId = o),
                    n.isSpecial && null === this.state.prevSpecialSceneId && (this.state.tempCurrentContent = this.state.currentContent.slice(),
                    this.state.prevSpecialSceneId = o);
                    var a = this.getCurrentScene();
                    this._runActions(a.onDeparture);
                    var c = a.signal || this.game.sceneSignal;
                    void 0 !== c && this.ui.signal({
                        signal: c,
                        event: "scene-departure",
                        id: this.state.sceneId,
                        to: t
                    })
                }
                if (this.state.sceneId = t,
                this.state.sceneIdsSinceGoTo.push(t),
                n.setRoot && (this.state.rootSceneId = t),
                n.setJump && (this.state.jumpSceneId = n.setJump),
                void 0 !== n.countVisitsMax && (void 0 === this.state.visits[t] ? this.state.visits[t] = 1 : this.state.visits[t] < n.countVisitsMax && this.state.visits[t]++),
                !i && !this.state.justReturned && (this._runActions(n.onArrival),
                n.call)) {
                    var s = this.game.scenes[n.call];
                    this._runActions(s.onArrival)
                }
                var d = n.signal || this.game.sceneSignal;
                if (void 0 !== d) {
                    var p = {
                        signal: d,
                        event: "scene-arrival",
                        id: t
                    };
                    o && (p.from = o),
                    this.ui.signal(p)
                }
                this.state.currentRandomState = this.random.getState(),
                this.displaySceneContent(i),
                n.setBg && (this.state.bg = n.setBg,
                this.ui.setBg(n.setBg)),
                n.setSprites && (this.state.sprites = n.setSprites,
                this.ui.setSprites(n.setSprites)),
                n.audio && this.ui.audio(n.audio),
                n.setTopLeftStyle && this.ui.setSpriteStyle("topLeft", n.setTopLeftStyle),
                n.setTopRightStyle && this.ui.setSpriteStyle("topRight", n.setTopRightStyle),
                n.setBottomLeftStyle && this.ui.setSpriteStyle("bottomLeft", n.setBottomLeftStyle),
                n.setBottomRightStyle && this.ui.setSpriteStyle("bottomRight", n.setBottomRightStyle),
                n.achievement && this.achieve(n.achievement);
                var l = !1;
                if (!0 === n.gameOver)
                    l = !0,
                    this.gameOver();
                else if (n.goSubEnd && !this.state.justReturnedEnd)
                    for (var _ = [], h = 0; h < n.goSub.length; ++h) {
                        var y = n.goSub[h];
                        (void 0 === y.predicate || this._runPredicate(y.predicate)) && _.push(y.id)
                    }
                else if (n.goTo) {
                    for (var m = [], v = 0; v < n.goTo.length; ++v) {
                        var f = n.goTo[v];
                        (void 0 === f.predicate || this._runPredicate(f.predicate)) && m.push(f.id)
                    }
                    if (1 === m.length)
                        l = !0,
                        this.__changeScene(m[0]);
                    else if (m.length > 1) {
                        var b = m[this.random.uint32() % m.length];
                        l = !0,
                        this.__changeScene(b)
                    }
                } else if (n.goToRef) {
                    for (var w = [], Q = 0; Q < n.goToRef.length; ++Q) {
                        var A = n.goToRef[Q];
                        (void 0 === A.predicate || this._runPredicate(A.predicate)) && w.push(A.id)
                    }
                    if (1 === w.length)
                        l = !0,
                        this.__changeScene(this.state.qualities[w[0]]);
                    else if (w.length > 1) {
                        var K = w[this.random.uint32() % w.length];
                        l = !0,
                        this.__changeScene(this.state.qualities[K])
                    }
                }
                var k, x, P, D = !1;
                if (n.checkQuality && n.broadDifficulty && n.checkSuccessGoTo && n.checkFailureGoTo) {
                    var C = .6;
                    n.difficultyScaler && (C = n.difficultyScaler),
                    k = u(this.state.qualities[n.checkQuality] || 0, n.broadDifficulty, C),
                    D = !0
                } else if (n.checkQuality && n.narrowDifficulty && n.checkSuccessGoTo && n.checkFailureGoTo) {
                    var S = .1;
                    n.difficultyIncrement && (S = n.difficultyIncrement),
                    k = g(this.state.qualities[n.checkQuality] || 0, n.narrowDifficulty, S),
                    D = !0
                }
                D && (x = k,
                l = !0,
                ((P = this.random) ? P.random() : Math.random()) < x ? this.__changeScene(n.checkSuccessGoTo) : this.__changeScene(n.checkFailureGoTo)),
                l || (this.choiceCache = this._compileChoices(n),
                null === this.choiceCache ? !1 !== n.gameOver && this.gameOver() : this.displayChoices())
            }
            ,
            v.prototype.achieve = function(e) {
                this.state.achievements[e] = 1,
                this.state.qualities["achievement_" + e] = 1,
                this.state.qualities["game_achievement_" + e] = 1,
                "undefined" != typeof localStorage && (localStorage[this.game.title + "_achievements"] = JSON.stringify(this.state.achievements))
            }
            ,
            v.prototype.__getChoiceSelectionData = function(e) {
                var t = [];
                for (var n in e) {
                    var i = this.game.scenes[n]
                      , o = e[n];
                    o.order = o.order || i.order || 0,
                    o.priority = o.priority || i.priority || 1,
                    void 0 === o.frequency && (o.frequency = i.frequency,
                    void 0 === o.frequency && (o.frequency = 100)),
                    i.frequencyVar && (o.frequency = this.runExpression(i.frequencyVar)),
                    o.selectionPriority = 0,
                    t.push(o)
                }
                return t
            }
            ,
            v.prototype.__filterViewable = function(e) {
                var t = {};
                for (var n in e) {
                    var i = this.game.scenes[n]
                      , o = i.maxVisits;
                    if (void 0 !== o)
                        if ((this.state.visits[n] || 0) >= o)
                            continue;
                    if (void 0 !== i.maxVisitsVar)
                        if (o = this._runExpression(i.maxVisitsVar),
                        (this.state.visits[n] || 0) >= o)
                            continue;
                    this._runPredicate(i.viewIf, !0) && (t[n] = e[n])
                }
                return t
            }
            ,
            v.prototype.__getChoiceIdsFromOptions = function(t) {
                var r = this
                  , a = {};
                return n(t, (function(t) {
                    if (r._runPredicate(t.viewIf, !0))
                        if ("@" === t.id.substr(0, 1)) {
                            var n = t.id.substring(1)
                              , c = o(t, {
                                id: n
                            });
                            a[n] = c
                        } else {
                            e("#" === t.id.substr(0, 1));
                            var s = r.game.tagLookup[t.id.substring(1)];
                            i(s, (function(e) {
                                void 0 === a[e] && (a[e] = o(t, {
                                    id: e
                                }))
                            }
                            ))
                        }
                }
                )),
                a
            }
            ,
            v.prototype.__filterByPriority = function(t, i, o) {
                e(null === i || null === o || o >= i);
                var r, a, c = this, s = [], d = [];
                t.sort((function(e, t) {
                    return t.priority - e.priority
                }
                ));
                for (var p = 0; p < t.length; ++p) {
                    if ((r = t[p]).priority !== a) {
                        if (void 0 !== a && (null === i || p >= i))
                            break;
                        s.push.apply(s, d),
                        d = [],
                        a = r.priority
                    }
                    d.push(r)
                }
                var l = s.length
                  , _ = l + d.length;
                if (null === o || o >= _)
                    s.push.apply(s, d);
                else {
                    n(d, (function(e) {
                        null === e.frequency ? e.selectionPriority = 0 : e.selectionPriority = c.random.random() / e.frequency
                    }
                    )),
                    d.sort((function(e, t) {
                        return e.selectionPriority - t.selectionPriority
                    }
                    ));
                    var h = o - l
                      , u = d.slice(0, h);
                    s.push.apply(s, u)
                }
                return s
            }
            ,
            v.prototype.__getChoiceDisplayData = function(t) {
                for (var n = [], i = 0, o = 0; o < t.length; ++o) {
                    var r = t[o]
                      , a = this.game.scenes[r.id]
                      , c = !0;
                    r.chooseIf && (c = this._runPredicate(r.chooseIf, !0)),
                    c && a.chooseIf && (c = this._runPredicate(a.chooseIf, !0));
                    var s = r.title || a.title;
                    e(s);
                    var d = null;
                    c || (d = r.unavailableSubtitle || a.unavailableSubtitle),
                    d || (d = r.subtitle || a.subtitle);
                    var p, l = {
                        id: r.id,
                        canChoose: c,
                        title: this._makeDisplayContent(s, !1)
                    };
                    if (d && (l.subtitle = this._makeDisplayContent(d, !1)),
                    a.checkQuality && a.broadDifficulty && a.checkSuccessGoTo && a.checkFailureGoTo) {
                        var _ = .6;
                        a.difficultyScaler && (_ = a.difficultyScaler),
                        p = u(this.state.qualities[a.checkQuality] || 0, a.broadDifficulty, _),
                        l.checkQuality = a.checkQuality,
                        l.successProb = p,
                        l.difficulty = y(p)
                    } else if (a.checkQuality && a.narrowDifficulty && a.checkSuccessGoTo && a.checkFailureGoTo) {
                        var h = .1;
                        a.difficultyIncrement && (h = a.difficultyIncrement),
                        p = g(this.state.qualities[a.checkQuality] || 0, a.narrowDifficulty, h),
                        l.checkQuality = a.checkQuality,
                        l.successProb = p,
                        l.difficulty = y(p)
                    }
                    n.push(l),
                    c && ++i
                }
                return {
                    choices: n,
                    numChoosable: i
                }
            }
            ,
            v.prototype._compileChoices = function(t) {
                e(t);
                var n = t.options
                  , i = []
                  , o = 0;
                if (void 0 !== n) {
                    var r = this.__getChoiceIdsFromOptions(n);
                    r = this.__filterViewable(r);
                    var a = this.__getChoiceSelectionData(r)
                      , c = t.minChoices || null
                      , s = t.maxChoices || null;
                    (a = this.__filterByPriority(a, c, s)).sort((function(e, t) {
                        return e.order - t.order
                    }
                    ));
                    var d = this.__getChoiceDisplayData(a);
                    i = d.choices,
                    o = d.numChoosable
                }
                if (0 === o) {
                    var p = this.state.rootSceneId;
                    if (p !== this.state.sceneId) {
                        var l = this.game.scenes[p].chooseIf;
                        l && !this._runPredicate(l, !0) || (i.push({
                            id: p,
                            title: "Continue...",
                            canChoose: !0
                        }),
                        ++o)
                    }
                }
                return o > 0 ? i : null
            }
            ,
            v.prototype._drawFromDeck = function(e) {
                var t = this.game.scenes[e]
                  , n = this._compileChoices(t);
                if (!n)
                    return null;
                var i = []
                  , o = this.state.currentHands[this.state.sceneId];
                for (var r of (o || (o = []),
                o = o.map((e => e.id)),
                n)) {
                    var a = this.game.scenes[r.id];
                    r.canChoose && a.isCard && o.indexOf(r.id) < 0 && i.push(r)
                }
                return i ? i[this.random.uint32() % i.length] : null
            }
            ;
            var f = function(e, t, n, i, o) {
                this.getState = function() {
                    return [e, t, n, i, o]
                }
                ;
                this.uint32 = function() {
                    var r, a, c, s, d = (n ^ n >>> 7) >>> 0;
                    return n = i,
                    i = o,
                    o = t,
                    t = e,
                    ((((r = i + i + 1) >> 16 & 65535) * (s = 65535 & (a = e = e ^ e << 6 ^ (d ^ d << 13) >>> 0)) + (c = 65535 & r) * (a >> 16 & 65535) & 65535) << 16 >>> 0) + c * s >>> 0
                }
                ,
                this.random = function() {
                    return 2.3283064365386963e-10 * this.uint32()
                }
            }
              , b = 1;
            f.fromUnique = function() {
                var e = (new Date).getTime();
                return f.fromSeeds([e, b++])
            }
            ,
            f.fromTime = function() {
                return f.fromSeeds([(new Date).getTime()])
            }
            ,
            f.fromSeeds = function(e) {
                for (var t = 886756453, n = 88675123, i = 123456789, o = 362436069, r = 521288629, a = function(e) {
                    e = e.toString();
                    for (var t = 4022871197, n = 0; n < e.length; n++) {
                        var i = .02519603282416938 * (t += e.charCodeAt(n));
                        i -= t = i >>> 0,
                        t = (i *= t) >>> 0,
                        t += 4294967296 * (i -= t)
                    }
                    return 2.3283064365386963e-10 * (t >>> 0)
                }, c = 0; c < e.length; c++) {
                    var s = 4294967296 * a(e[c]);
                    t ^= s,
                    n ^= s,
                    i ^= s,
                    o ^= s,
                    r ^= s
                }
                return new f(t,n,i,o,r)
            }
            ,
            f.fromState = function(e) {
                return new f(e[0],e[1],e[2],e[3],e[4])
            }
            ,
            t.exports = {
                makeFunctionFromSource: r,
                runActions: a,
                runPredicate: c,
                runExpression: s,
                convertJSONToGame: function(e, t) {
                    try {
                        return t(null, JSON.parse(e, (function(e, t) {
                            return function(e) {
                                var t = typeof e;
                                return "function" === t || e && "object" === t || !1
                            }(t) && void 0 !== t.$code ? r(t.$code) : t
                        }
                        )))
                    } catch (e) {
                        return t(e)
                    }
                },
                simpleContent: d,
                getCardinalNumber: p,
                getOrdinalNumber: l,
                getUserQDisplay: h,
                getFudgeDisplay: _,
                DendryEngine: v,
                UserInterface: m,
                NullUserInterface: m,
                Random: f
            }
        }()
    }
    , {}],
    2: [function(e, t, n) {
        !function(t) {
            "use strict";
            var n = e("./content/html")
              , i = e("../engine")
              , o = function(e, t) {
                this.game = e,
                this.$content = t,
                this._registerEvents(),
                this.dendryEngine = new i.DendryEngine(this,e),
                this.base_settings = {
                    disable_bg: !1,
                    animate: !1,
                    animate_bg: !0,
                    disable_audio: !1,
                    show_portraits: !0
                },
                this.disable_bg = !1,
                this.animate = !1,
                this.animate_bg = !0,
                this.disable_audio = !1,
                this.show_portraits = !0,
                this.fade_time = 600,
                this.bg_fade_out_time = 200,
                this.bg_fade_in_time = 1e3,
                this.sound_fade_time = 2e3,
                this.contentToHTML = n,
                this.spriteLocs = {
                    topLeft: 1,
                    topRight: 1,
                    bottomLeft: 1,
                    bottomRight: 1
                },
                this.currentAudio = null,
                this.currentAudioURL = "",
                this.audioQueue = [],
                this.audioPlaylist = [],
                this.onNewPage = !1,
                this.save_prefix = e.title + "_" + e.author + "_save",
                this.max_slots = 8,
                this.DateOptions = {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            };
            i.UserInterface.makeParentOf(o),
            o.prototype.loadGame = function(e) {
                var t = this;
                e.endsWith(".json") || (e.endsWith("/") ? e += "game.json" : e += "/game.json"),
                fetch(e).then((e => e.text())).then((e => {
                    game = i.convertJSONToGame(e, (function(e, t) {
                        if (e)
                            throw e;
                        return t
                    }
                    )),
                    t.game = game,
                    t.dendryEngine = new i.DendryEngine(t,game),
                    t.dendryEngine.beginGame()
                }
                )).catch((e => console.log(e)))
            }
            ,
            o.prototype.displayContent = function(e, i) {
                var o = t(n.convert(e));
                if (i && this.show_portraits && !this.disable_bg) {
                    console.log(i);
                    var r = document.createElement("div");
                    r.className = "face-figure";
                    var a = new Image;
                    a.className = "face-img",
                    r.appendChild(a),
                    o.splice(1, 0, r),
                    a.src = i
                }
                this.animate ? (o.fadeIn(this.fade_time),
                this.$content.append(o)) : this.$content.append(o),
                o.focus(),
                window && window.onDisplayContent && window.onDisplayContent()
            }
            ,
            o.prototype.displayGameOver = function() {
                var e = t("<p>").text(this.getGameOverMsg()).addClass("game-over");
                this.animate ? (e.fadeIn(this.fade_time),
                this.$content.append(e)) : this.$content.append(e),
                e.focus()
            }
            ,
            o.prototype.displayChoices = function(e) {
                for (var i = t("<ul>").addClass("choices"), o = 0; o < e.length; ++o) {
                    var r = e[o]
                      , a = n.convertLine(r.title)
                      , c = "";
                    void 0 !== r.subtitle && (c = n.convertLine(r.subtitle));
                    var s = t("<li>")
                      , d = s;
                    r.canChoose ? (d = t("<a>").attr({
                        href: "#",
                        "data-choice": o
                    }),
                    s.html(d)) : d.addClass("unavailable"),
                    d.html(a),
                    r.checkQuality && r.difficulty && void 0 !== r.successProb && (c && (c += "<br>"),
                    c += "Check: " + r.checkQuality + "<br>",
                    c += "Difficulty: " + r.difficulty + " (" + Math.floor(100 * r.successProb) + "%)"),
                    c && s.append(t("<div>").addClass("subtitle").html(c)),
                    i.append(s)
                }
                this.animate ? (i.fadeIn(this.fade_time),
                this.$content.append(i)) : this.$content.append(i),
                i.focus(),
                this.onNewPage && (this.onNewPage = !1,
                window && window.onNewPage && window.onNewPage())
            }
            ,
            o.prototype.newPage = function() {
                if (this.animate) {
                    this.$content;
                    this.$content.empty(),
                    this.$content.children().fadeOut(this.fade_time, (function() {}
                    ))
                } else
                    this.$content.empty();
                this.onNewPage = !0
            }
            ,
            o.prototype.setStyle = function(e) {
                this.$content.removeClass(),
                void 0 !== e && this.$content.addClass(e)
            }
            ,
            o.prototype.removeChoices = function() {
                t(".choices", this.$content).remove(),
                t(".hidden", this.$content).remove()
            }
            ,
            o.prototype.beginOutput = function() {
                t("#read-marker", this.$content).remove(),
                this.$content.append(t("<hr>").attr("id", "read-marker"))
            }
            ,
            o.prototype.endOutput = function() {
                var e = t("#read-marker");
                this.animate && (e.length > 0 ? t("html, body").animate({
                    scrollTop: e.offset().top
                }, this.fade_time) : t("html, body").animate({
                    scrollTop: 0
                }, this.fade_time))
            }
            ,
            o.prototype.signal = function(e) {
                console.log(e);
                var t = e.signal
                  , n = e.event
                  , i = e.id;
                window && window.handleSignal && window.handleSignal(t, n, i)
            }
            ,
            o.prototype.displayHand = function(e, n) {
                if (window && window.displayHand)
                    return window.displayHand(e, n),
                    null;
                var i = "Hand - click a card to play.";
                window.handDescription && (i = window.handDescription),
                this.dendryEngine.state.qualities.handDescription && (i = this.dendryEngine.state.qualities.handDescription);
                var o = t(".hand")
                  , r = !1;
                0 == o.length ? (o = t("<ul>").addClass("hand"),
                this.$content.append(t("<hr>")),
                this.$content.append(t("<p>").addClass("hand-description").text(i))) : (o.empty(),
                r = !0);
                for (var a = 0; a < n; a++) {
                    var c = t("<li>").addClass("card-in-hand");
                    if (e[a]) {
                        var s = e[a]
                          , d = t("<a>").addClass("card").attr({
                            href: "#",
                            "card-id": s.id,
                            title: s.title
                        })
                          , p = t("<span>").addClass("card-caption").text(s.title);
                        if (s.image) {
                            var l = t("<img>").addClass("card-img").attr({
                                src: s.image
                            });
                            d.append(l)
                        }
                        if (s.subtitle) {
                            var _ = t("<span>").addClass("card-tooltip").text(s.subtitle);
                            d.append(_)
                        }
                        c.append(d),
                        c.append(p),
                        o.append(c)
                    } else {
                        var h = t("<div>").addClass("blank-card");
                        c.append(h)
                    }
                    o.append(c)
                }
                r || this.$content.append(o)
            }
            ,
            o.prototype.displayDecks = function(e) {
                if (window && window.displayDecks)
                    return window.displayDecks(e),
                    null;
                var n = "Decks - click a deck to draw a card.";
                window.deckDescription && (n = window.deckDescription),
                this.dendryEngine.state.qualities.deckDescription && (n = this.dendryEngine.state.qualities.deckDescription),
                this.$content.append(t("<hr>")),
                this.$content.append(t("<p>").addClass("deck-description").text(n));
                var i = t("<ul>").addClass("decks");
                for (var o of e) {
                    var r = t("<li>").addClass("deck")
                      , a = t("<a>").addClass("card").attr({
                        href: "#",
                        "card-id": o.id,
                        title: o.title
                    })
                      , c = t("<span>").addClass("card-caption").text(o.title);
                    if (o.image) {
                        var s = t("<img>").addClass("card-img").attr({
                            src: o.image
                        });
                        a.append(s)
                    }
                    if (o.subtitle) {
                        var d = t("<span>").addClass("card-tooltip").text(o.subtitle);
                        a.append(d)
                    }
                    o.canChoose || (r = r.addClass("unavailable-card")),
                    r.append(a),
                    r.append(c),
                    i.append(r)
                }
                this.$content.append(i)
            }
            ,
            o.prototype.displayPinnedCards = function(e) {
                if (0 == e.length)
                    return null;
                if (window && window.displayPinnedCards)
                    return window.displayPinnedCards(e),
                    null;
                var n = "Pinned cards - click a card to play.";
                window.pinnedCardsDescription && (n = window.pinnedCardsDescription),
                this.dendryEngine.state.qualities.pinnedCardsDescription && (n = this.dendryEngine.state.qualities.pinnedCardsDescription),
                this.$content.append(t("<hr>")),
                this.$content.append(t("<p>").addClass("pinned-text-description").text(n));
                var i = t("<ul>").addClass("pinned-cards");
                for (var o of e) {
                    var r = t("<li>").addClass("pinned-card")
                      , a = t("<a>").addClass("card").attr({
                        href: "#",
                        "card-id": o.id,
                        title: o.title
                    })
                      , c = t("<span>").addClass("card-caption").text(o.title);
                    if (o.image) {
                        var s = t("<img>").addClass("card-img").attr({
                            src: o.image
                        });
                        a.append(s)
                    }
                    if (o.subtitle) {
                        var d = t("<span>").addClass("card-tooltip").text(o.subtitle);
                        a.append(d)
                    }
                    r.append(a),
                    r.append(c),
                    i.append(r)
                }
                this.$content.append(i)
            }
            ,
            o.prototype.setBg = function(e) {
                this.disable_bg ? (t("#bg1").addClass("content_hidden"),
                t("#bg1").removeClass("content_visible"),
                t("#bg1").css("background-image", "none")) : e && "none" != e && "null" != e ? e.startsWith("#") || e.startsWith("rgba(") || e.startsWith("rgb(") ? this.animate_bg ? (t("#bg1").fadeOut(this.bg_fade_out_time, (function() {
                    t("#bg1").css("background-image", "none"),
                    t("#bg1").css("background-color", e)
                }
                )),
                t("#bg1").fadeIn(this.bg_fade_in_time, (function() {
                    t("#bg2").css("background-image", "none")
                }
                )),
                console.log("changing background color " + e)) : (t("#bg1").css("background-image", "none"),
                t("#bg1").css("bacground-color", e)) : e.startsWith("linear-gradient(") ? this.animate_bg ? (t("#bg1").fadeOut(this.bg_fade_out_time, (function() {
                    t("#bg1").css("background-image", e)
                }
                )),
                t("#bg1").fadeIn(this.bg_fade_in_time, (function() {
                    t("#bg2").css("background-image", e)
                }
                )),
                console.log("changing background gradient " + e)) : t("#bg1").css("background-image", e) : this.animate_bg ? (t("#bg1").fadeOut(this.bg_fade_out_time, (function() {
                    t("#bg1").css("background-image", 'url("' + e + '")')
                }
                )),
                t("#bg1").fadeIn(this.bg_fade_in_time, (function() {
                    t("#bg2").css("background-image", t("#bg1").css("background-image"))
                }
                ))) : t("#bg1").css("background-image", 'url("' + e + '")') : this.animate_bg ? (t("#bg1").addClass("content_hidden"),
                t("#bg1").removeClass("content_visible"),
                setTimeout((function() {
                    t("#bg1").css("background-image", "none"),
                    t("#bg1").removeClass("content_hidden"),
                    t("#bg1").addClass("content_visible")
                }
                ), 100)) : t("#bg1").css("background-image", "none")
            }
            ,
            o.prototype.setSprites = function(e) {
                if (window && window.setSprites)
                    window.setSprites(e);
                else {
                    if (!this.show_portraits || "none" == e || "clear" == e)
                        return t("#topLeftSprite").children().fadeOut(this.fade_time, (function() {
                            t("#topLeftSprite").empty()
                        }
                        )),
                        t("#topRightSprite").children().fadeOut(this.fade_time, (function() {
                            t("#topRightSprite").empty()
                        }
                        )),
                        t("#bottomLeftSprite").children().fadeOut(this.fade_time, (function() {
                            t("#bottomLeftSprite").empty()
                        }
                        )),
                        void t("#bottomRightSprite").children().fadeOut(this.fade_time, (function() {
                            t("#bottomRightSprite").empty()
                        }
                        ));
                    if (e instanceof Array)
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n][0]
                              , o = e[n][1];
                            this.setSprite(i, o)
                        }
                    else if (e)
                        for (var r in Object.keys(e))
                            sprites.push([r, e[r]])
                }
            }
            ,
            o.prototype.setSprite = function(e, n) {
                if (this.show_portraits)
                    if (window && window.setSprite)
                        window.setSprite(e, n);
                    else {
                        var i;
                        if ("topleft" == (e = e.toLowerCase()) ? i = t("#topLeftSprite") : "topright" == e ? i = t("#topRightSprite") : "bottomleft" == e ? i = t("#bottomLeftSprite") : "bottomright" == e && (i = t("#bottomRightSprite")),
                        "none" == n || "clear" == n)
                            return delete this.dendryEngine.state.sprites[e],
                            void i.fadeOut(this.fade_time, (function() {
                                i.empty()
                            }
                            ));
                        this.dendryEngine.state.sprites[e] = n,
                        i.fadeOut(this.fade_time, (function() {
                            i.emtpy();
                            var e = new Image;
                            e.src = n,
                            i.append(e),
                            console.log("fadeIn"),
                            i.fadeIn(this.fade_time)
                        }
                        ))
                    }
            }
            ,
            o.prototype.setSpriteStyle = function(e, n) {
                if (window && window.setSpriteStyle)
                    window.setSpriteStyle(e, n);
                else {
                    var i;
                    if ("topleft" == e)
                        i = t("#topLeftSprite");
                    else if ("topright" == e)
                        i = t("#topRightSprite");
                    else if ("bottomleft" == e)
                        i = t("#bottomLeftSprite");
                    else {
                        if ("bottomright" != e)
                            return;
                        i = t("#bottomRightSprite")
                    }
                    i.css(n)
                }
            }
            ,
            o.prototype.audio = function(e) {
                if (this.disable_audio)
                    this.currentAudio && (this.currentAudio.pause(),
                    this.currentAudio.loop = !1);
                else {
                    var n = e.split(" ")
                      , i = []
                      , o = !1
                      , r = !1
                      , a = !1
                      , c = !1
                      , s = !1;
                    for (var d of n)
                        "loop" == d ? o = !0 : "queue" == d ? r = !0 : "nofade" == d ? a = !0 : "shuffle" == d ? c = !0 : "clear" == d ? s = !0 : i.push(d);
                    s && (this.audioPlaylist = []),
                    (i.length >= 1 || c) && (this.audioPlaylist = this.audioPlaylist.concat(i));
                    var p = i[0]
                      , l = this.currentAudio
                      , _ = this.sound_fade_time
                      , h = this.audioPlaylist;
                    if ("null" == p || "none" == p)
                        this.currentAudio && (t(l).animate({
                            volume: 0
                        }, this.sound_fade_time, (function() {
                            l.pause()
                        }
                        )),
                        this.currentAudio.loop = !1);
                    else {
                        if (console.log("new audio:", p, "current audio:", this.currentAudioURL),
                        this.currentAudio && (this.currentAudioURL == p || r || c))
                            if (l.ended || l.paused)
                                this.currentAudioURL = p,
                                l.src = p,
                                console.log("Fading in new audio"),
                                l.volume = 0,
                                l.play(),
                                t(l).animate({
                                    volume: 1
                                }, _),
                                this.currentAudio.onended = function() {
                                    var e;
                                    if (r)
                                        e = u.pop(),
                                        console.log("playing from queue");
                                    else if (c) {
                                        var n = Math.floor(Math.random() * h.length);
                                        e = h[n],
                                        console.log("playing from playlist")
                                    }
                                    e && (l.src = e,
                                    console.log("Now playing", e),
                                    l.play(),
                                    t(l).animate({
                                        volume: 1
                                    }, _),
                                    window.dendryUI.currentAudioURL = e)
                                }
                                ;
                            else {
                                console.log("adding music to queue"),
                                this.audioQueue.push(p);
                                var u = this.audioQueue;
                                this.currentAudio.onended = function() {
                                    var e;
                                    if (r)
                                        e = u.pop(),
                                        console.log("playing from queue");
                                    else if (c) {
                                        var n = Math.floor(Math.random() * h.length);
                                        e = h[n],
                                        console.log("playing from playlist")
                                    }
                                    e && (l.src = e,
                                    console.log("Now playing", e),
                                    l.play(),
                                    t(l).animate({
                                        volume: 1
                                    }, _),
                                    window.dendryUI.currentAudioURL = e)
                                }
                            }
                        else
                            this.currentAudio ? (this.currentAudioURL = p,
                            console.log("currentAudio present,  fading out current audio"),
                            l.onended = function() {}
                            ,
                            a ? (l.pause(),
                            l.src = p,
                            l.play()) : t(l).animate({
                                volume: 0
                            }, this.sound_fade_time, (function() {
                                console.log(l),
                                l.src = p,
                                console.log("Fading in new audio"),
                                l.play(),
                                t(l).animate({
                                    volume: 1
                                }, _)
                            }
                            ))) : this.currentAudio || (this.currentAudio = new Audio(p),
                            this.currentAudio.volume = 0,
                            this.currentAudio.play(),
                            t(this.currentAudio).animate({
                                volume: 1
                            }, this.sound_fade_time),
                            l = this.currentAudio,
                            c && (this.currentAudio.onended = function() {
                                var e = Math.floor(Math.random() * h.length)
                                  , n = h[e];
                                n && (l.src = n,
                                console.log("playing from shuffle"),
                                console.log("Now playing", n),
                                l.play(),
                                t(l).animate({
                                    volume: 1
                                }, _),
                                window.dendryUI.currentAudioURL = n)
                            }
                            ));
                        this.currentAudio.loop = !!o
                    }
                }
            }
            ,
            o.prototype.saveSettings = function() {
                "undefined" != typeof localStorage && (localStorage[this.game.title + "_animate"] = this.animate,
                localStorage[this.game.title + "_disable_bg"] = this.disable_bg,
                localStorage[this.game.title + "_animate_bg"] = this.animate_bg,
                localStorage[this.game.title + "_show_portraits"] = this.show_portraits,
                localStorage[this.game.title + "_disable_audio"] = this.disable_audio)
            }
            ,
            o.prototype.loadSettings = function(e) {
                var t = {
                    animate: !1,
                    disable_bg: !1,
                    animate_bg: !0,
                    show_portraits: !0,
                    disable_audio: !1
                };
                if ("undefined" != typeof localStorage)
                    for (var n in t)
                        if (t.hasOwnProperty(n)) {
                            var i = this.game.title + "_" + n;
                            i in localStorage ? this[n] = "false" != localStorage[i] : e && e.hasOwnProperty(n) ? this[n] = e[n] : this[n] = t[n]
                        }
            }
            ,
            o.prototype.toggle_audio = function(e) {
                e ? (this.disable_audio = !1,
                this.currentAudio && this.currentAudio.play()) : (this.currentAudio && (this.currentAudio.pause(),
                this.currentAudio.loop = !1),
                this.disable_audio = !0)
            }
            ,
            o.prototype.autosave = function() {
                var e = localStorage[this.save_prefix + "_a0"];
                e && (localStorage[this.save_prefix + "_a1"] = e,
                localStorage[this.save_prefix + "_timestamp_a1"] = localStorage[this.save_prefix + "_timestamp_a0"]);
                var t = "a0"
                  , n = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + "_" + t] = n;
                var i = this.dendryEngine.state.sceneId
                  , o = new Date(Date.now());
                o = i + "\n(" + o.toLocaleString(void 0, this.DateOptions) + ")",
                localStorage[this.save_prefix + "_timestamp_" + t] = o,
                this.populateSaveSlots(t + 1, 2)
            }
            ,
            o.prototype.quickSave = function() {
                var e = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + "_q"] = e,
                window.alert("Saved.")
            }
            ,
            o.prototype.saveSlot = function(e) {
                var t = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + "_" + e] = t;
                var n = this.dendryEngine.state.sceneId
                  , i = new Date(Date.now());
                i = n + "\n(" + i.toLocaleString(void 0, this.DateOptions) + ")",
                localStorage[this.save_prefix + "_timestamp_" + e] = i,
                this.populateSaveSlots(e + 1, 2)
            }
            ,
            o.prototype.quickLoad = function() {
                if (localStorage[this.save_prefix + "_q"]) {
                    var e = localStorage[this.save_prefix + "_q"];
                    this.dendryEngine.setState(JSON.parse(e)),
                    window.alert("Loaded.")
                } else
                    window.alert("No save available.")
            }
            ,
            o.prototype.loadSlot = function(e) {
                if (localStorage[this.save_prefix + "_" + e]) {
                    var t = localStorage[this.save_prefix + "_" + e];
                    this.dendryEngine.setState(JSON.parse(t)),
                    this.hideSaveSlots(),
                    window.alert("Loaded.")
                } else
                    window.alert("No save available.")
            }
            ,
            o.prototype.deleteSlot = function(e) {
                localStorage[this.save_prefix + "_" + e] ? (localStorage[this.save_prefix + "_" + e] = "",
                localStorage[this.save_prefix + "_timestamp_" + e] = "",
                this.populateSaveSlots(e + 1, 2)) : window.alert("No save available.")
            }
            ,
            o.prototype.exportSlot = function(e) {
                if (localStorage[this.save_prefix + "_" + e]) {
                    var t = localStorage[this.save_prefix + "_" + e]
                      , n = document.createElement("a")
                      , i = new Blob([t],{
                        type: "text/plain"
                    });
                    n.href = URL.createObjectURL(i),
                    n.download = "save.txt",
                    n.click()
                } else
                    window.alert("No save available.")
            }
            ,
            o.prototype.importSave = function(e) {
                var t = this;
                var n = document.getElementById(e)
                  , i = new FileReader
                  , o = n.files[0];
                console.log(n.files),
                i.onload = function(e) {
                    var n = e.target.result;
                    t.dendryEngine.setState(JSON.parse(n)),
                    t.hideSaveSlots(),
                    window.alert("Loaded.")
                }
                ,
                i.readAsText(o)
            }
            ,
            o.prototype.populateSaveSlots = function(e, t) {
                var n = this;
                function i(e) {
                    var t = document.getElementById("save_info_" + e)
                      , i = document.getElementById("save_button_" + e)
                      , o = document.getElementById("delete_button_" + e);
                    if (localStorage[n.save_prefix + "_" + e]) {
                        var r = localStorage[n.save_prefix + "_timestamp_" + e];
                        t.textContent = r,
                        i.textContent = "Load",
                        i.onclick = function(e) {
                            return function(t) {
                                n.loadSlot(e)
                            }
                        }(e),
                        o.onclick = function(e) {
                            return function(t) {
                                n.deleteSlot(e)
                            }
                        }(e)
                    } else
                        i.textContent = "Save",
                        t.textContent = "Empty",
                        i.onclick = function(e) {
                            return function(t) {
                                n.saveSlot(e)
                            }
                        }(e);
                    try {
                        var a = document.getElementById("export_button_" + e);
                        localStorage[n.save_prefix + "_" + e] && (a.onclick = function(e) {
                            return function(t) {
                                n.exportSlot(e)
                            }
                        }(e))
                    } catch (e) {}
                }
                for (var o = 0; o < e; o++)
                    i(o);
                for (o = 0; o < t; o++)
                    i("a" + o)
            }
            ,
            o.prototype.showSaveSlots = function() {
                if (this.dendryEngine.state.disableSaves)
                    window.alert("Saving and loading is currently disabled.");
                else {
                    var e = document.getElementById("save");
                    e.style.display = "block",
                    this.populateSaveSlots(this.max_slots, 2);
                    var t = this;
                    e.onclick || (e.onclick = function(e) {
                        e.target == document.getElementById("save") && t.hideSaveSlots()
                    }
                    )
                }
            }
            ,
            o.prototype.hideSaveSlots = function() {
                document.getElementById("save").style.display = "none"
            }
            ,
            o.prototype.setOption = function(e, t) {
                this[e] = t,
                this.saveSettings()
            }
            ,
            o.prototype.populateOptions = function() {
                var e = this.disable_bg
                  , n = this.animate
                  , i = this.animate_bg;
                e ? t("#backgrounds_no")[0].checked = !0 : t("#backgrounds_yes")[0].checked = !0,
                n ? t("#animate_yes")[0].checked = !0 : t("#animate_no")[0].checked = !0,
                i ? t("#animate_bg_yes")[0].checked = !0 : t("#animate_bg_no")[0].checked = !0
            }
            ,
            o.prototype.showOptions = function() {
                var e = document.getElementById("options");
                this.populateOptions(),
                e.style.display = "block",
                e.onclick || (e.onclick = function(e) {
                    e.target == document.getElementById("options") && this.hideOptions()
                }
                )
            }
            ,
            o.prototype.getGameOverMsg = function() {
                return "Game Over (reload to read again)"
            }
            ,
            o.prototype._registerEvents = function() {
                var e = this;
                this.$content.on("click", "ul.choices li a", (function(n) {
                    n.preventDefault(),
                    n.stopPropagation();
                    var i = parseInt(t(this).attr("data-choice"));
                    return e.dendryEngine.choose(i),
                    !1
                }
                )),
                this.$content.on("click", "ul.choices li", (function(e) {
                    return e.preventDefault(),
                    e.stopPropagation(),
                    t("a", this).click(),
                    !1
                }
                )),
                this.$content.on("click", "ul.decks li a", (function(n) {
                    n.preventDefault(),
                    n.stopPropagation();
                    var i = t(this).attr("card-id");
                    return e.dendryEngine.drawCard(i),
                    !1
                }
                )),
                this.$content.on("click", "ul.hand li a", (function(n) {
                    n.preventDefault(),
                    n.stopPropagation();
                    var i = t(this).attr("card-id");
                    return e.dendryEngine.playCard(i),
                    !1
                }
                )),
                this.$content.on("click", "ul.pinned-cards li a", (function(n) {
                    n.preventDefault(),
                    n.stopPropagation();
                    var i = t(this).attr("card-id");
                    return e.dendryEngine.playPinnedCard(i),
                    !1
                }
                ))
            }
            ;
            t((function() {
                i.convertJSONToGame(window.game.compiled, (function(e, n) {
                    if (e)
                        throw e;
                    var i = new o(n,t("#content"));
                    if ((window.dendryUI = i,
                    void 0 !== window.dendryModifyUI) && window.dendryModifyUI(i))
                        return;
                    i.dendryEngine.beginGame()
                }
                ))
            }
            ))
        }(jQuery)
    }
    , {
        "../engine": 1,
        "./content/html": 3
    }],
    3: [function(e, t, n) {
        !function() {
            "use strict";
            var e = function(e) {
                if (void 0 === e.type)
                    return "undefined" != typeof window && window.displayText && (e = window.displayText(e)),
                    e;
                switch (e.type) {
                case "emphasis-1":
                    return "<em>" + n(e.content) + "</em>";
                case "emphasis-2":
                    return "<strong>" + n(e.content) + "</strong>";
                case "emphasis-3":
                    return "<code>" + n(e.content) + "</code>";
                case "hidden":
                    return '<span class="hidden">' + n(e.content) + "</span>";
                case "line-break":
                    return "<br>";
                case "magic":
                    return e.content;
                case "insert":
                case "conditional":
                    throw new Error(e.type + " should have been evaluated by now.")
                }
            }
              , n = function(t) {
                if (Array.isArray(t)) {
                    for (var n = [], i = 0; i < t.length; ++i) {
                        var o = t[i];
                        n.push(e(o))
                    }
                    return n.join("")
                }
                return e(t)
            };
            t.exports = {
                convert: function(e) {
                    for (var t = [], i = 0; i < e.length; ++i) {
                        var o = e[i];
                        switch (o.type) {
                        case "heading":
                            t.push("<h1>"),
                            t.push(n(o.content)),
                            t.push("</h1>");
                            break;
                        case "paragraph":
                            t.push("<p>"),
                            t.push(n(o.content)),
                            t.push("</p>");
                            break;
                        case "quotation":
                            t.push("<blockquote>"),
                            t.push(n(o.content)),
                            t.push("</blockquote>");
                            break;
                        case "attribution":
                            t.push('<blockquote class="attribution">'),
                            t.push(n(o.content)),
                            t.push("</blockquote>");
                            break;
                        case "magic":
                            t.push(o.content);
                            break;
                        case "hrule":
                            t.push("<hr>")
                        }
                    }
                    return t.join("")
                },
                convertLine: n
            }
        }()
    }
    , {}]
}, {}, [2]);
