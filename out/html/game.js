(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;
    // Add your custom code here.
  };

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
  var scene = window.dendryUI.dendryEngine.state.sceneId;

  if (scene.startsWith('library') || scene.startsWith('flp_president')) {
      window.dendryUI.dendryEngine.goToScene('backSpecialScene');
  } else {
      window.dendryUI.dendryEngine.goToScene('library');
  }
  };

  window.showMods = function() {
    window.hideOptions();
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('mod_loader')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('mod_loader');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
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
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
  };

  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
window.displayText = function (text) {
    return applyWholesome(text);
};

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getRelationshipText(value) {
        if (value === undefined || value === null) return '';
        if (value <= 5) return '<span style="color: #FF0000;">Hostile</span>';
        if (value <= 14.9) return '<span style="color: #FF4500;">Frigid</span>';
        if (value <= 29.9) return '<span style="color: #FF8C00;">Cold</span>';
        if (value <= 39.9) return '<span style="color: #FFA500;">Cool</span>';
        if (value <= 54.9) return '<span style="color: #FFD700;">Neutral</span>';
        if (value <= 64.9) return '<span style="color: #9ACD32;">Warm</span>';
        if (value <= 74.9) return '<span style="color: #32CD32;">Friendly</span>';
        return '<span style="color: #008000;">Very friendly</span>';
    }

function getPartyIdeology(party, Q) {
    if (!Q) return 'Unknown';
    switch(party){
        case 'CP': 
            if (Q.cp_ideology === "Marxism-Leninism") return '<span style="color: #4c0e0e;">Far Left</span> (Revolutionary Communism)';
            if (Q.cp_ideology === "Popular Front Socialism") return '<span style="color: #4c0e0e;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'FLP':
        case 'CCF':
            if (Q.flp_ideology === "Democratic Socialism") return '<span style="color: #C42424;">Left Wing</span> (Democratic Socialism)';
            if (Q.flp_ideology === "Social Democracy") return '<span style="color: #607808;">Centre Left</span>  (Social Democracy)';
            if (Q.flp_ideology === "Popular Front Socialism") return '<span style="color: #C42424;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'PPS': 
            if (Q.pps_ideology === "Even they don't know...") return '<span style="color: #b0d022;">Centre Left</span> (Progressivism)';
            return 'Unknown';
        case 'LPS': 
            if (Q.lps_ideology === "Liberalism") return '<span style="color: #C42424;">Centre - Centre Left</span> (Liberalism)';
            if (Q.lps_ideology === "Social Liberalism") return '<span style="color: #c45724;">Centre Left</span> (Social Liberalism)';
            if (Q.lps_ideology === "Centrism") return '<span style="color: #b97a7a;">Centrist</span> (Centrism)';
            return 'Unknown';
        case 'CPS': 
            if (Q.cps_ideology === "Conservatism") return '<span style="color: #2464c4;">Centre - Centre Right</span> (Conservatism)';
            if (Q.cps_ideology === "Social Conservatism") return '<span style="color: #c45724;">Centre Right</span> (Social Conservatism)';
            if (Q.cps_ideology === "Paternalistic Conservatism") return '<span style="color: #b97a7a;">Centre Right</span> (Paternalistic Conservatism)';
            if (Q.cps_ideology === "Conservative Populist") return '<span style="color: #b97a7a;">Right Wing</span> (Populist conservatism))';
            return 'Unknown';
        case 'SCP': 
            if (Q.scp_ideology === "Social Credit") return '<span style="color: #2464c4;">Centre Right - Right Wing</span> (Social Credit Theory)';
            if (Q.scp_ideology === "Paternalistic Conservatism") return '<span style="color: #c45724;">Centre Right</span> (Paternalistic Conservatism)';
            if (Q.scp_ideology === "Left Populism") return '<span style="color: #b97a7a;">Left Wing</span> (Left Populism)';
            if (Q.scp_ideology === "Right Populism") return '<span style="color: #b97a7a;">Right Wing</span> (Right Populism))';
            return 'Unknown';
        // Organizations below
        default: 
            return "Unknown";
    }



}

function getDynamicTooltipContent(searchString, baseTooltip) {
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    if (!Q) return baseTooltip.explanationText;

    const relationMap = {
        'CP': 'cp_relation',
        'PPS': 'pps_relation',
        'LPS': 'lps_relation',
        'CPS': 'cps_relation',
        'SCP': 'scp_relation'
    };

    const ideologyMap = {
        'FLP': 'flp_ideology', 
        'PPS': 'pps_ideology', 
        'LPS': 'lps_ideology', 
        'CPS': 'cps_ideology', 
        'SCP': 'scp_ideology'
    };

    // ✅ ALWAYS initialize
    let result = baseTooltip.explanationText;

    const ideologyKey = ideologyMap[searchString];

    if (ideologyKey && Q[ideologyKey] !== undefined) {
        // ✅ FIXED ARGUMENTS
        const ideologyText = getPartyIdeology(searchString, Q);
        result += '<br>Politics: ' + ideologyText;
    }

    // Special case
    if (searchString === 'FLP' || searchString === 'CCF(SS)') {
        return result;
    }

    const relationKey = relationMap[searchString];

    if (relationKey && Q[relationKey] !== undefined) {
        const relationText = getRelationshipText(Q[relationKey]);
        result += '<br>Relation: ' + relationText;
    }

    return result;
}


function applyWholesome(str) {
    const allWords = new Set([
        ...tooltipList.map(t => t.searchString),
        ...colourList.map(c => c.word)
    ]);

    const words = [...allWords].map(escapeRegex);
    const regex = new RegExp(`(?<![\\w-])(${words.join('|')})(?![\\w-])`, 'g');

    return str.replace(/(<(?:span|strong)[^>]*>.*?<\/(?:span|strong)>|<[^>]+>|[^<]+)/g, (segment) => {
        if (segment.startsWith('<')) return segment;

        return segment.replace(regex, (match) => {
            const tooltip = tooltipList.find(t => t.searchString === match);
            const colour = colourList.find(c => c.word === match);

            let style = colour ? colour.style : '';
            let innerText = match;

            if (colour && colour.img) {
                innerText = `<img src="${colour.img}" class="p_icon" alt="">${innerText}`;
            }

            if (tooltip) {
                var tooltipContent = getDynamicTooltipContent(match, tooltip);
                return `<span class='mytooltip' style='${style}'>${innerText}<span class='mytooltiptext'>${tooltipContent}</span></span>`;
            } else if (colour) {
                return `<span style='${style}'>${innerText}</span>`;
            }

            return match;
        });
    });
}



  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  // TODO: have some code for tabbed sidebar browsing.
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

    window.updateSidebarRight = function() {
    $('#qualities_right').empty();
    var scene = dendryUI.game.scenes[window.statusTabRight];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    $('#qualities_right').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.changeTabRight = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementsByClassName('tab_button');
    
    var rightSidebar = document.getElementById('stats_sidebar_right');
    var rightTabButtons = rightSidebar.getElementsByClassName('tab_button');
    for (i = 0; i < rightTabButtons.length; i++) {
        rightTabButtons[i].className = rightTabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTabRight = newTab;
    window.updateSidebarRight();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
      window.updateSidebarRight();
  };


  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.statusTabRight = "status_right";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

})();

// Western Province
function Colombo_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Colombo";
  Q.district_worker = Q.colombo_d_worker;
  Q.district_old_middle = Q.colombo_d_old_middle;
  Q.district_new_middle = Q.colombo_d_new_middle;
  Q.district_upper = Q.colombo_d_upper;
  Q.district_rural = Q.colombo_d_rural;
  Q.district_catholic = Q.colombo_d_catholic;
  Q.district_seats = Q.colombo_d_seats;
  Q.district_industries = Q.colombo_d_industries;  
  window.updateSidebarRight(); 
}

document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mytooltiptext').forEach(el => {
        el.style.setProperty('--mouse-x', e.clientX + 'px');
        el.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});



// President Button

window.goToDepressionSituation = function() {
    window.previousScene = window.dendryUI.dendryEngine.state.sceneId;
    window.dendryUI.dendryEngine.goToScene("Depression_Situation");
};



document.addEventListener("click", function(e) {
  var card = e.target.closest("[go-to]");
  if (!card) return;

  var scene = card.getAttribute("go-to");
  if (!scene) return;

  window.previousScene = window.dendryUI.dendryEngine.state.sceneId;
  window.dendryUI.dendryEngine.goToScene(scene);
});
