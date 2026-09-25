

var Q = window.dendryUI?.dendryEngine?.state?.qualities;

Q.generic_news = {
      'booming economy' : 'The economy is booming'
  };

Q.active_news = {
    depression : {
        start : {
            unique : [false, false], // First index indicating it's unique, second indicating if it's been called yet
            date : [1, 1932],
            info : 'It is a dire time for Saskatchewan. The province is wracked by extreme drought the likes of which has never been seen before on the Canadian prairies. <br> Two thirds of farmers have already been forced to rely on relief.',
            condition : Q.started == 1 && Q.month == 1 && Q.year >= 1932
        }
        
    }
}




window.news_addition = function(event = null) {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;

  if (!Q) return;

  // Clear the displayed news
  if (event === null) {
    Q.news_display = "";
    return;
  }

  // Add the news item
  var info = `<hr>${event.info ?? ""}`;
  Q.news_display = (Q.news_display || "") + `<div>${info}</div>`;

  // If this event is unique, mark it as having been displayed
  if (Array.isArray(event.unique) && event.unique[0] === true) {
    event.unique[1] = true;
  }
};


window.news_activator = function() {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;

  if (!Q?.active_news) return;

  // Rebuild the news display from scratch each time
  window.news_addition();

  Object.keys(Q.active_news).forEach(topicKey => {
    var topic = Q.active_news[topicKey];

    Object.keys(topic).forEach(eventKey => {
      var event = topic[eventKey];

      if (!event) return;

      var isUnique = Array.isArray(event.unique) && event.unique[0] === true;
      var alreadyCalled = Array.isArray(event.unique) && event.unique[1] === true;

      // Non-unique events appear whenever their condition is true.
      // Unique events appear only the first time.
      if (event.condition === true && (!isUnique || !alreadyCalled)) {
        window.news_addition(event);
      }
    });
  });
};