
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND",
                f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
        s(r[o]);
    return s
}
)({
    1: [function(require, module, exports) {
        /* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
        /*jshint indent:2 */
        (function() {
            'use strict';

            // To avoid the need to include any utility libraries when this is
            // used in a browser, define some helper functions we'd normally
            // rely on libraries for.

            var assert = function(mustBeTrue) {
                /* istanbul ignore if */
                if (!mustBeTrue) {
                    throw new Error('Assertion failed.');
                }
            };

            var each = function(array, fn) {
                for (var i = 0; i < array.length; ++i) {
                    fn(array[i]);
                }
            };

            var objEach = function(obj, fn) {
                for (var key in obj) {
                    fn(key, obj[key]);
                }
            };

            var merge = function() {
                var result = {};
                for (var i = 0; i < arguments.length; ++i) {
                    var obj = arguments[i];
                    for (var key in obj) {
                        result[key] = obj[key];
                    }
                }
                return result;
            };

            // Credit: Taken from Lodash (MIT License). See CREDITS.
            var isObject = function(value) {
                var type = typeof value;
                return type === 'function' || (value && type === 'object') || false;
            };

            var makeFunctionFromSource = function(source) {
                source = source.trim();
                /*jshint -W054 */
                var fn = new Function('state','Q',source);
                /*jshint +W054 */
                fn.source = source;
                return fn;
            };

            var runActions = function(actions, context, state) {
                if (actions === undefined) {
                    return;
                }
                each(actions, function(fn) {
                    try {
                        fn.call(context, state, state.qualities);
                    } catch (err) {
                        // Ignore errors. TODO: Log them somehow?
                        console.log('Error:', err);
                    }
                });
            };

            var runPredicate = function(predicate, default_, context, state) {
                var result = default_;
                if (predicate === undefined) {
                    return result;
                }
                try {
                    result = !!predicate.call(context, state, state.qualities);
                } catch (err) {
                    // Ignore errors. TODO: Log them somehow?
                    console.log('Error:', err);
                }
                return result;
            };

            var runExpression = function(expression, default_, context, state) {
                var result = default_;
                if (expression === undefined) {
                    return result;
                }
                try {
                    result = expression.call(context, state, state.qualities);
                } catch (err) {
                    // Ignore errors. TODO: Log them somehow?
                    console.log('Error in expression', expression, ':', err);
                }
                return result;
            };

            var convertJSONToGame = function(json, callback) {
                var reviver = function(key, value) {
                    if (isObject(value) && value.$code !== undefined) {
                        return makeFunctionFromSource(value.$code);
                    } else {
                        return value;
                    }
                };

                try {
                    var game = JSON.parse(json, reviver);
                    return callback(null, game);
                } catch (err) {
                    return callback(err);
                }
            };

            var simpleContent = function(text) {
                return [{
                    type: 'paragraph',
                    content: text
                }];
            };

            var getCardinalNumber = function(value) {
                if (Math.floor(value) === value && value >= 0 && value <= 12) {
                    // Integer, so use word.
                    return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][value];
                } else {
                    return value.toString();
                }
            };

            var getOrdinalNumber = function(value) {
                if (Math.floor(value) === value && value >= 0) {
                    if (value <= 12) {
                        return ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'][value];
                    } else {
                        value = value.toString();
                        if (/1[0-9]$/.test(value)) {
                            return value + 'th';
                        } else {
                            var last = value.substr(value.length - 1, 1);
                            switch (last) {
                            case '1':
                                return value + 'st';
                            case '2':
                                return value + 'nd';
                            case '3':
                                return value + 'rd';
                            default:
                                return value + 'th';
                            }
                        }
                    }
                } else {
                    return value.toString();
                }
            };

            var getFudgeDisplay = function(value) {
                if (Math.floor(value) === value) {
                    if (value > 3) {
                        return 'superb+' + (value - 3);
                    } else if (value < -3) {
                        return 'terrible' + (value + 3);
                    } else {
                        switch (value) {
                        case 3:
                            return 'superb';
                        case 2:
                            return 'great';
                        case 1:
                            return 'good';
                        case 0:
                            return 'fair';
                        case -1:
                            return 'mediocre';
                        case -2:
                            return 'poor';
                        case -3:
                            return 'terrible';
                        }
                    }
                } else {
                    return value.toString();
                }
            };

            var getUserQDisplay = function(value, qdisplay) {
                for (var i = 0; i < qdisplay.content.length; ++i) {
                    var case_ = qdisplay.content[i];
                    var min = case_.min;
                    var max = case_.max;
                    if ((min === undefined || min <= value) && (max === undefined || max >= value)) {
                        if (case_.output !== undefined) {
                            return case_.output;
                        } else {
                            return value.toString();
                        }
                    }
                }
                return value.toString();
            };

            // broad difficulty from https://fallenlondon.wiki/wiki/Broad_difficulty

            var calculateBroadDifficulty = function(quality, difficulty, scaler, random) {
                if (!scaler) {
                    scaler = 0.6;
                }
                if (scaler > 1) {
                    scaler = scaler / 100;
                }
                var success_prob = scaler * (quality / difficulty);
                if (success_prob > 1) {
                    success_prob = 1;
                }
                return success_prob;
            };

            // narrow difficulty from https://fallenlondon.wiki/wiki/Narrow_difficulty
            var calculateNarrowDifficulty = function(quality, difficulty, increment) {
                if (!increment) {
                    increment = 0.1;
                }
                if (increment > 1) {
                    increment = increment / 100;
                }
                var success_prob = (quality - difficulty) * increment + 0.5;
                if (success_prob > 1) {
                    success_prob = 1;
                } else if (success_prob < increment) {
                    success_prob = increment;
                }
                return success_prob;
            };

            // this function actually does the roll for success.
            var rollDifficulty = function(success_prob, random) {
                var rn;
                if (random) {
                    rn = random.random();

                } else {
                    rn = Math.random();
                }
                if (rn < success_prob) {
                    return true;
                }
                return false;
            };

            // use the storynexus adjectives
            var displayDifficulty = function(success_prob) {
                if (success_prob <= 0.1) {
                    return "almost impossible";
                } else if (success_prob <= 0.3) {
                    return "high-risk";
                } else if (success_prob <= 0.4) {
                    return "tough";
                } else if (success_prob <= 0.5) {
                    return "very chancy";
                } else if (success_prob <= 0.6) {
                    return "chancy";
                } else if (success_prob <= 0.7) {
                    return "modest";
                } else if (success_prob <= 0.8) {
                    return "very modest";
                } else if (success_prob <= 0.9) {
                    return "low risk";
                } else {
                    return "straightforward";
                }
            };

            // ------------------------------------------------------------------------

            // Objects with this interface are passed to a game state to have it
            // display content.
            var UserInterface = function() {};
            UserInterface.prototype.beginGame = function() {}
            ;
            UserInterface.prototype.displayContent = function(paragraphs, faceImage) {}
            ;
            // these are the dendrynexus display functions
            // displays the decks
            UserInterface.prototype.displayDecks = function(decks) {}
            ;
            // displays cards in hand
            UserInterface.prototype.displayHand = function(hand) {}
            ;
            // displays pinned cards (these are basically an alternate way of displaying choices)
            UserInterface.prototype.displayPinnedCards = function(cards) {}
            ;

            UserInterface.prototype.displayChoices = function(choices) {}
            ;
            UserInterface.prototype.displayGameOver = function() {
                this.displayContent(simpleContent('Game Over'));
            }
            ;
            UserInterface.prototype.removeChoices = function() {}
            ;
            // Called when the player makes a choice and new content is about to be
            // added (i.e. isn't called between output when the next scene is arrived
            // at via go-to).
            UserInterface.prototype.beginOutput = function() {}
            ;
            UserInterface.prototype.endOutput = function() {}
            ;
            UserInterface.prototype.newPage = function() {}
            ;
            UserInterface.prototype.setStyle = function(style) {}
            ;
            UserInterface.prototype.signal = function(data) {}
            ;
            UserInterface.prototype.setBg = function(img) {}
            ;
            UserInterface.prototype.setSprites = function(data) {}
            ;
            UserInterface.prototype.setSpriteStyle = function(loc, style) {}
            ;
            UserInterface.prototype.audio = function(audio) {}
            ;
            // Not part of the UI, but allows us to simply subclass.
            UserInterface.makeParentOf = function(OtherConstructor) {
                OtherConstructor.prototype = new UserInterface();
                OtherConstructor.constructor = OtherConstructor;
            }
            ;

            // ------------------------------------------------------------------------

            // An engine is given a user interface, the game and the current
            // game state (can be omitted). It is responsible for the logic of
            // the game.
            var DendryEngine = function(ui, game) {
                this.ui = ui;
                this.game = game;
            };

            DendryEngine.prototype.displayGameOver = function() {
                this.ui.displayGameOver();
                return this;
            }
            ;

            DendryEngine.prototype.displayChoices = function() {
                // TODO: dendrynexus - if the current scene is a hand, display the decks, hand, and pinned cards.
                var choices = this.getCurrentChoices();
                assert(choices);
                var scene = this.getCurrentScene();
                if (scene.isHand) {
                    // separate choices into decks and pinned cards
                    var decks = [];
                    var pinnedCards = [];
                    for (var c of choices) {
                        var choiceScene = this.game.scenes[c.id];
                        if (choiceScene.isDeck) {
                            // if the deck has
                            if (!this._drawFromDeck(c.id)) {
                                c.canChoose = false;
                                c.subtitle = c.unavailableSubtitle || "No cards available from deck.";
                            } else {
                                c.canChoose = true;
                            }
                            c.isDeck = true;
                            c.image = choiceScene.cardImage;
                            decks.push(c);
                        } else if (choiceScene.isPinnedCard) {
                            c.isDeck = false;
                            c.image = choiceScene.cardImage;
                            pinnedCards.push(c);
                        }
                    }
                    if (!this.state.currentHands[this.state.sceneId]) {
                        this.state.currentHands[this.state.sceneId] = [];
                    }
                    var currentHand = this.state.currentHands[this.state.sceneId];
                    // TODO: check the viewIf/chooseIf conditions for all cards in the current hand, and filter them if they no longer work...
                    var handIds = {};
                    for (var card of currentHand) {
                        handIds[card.id] = card;
                    }
                    handIds = this.__filterViewable(handIds);
                    for (var i = 0; i < currentHand.length; i++) {
                        while (currentHand[i] && !handIds[currentHand[i].id]) {
                            currentHand.splice(i, 1);
                        }
                    }
                    this.ui.displayDecks(decks);
                    this.ui.displayHand(currentHand, scene.maxCards);
                    this.ui.displayPinnedCards(pinnedCards);
                } else {
                    if (this.state.enableTranscript) {
                        this.transcript.push(choices);
                    }
                    this.ui.displayChoices(choices);
                }
                return this;
            }
            ;

            DendryEngine.prototype.displaySceneContent = function(restorePage) {
                var scene = this.getCurrentScene();
                assert(scene);
                // TODO: displaying images
                var faceImage = null;
                if (scene.faceImage) {
                    faceImage = scene.faceImage;
                }
                var sceneSignal = scene.signal || this.game.sceneSignal;
                if (sceneSignal !== undefined) {
                    this.ui.signal({
                        signal: sceneSignal,
                        event: 'scene-display',
                        id: this.state.sceneId
                    });
                }
                if (restorePage) {
                    this.ui.newPage();
                    this.ui.displayContent(this.state.tempCurrentContent, faceImage);
                    this.state.currentContent = this.state.tempCurrentContent.slice();
                } else if (scene.newPage) {
                    this.ui.newPage();
                    this.state.currentContent = [];
                }
                this.ui.setStyle(scene.style);
                this.ui.removeChoices();

                if (scene.content !== undefined && !restorePage) {
                    var displayContent = this._makeDisplayContent(scene.content, true);
                    if (this.state.enableTranscript) {
                        this.transcript = this.transcript.concat(displayContent);
                    }
                    this.state.currentContent = this.state.currentContent.concat(displayContent);
                    this.ui.displayContent(displayContent, faceImage);
                }
                this._runActions(scene.onDisplay);

                return this;
            }
            ;

            DendryEngine.prototype.choose = function(choiceIndex) {
                var choices = this.choiceCache;

                // Check for valid choice.
                assert(choices);
                if (choices.length <= choiceIndex) {
                    throw new Error('No choice at index ' + choiceIndex + ', only ' + choices.length + ' choices are available.');
                }

                // Commit the choice.
                var choice = choices[choiceIndex];
                if (!choice.canChoose) {
                    throw new Error('Attempted to choose index ' + choiceIndex + ', but ' + 'that choice is unavailable.');
                }

                var id = choice.id;
                if (this.state.enableTranscript) {
                    this.transcript.push('> ' + choice.title);
                }

                delete this.choiceCache;
                this.goToScene(id);

                return this;
            }
            ;

            DendryEngine.prototype.chooseSceneId = function(sceneId) {
                delete this.choiceCache;
                this.goToScene(id);

                return this;
            }
            ;

            // TODO: dendrynexus - draw card
            DendryEngine.prototype.drawCard = function(deckId) {
                var currentSceneId = this.state.sceneId;
                var scene = this.getCurrentScene();
                assert(scene);

                var currentHand = this.state.currentHands[currentSceneId];
                // return a message saying that there are too many cards
                if (scene.maxCards <= currentHand.length) {
                    return {
                        id: null,
                        title: 'no_space_in_hand'
                    };
                }
                // get an available card from deckId
                // card is {id: id, title: title}
                var card = this._drawFromDeck(deckId);
                // distinguish between the "no space left in hand" and "no card in deck" situations?
                if (!card) {
                    return {
                        id: null,
                        title: 'no_card_in_deck'
                    };
                }
                this.state.lastDrawnCard = card;
                var image = this.game.scenes[card.id].cardImage;
                card.image = image;
                this.state.currentHands[currentSceneId].push(card);

                // display the hand
                this.ui.displayHand(this.state.currentHands[currentSceneId], scene.maxCards);
                return card;
            }
            ;

            // dendrynexus - play a card (remove it from the current hand)
            // should this be the code for pinned cards as well?
            DendryEngine.prototype.playCard = function(cardId) {
                var currentSceneId = this.state.sceneId;
                var currentHand = this.state.currentHands[currentSceneId];
                // remove card from hand
                for (var i = 0; i < currentHand.length; i++) {
                    if (currentHand[i].id == cardId) {
                        currentHand.splice(i, 1);
                        break;
                    }
                }
                this.state.lastPlayedCard = this.game.scenes[cardId];
                delete this.choiceCache;
                this.goToScene(cardId);
            }
            ;

            DendryEngine.prototype.playPinnedCard = function(cardId) {
                delete this.choiceCache;
                this.goToScene(cardId);
            }
            ;

            DendryEngine.prototype.goToScene = function(id) {
                this.state.sceneIdsSinceGoTo = [];
                this.ui.beginOutput();
                this.__changeScene(id);
                this.ui.endOutput();
            }
            ;

            DendryEngine.prototype.beginGame = function(rndSeeds) {
                this.random = rndSeeds ? Random.fromSeeds(rndSeeds) : Random.fromUnique();
                this.state = {
                    sceneId: null,
                    sceneIdsSinceGoTo: [],
                    rootSceneId: this.game.rootScene || this.game.firstScene || 'root',
                    gameOver: false,
                    visits: {},
                    qualities: {},
                    currentRandomState: null,
                    currentContent: [],
                    // tempCurrentContent is used for when the
                    // player visits the stats or settings pages in order to remember
                    // where the previous page was?
                    tempCurrentContent: [],
                    // prevSpecialSceneId is only set when visiting scene tagged with
                    // isSpecial = true, and is the scene before the special scene.
                    prevSpecialSceneId: null,
                    prevSceneId: null,
                    // every time a top-level scene changes,
                    // this record the last-visited qualified id within that scene.
                    prevTopSceneId: null,
                    // jumpScene is defined within a scene file, indicating the scene that
                    // @jumpScene will go to. Basically it's used to make subroutines.
                    jumpSceneId: null,
                    // achievements is a dict of all the current achievements.
                    // persist achievements in the browser through localstorage?
                    achievements: {},
                    // current background image
                    bg: null,
                    // sceneStack is used for goSub
                    sceneStack: [],
                    // true if just popped out of a returnScene
                    justReturned: false,
                    // just returned from a goSubStart
                    justReturnedStart: false,
                    // just returned from a goSubEnd
                    justReturnedEnd: false,
                    // sprites is a mapping from location to file
                    sprites: {},
                    // dendrynexus stuff
                    // mapping from sceneId to list of sceneIds - indicating the current hand in each of those scenes.
                    currentHands: {},
                    // last drawn card
                    lastDrawnCard: null,
                    lastPlayedCard: null,

                    enableTranscript: false,
                    // whether or not to disable saves
                    disableSaves: false,
                };
                // TODO: transcript
                this.transcript = [];

                this._setUpQualities();
                this._loadAchievements();

                this.ui.beginGame();

                var id = this.game.firstScene || this.state.rootSceneId;
                this.goToScene(id);

                return this;
            }
            ;

            DendryEngine.prototype._loadAchievements = function() {
                if (typeof localStorage !== 'undefined') {
                    if (localStorage[this.game.title + '_achievements']) {
                        this.state.achievements = JSON.parse(localStorage[this.game.title + '_achievements']);
                        // add a special quality named 'achievement_'
                        for (var achievement in this.state.achievements) {
                            this.state.qualities['achievement_' + achievement] = 1;
                        }
                    }
                }
            }
            ;

            DendryEngine.prototype.gameOver = function() {
                this.state.gameOver = true;
                this.displayGameOver();
                return this;
            }
            ;

            DendryEngine.prototype.isGameOver = function() {
                return this.state.gameOver;
            }
            ;

            DendryEngine.prototype.getCurrentScene = function() {
                var scene = this.game.scenes[this.state.sceneId];
                assert(scene !== undefined);
                return scene;
            }
            ;

            // Returns the choices for the current scene. Choices are objects
            // with an id and a title property, not to be confused with the
            // option objects in a scene (though options are used to generate
            // choices). Choices are compiled from the options belonging to the
            // current scene.
            DendryEngine.prototype.getCurrentChoices = function() {
                return this.choiceCache;
            }
            ;

            // Sets the current state of the engine from an exportable state.
            DendryEngine.prototype.setState = function(state) {
                // Set the state.
                this.state = state;
                this._setUpQualities();
                this.random = Random.fromState(this.state.currentRandomState);
                this._loadAchievements();

                // Display the current state.
                if (this.isGameOver()) {
                    this.displayGameOver();
                } else {
                    var scene = this.getCurrentScene();
                    this.choiceCache = this._compileChoices(scene);
                    this.ui.newPage();
                    this.ui.removeChoices();
                    this.ui.displayContent(this.state.currentContent);
                    this.displayChoices();
                    this.ui.setSprites(this.state.sprites);
                    this.ui.setBg(this.state.bg);
                }
                return this;
            }
            ;

            // Returns a data structure for exporting without any accessors or
            // complex classes.
            DendryEngine.prototype.getExportableState = function() {
                // Because we only have complex state in the qualities (they have
                // accessors), and because we save with JSON (which calls
                // accessors correctly), we don't have to worry about giving the
                // actual state. Note that, if you want to keep this object, however,
                // you want to clone it somehow (turning it to and from json,
                // for example), otherwise it will change as the engine updates.
                return this.state;
            }
            ;

            // ------------------------------------------------------------------------

            DendryEngine.prototype._getQDisplay = function(value, qDisplayId) {
                switch (qDisplayId) {
                case 'cardinal':
                case 'number':
                    return getCardinalNumber(value);
                case 'ordinal':
                    return getOrdinalNumber(value);
                case 'fudge':
                    return getFudgeDisplay(value);
                default:
                    var qdisplay = this.game.qdisplays[qDisplayId];
                    assert(qdisplay !== undefined);
                    return getUserQDisplay(value, qdisplay);
                }
            }
            ;

            DendryEngine.prototype._evaluateStateDependencies = function(defs) {
                var result = [];

                for (var i = 0; i < defs.length; ++i) {
                    var value;
                    var def = defs[i];
                    var fn = def.fn;
                    switch (def.type) {
                    case 'insert':
                        value = this._runExpression(fn);
                        if (def.qdisplay) {
                            value = this._getQDisplay(value, def.qdisplay);
                        } else {
                            value = value.toString();
                        }
                        break;

                    default:
                        assert(def.type === 'predicate');
                        value = this._runPredicate(fn);
                        break;
                    }

                    // Recurse the resolution into the resulting value, if needed.
                    if (value.stateDependencies !== undefined) {
                        // We have to resolve the nested state dependencies.
                        value = this._makeDisplayContent(value, false);
                    }
                    result.push(value);
                }
                return result;
            }
            ;

            DendryEngine.prototype._mergeStateEvalsInArray = function(array, evals) {
                if (!Array.isArray(array)) {
                    array = [array];
                }
                var result = [];
                for (var i = 0; i < array.length; ++i) {
                    result = result.concat(this._mergeStateEvals(array[i], evals));
                }
                return result;
            }
            ;

            DendryEngine.prototype._mergeStateEvals = function(content, evals) {
                if (content.type === undefined) {
                    return [content];
                }

                var result;
                switch (content.type) {
                case 'conditional':
                    if (evals[content.predicate]) {
                        result = this._mergeStateEvalsInArray(content.content, evals);
                    } else {
                        result = [];
                    }
                    break;
                case 'insert':
                    result = evals[content.insert];
                    break;
                default:
                    var newE = {
                        type: content.type
                    };
                    newE.content = this._mergeStateEvalsInArray(content.content, evals);
                    result = [newE];
                    break;
                }
                return result;
            }
            ;

            DendryEngine.prototype._makeDisplayContent = function(content, useParas) {
                // Raw content can just be returned.
                if (content.content === undefined) {
                    if (Array.isArray(content)) {
                        return content;
                    } else if (useParas) {
                        return [{
                            type: 'paragraph',
                            content: content
                        }];
                    } else {
                        return [content];
                    }
                } else if (content.stateDependencies === undefined && content.type !== undefined) {
                    return [content];
                }

                // Merge in dependencies if we have them
                var stateDepDefs = content.stateDependencies;
                var displayContent = content.content;
                if (stateDepDefs && stateDepDefs.length > 0) {
                    var evals = this._evaluateStateDependencies(stateDepDefs);
                    if (!Array.isArray(displayContent)) {
                        displayContent = [displayContent];
                    }
                    displayContent = this._mergeStateEvalsInArray(displayContent, evals);
                }
                return displayContent;
            }
            ;

            DendryEngine.prototype._setUpQualities = function() {
                var _Q = this._qualitiesAccessorsPrivate = {};
                var Q = this.state.qualities;
                var that = this;
                objEach(this.game.qualities, function(id, quality) {
                    var min = quality.min;
                    var max = quality.max;
                    var signal = quality.signal || that.game.qualitySignal;
                    var predicate = quality.isValid;
                    var needsAccessors = (min !== undefined || max !== undefined || signal !== undefined || predicate !== undefined);
                    if (needsAccessors) {
                        if (Q[id] !== undefined) {
                            _Q[id] = Q[id];
                        }
                        Q.__defineGetter__(id, function() {
                            return _Q[id];
                        });
                        Q.__defineSetter__(id, function(value) {
                            if (min !== undefined && value < min) {
                                value = min;
                            }
                            if (max !== undefined && value > max) {
                                value = max;
                            }
                            var was = _Q[id];
                            _Q[id] = value;

                            // Check if the new value is not allowed.
                            if (!that._runPredicate(predicate, true)) {
                                // Reverse the change.
                                _Q[id] = value = was;
                            }

                            // Signal after the change is made.
                            if (signal !== undefined && value !== was) {
                                var signalObj = {
                                    signal: signal,
                                    event: 'quality-change',
                                    id: id,
                                    now: value
                                };
                                if (was !== undefined) {
                                    signalObj.was = was;
                                }
                                that.ui.signal(signalObj);
                            }
                        });
                    }
                    if (quality.initial !== undefined && Q[id] === undefined) {
                        Q[id] = quality.initial;
                    }
                });
            }
            ;

            DendryEngine.prototype._runActions = function(actions) {
                runActions(actions, this, this.state);
            }
            ;

            DendryEngine.prototype._runPredicate = function(predicate, default_) {
                return runPredicate(predicate, default_, this, this.state);
            }
            ;

            DendryEngine.prototype._runExpression = function(expression, default_) {
                return runExpression(expression, default_, this, this.state);
            }
            ;

            DendryEngine.prototype.__changeScene = function(id) {
                if (this.state.justReturned) {
                    this.state.justReturned = false;
                }
                var scene = null;
                var restorePage = false;
                // if id is 'prevScene', go to the previous scene.
                if (id == 'prevScene') {
                    if (this.prevSceneId === null) {// this really only comes up on the very first scene of the game.
                    }
                    scene = this.game.scenes[this.state.prevSceneId];
                    id = this.state.prevSceneId;
                    assert(scene);
                } else if (id == 'prevTopScene') {
                    scene = this.game.scenes[this.state.prevTopSceneId];
                    id = this.state.prevTopSceneId;
                    assert(scene);
                } else if (id == 'jumpScene') {
                    scene = this.game.scenes[this.state.jumpSceneId];
                    id = this.state.jumpSceneId;
                    assert(scene);
                } else if (id === 'backSpecialScene') {
                    scene = this.game.scenes[this.state.prevSpecialSceneId];
                    id = this.state.prevSpecialSceneId;
                    restorePage = true;
                    assert(scene);
                    // if prevSpecialSceneId is null, this indicates that
                    // we're not within a specialScene, and we can set a jump point.
                    this.state.prevSpecialSceneId = null;
                } else {
                    scene = this.game.scenes[id];
                    assert(scene);
                }

                // Leave previous scene.
                var fromId = this.state.sceneId;
                var lastScene = this.game.scenes[fromId];
                if (!!fromId) {
                    this.state.prevSceneId = fromId;
                    if (lastScene.newPage) {
                        this.state.prevTopSceneId = fromId;
                    }
                    if (scene.isSpecial && this.state.prevSpecialSceneId === null) {
                        this.state.tempCurrentContent = this.state.currentContent.slice();
                        this.state.prevSpecialSceneId = fromId;
                    }
                    var from = this.getCurrentScene();
                    this._runActions(from.onDeparture);
                    var fromSignal = from.signal || this.game.sceneSignal;
                    if (fromSignal !== undefined) {
                        this.ui.signal({
                            signal: fromSignal,
                            event: 'scene-departure',
                            id: this.state.sceneId,
                            'to': id
                        });
                    }
                }

                // Arrive at current scene.
                this.state.sceneId = id;
                this.state.sceneIdsSinceGoTo.push(id);

                if (scene.setRoot) {
                    this.state.rootSceneId = id;
                }
                if (scene.setJump) {
                    this.state.jumpSceneId = scene.setJump;
                }

                if (scene.countVisitsMax !== undefined) {
                    if (this.state.visits[id] === undefined) {
                        this.state.visits[id] = 1;
                    } else if (this.state.visits[id] < scene.countVisitsMax) {
                        this.state.visits[id]++;
                    }
                }

                if (!restorePage && !this.state.justReturned) {
                    // If we go back from a special scene (e.g. the stats page),
                    // we probably don't want to run the scene actions again.
                    this._runActions(scene.onArrival);
                    // TODO: After running onArrival, we should run call if call has
                    if (scene.call) {
                        var callScene = this.game.scenes[scene.call];
                        this._runActions(callScene.onArrival);
                    }
                }
                var sceneSignal = scene.signal || this.game.sceneSignal;
                if (sceneSignal !== undefined) {
                    var signal = {
                        signal: sceneSignal,
                        event: 'scene-arrival',
                        id: id
                    };
                    if (!!fromId) {
                        signal.from = fromId;
                    }
                    this.ui.signal(signal);
                }

                // We're done with any code that might generate random numbers
                // (except go-to, which will recurse into this method anyway), so we
                // can store the seed which can be used to replay the behavior
                // from here.
                this.state.currentRandomState = this.random.getState();
                //if (!this.state.justReturned) {
                // if the state has just returned from a goSub, we don't display
                // the content?
                // TODO: i'm not sure what the best logic for this is...
                // Maybe the text pre-gosub should be displayed only after the goSub?
                this.displaySceneContent(restorePage);
                //}
                // display background
                if (scene.setBg) {
                    this.state.bg = scene.setBg;
                    this.ui.setBg(scene.setBg);
                }
                if (scene.setSprites) {
                    this.state.sprites = scene.setSprites;
                    this.ui.setSprites(scene.setSprites);
                }
                if (scene.audio) {
                    this.ui.audio(scene.audio);
                }
                // TODO: there has got to be a better way of doing this.
                if (scene.setTopLeftStyle) {
                    this.ui.setSpriteStyle('topLeft', scene.setTopLeftStyle);
                }
                if (scene.setTopRightStyle) {
                    this.ui.setSpriteStyle('topRight', scene.setTopRightStyle);
                }
                if (scene.setBottomLeftStyle) {
                    this.ui.setSpriteStyle('bottomLeft', scene.setBottomLeftStyle);
                }
                if (scene.setBottomRightStyle) {
                    this.ui.setSpriteStyle('bottomRight', scene.setBottomRightStyle);
                }
                // update achievement
                if (scene.achievement) {
                    this.achieve(scene.achievement);

                }

                // Check if we have any reason to leave the scene, or end the game.
                var done = false;
                if (scene.gameOver === true) {
                    done = true;
                    this.gameOver();
                } else if (scene.goSubEnd && !this.state.justReturnedEnd) {
                    // goSub
                    var validSubs = [];
                    for (var s1 = 0; s1 < scene.goSub.length; ++s1) {
                        var sub = scene.goSub[s1];
                        if (sub.predicate === undefined || this._runPredicate(sub.predicate)) {
                            validSubs.push(sub.id);
                        }
                    }
                } else if (scene.goTo) {
                    // Find all valid gotos.
                    var validGoToIds = [];
                    for (var i = 0; i < scene.goTo.length; ++i) {
                        var goTo = scene.goTo[i];
                        if (goTo.predicate === undefined || this._runPredicate(goTo.predicate)) {
                            validGoToIds.push(goTo.id);
                        }
                    }
                    if (validGoToIds.length === 1) {
                        done = true;
                        this.__changeScene(validGoToIds[0]);
                    } else if (validGoToIds.length > 1) {
                        var randomNumber = this.random.uint32();
                        var choice = randomNumber % validGoToIds.length;
                        var chosenGoToId = validGoToIds[choice];
                        done = true;
                        this.__changeScene(chosenGoToId);
                    }
                } else if (scene.goToRef) {
                    // do some gotoref
                    var validRefs = [];
                    for (var s = 0; s < scene.goToRef.length; ++s) {
                        var ref = scene.goToRef[s];
                        if (ref.predicate === undefined || this._runPredicate(ref.predicate)) {
                            validRefs.push(ref.id);
                        }
                    }
                    if (validRefs.length === 1) {
                        done = true;
                        this.__changeScene(this.state.qualities[validRefs[0]]);
                    } else if (validRefs.length > 1) {
                        var c = this.random.uint32() % validRefs.length;
                        var chosenRef = validRefs[c];
                        done = true;
                        this.__changeScene(this.state.qualities[chosenRef]);
                    }
                }

                // dendrynexus: calculate checks
                // WHAT IF scenes have gotos and checks. huh. don't do that. Let's just say that is undefined behavior.
                var hasCheck = false;
                var successProb, isSuccess;
                if (scene.checkQuality && scene.broadDifficulty && scene.checkSuccessGoTo && scene.checkFailureGoTo) {
                    var scaler = 0.6;
                    if (scene.difficultyScaler) {
                        scaler = scene.difficultyScaler;
                    }
                    successProb = calculateBroadDifficulty(this.state.qualities[scene.checkQuality] || 0, scene.broadDifficulty, scaler);
                    hasCheck = true;
                } else if (scene.checkQuality && scene.narrowDifficulty && scene.checkSuccessGoTo && scene.checkFailureGoTo) {
                    var increment = 0.1;
                    if (scene.difficultyIncrement) {
                        increment = scene.difficultyIncrement;
                    }
                    successProb = calculateNarrowDifficulty(this.state.qualities[scene.checkQuality] || 0, scene.narrowDifficulty, increment);
                    hasCheck = true;
                }
                if (hasCheck) {
                    isSuccess = rollDifficulty(successProb, this.random);
                    // logic for changing the scene on success/failure of the check
                    done = true;
                    if (isSuccess) {
                        this.__changeScene(scene.checkSuccessGoTo);
                    } else {
                        this.__changeScene(scene.checkFailureGoTo);
                    }
                }

                // If we've not ended, nor found a valid go-to, then we try choices.
                if (!done) {
                    this.choiceCache = this._compileChoices(scene);
                    if (this.choiceCache === null) {
                        // Explicitly disallowing game over keeps us stuck here.
                        if (scene.gameOver !== false) {
                            this.gameOver();
                        }
                    } else {
                        this.displayChoices();
                    }
                }
            }
            ;

            DendryEngine.prototype.achieve = function(achievementName) {
                this.state.achievements[achievementName] = 1;
                // add a special quality named 'achievement_'
                this.state.qualities['achievement_' + achievementName] = 1;
                // add a new quality indicating that the achievement has been done for the current game
                this.state.qualities['game_achievement_' + achievementName] = 1;
                // set localStorage for achievement
                if (typeof localStorage !== 'undefined') {
                    localStorage[this.game.title + '_achievements'] = JSON.stringify(this.state.achievements);
                }
            }
            ;

            DendryEngine.prototype.__getChoiceSelectionData = function(idToInfoMap) {
                var result = [];
                for (var id in idToInfoMap) {
                    var optionScene = this.game.scenes[id];
                    var optionInfo = idToInfoMap[id];

                    optionInfo.order = optionInfo.order || optionScene.order || 0;
                    optionInfo.priority = optionInfo.priority || optionScene.priority || 1;
                    // Because 'null' is a valid frequency, we can't use || to do this.
                    if (optionInfo.frequency === undefined) {
                        optionInfo.frequency = optionScene.frequency;
                        if (optionInfo.frequency === undefined) {
                            optionInfo.frequency = 100;
                        }
                    }
                    // get variable frequencies
                    if (optionScene.frequencyVar) {
                        optionInfo.frequency = this.runExpression(optionScene.frequencyVar);
                    }
                    optionInfo.selectionPriority = 0;
                    // Used by __filterByPriority

                    result.push(optionInfo);
                }
                return result;
            }
            ;

            DendryEngine.prototype.__filterViewable = function(idToInfoMap) {
                var result = {};
                for (var id in idToInfoMap) {
                    var thisScene = this.game.scenes[id];

                    // This id fails if it is past its max visits.
                    var maxVisits = thisScene.maxVisits;
                    if (maxVisits !== undefined) {
                        var visits = this.state.visits[id] || 0;
                        if (visits >= maxVisits) {
                            continue;
                        }
                    }
                    if (thisScene.maxVisitsVar !== undefined) {
                        maxVisits = this._runExpression(thisScene.maxVisitsVar);
                        var v2 = this.state.visits[id] || 0;
                        if (v2 >= maxVisits) {
                            continue;
                        }
                    }

                    // Fiter out scenes that can't be viewed.
                    var canView = this._runPredicate(thisScene.viewIf, true);
                    if (!canView) {
                        continue;
                    }

                    // It passes otherwise.
                    result[id] = idToInfoMap[id];
                }
                return result;
            }
            ;

            DendryEngine.prototype.__getChoiceIdsFromOptions = function(options) {
                var that = this;

                var choices = {};
                each(options, function(option) {
                    // Filter out options that can't be viewed.
                    if (!that._runPredicate(option.viewIf, true)) {
                        return;
                    }

                    if (option.id.substr(0, 1) === '@') {
                        // This is an id, use it.
                        var trimmedId = option.id.substring(1);
                        var choice = merge(option, {
                            id: trimmedId
                        });
                        choices[trimmedId] = choice;
                    } else {
                        assert(option.id.substr(0, 1) === '#');
                        // This is a tag, add all matching ids.
                        var ids = that.game.tagLookup[option.id.substring(1)];
                        objEach(ids, function(id) {
                            if (choices[id] === undefined) {
                                choices[id] = merge(option, {
                                    id: id
                                });
                            }
                        });
                    }
                });
                return choices;
            }
            ;

            // Code based on Undum (MIT License). See CREDITS.
            DendryEngine.prototype.__filterByPriority = function(choices, minChoices, maxChoices) {
                assert(minChoices === null || maxChoices === null || maxChoices >= minChoices);
                var that = this;

                var committed = [];
                var candidates = [];
                var choice;

                // Work in descending priority order.
                choices.sort(function(a, b) {
                    return b.priority - a.priority;
                });

                // First phase: we make sure we have at least our minimum number
                // of choices, and that we consider the minimum possible number of
                // priorities to reach that minimum.
                var lastPriority;
                for (var i = 0; i < choices.length; ++i) {
                    choice = choices[i];
                    if (choice.priority !== lastPriority) {
                        if (lastPriority !== undefined) {
                            // Priority has decreased, use the candidates if there are enough.
                            if (minChoices === null || i >= minChoices) {
                                break;
                            }
                        }

                        // We're going on, so commit our current candidates.
                        committed.push.apply(committed, candidates);
                        candidates = [];
                        lastPriority = choice.priority;
                    }
                    candidates.push(choice);
                }

                // Second phase: we commit as many candidates as we can without
                // exceeding our maximum.
                // TODO: think about tag choices vs builtin choices
                var committedChoices = committed.length;
                var totalChoices = committedChoices + candidates.length;
                if (maxChoices === null || maxChoices >= totalChoices) {
                    // We can use all the candidates without exceeding our maximum.
                    committed.push.apply(committed, candidates);
                } else {
                    // Take a subset of the candidates, using their relative frequency.
                    each(candidates, function(choice) {
                        if (choice.frequency === null) {
                            choice.selectionPriority = 0;
                            // Always choose.
                        } else {
                            choice.selectionPriority = that.random.random() / choice.frequency;
                        }
                    });
                    candidates.sort(function(a, b) {
                        return a.selectionPriority - b.selectionPriority;
                    });
                    var extraChoices = maxChoices - committedChoices;
                    var chosen = candidates.slice(0, extraChoices);
                    committed.push.apply(committed, chosen);
                }

                return committed;
            }
            ;

            DendryEngine.prototype.__getChoiceDisplayData = function(choicesSelected) {
                var choiceOutput = [];
                var numChoosable = 0;

                for (var i = 0; i < choicesSelected.length; ++i) {
                    var choice = choicesSelected[i];
                    var choiceScene = this.game.scenes[choice.id];

                    // Figure out if this choice can be chosen.
                    var canChoose = true;
                    if (choice.chooseIf) {
                        canChoose = this._runPredicate(choice.chooseIf, true);
                    }
                    if (canChoose && choiceScene.chooseIf) {
                        canChoose = this._runPredicate(choiceScene.chooseIf, true);
                    }

                    var title = choice.title || choiceScene.title;
                    assert(title);

                    var subtitle = null;
                    if (!canChoose) {
                        subtitle = choice.unavailableSubtitle || choiceScene.unavailableSubtitle;
                    }
                    if (!subtitle) {
                        subtitle = choice.subtitle || choiceScene.subtitle;
                    }

                    var finalChoice = {
                        id: choice.id,
                        canChoose: canChoose,
                        title: this._makeDisplayContent(title, false)
                    };
                    if (subtitle) {
                        finalChoice.subtitle = this._makeDisplayContent(subtitle, false);
                    }
                    // dendrynexus - add success/failure probabilities, and challenges.
                    var successProb;
                    if (choiceScene.checkQuality && choiceScene.broadDifficulty && choiceScene.checkSuccessGoTo && choiceScene.checkFailureGoTo) {
                        var scaler = 0.6;
                        if (choiceScene.difficultyScaler) {
                            scaler = choiceScene.difficultyScaler;
                        }
                        successProb = calculateBroadDifficulty(this.state.qualities[choiceScene.checkQuality] || 0, choiceScene.broadDifficulty, scaler);
                        finalChoice.checkQuality = choiceScene.checkQuality;
                        finalChoice.successProb = successProb;
                        finalChoice.difficulty = displayDifficulty(successProb);
                    } else if (choiceScene.checkQuality && choiceScene.narrowDifficulty && choiceScene.checkSuccessGoTo && choiceScene.checkFailureGoTo) {
                        var increment = 0.1;
                        if (choiceScene.difficultyIncrement) {
                            increment = choiceScene.difficultyIncrement;
                        }
                        successProb = calculateNarrowDifficulty(this.state.qualities[choiceScene.checkQuality] || 0, choiceScene.narrowDifficulty, increment);
                        finalChoice.checkQuality = choiceScene.checkQuality;
                        finalChoice.successProb = successProb;
                        finalChoice.difficulty = displayDifficulty(successProb);
                    }

                    choiceOutput.push(finalChoice);
                    if (canChoose) {
                        ++numChoosable;
                    }
                }

                return {
                    choices: choiceOutput,
                    numChoosable: numChoosable
                };
            }
            ;

            DendryEngine.prototype._compileChoices = function(scene) {
                assert(scene);

                var options = scene.options;
                var choiceOutput = [];
                var numChoosable = 0;
                if (options !== undefined) {

                    var choiceIds = this.__getChoiceIdsFromOptions(options);
                    choiceIds = this.__filterViewable(choiceIds);

                    var validChoiceData = this.__getChoiceSelectionData(choiceIds);
                    var minChoices = scene.minChoices || null;
                    var maxChoices = scene.maxChoices || null;
                    validChoiceData = this.__filterByPriority(validChoiceData, minChoices, maxChoices);

                    // Sort the result into display order.
                    validChoiceData.sort(function(a, b) {
                        return a.order - b.order;
                    });

                    // Now we've chosen our selection, get the final displayable data.
                    var data = this.__getChoiceDisplayData(validChoiceData);
                    choiceOutput = data.choices;
                    numChoosable = data.numChoosable;
                }

                if (numChoosable === 0) {
                    // We have no choosable options, so add the default option (NB:
                    // this may take us over the max-choices limit).
                    var root = this.state.rootSceneId;
                    if (root !== this.state.sceneId) {
                        var rootSceneChoose = this.game.scenes[root].chooseIf;
                        if (!rootSceneChoose || this._runPredicate(rootSceneChoose, true)) {
                            choiceOutput.push({
                                id: root,
                                title: 'Continue...',
                                canChoose: true
                            });
                            ++numChoosable;
                        }
                    }
                }
                if (numChoosable > 0) {
                    return choiceOutput;
                } else {
                    return null;
                }
            }
            ;

            // dendrynexus - this returns a single available card from the given deck, formatted as an object of the type {id: id, title: title}
            DendryEngine.prototype._drawFromDeck = function(deckId) {
                var scene = this.game.scenes[deckId];
                var viewableScenes = this._compileChoices(scene);
                if (!viewableScenes) {
                    return null;
                }
                var choosableScenes = [];
                var currentHand = this.state.currentHands[this.state.sceneId];
                if (!currentHand) {
                    currentHand = [];
                }
                currentHand = currentHand.map( (x) => x.id);
                for (var x of viewableScenes) {
                    var choiceScene = this.game.scenes[x.id];
                    // filter for whether the card is in the hand
                    if (x.canChoose && choiceScene.isCard && currentHand.indexOf(x.id) < 0) {
                        choosableScenes.push(x);
                    }
                }
                if (!choosableScenes) {
                    return null;
                }
                var randomNumber = this.random.uint32();
                var choice = randomNumber % choosableScenes.length;
                // this.state.currentRandomState = this.random.getState();
                return choosableScenes[choice];
            }
            ;

            // ------------------------------------------------------------------------

            // Marsaglia, George (July 2003). 'Xorshift RNGs'.
            // Journal of Statistical Software 8 (14).
            var Random = function(v, w, x, y, z) {
                this.getState = function() {
                    return [v, w, x, y, z];
                }
                ;
                var uint32Multiply = function(a, b) {
                    var aHigh = (a >> 16) & 0xffff;
                    var aLow = a & 0xffff;
                    var bHigh = (b >> 16) & 0xffff;
                    var bLow = b & 0xffff;
                    var prodHigh = ((aHigh * bLow) + (aLow * bHigh)) & 0xffff;
                    return ((prodHigh << 16) >>> 0) + (aLow * bLow);
                };
                this.uint32 = function() {
                    var t = (x ^ (x >>> 7)) >>> 0;
                    x = y;
                    y = z;
                    z = w;
                    w = v;
                    v = (v ^ (v << 6)) ^ (t ^ (t << 13)) >>> 0;
                    return uint32Multiply((y + y + 1), v) >>> 0;
                }
                ;
                this.random = function() {
                    return this.uint32() * 2.3283064365386963e-10;
                }
                ;
            };

            var __next = 1;
            Random.fromUnique = function() {
                var seed = new Date().getTime();
                return Random.fromSeeds([seed, __next++]);
            }
            ;

            Random.fromTime = function() {
                return Random.fromSeeds([new Date().getTime()]);
            }
            ;

            Random.fromSeeds = function(seeds) {
                var v = 886756453;
                var w = 88675123;
                var x = 123456789;
                var y = 362436069;
                var z = 521288629;

                // The seed hashing function is based on Mash 0.9 (MIT License).
                // See CREDITS.
                var hashSeed = function(data) {
                    data = data.toString();
                    var n = 0xefc8249d;
                    for (var i = 0; i < data.length; i++) {
                        n += data.charCodeAt(i);
                        var h = 0.02519603282416938 * n;
                        n = h >>> 0;
                        h -= n;
                        h *= n;
                        n = h >>> 0;
                        h -= n;
                        n += h * 0x100000000;
                    }
                    return (n >>> 0) * 2.3283064365386963e-10;
                };

                for (var i = 0; i < seeds.length; i++) {
                    var hashedSeed = hashSeed(seeds[i]) * 0x100000000;
                    v ^= hashedSeed;
                    w ^= hashedSeed;
                    x ^= hashedSeed;
                    y ^= hashedSeed;
                    z ^= hashedSeed;
                }
                return new Random(v,w,x,y,z);
            }
            ;

            Random.fromState = function(state) {
                return new Random(state[0],state[1],state[2],state[3],state[4]);
            }
            ;

            // ------------------------------------------------------------------------

            module.exports = {
                makeFunctionFromSource: makeFunctionFromSource,
                runActions: runActions,
                runPredicate: runPredicate,
                runExpression: runExpression,
                convertJSONToGame: convertJSONToGame,
                simpleContent: simpleContent,

                getCardinalNumber: getCardinalNumber,
                getOrdinalNumber: getOrdinalNumber,
                getUserQDisplay: getUserQDisplay,
                getFudgeDisplay: getFudgeDisplay,

                DendryEngine: DendryEngine,
                UserInterface: UserInterface,
                NullUserInterface: UserInterface,

                Random: Random
            };
        }());

    }
    , {}],
    2: [function(require, module, exports) {
        /* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
        /*jshint indent:2 */
        (function($) {
            'use strict';

            var contentToHTML = require('./content/html');
            var engine = require('../engine');

            var BrowserUserInterface = function(game, $content) {
                this.game = game;
                this.$content = $content;
                this._registerEvents();

                this.dendryEngine = new engine.DendryEngine(this,game);
                // TODO: refactor how the settings work - move it all within a single object
                this.base_settings = {
                    'disable_bg': false,
                    'animate': false,
                    'animate_bg': true,
                    'disable_audio': false,
                    'show_portraits': true
                };
                this.disable_bg = false;
                this.animate = false;
                this.animate_bg = true;
                this.disable_audio = false;
                // backgrounds and portraits are 100% optional, and most games will not use them.
                this.show_portraits = true;
                this.fade_time = 600;
                this.bg_fade_out_time = 200;
                this.bg_fade_in_time = 1000;
                this.sound_fade_time = 2000;
                this.contentToHTML = contentToHTML;

                // sprites
                this.spriteLocs = {
                    'topLeft': 1,
                    'topRight': 1,
                    'bottomLeft': 1,
                    'bottomRight': 1
                };
                // current HTMLAudioElement
                this.currentAudio = null;
                // current audio url
                this.currentAudioURL = '';
                this.audioQueue = [];
                // playlist is used for shuffling...
                this.audioPlaylist = [];
                // flag for determining if we're on a new page, up until the first choice.
                this.onNewPage = false;

                // for saving
                this.save_prefix = game.title + '_' + game.author + '_save';
                this.max_slots = 8;
                // max save slots
                this.DateOptions = {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                };
            };
            engine.UserInterface.makeParentOf(BrowserUserInterface);

            // ------------------------------------------------------------------------
            // Main API

            //load a game as a json file from a url, and then run the game...
            BrowserUserInterface.prototype.loadGame = function(url) {
                var that = this;
                if (!url.endsWith('.json')) {
                    if (url.endsWith('/')) {
                        url = url + 'game.json';
                    } else {
                        url = url + '/game.json';
                    }
                }
                fetch(url).then(response => response.text()).then(json => {
                    game = engine.convertJSONToGame(json, function(err, game) {
                        if (err) {
                            throw err;
                        }
                        return game;
                    });
                    that.game = game;
                    that.dendryEngine = new engine.DendryEngine(that,game);
                    that.dendryEngine.beginGame();
                }
                ).catch(err => console.log(err));
            }
            ;

            BrowserUserInterface.prototype.displayContent = function(paragraphs, faceImage) {
                var $html = $(contentToHTML.convert(paragraphs));
                // TODO: maybe face image visibility should be controlled by a different setting?
                var hasImage = false;
                if (faceImage && this.show_portraits && !this.disable_bg) {
                    hasImage = true;
                    // convert faceImage into an html object
                    console.log(faceImage);
                    //var cardEl = $('<div>').addClass('face-figure');
                    var cardEl = document.createElement('div');
                    cardEl.className = "face-figure";
                    //var $image = $('<img>').addClass('face-img').attr({src : faceImage});
                    var image = new Image();
                    image.className = "face-img";
                    cardEl.appendChild(image);
                    $html.splice(1, 0, cardEl);
                    image.src = faceImage;
                    /*
        if (!this.animate) {
            var that = this;
            image.onload = function() {
                that.$content.append($html);
                console.log('image loaded');
            };
            image.src = faceImage;
        }
        */
                }
                if (this.animate) {
                    $html.fadeIn(this.fade_time);
                    this.$content.append($html);
                } else {
                    if (!hasImage) {
                        this.$content.append($html);
                    } else {
                        this.$content.append($html);
                    }
                }
                $html.focus();
                // allow user to add custom stuff on display content (for sidebar in this case)
                if (window && window.onDisplayContent) {
                    window.onDisplayContent();
                }
            }
            ;

            BrowserUserInterface.prototype.displayGameOver = function() {
                var $p = $('<p>').text(this.getGameOverMsg()).addClass('game-over');
                if (this.animate) {
                    $p.fadeIn(this.fade_time);
                    this.$content.append($p);
                } else {
                    this.$content.append($p);
                }
                $p.focus();
            }
            ;

            BrowserUserInterface.prototype.displayChoices = function(choices) {
                var $ul = $('<ul>').addClass('choices');
                for (var i = 0; i < choices.length; ++i) {
                    var choice = choices[i];

                    var title = contentToHTML.convertLine(choice.title);
                    var subtitle = "";
                    if (choice.subtitle !== undefined) {
                        subtitle = contentToHTML.convertLine(choice.subtitle);
                    }

                    var $li = $('<li>');
                    var $titleHolder = $li;
                    if (choice.canChoose) {
                        $titleHolder = $('<a>').attr({
                            href: '#',
                            'data-choice': i
                        });
                        $li.html($titleHolder);
                    } else {
                        $titleHolder.addClass('unavailable');
                    }
                    $titleHolder.html(title);
                    if (choice.checkQuality && choice.difficulty && choice.successProb !== undefined) {
                        if (subtitle) {
                            subtitle += '<br>';
                        }
                        subtitle += 'Check: ' + choice.checkQuality + '<br>';
                        subtitle += 'Difficulty: ' + choice.difficulty + ' (' + Math.floor(choice.successProb * 100) + '%)';
                    }
                    if (subtitle) {
                        $li.append($('<div>').addClass('subtitle').html(subtitle));
                    }

                    $ul.append($li);
                }
                if (this.animate) {
                    $ul.fadeIn(this.fade_time);
                    this.$content.append($ul);
                } else {
                    this.$content.append($ul);
                }
                $ul.focus();
                if (this.onNewPage) {
                    this.onNewPage = false;
                    if (window && window.onNewPage) {
                        window.onNewPage();
                    }
                }
            }
            ;

            BrowserUserInterface.prototype.newPage = function() {
                if (this.animate) {
                    var $content = this.$content;
                    this.$content.empty();
                    this.$content.children().fadeOut(this.fade_time, function() {});
                } else {
                    this.$content.empty();
                }
                this.onNewPage = true;

            }
            ;

            BrowserUserInterface.prototype.setStyle = function(style) {
                this.$content.removeClass();
                if (style !== undefined) {
                    this.$content.addClass(style);
                }
            }
            ;

            BrowserUserInterface.prototype.removeChoices = function() {
                $('.choices', this.$content).remove();
                $('.hidden', this.$content).remove();
            }
            ;

            BrowserUserInterface.prototype.beginOutput = function() {
                $("#read-marker", this.$content).remove();
                this.$content.append($('<hr>').attr('id', 'read-marker'));
            }
            ;

            BrowserUserInterface.prototype.endOutput = function() {
                var $marker = $("#read-marker");
                if (this.animate) {
                    if ($marker.length > 0) {
                        $('html, body').animate({
                            scrollTop: $marker.offset().top
                        }, this.fade_time);
                    } else {
                        $('html, body').animate({
                            scrollTop: 0
                        }, this.fade_time);
                    }
                }
            }
            ;

            BrowserUserInterface.prototype.signal = function(data) {
                // TODO: implement signals - signals contain signal, event, and id
                console.log(data);
                var signal = data.signal;
                var event = data.event;
                // scene-arrival, scene-display, scene-departure, quality-change
                var scene_id = data.id;
                // TODO: handle this in the game.js for each specific game
                if (window && window.handleSignal) {
                    window.handleSignal(signal, event, scene_id);
                }
            }
            ;

            // dendrynexus displays
            // displays the hand.
            BrowserUserInterface.prototype.displayHand = function(hand, maxCards) {
                if (window && window.displayHand) {
                    window.displayHand(hand, maxCards);
                    return null;
                }
                var handDescription = 'Hand - click a card to play.';
                if (window.handDescription) {
                    handDescription = window.handDescription;
                }
                if (this.dendryEngine.state.qualities.handDescription) {
                    handDescription = this.dendryEngine.state.qualities.handDescription;
                }
                var $handEl = $('.hand');
                var hasOldHand = false;
                if ($handEl.length == 0) {
                    $handEl = $('<ul>').addClass('hand');
                    this.$content.append($('<hr>'));
                    this.$content.append($('<p>').addClass('hand-description').text(handDescription));
                } else {
                    $handEl.empty();
                    hasOldHand = true;
                }
                // display the hand
                for (var i = 0; i < maxCards; i++) {
                    var $cardEl = $('<li>').addClass('card-in-hand');
                    if (hand[i]) {
                        var card = hand[i];
                        // create an <a> element, with an image nested inside.
                        var $cardLink = $('<a>').addClass('card').attr({
                            href: '#',
                            'card-id': card.id,
                            title: card.title
                        });
                        var $title = $('<span>').addClass('card-caption').text(card.title);
                        // if there is an image, set the image; otherwise, set image to a gradient?
                        if (card.image) {
                            var $cardImage = $('<img>').addClass('card-img').attr({
                                src: card.image
                            });
                            $cardLink.append($cardImage);
                        } else {}
                        if (card.subtitle) {
                            var $cardSubtitle = $('<span>').addClass('card-tooltip').text(card.subtitle);
                            $cardLink.append($cardSubtitle);
                        }
                        $cardEl.append($cardLink);
                        $cardEl.append($title);
                        $handEl.append($cardEl);
                    } else {
                        var $blankCardDiv = $('<div>').addClass('blank-card');
                        $cardEl.append($blankCardDiv);
                    }
                    $handEl.append($cardEl);
                }
                if (!hasOldHand) {
                    this.$content.append($handEl);
                }
            }
            ;

            BrowserUserInterface.prototype.displayDecks = function(decks) {
                if (window && window.displayDecks) {
                    window.displayDecks(decks);
                    return null;
                }
                var deckDescription = 'Decks - click a deck to draw a card.';
                if (window.deckDescription) {
                    deckDescription = window.deckDescription;
                }
                if (this.dendryEngine.state.qualities.deckDescription) {
                    deckDescription = this.dendryEngine.state.qualities.deckDescription;
                }
                this.$content.append($('<hr>'));
                this.$content.append($('<p>').addClass('deck-description').text(deckDescription));
                var $decksEl = $('<ul>').addClass('decks');
                for (var deck of decks) {
                    var $deckEl = $('<li>').addClass('deck');
                    // create an <a> element, with an image nested inside.
                    var $deckLink = $('<a>').addClass('card').attr({
                        href: '#',
                        'card-id': deck.id,
                        title: deck.title
                    });
                    var $title = $('<span>').addClass('card-caption').text(deck.title);
                    // if there is an image, set the image; otherwise, set image to a gradient?
                    if (deck.image) {
                        var $deckImage = $('<img>').addClass('card-img').attr({
                            src: deck.image
                        });
                        $deckLink.append($deckImage);
                    } else {// TODO: set alternative background for $deckLink to a gradient
                    }
                    if (deck.subtitle) {
                        // if there's a subtitle, create a tooltip
                        var $deckSubtitle = $('<span>').addClass('card-tooltip').text(deck.subtitle);
                        $deckLink.append($deckSubtitle);
                    }
                    if (!deck.canChoose) {
                        $deckEl = $deckEl.addClass('unavailable-card');
                    }
                    $deckEl.append($deckLink);
                    $deckEl.append($title);
                    $decksEl.append($deckEl);
                }
                this.$content.append($decksEl);
            }
            ;

            // displays pinned cards for dendrynexus
            BrowserUserInterface.prototype.displayPinnedCards = function(cards) {
                if (cards.length == 0) {
                    return null;
                }
                if (window && window.displayPinnedCards) {
                    window.displayPinnedCards(cards);
                    return null;
                }
                var pinnedCardsDescription = 'Pinned cards - click a card to play.';
                if (window.pinnedCardsDescription) {
                    pinnedCardsDescription = window.pinnedCardsDescription;
                }
                if (this.dendryEngine.state.qualities.pinnedCardsDescription) {
                    pinnedCardsDescription = this.dendryEngine.state.qualities.pinnedCardsDescription;
                }
                this.$content.append($('<hr>'));
                this.$content.append($('<p>').addClass('pinned-text-description').text(pinnedCardsDescription));
                var $cardsEl = $('<ul>').addClass('pinned-cards');
                for (var card of cards) {
                    var $cardEl = $('<li>').addClass('pinned-card');
                    // create an <a> element, with an image nested inside.
                    var $cardLink = $('<a>').addClass('card').attr({
                        href: '#',
                        'card-id': card.id,
                        title: card.title
                    });
                    var $title = $('<span>').addClass('card-caption').text(card.title);
                    // if there is an image, set the image; otherwise, set image to a gradient?
                    if (card.image) {
                        var $cardImage = $('<img>').addClass('card-img').attr({
                            src: card.image
                        });
                        $cardLink.append($cardImage);
                    } else {}
                    if (card.subtitle) {
                        var $cardSubtitle = $('<span>').addClass('card-tooltip').text(card.subtitle);
                        $cardLink.append($cardSubtitle);
                    }
                    $cardEl.append($cardLink);
                    $cardEl.append($title);
                    $cardsEl.append($cardEl);
                }
                this.$content.append($cardsEl);
            }
            ;

            // visual extensions

            BrowserUserInterface.prototype.setBg = function(image_url) {
                if (this.disable_bg) {
                    $('#bg1').addClass('content_hidden');
                    $('#bg1').removeClass('content_visible');
                    $('#bg1').css('background-image', 'none');
                } else if (!image_url || image_url == 'none' || image_url == 'null') {
                    if (this.animate_bg) {
                        $('#bg1').addClass('content_hidden');
                        $('#bg1').removeClass('content_visible');
                        setTimeout(function() {
                            $('#bg1').css('background-image', 'none');
                            $('#bg1').removeClass('content_hidden');
                            $('#bg1').addClass('content_visible');
                        }, 100);
                    } else {
                        $('#bg1').css('background-image', 'none');
                    }
                } else if (image_url.startsWith('#') || image_url.startsWith('rgba(') || image_url.startsWith('rgb(')) {
                    if (this.animate_bg) {
                        $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                            $('#bg1').css('background-image', 'none');
                            $('#bg1').css('background-color', image_url);
                        });
                        $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                            $('#bg2').css('background-image', 'none');
                        });
                        console.log('changing background color ' + image_url);
                    } else {
                        $('#bg1').css('background-image', 'none');
                        $('#bg1').css('bacground-color', image_url);
                    }
                } else if (image_url.startsWith('linear-gradient(')) {
                    if (this.animate_bg) {
                        $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                            $('#bg1').css('background-image', image_url);
                        });
                        $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                            $('#bg2').css('background-image', image_url);
                        });
                        console.log('changing background gradient ' + image_url);
                    } else {
                        $('#bg1').css('background-image', image_url);
                    }
                } else {
                    if (this.animate_bg) {
                        $('#bg1').fadeOut(this.bg_fade_out_time, function() {
                            $('#bg1').css('background-image', 'url("' + image_url + '")');
                        });
                        $('#bg1').fadeIn(this.bg_fade_in_time, function() {
                            $('#bg2').css('background-image', $('#bg1').css('background-image'));
                        });
                    } else {
                        $('#bg1').css('background-image', 'url("' + image_url + '")');
                    }
                }
            }
            ;

            // set sprites given data
            // data is a list of two-element lists, where the first element is location
            // (one of topLeft, topRight, bottomLeft, bottomRight)
            // and the second element is the sprite.
            BrowserUserInterface.prototype.setSprites = function(data) {
                if (window && window.setSprites) {
                    window.setSprites(data);
                    return;
                }
                if (!this.show_portraits || data == 'none' || data == 'clear') {
                    $('#topLeftSprite').children().fadeOut(this.fade_time, function() {
                        $('#topLeftSprite').empty();
                    });
                    $('#topRightSprite').children().fadeOut(this.fade_time, function() {
                        $('#topRightSprite').empty();
                    });
                    $('#bottomLeftSprite').children().fadeOut(this.fade_time, function() {
                        $('#bottomLeftSprite').empty();
                    });
                    $('#bottomRightSprite').children().fadeOut(this.fade_time, function() {
                        $('#bottomRightSprite').empty();
                    });
                    return;
                } else {
                    if (data instanceof Array) {
                        for (var i = 0; i < data.length; i++) {
                            var loc = data[i][0];
                            var img = data[i][1];
                            this.setSprite(loc, img);
                        }
                    } else if (data) {
                        for (var key in Object.keys(data)) {
                            sprites.push([key, data[key]]);
                        }
                    }
                }
            }
            ;

            BrowserUserInterface.prototype.setSprite = function(loc, img) {
                if (!this.show_portraits) {
                    return;
                }
                if (window && window.setSprite) {
                    window.setSprite(loc, img);
                    return;
                }
                loc = loc.toLowerCase();
                var targetSprite;
                if (loc == 'topleft') {
                    targetSprite = $('#topLeftSprite');
                } else if (loc == 'topright') {
                    targetSprite = $('#topRightSprite');
                } else if (loc == 'bottomleft') {
                    targetSprite = $('#bottomLeftSprite');
                } else if (loc == 'bottomright') {
                    targetSprite = $('#bottomRightSprite');
                }
                //targetSprite.empty();
                if (img == 'none' || img == 'clear') {
                    delete this.dendryEngine.state.sprites[loc];
                    targetSprite.fadeOut(this.fade_time, function() {
                        targetSprite.empty();
                    });
                    return;
                } else {
                    this.dendryEngine.state.sprites[loc] = img;
                    targetSprite.fadeOut(this.fade_time, function() {
                        targetSprite.emtpy();
                        var image = new Image();
                        image.src = img;
                        targetSprite.append(image);
                        console.log('fadeIn');
                        targetSprite.fadeIn(this.fade_time);
                    });
                }
            }
            ;

            BrowserUserInterface.prototype.setSpriteStyle = function(loc, style) {
                if (window && window.setSpriteStyle) {
                    window.setSpriteStyle(loc, style);
                    return;
                }
                var targetSprite;
                if (loc == 'topleft') {
                    targetSprite = $('#topLeftSprite');
                } else if (loc == 'topright') {
                    targetSprite = $('#topRightSprite');
                } else if (loc == 'bottomleft') {
                    targetSprite = $('#bottomLeftSprite');
                } else if (loc == 'bottomright') {
                    targetSprite = $('#bottomRightSprite');
                } else {
                    return;
                }
                targetSprite.css(style);
            }
            ;

            // play audio with js
            // audio is a space-separated string with at least one entry.
            // the first entry will be a file url.
            // the second-nth entries are words describing how the file will be played:
            // 'queue' for playing the music next after the current audio ends
            // 'loop' if this music will loop indefinitely.
            // 'nofade' if the sound will be played instantly without a fadein or fadeout.
            // TODO: have a list of audio files...
            BrowserUserInterface.prototype.audio = function(audio) {
                if (this.disable_audio) {
                    if (this.currentAudio) {
                        this.currentAudio.pause();
                        this.currentAudio.loop = false;
                    }
                    return;
                }
                var audioData = audio.split(' ');
                var audioFiles = [];
                var isLoop = false;
                var isQueue = false;
                var noFade = false;
                var isShuffle = false;
                var isClear = false;
                for (var name of audioData) {
                    if (name == 'loop') {
                        isLoop = true;
                    } else if (name == 'queue') {
                        isQueue = true;
                    } else if (name == 'nofade') {
                        noFade = true;
                    } else if (name == 'shuffle') {
                        isShuffle = true;
                    } else if (name == 'clear') {
                        isClear = true;
                    } else {
                        audioFiles.push(name);
                    }
                }
                if (isClear) {
                    this.audioPlaylist = [];
                }
                if (audioFiles.length >= 1 || isShuffle) {
                    this.audioPlaylist = this.audioPlaylist.concat(audioFiles);
                }
                var audioFile = audioFiles[0];
                var currentAudio = this.currentAudio;
                var fadeTime = this.sound_fade_time;
                var loopCurrent = false;
                var playlist = this.audioPlaylist;
                // stop playing
                if (audioFile == 'null' || audioFile == 'none') {
                    if (this.currentAudio) {
                        $(currentAudio).animate({
                            volume: 0
                        }, this.sound_fade_time, function() {
                            currentAudio.pause();
                        });
                        this.currentAudio.loop = false;
                    }
                } else {
                    // fadeout current audio, then fade-in new audio
                    console.log('new audio:', audioFile, 'current audio:', this.currentAudioURL);
                    if (this.currentAudio && (this.currentAudioURL == audioFile || isQueue || isShuffle)) {
                        if (!currentAudio.ended && !currentAudio.paused) {
                            console.log('adding music to queue');
                            this.audioQueue.push(audioFile);
                            var audioQueue = this.audioQueue;
                            this.currentAudio.onended = function() {
                                var newAudio;
                                if (isQueue) {
                                    newAudio = audioQueue.pop();
                                    console.log('playing from queue');
                                } else if (isShuffle) {
                                    var index = Math.floor(Math.random() * playlist.length);
                                    newAudio = playlist[index];
                                    console.log('playing from playlist');
                                }
                                if (newAudio) {
                                    currentAudio.src = newAudio;
                                    console.log('Now playing', newAudio);
                                    currentAudio.play();
                                    $(currentAudio).animate({
                                        volume: 1
                                    }, fadeTime);
                                    window.dendryUI.currentAudioURL = newAudio;
                                }
                            }
                            ;
                        } else {
                            this.currentAudioURL = audioFile;
                            currentAudio.src = audioFile;
                            console.log('Fading in new audio');
                            currentAudio.volume = 0;
                            currentAudio.play();
                            $(currentAudio).animate({
                                volume: 1
                            }, fadeTime);
                            this.currentAudio.onended = function() {
                                var newAudio;
                                if (isQueue) {
                                    newAudio = audioQueue.pop();
                                    console.log('playing from queue');
                                } else if (isShuffle) {
                                    var index = Math.floor(Math.random() * playlist.length);
                                    newAudio = playlist[index];
                                    console.log('playing from playlist');
                                }
                                if (newAudio) {
                                    currentAudio.src = newAudio;
                                    console.log('Now playing', newAudio);
                                    currentAudio.play();
                                    $(currentAudio).animate({
                                        volume: 1
                                    }, fadeTime);
                                    window.dendryUI.currentAudioURL = newAudio;
                                }
                            }
                            ;
                        }
                    } else if (this.currentAudio) {
                        // not queue or shuffle, so we stop playing the current audio.
                        this.currentAudioURL = audioFile;
                        console.log('currentAudio present,  fading out current audio');
                        // reset the current audio function
                        currentAudio.onended = function() {}
                        ;
                        if (noFade) {
                            currentAudio.pause();
                            currentAudio.src = audioFile;
                            currentAudio.play();
                        } else {
                            $(currentAudio).animate({
                                volume: 0
                            }, this.sound_fade_time, function() {
                                console.log(currentAudio);
                                currentAudio.src = audioFile;
                                console.log('Fading in new audio');
                                currentAudio.play();
                                $(currentAudio).animate({
                                    volume: 1
                                }, fadeTime);
                            });
                        }
                    } else if (!this.currentAudio) {
                        this.currentAudio = new Audio(audioFile);
                        this.currentAudio.volume = 0;
                        this.currentAudio.play();
                        $(this.currentAudio).animate({
                            volume: 1
                        }, this.sound_fade_time);
                        currentAudio = this.currentAudio;
                        if (isShuffle) {
                            this.currentAudio.onended = function() {
                                var index = Math.floor(Math.random() * playlist.length);
                                var newAudio = playlist[index];
                                if (newAudio) {
                                    currentAudio.src = newAudio;
                                    console.log('playing from shuffle');
                                    console.log('Now playing', newAudio);
                                    currentAudio.play();
                                    $(currentAudio).animate({
                                        volume: 1
                                    }, fadeTime);
                                    // asdkfl;;sajd;lkjafdsdsaf;kjldjsfa;kl
                                    window.dendryUI.currentAudioURL = newAudio;
                                }
                            }
                            ;
                        }
                    }
                    if (isLoop) {
                        this.currentAudio.loop = true;
                    } else {
                        this.currentAudio.loop = false;
                    }
                    // https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
                }
            }
            ;

            BrowserUserInterface.prototype.saveSettings = function() {
                if (typeof localStorage !== 'undefined') {
                    localStorage[this.game.title + '_animate'] = this.animate;
                    localStorage[this.game.title + '_disable_bg'] = this.disable_bg;
                    localStorage[this.game.title + '_animate_bg'] = this.animate_bg;
                    localStorage[this.game.title + '_show_portraits'] = this.show_portraits;
                    localStorage[this.game.title + '_disable_audio'] = this.disable_audio;
                }
            }
            ;

            // TODO: this could be much cleaner...
            BrowserUserInterface.prototype.loadSettings = function(defaultSettings) {
                var defaults = {
                    animate: false,
                    disable_bg: false,
                    animate_bg: true,
                    show_portraits: true,
                    disable_audio: false
                };
                if (typeof localStorage !== 'undefined') {
                    for (var prop in defaults) {
                        if (defaults.hasOwnProperty(prop)) {
                            var lsKey = this.game.title + '_' + prop;
                            if (lsKey in localStorage) {
                                this[prop] = localStorage[lsKey] != 'false';
                            } else {
                                if (defaultSettings && defaultSettings.hasOwnProperty(prop)) {
                                    this[prop] = defaultSettings[prop];
                                } else {
                                    this[prop] = defaults[prop];
                                }
                            }
                        }
                    }
                }
            }
            ;

            BrowserUserInterface.prototype.toggle_audio = function(enable_audio) {
                if (enable_audio) {
                    this.disable_audio = false;
                    if (this.currentAudio) {
                        this.currentAudio.play();
                    }
                } else {
                    if (this.currentAudio) {
                        this.currentAudio.pause();
                        this.currentAudio.loop = false;
                    }
                    this.disable_audio = true;
                }
            }
            ;

            // save functions
            BrowserUserInterface.prototype.autosave = function() {
                var oldData = localStorage[this.save_prefix + '_a0'];
                if (oldData) {
                    localStorage[this.save_prefix + '_a1'] = oldData;
                    localStorage[this.save_prefix + '_timestamp_a1'] = localStorage[this.save_prefix + '_timestamp_a0'];
                }
                var slot = 'a0';
                var saveString = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + '_' + slot] = saveString;
                var scene = this.dendryEngine.state.sceneId;
                var date = new Date(Date.now());
                date = scene + '\n(' + date.toLocaleString(undefined, this.DateOptions) + ')';
                localStorage[this.save_prefix + '_timestamp_' + slot] = date;
                this.populateSaveSlots(slot + 1, 2);
            }
            ;

            BrowserUserInterface.prototype.quickSave = function() {
                var saveString = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + '_q'] = saveString;
                window.alert('Saved.');
            }
            ;

            BrowserUserInterface.prototype.saveSlot = function(slot) {
                var saveString = JSON.stringify(this.dendryEngine.getExportableState());
                localStorage[this.save_prefix + '_' + slot] = saveString;
                var scene = this.dendryEngine.state.sceneId;
                var date = new Date(Date.now());
                date = scene + '\n(' + date.toLocaleString(undefined, this.DateOptions) + ')';
                localStorage[this.save_prefix + '_timestamp_' + slot] = date;
                this.populateSaveSlots(slot + 1, 2);
            }
            ;

            BrowserUserInterface.prototype.quickLoad = function() {
                if (localStorage[this.save_prefix + '_q']) {
                    var saveString = localStorage[this.save_prefix + '_q'];
                    this.dendryEngine.setState(JSON.parse(saveString));
                    window.alert('Loaded.');
                } else {
                    window.alert('No save available.');
                }
            }
            ;

            BrowserUserInterface.prototype.loadSlot = function(slot) {
                if (localStorage[this.save_prefix + '_' + slot]) {
                    var saveString = localStorage[this.save_prefix + '_' + slot];
                    this.dendryEngine.setState(JSON.parse(saveString));
                    this.hideSaveSlots();
                    window.alert('Loaded.');
                } else {
                    window.alert('No save available.');
                }
            }
            ;

            BrowserUserInterface.prototype.deleteSlot = function(slot) {
                if (localStorage[this.save_prefix + '_' + slot]) {
                    localStorage[this.save_prefix + '_' + slot] = '';
                    localStorage[this.save_prefix + '_timestamp_' + slot] = '';
                    this.populateSaveSlots(slot + 1, 2);
                } else {
                    window.alert('No save available.');
                }
            }
            ;

            BrowserUserInterface.prototype.exportSlot = function(slot) {
                if (localStorage[this.save_prefix + '_' + slot]) {
                    var data = localStorage[this.save_prefix + '_' + slot];
                    var a = document.createElement("a");
                    var file = new Blob([data],{
                        type: 'text/plain'
                    });
                    a.href = URL.createObjectURL(file);
                    a.download = 'save.txt';
                    a.click();
                } else {
                    window.alert('No save available.');
                }
            }
            ;

            BrowserUserInterface.prototype.importSave = function(doc_id) {
                var that = this;
                function onFileLoad(e) {
                    var data = e.target.result;
                    that.dendryEngine.setState(JSON.parse(data));
                    that.hideSaveSlots();
                    window.alert('Loaded.');
                }
                var uploader = document.getElementById(doc_id);
                var reader = new FileReader();
                var file = uploader.files[0];
                console.log(uploader.files);
                reader.onload = onFileLoad;
                reader.readAsText(file);
            }
            ;

            BrowserUserInterface.prototype.populateSaveSlots = function(max_slots, max_auto_slots) {
                // this fills in the save information
                var that = this;
                function createLoadListener(i) {
                    return function(evt) {
                        that.loadSlot(i);
                    }
                    ;
                }
                function createSaveListener(i) {
                    return function(evt) {
                        that.saveSlot(i);
                    }
                    ;
                }
                function createDeleteListener(i) {
                    return function(evt) {
                        that.deleteSlot(i);
                    }
                    ;
                }
                function createExportListener(i) {
                    return function(evt) {
                        that.exportSlot(i);
                    }
                    ;
                }
                function populateSlot(id) {
                    var save_element = document.getElementById('save_info_' + id);
                    var save_button = document.getElementById('save_button_' + id);
                    var delete_button = document.getElementById('delete_button_' + id);
                    if (localStorage[that.save_prefix + '_' + id]) {
                        var timestamp = localStorage[that.save_prefix + '_timestamp_' + id];
                        save_element.textContent = timestamp;
                        save_button.textContent = "Load";
                        save_button.onclick = createLoadListener(id);
                        delete_button.onclick = createDeleteListener(id);
                    } else {
                        save_button.textContent = "Save";
                        save_element.textContent = "Empty";
                        save_button.onclick = createSaveListener(id);
                    }
                    try {
                        var export_button = document.getElementById('export_button_' + id);
                        if (localStorage[that.save_prefix + '_' + id]) {
                            export_button.onclick = createExportListener(id);
                        }
                    } catch (error) {}

                }
                for (var i = 0; i < max_slots; i++) {
                    populateSlot(i);
                }
                for (i = 0; i < max_auto_slots; i++) {
                    populateSlot('a' + i);
                }

            }
            ;

            BrowserUserInterface.prototype.showSaveSlots = function() {
                if (this.dendryEngine.state.disableSaves) {
                    window.alert('Saving and loading is currently disabled.');
                    return;
                }
                var save_element = document.getElementById('save');
                save_element.style.display = 'block';
                this.populateSaveSlots(this.max_slots, 2);
                var that = this;
                if (!save_element.onclick) {
                    save_element.onclick = function(evt) {
                        var target = evt.target;
                        var save_element = document.getElementById('save');
                        if (target == save_element) {
                            that.hideSaveSlots();
                        }
                    }
                    ;
                }
            }
            ;

            BrowserUserInterface.prototype.hideSaveSlots = function() {
                var save_element = document.getElementById('save');
                save_element.style.display = 'none';
            }
            ;

            // functions for dealing with options
            BrowserUserInterface.prototype.setOption = function(option, toggle) {
                this[option] = toggle;
                this.saveSettings();
            }
            ;

            BrowserUserInterface.prototype.populateOptions = function() {
                var disable_bg = this.disable_bg;
                var animate = this.animate;
                var animate_bg = this.animate_bg;
                if (disable_bg) {
                    $('#backgrounds_no')[0].checked = true;
                } else {
                    $('#backgrounds_yes')[0].checked = true;
                }
                if (animate) {
                    $('#animate_yes')[0].checked = true;
                } else {
                    $('#animate_no')[0].checked = true;
                }
                if (animate_bg) {
                    $('#animate_bg_yes')[0].checked = true;
                } else {
                    $('#animate_bg_no')[0].checked = true;
                }
            }
            ;

            BrowserUserInterface.prototype.showOptions = function() {
                var save_element = document.getElementById('options');
                this.populateOptions();
                save_element.style.display = "block";
                if (!save_element.onclick) {
                    save_element.onclick = function(evt) {
                        var target = evt.target;
                        var save_element = document.getElementById('options');
                        if (target == save_element) {
                            this.hideOptions();
                        }
                    }
                    ;
                }
            }
            ;

            // ------------------------------------------------------------------------
            // Additional methods

            BrowserUserInterface.prototype.getGameOverMsg = function() {
                return 'Game Over (reload to read again)';
            }
            ;

            BrowserUserInterface.prototype._registerEvents = function() {
                var that = this;
                this.$content.on('click', 'ul.choices li a', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var choice = parseInt($(this).attr('data-choice'));
                    that.dendryEngine.choose(choice);
                    return false;
                });
                this.$content.on('click', 'ul.choices li', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $('a', this).click();
                    return false;
                });
                // dendrynexus - onclick for decks and cards
                this.$content.on('click', 'ul.decks li a', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var choice = $(this).attr('card-id');
                    that.dendryEngine.drawCard(choice);
                    return false;
                });
                this.$content.on('click', 'ul.hand li a', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var choice = $(this).attr('card-id');
                    that.dendryEngine.playCard(choice);
                    return false;
                });
                this.$content.on('click', 'ul.pinned-cards li a', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var choice = $(this).attr('card-id');
                    that.dendryEngine.playPinnedCard(choice);
                    return false;
                });
            }
            ;

            // ------------------------------------------------------------------------
            // Run when loaded.

            var main = function() {
                engine.convertJSONToGame(window.game.compiled, function(err, game) {
                    if (err) {
                        throw err;
                    }

                    var ui = new BrowserUserInterface(game,$('#content'));
                    window.dendryUI = ui;
                    // Allow the ui system to be customized before use.
                    if (window.dendryModifyUI !== undefined) {
                        // If it returns true, then we don't need to begin the game.
                        var dontStart = window.dendryModifyUI(ui);
                        if (dontStart) {
                            return;
                        }
                    }
                    ui.dendryEngine.beginGame();
                });
            };
            $(main);

        }(jQuery));

    }
    , {
        "../engine": 1,
        "./content/html": 3
    }],
    3: [function(require, module, exports) {
        /* dendry
 * http://github.com/idmillington/dendry
 *
 * MIT License
 */
        /*jshint indent:2 */
        (function() {
            'use strict';

            var _contentObjectToHTML = function(contentObj) {
                if (contentObj.type === undefined) {
                    // if the game defines the function window.displayText, then that function is called to format the text.
                    // this is used for game-specific formatting.
                    if (typeof (window) !== "undefined" && window.displayText) {
                        contentObj = window.displayText(contentObj);
                    }
                    return contentObj;
                } else {
                    switch (contentObj.type) {
                    case 'emphasis-1':
                        return '<em>' + _contentToHTML(contentObj.content) + '</em>';
                    case 'emphasis-2':
                        return '<strong>' + _contentToHTML(contentObj.content) + '</strong>';
                    case 'emphasis-3':
                        return '<code>' + _contentToHTML(contentObj.content) + '</code>';
                    case 'hidden':
                        return '<span class="hidden">' + _contentToHTML(contentObj.content) + '</span>';
                    case 'line-break':
                        return '<br>';

                        // We can't handle elements that require state-dependency.
                        // raw html for magic
                    case 'magic':
                        return contentObj.content;
                    case 'insert':
                        /* falls through */
                    case 'conditional':
                        throw new Error(contentObj.type + ' should have been evaluated by now.');
                    }
                }
            };

            var _contentToHTML = function(content) {
                if (Array.isArray(content)) {
                    var result = [];
                    for (var i = 0; i < content.length; ++i) {
                        var contentObj = content[i];
                        result.push(_contentObjectToHTML(contentObj));
                    }
                    return result.join('');
                } else {
                    return _contentObjectToHTML(content);
                }
            };

            var _paragraphsToHTML = function(paragraphs) {
                var result = [];
                for (var i = 0; i < paragraphs.length; ++i) {
                    var paragraph = paragraphs[i];
                    switch (paragraph.type) {
                    case 'heading':
                        result.push('<h1>');
                        result.push(_contentToHTML(paragraph.content));
                        result.push('</h1>');
                        break;
                    case 'paragraph':
                        result.push('<p>');
                        result.push(_contentToHTML(paragraph.content));
                        result.push('</p>');
                        break;
                    case 'quotation':
                        result.push('<blockquote>');
                        result.push(_contentToHTML(paragraph.content));
                        result.push('</blockquote>');
                        break;
                    case 'attribution':
                        result.push('<blockquote class="attribution">');
                        result.push(_contentToHTML(paragraph.content));
                        result.push('</blockquote>');
                        break;
                    case 'magic':
                        result.push(paragraph.content);
                        break;
                    case 'hrule':
                        result.push('<hr>');
                        break;
                    }
                }
                return result.join('');
            };

            module.exports = {
                convert: _paragraphsToHTML,
                convertLine: _contentToHTML
            };
        }());

    }
    , {}]
}, {}, [2]);
