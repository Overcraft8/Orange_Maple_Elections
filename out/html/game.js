(function() {
  var Q = window.dendryUI?.dendryEngine?.state?.qualities;
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

  window.panelActivated = false;

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
  var scene = window.dendryUI.dendryEngine.state.sceneId;

  if (scene.startsWith('library') || scene.startsWith('ccf_ss_president')) {
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
        case 'CP(S)': 
            if (Q.cp_s_ideology === "Marxism-Leninism") return '<span style="color: #4c0e0e;">Far Left</span> (Marxist-Leninist)';
            if (Q.cp_s_ideology === "Popular Front Socialism") return '<span style="color: #4c0e0e;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'CCF(SS)':
            if (Q.ccf_ss_ideology === "Democratic Socialism") return '<span style="color: #c46124;">Left Wing</span> (Democratic Socialism)';
            if (Q.ccf_ss_ideology === "Social Democracy") return '<span style="color: #eca12a;">Centre Left</span>  (Social Democracy)';
            if (Q.ccf_ss_ideology === "Popular Front Socialism") return '<span style="color: #C42424;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'PPS': 
            if (Q.pps_ideology === "Even they don't know...") return '<span style="color: #b0d022;">Centre Left</span> (Agrarian Progressivism)';
            return 'Unknown';
        case 'LPS': 
            if (Q.lps_ideology === "Classical Liberalism") return '<span style="color: #C42424;">Centre - Centre Left</span> (Liberalism)';
            if (Q.lps_ideology === "Social Liberalism") return '<span style="color: #c45724;">Centre Left</span> (Social Liberalism)';
            if (Q.lps_ideology === "Centrism") return '<span style="color: #b97a7a;">Centrist</span> (Centrism)';
            return 'Unknown';
        case 'CPS': 
            if (Q.cps_ideology === "Conservatism") return '<span style="color: #2464c4;">Centre - Centre Right</span> (Conservatism)';
            if (Q.cps_ideology === "Social Conservatism") return '<span style="color: #c45724;">Centre Right</span> (Social Conservatism)';
            if (Q.cps_ideology === "Paternalistic Conservatism") return '<span style="color: #b97a7a;">Centre Right</span> (Paternalistic Conservatism)';
            if (Q.cps_ideology === "Conservative Populist") return '<span style="color: #b97a7a;">Right Wing</span> (Populist conservatism))';
            return 'Unknown';
        case 'SCPS': 
            if (Q.scps_ideology === "Social Credit") return '<span style="color: #2464c4;">Centre Right - Right Wing</span> (Social Credit Theory)';
            if (Q.scps_ideology === "Paternalistic Conservatism") return '<span style="color: #c45724;">Centre Right</span> (Paternalistic Conservatism)';
            if (Q.scps_ideology === "Left Populism") return '<span style="color: #b97a7a;">Left Wing</span> (Left Populism)';
            if (Q.scps_ideology === "Right Populism") return '<span style="color: #b97a7a;">Right Wing</span> (Right Populism))';
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
        'CP(S)': 'cp_s_relation',
        'PPS': 'pps_relation',
        'LPS': 'lps_relation',
        'CPS': 'cps_relation',
        'SCPS': 'scps_relation'
    };

    const ideologyMap = {
        'CP(S)': 'cp_s_ideology',
        'CCF(SS)': 'ccf_ss_ideology', 
        'PPS': 'pps_ideology', 
        'LPS': 'lps_ideology', 
        'CPS': 'cps_ideology', 
        'SCPS': 'scps_ideology'
    };

    const party_seats = {
        'CP(S)': 'cp_s_seats',
        'CCF(SS)': 'ccf_ss_seats',
        'PPS': 'pps_seats',
        'LPS': 'lps_seats',
        'CPS': 'cps_seats',
        'SCPS': 'scps_seats'
    }

    //  Always initialize
    let result = baseTooltip.explanationText;

    const ideologyKey = ideologyMap[searchString];

    // const divider = '<span style="display: block; border-top: 1px solid #dcb682; margin: 8px 0;"></span>';
    const divider = '<span style="display: inline-block; width: 100%; border-top: 1px solid #dcb682; margin: 8px 0; text-indent: 0; vertical-align: middle;"></span>';

    if (ideologyKey && Q[ideologyKey] !== undefined) {
        const ideologyText = getPartyIdeology(searchString, Q);
        result += divider + 'Politics: ' + ideologyText;
    }

    // Special case
    if (searchString === 'CCF(SS)') {

        const seatsKey = party_seats[searchString];

        if (seatsKey && Q[seatsKey] !== undefined) {
            result += '<br>Seats: ' + Q[seatsKey];
        }

        return result;
    }

    const relationKey = relationMap[searchString];


    if (relationKey && Q[relationKey] !== undefined) {
        const relationText = getRelationshipText(Q[relationKey]);
        result += divider + 'Relation: ' + relationText;
    }

    const seatsKey = party_seats[searchString];

    if (seatsKey && Q[seatsKey] !== undefined) {
        result += '<br>Seats: ' + Q[seatsKey];
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

            if (tooltip) { // MARIO
                //var tooltipContent = getDynamicTooltipContent(match, tooltip);
                //return `<span class='mytooltip' style='${style}'>${innerText}<span class='mytooltiptext'>${tooltipContent}</span></span>`;
                var tooltipContent = getDynamicTooltipContent(match, tooltip);

                // NEW UNIFIED VERSION:
                return `<span class='tooltip' style='${style}'>${innerText}<span class='tooltip-text'>${tooltipContent}</span></span>`;
            } else if (colour) {
                return `<span style='${style}'>${innerText}</span>`;
            }

            return match;
        });
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------
//                          SIDEBARS AND PAGES


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


/* 
  window.updateSidebar = function () {
        $('#qualities').empty();
        var statusScene = dendryUI.game.scenes["status"];
        var scene = dendryUI.game.scenes[window.statusTab];
        dendryUI.dendryEngine._runActions(statusScene.onArrival);
        dendryUI.dendryEngine._runActions(scene.onArrival);
        var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
        var htmlContent = dendryUI.contentToHTML.convert(displayContent);
        // clean HTML to prevent script execution errors
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        // Remove any script tags
        tempDiv.querySelectorAll('script').forEach(script => script.remove());
        $('#qualities').html(tempDiv.innerHTML);
        dendryUI.dendryEngine._runActions(scene.onDisplay);
    };

    window.updateSidebarRight = function() {
    $('#qualities_right').empty();
    var scene = dendryUI.game.scenes[window.statusTabRight];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    var htmlContent = dendryUI.contentToHTML.convert(displayContent);
    // clean HTML to prevent script execution errors
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    // Remove any script tags
    tempDiv.querySelectorAll('script').forEach(script => script.remove());
    $('#qualities_right').html(tempDiv.innerHTML);
  };

    window.updateBottomBar = function() {
    $('#bottom_holder').empty();
    var scene = dendryUI.game.scenes[window.statusTabBottom];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    var htmlContent = dendryUI.contentToHTML.convert(displayContent);
    // clean HTML to prevent script execution errors
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    // Remove any script tags
    tempDiv.querySelectorAll('script').forEach(script => script.remove());
    $('#bottom_holder').html(tempDiv.innerHTML);
  };

  window.changeTab = function(newTab, tabId) {
    if (tabId === 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
        window.alert('Polls are not available in historical mode.');
        return;
    }

    const leftsidebar = document.getElementById('stats_sidebar'); 

    const tabButton = document.getElementById(tabId);
    const tabButtons = leftsidebar.getElementsByClassName('tab_button');

    const statusButtons = document.getElementsByClassName('status_tab_button');
    const statusPanelCards = document.getElementsByClassName('status_panel_card_image');

    // Sub tabs (status)
    if (tabButton.classList.contains('status_tab_button')) {
        for (let i = 0; i < statusButtons.length; i++) {
            statusButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');
    }

    // Sub Tab Images (nested inside sub tab scenes)
    else if (tabButton.classList.contains('status_panel_card')) {
        for (let i = 0; i < statusPanelCards.length; i++) {
            statusPanelCards[i].classList.remove('active');
        }
        tabButton.classList.add('active');
    }

    // Main tab
    else if (tabButton.classList.contains('tab_button')) {
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');

        // Handle sub tabs
        const allTabContainers = document.getElementsByClassName('status_tab_container');

        for (let i = 0; i < allTabContainers.length; i++) {
            allTabContainers[i].style.display = 'none';
        }

        const baseId = tabId.replace('_tab', '');
        const targetContainer = document.getElementById(baseId + '_tabs');

        if (targetContainer) { //WARIO
            targetContainer.style.display = 'flex';
        }
    }

    window.statusTab = newTab;
    window.updateSidebar();
};

    window.changeTabRight = function(newTab, tabId) {
    const tabButton = document.getElementById(tabId);
    const rightSidebar = document.getElementById('stats_sidebar_right');

    const tabButtons = rightSidebar.getElementsByClassName('tab_button');
    const statusButtons = rightSidebar.getElementsByClassName('status_tab_button');

    // Sub tabs (status)
    if (tabButton.classList.contains('status_tab_button')) {
        for (let i = 0; i < statusButtons.length; i++) {
            statusButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');
    }

    // Main tab
    else {
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');

        // Handle sub tabs
        const allTabContainers = rightSidebar.getElementsByClassName('status_tab_container');

        for (let i = 0; i < allTabContainers.length; i++) {
            allTabContainers[i].style.display = 'none';
        }

        const baseId = tabId.replace('_tab', '');
        const targetContainer = document.getElementById(baseId + '_tabs');

        if (targetContainer) { //WARIO
            targetContainer.style.display = 'flex';
        }
    }

    window.statusTabRight = newTab;

    window.updateSidebarRight();
};

window.changeTabBottom = function(newTab, tabId) {
    const tabButton = document.getElementById(tabId);
    const bottombar = document.getElementById('bottom_bar');

    const tabButtons = bottombar.getElementsByClassName('tab_button');
    const statusButtons = bottombar.getElementsByClassName('status_tab_button');

    // Sub tabs (status)
    if (tabButton.classList.contains('status_tab_button')) {
        for (let i = 0; i < statusButtons.length; i++) {
            statusButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');
    }

    // Main tab
    else {
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        tabButton.classList.add('active');

        // Handle sub tabs
        const allTabContainers = bottom_bar.getElementsByClassName('status_tab_container');

        for (let i = 0; i < allTabContainers.length; i++) {
            allTabContainers[i].style.display = 'none';
        }

        const baseId = tabId.replace('_tab', '');
        const targetContainer = document.getElementById(baseId + '_tabs');

        if (targetContainer) { //WARIO
            targetContainer.style.display = 'flex';
        }
    }

    window.statusTabBottom = newTab;

    window.updateBottomBar();
}
*/

// ==========================================
// "Region" Configurations
// ==========================================
const Bar_Config = {
    center: {
        containerId: 'mid_panel',
        targetId: 'content',
        starting_scene: 'government_options',
        isLeft: false
    },
    left: {
        containerId: 'stats_sidebar',
        targetId: 'qualities',
        starting_scene: 'statusTab',
        isLeft: true //isLeft for refreshing the page
    },
    right: {
        containerId: 'stats_sidebar_right',
        targetId: 'qualities_right',
        starting_scene: 'statusTabRight',
        isLeft: false
    },
    bottom: {
        containerId: 'stats_bottom_bar',
        targetId: 'qualities_bottom',
        starting_scene: 'statusTabBottom',
        isLeft: false
    }, 
    district: {
        containerId: 'region_info_display_scene', 
        targetId: 'region_info_display_scene', 
        starting_scene: '', 
        isLeft: false
    }, 
    crown_corps: {
        containerId: 'content',
        targetId: 'crown_corps_actions',
        starting_scene: 'crown_corps_options',
        isLeft: false
    },
};

// ==========================================
// Update W/ Unified Content 
// ==========================================
window.updateBar = function(regionKey) {
    var config = Bar_Config[regionKey];
    if (!config) return "1";

    var targetSelector = '#' + config.targetId;
    $(targetSelector).empty();

    var sceneId = window[config.starting_scene];
    var scene = dendryUI.game.scenes[sceneId];
    if (!scene) return "2";

    // Run status on arrival if the left main sidebar
    if (config.isLeft) {
        var statusScene = dendryUI.game.scenes["status"];
        if (statusScene) dendryUI.dendryEngine._runActions(statusScene.onArrival);
    }
    console.log('2.5');

    dendryUI.dendryEngine._runActions(scene.onArrival);

    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    var htmlContent = dendryUI.contentToHTML.convert(displayContent);

    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.querySelectorAll('script').forEach(script => script.remove());
    $(targetSelector).html(tempDiv.innerHTML);

    console.log('3');

    // Run display so D3 charts, SVGs, and dynamic UI initialize
    dendryUI.dendryEngine._runActions(scene.onDisplay);
    console.log('4');

    // if (config.isLeft)... for just the left status if too slow
};

// ==========================================
// Unified Tab Changing
// ==========================================
window.ChangeTab = function(regionKey, newTab, tabId) {
    if (regionKey === 'left' && tabId === 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
        window.alert('Polls are not available in historical mode.');
        return;
    }

    var config = Bar_Config[regionKey];

    if (tabId != 'none') {
        var container = document.getElementById(config.containerId);
        var tabButton = document.getElementById(tabId);
        if (!container || !tabButton) return;

        var tabButtons = container.getElementsByClassName('tab_button');
        var statusButtons = container.getElementsByClassName('status_tab_button');
        var statusPanelCards = container.getElementsByClassName('status_panel_card_image');

        // -------------------------------------------------------------
        // Close if the clicked tab is already active
        // -------------------------------------------------------------
        if (window.prev_tab_id === tabId || tabButton.classList.contains('active')) {
            tabButton.classList.remove('active');

            // Hide nested sub-tab containers if applicable
            var allTabContainers = container.getElementsByClassName('status_tab_container');
            for (let i = 0; i < allTabContainers.length; i++) {
                allTabContainers[i].style.display = 'none';
            }

            // Reset state variables
            window[config.starting_scene] = 'empty';

            // Clear rendered HTML from the sidebar
            $('#' + config.targetId).empty();

            // Reset prev_tab_id so clicking it next time re-opens it
            window.prev_tab_id = null;
            return;
        }

        // Process button classes independently
        if (tabButton.classList.contains('status_tab_button')) {
            for (let i = 0; i < statusButtons.length; i++) statusButtons[i].classList.remove('active');
        } 
        
        if (tabButton.classList.contains('status_panel_card')) {
            for (let i = 0; i < statusPanelCards.length; i++) statusPanelCards[i].classList.remove('active');
        } 
        
        if (tabButton.classList.contains('tab_button')) {
            for (let i = 0; i < tabButtons.length; i++) tabButtons[i].classList.remove('active');

            // Reset visibility of sub tab containers inside this region
            var allTabContainers = container.getElementsByClassName('status_tab_container');
            for (let i = 0; i < allTabContainers.length; i++) {
                allTabContainers[i].style.display = 'none';
            }

            var baseId = tabId.replace('_tab', '');
            var targetContainer = document.getElementById(baseId + '_tabs');
            if (targetContainer) {
                targetContainer.style.display = 'flex';
            }
        }
        
        // add the active state to the clicked button
        tabButton.classList.add('active');
    };
    // Save state globally and update UI
    window[config.starting_scene] = newTab;
    window.updateBar(regionKey);
};

// ==========================================
// Backwards Compatibility
// ==========================================
window.updateSidebar      = function() { window.updateBar('left'); };
window.updateSidebarRight = function() { window.updateBar('right'); };
window.updateBottomBar    = function() { window.updateBar('bottom'); };

window.changeTab       = function(newTab, tabId) { window.ChangeTab('left', newTab, tabId); };
window.changeTabRight  = function(newTab, tabId) { window.ChangeTab('right', newTab, tabId); };
window.changeTabBottom = function(newTab, tabId) { window.ChangeTab('bottom', newTab, tabId); };




window.onDisplayContent = function() {
    window.changeTab('left', 'status', 'main_tab');
    window.changeTab('right', 'status_right', 'party_tab');
    window.changeTab('bottom', 'status_bottom', 'map_tab');
    window.updateBar('left');
    window.updateBar('right');
    window.updateBar('bottom');
};

window.justLoaded = true;
window.statusTab = "status";
window.statusTabRight = "status_right";
window.dendryModifyUI = main;
console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

window.onload = function() {
  // Was originally at false
  window.dendryUI.loadSettings({show_portraits: true});
  if (window.dendryUI.dark_mode) {
      document.body.classList.add('dark-mode');
  }
  window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
};

window.bottom_panel_display = function() {
    var bottom_panel = document.getElementById('bottom_panel');
    var bottom_panel_display = bottom_panel.style.display;

    if (bottom_panel_display == 'flex') {
        bottom_panel.style.display = 'none'
    }
    else {
        bottom_panel.style.display = 'flex'
    }
};





})();



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener("click", function(e) {
  var card = e.target.closest("[go-to]");
  if (!card) return;

  var scene = card.getAttribute("go-to");
  if (!scene) return;

  window.previousScene = window.dendryUI.dendryEngine.state.sceneId;
  window.dendryUI.dendryEngine.goToScene(scene);
});



window.toggleDistrict = function() {
    var div = document.getElementById('district_results_legislative');
    div.style.display = div.style.display === 'none' ? 'block' : 'none';
};


window.customgeneratebar = function(data, outercolor, innercolor, elementID, tooltip) {

    function renderBar() {

        var container = document.getElementById(elementID);
        if (!container) {
            if (window.__customGenerateBarAttempts < 20) {
                window.__customGenerateBarAttempts += 1;
                setTimeout(renderBar, 25);
            }
            return;
        }

        var widthPercent = Number(data);
        if (isNaN(widthPercent)) widthPercent = 0;
        if (widthPercent > 100) widthPercent = 100;
        if (widthPercent < 0) widthPercent = 0;

        var finalTooltipText = tooltip;


        var barHtml = 
            '<div class="tooltip" style="position: relative; width: 100%;">' + 
                '<div style="height: 8px; background: ' + outercolor + '; border-radius: 4px; overflow: hidden; border: 1px solid #000000;">' +
                    '<div style="background: ' + innercolor + '; opacity: 0.7; height: 100%; width: ' + widthPercent + '%; transition: width 0.4s;"></div>' +
                '</div>' +
                '<span id="' + elementID + '_tooltip" class="tooltip-text" style="text-align: center;">' + finalTooltipText + '</span>' + 
            '</div>';


        container.innerHTML = barHtml;
    }

    if (typeof window.__customGenerateBarAttempts === 'undefined') {
        window.__customGenerateBarAttempts = 0;
    }
    window.__customGenerateBarAttempts = 0;
    renderBar();
};

window.customgeneratemultibar = function(dataArray, outercolor, colorsArray, elementID, tooltips) {
    var data = [].concat(dataArray);
    var colors = [].concat(colorsArray);
    var texts = [].concat(tooltips || []);

    // 1. Filter valid segments and calculate total
    var valid = [];
    var absoluteTotal = 0; 

    for (var j = 0; j < data.length; j++) {
        var val = Number(data[j]);
        if (val > 0) {
            valid.push({ val: val, color: colors[j] || '#ccc', text: texts[j] || '' });
            absoluteTotal += val; 
        }
    }

    // Handle empty data case
    if (absoluteTotal === 0) {
        if (elementID === 'return_html') return '';
        var container = document.getElementById(elementID);
        if (container) container.innerHTML = '';
        return;
    }

    // 2. Build segments HTML
    var innerSegmentsHtml = '';
    var currentPercentTotal = 0;

    for (var i = 0; i < valid.length; i++) {
        var width = (valid[i].val / absoluteTotal) * 100;

        if (currentPercentTotal + width > 100) width = 100 - currentPercentTotal;
        currentPercentTotal += width;

        var radiusStyle = '';
        if (i === 0) radiusStyle += 'border-top-left-radius: 3px; border-bottom-left-radius: 3px; ';
        if (i === valid.length - 1 || currentPercentTotal >= 99.9) radiusStyle += 'border-top-right-radius: 3px; border-bottom-right-radius: 3px; ';

        innerSegmentsHtml += 
            '<div class="tooltip" style="position: relative; height: 100%; width: ' + width + '%; display: block;">' + 
                '<div style="background: ' + valid[i].color + '; opacity: 0.8; height: 100%; width: 100%; ' + radiusStyle + '"></div>' +
                '<span class="tooltip-text">' + valid[i].text + '</span>' +
            '</div>';
    }

    var finalHtml = 
        '<div style="width: 100%; position: relative; margin: 0.5em;">' + 
            '<div style="display: flex; height: 15px; background: ' + outercolor + '; border-radius: 4px; border: 1px solid #000; overflow: visible;">' +
                innerSegmentsHtml + 
            '</div>' +
        '</div>';

    // 3. Return HTML string or write directly to DOM
    if (elementID === 'return_html') {
        return finalHtml;
    } else {
        var container = document.getElementById(elementID);

        // Fallback retry loop if the DOM element isn't ready yet
        if (!container) {
            setTimeout(function() { 
                window.customgeneratemultibar(dataArray, outercolor, colorsArray, elementID, tooltips); 
            }, 25);
            return;
        }

        container.innerHTML = finalHtml;
    }
};


// Dynamic Tooltip Edge Detection (Pixel-Perfect Nudge)
document.addEventListener('mouseover', function(e) {
    var tooltipContainer = e.target.closest('.tooltip');
    if (!tooltipContainer) return;

    var tooltipText = tooltipContainer.querySelector('.tooltip-text');
    if (!tooltipText) return;

    var rect = tooltipText.getBoundingClientRect();
    var screenPadding = 10; // Keep it 10px away from the screen edge

    // Get the current shift amount (defaults to 0)
    var currentShift = parseFloat(tooltipText.style.getPropertyValue('--tt-shift')) || 0;

    // Calculate where the edges WOULD be if the tooltip was perfectly centered
    var naturalLeft = rect.left - currentShift;
    var naturalRight = rect.right - currentShift;

    var newShift = 0;

    // Check if it spills off the left
    if (naturalLeft < screenPadding) {
        newShift = screenPadding - naturalLeft; // Nudge right (positive number)
    } 
    // Check if it spills off the right
    else if (naturalRight > (window.innerWidth - screenPadding)) {
        newShift = (window.innerWidth - screenPadding) - naturalRight; // Nudge left (negative number)
    }

    // Only update the DOM if the value actually needs to change (prevents jittering)
    if (currentShift !== newShift) {
        tooltipText.style.setProperty('--tt-shift', newShift + 'px');
    }
});

console.log('asdasdasdasd')