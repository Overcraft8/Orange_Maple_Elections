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
        case 'CP(S)': 
            if (Q.cp_s_ideology === "Marxism-Leninism") return '<span style="color: #4c0e0e;">Far Left</span> (Marxist-Leninist)';
            if (Q.cp_s_ideology === "Popular Front Socialism") return '<span style="color: #4c0e0e;">Edgy Left Wing</span> (Popular Front Socialism)';
            return 'Unknown';
        case 'FLP':
        case 'CCF':
            if (Q.flp_ideology === "Democratic Socialism") return '<span style="color: #c46124;">Left Wing</span> (Democratic Socialism)';
            if (Q.flp_ideology === "Social Democracy") return '<span style="color: #eca12a;">Centre Left</span>  (Social Democracy)';
            if (Q.flp_ideology === "Popular Front Socialism") return '<span style="color: #C42424;">Edgy Left Wing</span> (Popular Front Socialism)';
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
        'FLP': 'flp_ideology', 
        'PPS': 'pps_ideology', 
        'LPS': 'lps_ideology', 
        'CPS': 'cps_ideology', 
        'SCPS': 'scps_ideology'
    };

    const party_seats = {
        'CP(S)': 'cp_s_seats',
        'FLP': 'flp_seats',
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
    if (searchString === 'FLP' || searchString === 'CCF(SS)') {
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


// ---------------------------------------------------------------
//   IMPORTANT STUFF


window.sidebar3Collapsed = false;








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



  window.updateSidebar = function () {
        $('#qualities').empty();
        var statusScene = dendryUI.game.scenes["status"];
        var scene = dendryUI.game.scenes[window.statusTab];
        dendryUI.dendryEngine._runActions(statusScene.onArrival);
        dendryUI.dendryEngine._runActions(scene.onArrival);
        var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
        var htmlContent = dendryUI.contentToHTML.convert(displayContent);
        // Sanitize HTML to prevent script execution errors
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        // Remove any script tags
        tempDiv.querySelectorAll('script').forEach(script => script.remove());
        $('#qualities').html(tempDiv.innerHTML);
        dendryUI.dendryEngine._runActions(scene.onDisplay);


        if (!window.sidebar3Collapsed) {
            $('#qualities_3').empty();
            var scene3 = dendryUI.game.scenes[window.statusTab3];
            if (scene3) {
                dendryUI.dendryEngine._runActions(scene3.onArrival);
                var dc3 = dendryUI.dendryEngine._makeDisplayContent(scene3.content, true);
                $('#qualities_3').append(dendryUI.contentToHTML.convert(dc3));
            }
        }
        
    };

    window.updateSidebarRight = function() {
    $('#qualities_right').empty();
    var scene = dendryUI.game.scenes[window.statusTabRight];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    var htmlContent = dendryUI.contentToHTML.convert(displayContent);
    // Sanitize HTML to prevent script execution errors
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    // Remove any script tags
    tempDiv.querySelectorAll('script').forEach(script => script.remove());
    $('#qualities_right').html(tempDiv.innerHTML);
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

window.onDisplayContent = function() {
    window.updateSidebar();
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
    // Was originally at false
    window.dendryUI.loadSettings({show_portraits: true});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

})();

document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mytooltiptext').forEach(el => {
        el.style.setProperty('--mouse-x', e.clientX + 'px');
        el.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});


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



window.renderPollsChart = function(pollsData) {
    try {
        if (typeof d3 === 'undefined') {
            setTimeout(() => window.renderPollsChart(pollsData), 100);
            return;
        }

        const container = document.getElementById("overall-polls-chart");
        if (!container) {
            setTimeout(() => window.renderPollsChart(pollsData), 100);
            return; 
        }

        const width = Math.min(container.offsetWidth || 500, 500);
        const height = 200;
        
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Clear previous content
        d3.select(container).selectAll("*").remove();

        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(pollsData.map(d => d.party))
            .range([0, chartWidth])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([chartHeight, 0]);

        // Draw Y-axis
        g.append("g")
            .call(d3.axisLeft(yScale))
            .style("font-size", "12px");

        // Draw Y-axis label
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Vote Share (%)");

        // Draw bars
        g.selectAll(".bar")
            .data(pollsData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.party))
            .attr("y", d => yScale(d.votes))
            .attr("width", xScale.bandwidth())
            .attr("height", d => chartHeight - yScale(d.votes))
            .attr("fill", d => d.color)
            .style("stroke", "#333")
            .style("stroke-width", 1);

        // Draw value labels on bars
        g.selectAll(".bar-label")
            .data(pollsData)
            .enter().append("text")
            .attr("class", "bar-label")
            .attr("x", d => xScale(d.party) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.votes) - 5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(d => `${d.votes}%`);

        // Draw X-axis
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale))
            .style("font-size", "12px");
    } catch (err) {
        console.error('Error rendering overall polls chart:', err);
    }
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
            absoluteTotal += val; // Add to our grand total
        }
    }

    var innerSegmentsHtml = '';
    var currentPercentTotal = 0;

    // 2. Build the inner segments using normalized math
    for (var i = 0; i < valid.length; i++) {
        var width = (valid[i].val / absoluteTotal) * 100;
        
        if (currentPercentTotal + width > 100) width = 100 - currentPercentTotal;
        currentPercentTotal += width;

        var radiusStyle = '';
        if (i === 0) radiusStyle += 'border-top-left-radius: 3px; border-bottom-left-radius: 3px; ';
        if (i === valid.length - 1 || currentPercentTotal >= 99.9) radiusStyle += 'border-top-right-radius: 3px; border-bottom-right-radius: 3px; ';

        var alignClass = 'tt-center';
        if (i === 0) alignClass = 'tt-left';
        else if (i === valid.length - 1 || currentPercentTotal >= 99.9) alignClass = 'tt-right';

        innerSegmentsHtml += 
            '<div class="tooltip ' + alignClass + '" style="position: relative; height: 100%; width: ' + width + '%; display: block;">' + 
                '<div style="background: ' + valid[i].color + '; opacity: 0.8; height: 100%; width: 100%; ' + radiusStyle + '"></div>' +
                '<span class="tooltip-text">' + valid[i].text + '</span>' +
            '</div>';
    }

    var styleBlock = 
        '<style>' +
            '.tt-left .tooltip-text { left: 0; transform: translateY(5px); } ' +
            '.tt-left:hover .tooltip-text { transform: translateY(0); opacity: 1; } ' +
            '.tt-right .tooltip-text { left: auto; right: 0; transform: translateY(5px); } ' +
            '.tt-right:hover .tooltip-text { transform: translateY(0); opacity: 1; } ' +
            '.tt-center .tooltip-text { left: 50%; transform: translateX(-50%) translateY(5px); } ' +
            '.tt-center:hover .tooltip-text { transform: translateX(-50%) translateY(0); opacity: 1; } ' +
        '</style>';

    container.innerHTML = styleBlock + 
        '<div style="width: 100%; position: relative;">' + 
            '<div style="display: flex; height: 15px; background: ' + outercolor + '; border-radius: 4px; border: 1px solid #000; overflow: visible;">' +
                innerSegmentsHtml + 
            '</div>' +
        '</div>';
};

//'<span id="' + elementID + '_tooltip" class="tooltip-text" style="text-align: center;">' + finalTooltipText + '</span>' + 

window.get_tax = function(tax_in_question) {
    var val = Number(tax_in_question);
    
    // Formula: (Value + 8) * 2.5
    // Example: If val is -8: (-8 + 8) * 2.5 = 0%
    // Example: If val is -7: (-7 + 8) * 2.5 = 2.5%
    // Example: If val is 0:  (0 + 8) * 2.5 = 20%
    var percent = (val + 8) * 2.5;

    return "<span style='color: #187714;'>" + percent + "%</span>";
};

window.get_taxes = function(taxes_in_question) {
    if (!Array.isArray(taxes_in_question)) return "";

    var return_this = '<div style="line-height: 1.4;">';
    
    for (var i = 0; i < taxes_in_question.length; i++) {
        var item = taxes_in_question[i];
        var val = Number(item.val);
        var percent = val * 2.5;
        
        // Include the name followed by the percentage
        return_this += "<strong>" + item.name + ":</strong> " + 
                       "<span style='color: #187714;'>" + percent + "%</span><br>";
    }
    
    return_this += '</div>';
    return return_this;
};

window.get_taxes_final = function(taxes_in_question) { 
    var lower_pop = Q.workers_population_percent + Q.rural_workers_population_percent + Q.farmhand_population_percent + (farmers_population_percent * 0.8);
    var middle_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.9 + (farmers_population_percent)*0.2;
    var rich_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.1;

    console.log("These are the populations by wealth status")
    console.log(lower_pop);
    console.log(middle_pop);
    console.log(rich_pop);
}