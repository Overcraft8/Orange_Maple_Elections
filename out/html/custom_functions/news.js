

window.news_addition = function(event = null) {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;

  // if (!Q) return;

  // Clear the displayed news
  if (event === null) {
    Q.news_display = "";
    return;
  }

  // Add the news item
  var info = `<hr>${event.info ?? ""}`;
  Q.news_display = (Q.news_display || "") + `<div>${info}</div>`;

  // If this event is unique, mark it as having been displayed
  if (event.called == false) { event.called = true; }
};


window.news_activator = function() {
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    if (!Q?.active_news) return;

    window.news_addition();

    Object.keys(Q.active_news).forEach(topicKey => {
        var topic = Q.active_news[topicKey];

        Object.keys(topic).forEach(eventKey => {
            var event = topic[eventKey];

            // if (!event) return;
            if (event.called == true) {return}
            if (!event.date[1] == Q.year || !event.date[0] == Q.month) {return}

            var conditionMet = false;

            try {
                conditionMet = Function("Q", `"use strict"; return (${event.condition});`)(Q);
            } catch (error) {
                console.error("News condition error:", event.condition, error);
            }

            if (conditionMet && (!isUnique || !alreadyCalled)) {
                window.news_addition(event);
            }
        });
    });
};