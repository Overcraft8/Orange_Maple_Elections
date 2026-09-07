window.achievements_list = {
  "achievements": [
    {
      "id": "game_completed",
      "name": "Finished the Game",
      "description": "Finish the game.",
      "difficulty": 1,
      "image": "img/Wheat_Bundle.png"
    },
    {
      "id": "tommy",
      "name": "Tommy",
      "description": "Tommy Douglas is elected as Premier.",
      "difficulty": 3,
      "image": "img/portraits/DouglasTommy.jpg"
    },
    {
      "id": "dief_the_chief",
      "name": "Dief The Chief",
      "description": "John Diefenbaker is elected as Premier.",
      "difficulty": 3,
      "image": "img/achievements/calcotada.png"
    }
  ]
}

window.achievements_loader = function(container) {

  var Q = window.dendryUI?.dendryEngine?.state?.qualities;

  var achievements = window.achievements_list.achievements; 

  for (var achievement of achievements) {
    var lock_state = Q[achievement.id] ? '--unlocked' : '--locked';

    Q.achievement_set = `<div class="achievement achievement${lock_state}" style="display:flex">
                            <div class="achievement-image achievement-image${lock_state}">
                              <img src=${achievement.image} style="width:100%;height:100%;object-fit:cover;">
                              </div>
                              <div class="achievement-body">
                                <div class="achievement-title achievement-title${lock_state}">
                                  <span> ${achievement.name} </span>
                              </div>
                              <div class="achievement-description achievement-description${lock_state}">${achievement.description}</div>
                            </div>
                          </div>`

    container += Q.achievement_set;

  }


  // Starting state for container of achievement
  //Q.achievement_base = `<div class="achievement achievement--locked" style="display: flex">`







  //if (container.startsWith('Q.')) {}

}