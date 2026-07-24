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

// ==========================================
// Regions
// ==========================================
const BAR_CONFIG = {
    left: {
        containerId: 'stats_sidebar_left',
        targetId: 'qualities',
        active_scene: 'main_tab',
        isLeft: true
    },
    right: {
        containerId: 'stats_sidebar_right',
        targetId: 'qualities_right',
        active_scene: 'party_tab',
        isLeft: false
    },
    bottom: {
        containerId: 'stats_bottom_bar',
        targetId: 'qualities_bottom',
        active_scene: 'general_map_tab',
        isLeft: false
    }
};

// ==========================================
// Update W/ Unified Content 
// ==========================================
window.updateBar = function(regionKey) {
    var config = BAR_CONFIG[regionKey];
    if (!config) return;

    var targetSelector = '#' + config.targetId;
    $(targetSelector).empty();

    var sceneId = window[config.active_scene];
    var scene = dendryUI.game.scenes[sceneId];
    if (!scene) return;

    // Run status logic if processing the left main sidebar
    if (config.isLeft) {
        var statusScene = dendryUI.game.scenes["status"];
        if (statusScene) dendryUI.dendryEngine._runActions(statusScene.onArrival);
    }

    dendryUI.dendryEngine._runActions(scene.onArrival);
    
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    var htmlContent = dendryUI.contentToHTML.convert(displayContent);
    
    // Sanitize HTML to prevent script execution errors
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.querySelectorAll('script').forEach(script => script.remove());
    $(targetSelector).html(tempDiv.innerHTML);

    // Run display hooks if processing the left main sidebar
    // Just for the legislature display
};

// ==========================================
// Tab Change (Unified)
// ==========================================


window.prev_tab_id = null;

window.ChangeTab = function(regionKey, newTab, tabId) {
    var config = BAR_CONFIG[regionKey];
    var container = document.getElementById(config.containerId);
    var tabButton = document.getElementById(tabId);
    if (!container || !tabButton) return;

    var tabButtons = container.getElementsByClassName('tab_button');
    var statusButtons = container.getElementsByClassName('status_tab_button');
    var statusPanelCards = container.getElementsByClassName('status_panel_card_image');

    // -------------------------------------------------------------
    // LOGIC GATE: Close if the clicked tab is ALREADY active
    // -------------------------------------------------------------
    if (window.prev_tab_id === tabId || tabButton.classList.contains('active')) {
        tabButton.classList.remove('active');

        // Hide nested sub-tab containers if applicable
        var allTabContainers = container.getElementsByClassName('status_tab_container');
        for (let i = 0; i < allTabContainers.length; i++) {
            allTabContainers[i].style.display = 'none';
        }

        // Reset state variables
        window[config.stateKey] = 'empty';

        // Clear rendered HTML from the sidebar
        $('#' + config.targetId).empty();

        // Reset prev_tab_id so clicking it next time re-opens it cleanly
        window.prev_tab_id = null;
        return;
    }

    if (tabButton.classList.contains('status_tab_button')) {
        for (let i = 0; i < statusButtons.length; i++) statusButtons[i].classList.remove('active');
        tabButton.classList.add('active');
    } 
    else if (tabButton.classList.contains('status_panel_card')) {
        for (let i = 0; i < statusPanelCards.length; i++) statusPanelCards[i].classList.remove('active');
        tabButton.classList.add('active');
    } 
    else if (tabButton.classList.contains('tab_button')) {
        for (let i = 0; i < tabButtons.length; i++) tabButtons[i].classList.remove('active');
        tabButton.classList.add('active');

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

    // Track active tab ID
    window.prev_tab_id = tabId;

    // Save state globally and update UI
    window[config.active_scene] = newTab;
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
    window.updateBar('left');
    window.updateBar('right');
    window.updateBar('bottom');
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    // Was originally at false
    window.dendryUI.loadSettings({show_portraits: true});
    window.dendryUI.loadSettings({show_portraits: true});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                  TAXES AND REVENUE CALCULATIONS


window.calculate_income_tax = function() {
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;
    var total_revenue = 0;

    // Define thresholds
    var middle_threshold = 0.4; // Income above this hits Middle rate
    // Threshold different from tax rate, (class taxed at 50% (rate) of income above 40% (threshold) for example)
    var upper_threshold = 0.8;  // Income above this hits Upper rate

    for (var d of Q.district_names) {
        for (var c in Q.class_incomes) {
            var proportion = (Q[d + '_' + c] || 0) / 10;
            var income = Q.class_incomes[c] || 0;

            if (proportion <= 0 || income <= 0) continue;

            // Marginal Taxation Calculation

            // 1. Portion taxed at Lower rate
            var lower_slice = Math.min(income, middle_threshold);
            var tax_from_lower = lower_slice * Q.lower_tax_rates;

            // 2. Portion taxed at Middle rate (only if income > middle_threshold)
            var middle_slice = Math.max(0, Math.min(income, upper_threshold) - middle_threshold);
            var tax_from_middle = middle_slice * Q.middle_tax_rates;

            // 3. Portion taxed at Upper rate (only if income > upper_threshold)
            var upper_slice = Math.max(0, income - upper_threshold);
            var tax_from_upper = upper_slice * Q.upper_tax_rates;

            // Sum the slices
            var total_tax_per_person = tax_from_lower + tax_from_middle + tax_from_upper;

            // Apply weight
            var revenue_slice = (Q[d + '_seats'] * proportion * total_tax_per_person) / 10;
            Number(revenue_slice.toFixed(5))
            total_revenue += revenue_slice;
            console.log('District and Class Data;', d, c, revenue_slice)
        }
    }
    console.log('THis is total revenue: ', total_revenue)
    return total_revenue.toFixed(2);
};



window.get_taxes_final = function(taxes_in_question) { 
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var lower_pop = Q.workers_population_percent + Q.rural_workers_population_percent + Q.farmhands_population_percent + Q.unemployed_population_percent + (Q.farmers_population_percent * 0.8);
    var middle_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.9 + (Q.farmers_population_percent)*0.2;
    var rich_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.1;

    console.log("These are the populations by wealth status")
    console.log(lower_pop);
    console.log(middle_pop);
    console.log(rich_pop);
}


window.region_info() = function() {

}



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
    var container = document.getElementById(elementID);
    
    if (!container) {
        setTimeout(function() { window.customgeneratemultibar(dataArray, outercolor, colorsArray, elementID, tooltips); }, 25);
        return;
    }

    var data = [].concat(dataArray);
    var colors = [].concat(colorsArray);
    var texts = [].concat(tooltips);

    // 1. Filter valid segments and calculate the TOTAL sum
    var valid = [];
    var absoluteTotal = 0; 

    for (var j = 0; j < data.length; j++) {
        var val = Number(data[j]);
        if (val > 0) {
            valid.push({ val: val, color: colors[j] || '#ccc', text: texts[j] || '' });
            absoluteTotal += val; 
        }
    }

    var innerSegmentsHtml = '';
    var currentPercentTotal = 0;

    // 2. Build the inner segments
    for (var i = 0; i < valid.length; i++) {
        var width = (valid[i].val / absoluteTotal) * 100;
        
        if (currentPercentTotal + width > 100) width = 100 - currentPercentTotal;
        currentPercentTotal += width;

        var radiusStyle = '';
        if (i === 0) radiusStyle += 'border-top-left-radius: 3px; border-bottom-left-radius: 3px; ';
        if (i === valid.length - 1 || currentPercentTotal >= 99.9) radiusStyle += 'border-top-right-radius: 3px; border-bottom-right-radius: 3px; ';

        // Notice we removed tt-center, tt-left, tt-right. The JS handles it now!
        innerSegmentsHtml += 
            '<div class="tooltip" style="position: relative; height: 100%; width: ' + width + '%; display: block;">' + 
                '<div style="background: ' + valid[i].color + '; opacity: 0.8; height: 100%; width: 100%; ' + radiusStyle + '"></div>' +
                '<span class="tooltip-text">' + valid[i].text + '</span>' +
            '</div>';
    }

    // Removed styleBlock completely. The HTML is much cleaner.
    container.innerHTML = 
        '<div style="width: 100%; position: relative;">' + 
            '<div style="display: flex; height: 15px; background: ' + outercolor + '; border-radius: 4px; border: 1px solid #000; overflow: visible;">' +
                innerSegmentsHtml + 
            '</div>' +
        '</div>';
};

//'<span id="' + elementID + '_tooltip" class="tooltip-text" style="text-align: center;">' + finalTooltipText + '</span>' + 

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