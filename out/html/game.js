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

function ideologies(party, Q) {
    if (!Q) return 'Unknown';
    3

    switch(party){
        case 'FLP' || 'CCF(SS)':
            if (Q.flp_ideology === "Democratic Socialism") return '<span style="color: #C42424;">Left Wing</span> (Democratic Socialism)';
            if (Q.flp_ideology === "Social Democracy") return '<span style="color: #607808;">Centre Left</span>  (Social Democracy)';
            if (Q.flp_ideology === "Popular Front Socialism") return '<span style="color: #C42424;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'PPS': 
            if (Q.pps_ideology === "Even they don't know...") return '<span style="color: #C42424;">Centre Left</span> (Progressivism)';
            return 'Unknown';
        default: 
            return 'Unknown';
    }



}

function getDynamicTooltipContent(searchString, baseTooltip) {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? 
                window.dendryUI.dendryEngine.state.qualities : null;
        
        if (!Q) return baseTooltip.explanationText;
        
        if (searchString === 'FLP' || 'CCF(SS)' !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['flp_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'PPS' && Q['pps_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['pps_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'CGP' && Q['CGP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['CGP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'AP' && Q['z_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['z_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'MSP' && Q['MSP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['MSP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'MHP' && Q['MHP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['MHP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'CHP' !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology;
        }
        if (searchString === 'paramilitary-name' && Q['paramilitary-name_strength'] !== undefined) {
            var strength = Q['paramilitary-name_strength'] ? Q['paramilitary-name_strength'].toFixed(1) : '0';
            var militancy = getMilitancyText(Q['paramilitary-name_militancy']);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization: ' + militancy;
        }
        
        if (searchString === 'Sri Lanka Armed Forces' && Q.slaf_strength !== undefined) {
            var strength = Q.slaf_strength ? Q.slaf_strength : '0';
            var morale = getLoyaltyText(Q.slaf_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
      
        if (searchString === 'THKP-C' && Q.thkpc_strength !== undefined) {
            var strength = Q.thkpc_strength ? Q.thkpc_strength : '0';
            var morale = getLoyaltyText(Q.thkpc_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
       
        if (searchString === 'TKP/ML' && Q.tkpml_strength !== undefined) {
            var strength = Q.tkpml_strength ? Q.tkpml_strength : '0';
            var morale = getLoyaltyText(Q.tkpml_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
        return baseTooltip.explanationText;
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
                return `<span class='mytooltip' style='${style}'>${innerText}<span class='mytooltiptext'>${tooltip.explanationText}</span></span>`;
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
