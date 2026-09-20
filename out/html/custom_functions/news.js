
window.news_addition = function(event = 0) {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;
      if (event) {

          var info = `<hr>${event.info}`; 

          Q.news_display += `<div>${info}</div>`
      }
      else {
          Q.news_display = ``;
      }
  };

window.news_activator = function() {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;
  Object.keys(Q.active_news).forEach(topic => {
    Object.keys(topic).forEach(event => {
      if (event.condition == true && !event.unique[false, false]) {
        window.news_addition(event);
      }
    })
  })
};