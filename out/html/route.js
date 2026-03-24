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

  var TITLE = "Beeshana Kalaya: An Alternate History" + '_' + "Communist45";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
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
  window.displayText = function (text) {
        return applyWholesome(text);
    };
  
    //To get a value 
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

    function getStatusText(value) {
        if (value === undefined || value === null) return '';
        if (value === 0) return '<span style="color: #9E9E9E;">Not Formed</span>';
        if (value === 1) return '<span style="color: #8B0000;">Active</span>';
        if (value === 2) return '<span style="color: #4F6F8F;">Disbanded</span>';
        if (value === 3) return '<span style="color: #556B2F;">Disarmed</span>';
        if (value === 4) return '<span style="color: #6A0DAD;">Amalgamated into the ENLF</span>';
        return 'Unknown';
    }
  
    function getSizeText(value) {
        if (value === undefined || value === null) return '';
        if (value <= 20) return '<span style="color: #6B7280;">Minimal</span>';
        if (value <= 40) return '<span style="color: #8B6F47;">Weak</span>';
        if (value <= 60) return '<span style="color: #556B2F;">Moderate</span>';
        if (value <= 80) return '<span style="color: #7A0000;">Strong</span>';
        return '<span style="color: #2B0000;">Very Strong</span>';
    }
  
    function getMilitancyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.05) return '<span style="color: #008000;">Nonexistent</span>';
        if (value <= 0.14) return '<span style="color: #32CD32;">Very low</span>';
        if (value <= 0.24) return '<span style="color: #9ACD32;">Low</span>';
        if (value <= 0.44) return '<span style="color: #FFD700;">Medium-low</span>';
        if (value <= 0.69) return '<span style="color: #FFA500;">Medium</span>';
        if (value <= 1) return '<span style="color: #FF4500;">High</span>';
        return '<span style="color: #FF0000;">Very high</span>';
    }
    
    function getLoyaltyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.06) return '<span style="color: #FF0000;">Completely disloyal</span>';
        if (value <= 0.19) return '<span style="color: #FF4500;">Very disloyal</span>';
        if (value <= 0.31) return '<span style="color: #FF8C00;">Generally disloyal</span>';
        if (value <= 0.41) return '<span style="color: #FFA500;">Mostly disloyal</span>';
        if (value <= 0.54) return '<span style="color: #FFD700;">Divided</span>';
        if (value <= 0.71) return '<span style="color: #9ACD32;">Mostly loyal</span>';
        if (value <= 0.95) return '<span style="color: #32CD32;">Generally loyal</span>';
        return '<span style="color: #008000;">Completely loyal</span>';
    }
  
    function getIdeologyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value == 0) return '<span style="color: #8B0000;">Revolutionary Socialism</span>';
        if (value == 1) return '<span style="color: #FF0000;">Marxism-Leninism</span>';
        if (value == 2) return '<span style="color: #E34234;">Democratic Socialism</span>';
        if (value == 3) return '<span style="color: #CD5C5C;">Left-wing Nationalism</span>';
        if (value == 4) return '<span style="color: #B22222;">Trotskyism</span>';
        if (value == 5) return '<span style="color: #FF8C00;">Sinhalese Buddhist Nationalism</span>';
        if (value == 6) return '<span style="color: #9932CC;">Federalism</span>';
        if (value == 7) return '<span style="color: #DAA520;">Tamil Eelam Separatism</span>';
        if (value == 8) return '<span style="color: #D2691E;">Indian Tamil Rights</span>';
        if (value == 9) return '<span style="color: #20B2AA;">Muslim Minority Politics</span>';
        if (value == 10) return '<span style="color: #FF69B4;">Social Democracy</span>';
        if (value == 11) return '<span style="color: #FFA500;">Tamil Nationalism</span>';
        if (value == 12) return '<span style="color: #FF6347;">Left Wing Populism</span>';
        if (value == 13) return '<span style="color: #228B22;">Conservatism</span>';
        if (value == 14) return '<span style="color: #32CD32;">Neo Liberalism</span>';
        if (value == 15) return '<span style="color: #800080;">Anti-Imperialism</span>';
        if (value == 16) return '<span style="color: #2E0854;">Unitary Stateism</span>';
        return 'Unknown';
    }
    //To check if extra dynamic or not
    function getDynamicTooltipContent(searchString, baseTooltip) {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? 
                window.dendryUI.dendryEngine.state.qualities : null;
        
        if (!Q) return baseTooltip.explanationText;
        
        if (searchString === 'SLPP' && Q.slpp_relation !== undefined) {
            var relationText = getRelationshipText(Q.slpp_relation);
            var ideologyText = getIdeologyText(Q.slpp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'SLMP' && Q.slmp_relation !== undefined) {
            var relationText = getRelationshipText(Q.slmp_relation);
            var ideologyText = getIdeologyText(Q.slmp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
      
        if (searchString === 'UNP' && Q.unp_relation !== undefined) {
            var relationText = getRelationshipText(Q.unp_relation);
            var ideologyText = getIdeologyText(Q.unp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'TULF' && Q.tulf_relation !== undefined) {
            var relationText = getRelationshipText(Q.tulf_relation);
            var ideologyText = getIdeologyText(Q.tulf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'PFLT' && Q.pflt_relation !== undefined) {
            var relationText = getRelationshipText(Q.pflt_relation);
            var ideologyText = getIdeologyText(Q.pflt_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'ACTC' && Q.actc_relation !== undefined) {
            var relationText = getRelationshipText(Q.actc_relation);
            var ideologyText = getIdeologyText(Q.actc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'DPLF' && Q.dplf_relation !== undefined) {
            var relationText = getRelationshipText(Q.dplf_relation);
            var ideologyText = getIdeologyText(Q.dplf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'JVP' && Q.jvp_relation !== undefined) {
            var relationText = getRelationshipText(Q.jvp_relation);
            var ideologyText = getIdeologyText(Q.jvp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'NPP' && Q.npp_relation !== undefined) {
            var relationText = getRelationshipText(Q.npp_relation);
            var ideologyText = getIdeologyText(Q.npp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'UCPF' && Q.ucpf_relation !== undefined) {
            var relationText = getRelationshipText(Q.ucpf_relation);
            var ideologyText = getIdeologyText(Q.ucpf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'CPSL' && Q.cpsl_relation !== undefined) {
            var relationText = getRelationshipText(Q.cpsl_relation);
            var ideologyText = getIdeologyText(Q.cpsl_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'LSSP' && Q.lssp_relation !== undefined) {
            var relationText = getRelationshipText(Q.lssp_relation);
            var ideologyText = getIdeologyText(Q.lssp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'NSSP' && Q.nssp_relation !== undefined) {
            var relationText = getRelationshipText(Q.nssp_relation);
            var ideologyText = getIdeologyText(Q.nssp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'MEP' && Q.mep_relation !== undefined) {
            var relationText = getRelationshipText(Q.mep_relation);
            var ideologyText = getIdeologyText(Q.mep_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'CWC' && Q.cwc_relation !== undefined) {
            var relationText = getRelationshipText(Q.cwc_relation);
            var ideologyText = getIdeologyText(Q.cwc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'SLMC' && Q.slmc_relation !== undefined) {
            var relationText = getRelationshipText(Q.slmc_relation);
            var ideologyText = getIdeologyText(Q.slmc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'JSS' && Q.jss_strength !== undefined) {
            var strength = getSizeText(Q.jss_strength);
            var status = getStatusText(Q.jss_gstatus);
            var militancy = getMilitancyText(Q.jss_militancy);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
     
        if (searchString === 'LTTE' && Q.ltte_strength !== undefined) {
            var strength = getSizeText(Q.ltte_strength);
            var militancy = getMilitancyText(Q.ltte_militancy);
            var status = getStatusText(Q.ltte_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
        if (searchString === 'TELO' && Q.telo_strength !== undefined) {
            var strength = getSizeText(Q.telo_strength);
            var status = getStatusText(Q.telo_gstatus);
            var militancy = getMilitancyText(Q.telo_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.telo_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.telo_ideology);
                var relationText = getRelationshipText(Q.telo_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }
        
        if (searchString === 'EPRLF' && Q.eprlf_strength !== undefined) {
            var strength = getSizeText(Q.eprlf_strength);
            var status = getStatusText(Q.eprlf_gstatus);
            var militancy = getMilitancyText(Q.eprlf_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.eprlf_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.eprlf_ideology);
                var relationText = getRelationshipText(Q.eprlf_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }

        if (searchString === 'EROS' && Q.eros_relation !== undefined) {
            var strength = getSizeText(Q.eros_strength);
            var status = getStatusText(Q.eros_gstatus);
            var militancy = getMilitancyText(Q.eros_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.eros_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.eros_ideology);
                var relationText = getRelationshipText(Q.eros_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }
        
        if (searchString === 'PLOTE' && Q.plote_strength !== undefined) {
            var strength = getSizeText(Q.plote_strength);
            var militancy = getMilitancyText(Q.plote_militancy);
            var status = getStatusText(Q.plote_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
       
        if (searchString === 'DJV' && Q.djv_strength !== undefined) {
            var strength = getSizeText(Q.djv_strength);
            var militancy = getMilitancyText(Q.djv_militancy);
            var status = getStatusText(Q.djv_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
      
        if (searchString === 'EPDP' && Q.epdp_strength !== undefined) {
            var strength = getSizeText(Q.epdp_strength);
            var militancy = getMilitancyText(Q.epdp_militancy);
            var status = getStatusText(Q.epdp_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'PRRA' && Q.prra_strength !== undefined) {
            var strength = getSizeText(Q.prra_strength);
            var militancy = getMilitancyText(Q.prra_militancy);
            var status = getStatusText(Q.prra_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'Eagles' && Q.eagles_strength !== undefined) {
            var strength = getSizeText(Q.eagles_strength);
            var militancy = getMilitancyText(Q.eagles_militancy);
            var status = getStatusText(Q.eagles_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'Black Cats' && Q.blackcats_strength !== undefined) {
            var strength = getSizeText(Q.blackcats_strength);
            var militancy = getMilitancyText(Q.blackcats_militancy);
            var status = getStatusText(Q.blackcats_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

       if (searchString === 'ENDLF' && Q.endlf_strength !== undefined) {
            var strength = getSizeText(Q.endlf_strength);
            var status = getStatusText(Q.endlf_gstatus);
            var militancy = getMilitancyText(Q.endlf_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;

            if (Q.endlf_gstatus == 3) {
                var ideologyText = getIdeologyText(Q.endlf_ideology);
                var relationText = getRelationshipText(Q.endlf_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }

        if (searchString === 'TNA' && Q.tna_strength !== undefined) {
            var strength = getSizeText(Q.tna_strength);
            var militancy = getMilitancyText(Q.tna_militancy);
            var status = getStatusText(Q.tna_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
        if (searchString === 'Sri Lanka Armed Forces' && Q.slaf_strength !== undefined) {
            var strength = Q.slaf_strength ? Q.slaf_strength : '0';
            var morale = getLoyaltyText(Q.slaf_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }

        if (searchString === 'Special Task Force' && Q.stf_strength !== undefined) {
            var strength = Q.stf_strength ? Q.stf_strength : '0';
            var morale = getLoyaltyText(Q.stf_morale);
            var status = getStatusText(Q.stf_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
      
        if (searchString === 'Sri Lanka Police' && Q.slp_strength !== undefined) {
            var strength = Q.slp_strength ? Q.slp_strength : '0';
            var morale = getLoyaltyText(Q.slp_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
        
        if (searchString === 'Civil Security' && Q.homeg_civilsec_strength !== undefined) {
            var strength = Q.homeg_civilsec_strength ? Q.homeg_civilsec_strength : '0';
            var morale = getLoyaltyText(Q.homeg_civilsec_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
        
        if (searchString === 'Home Guard' && Q.homeg_civilsec_strength !== undefined) {
            var strength = Q.homeg_civilsec_strength ? Q.homeg_civilsec_strength : '0';
            var morale = getLoyaltyText(Q.homeg_civilsec_morale);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }

        if (searchString === 'IPKF' && Q.ipkf_size !== undefined) {
            var strength = Q.ipkf_size ? Q.ipkf_morale : '0';
            var morale = getLoyaltyText(Q.ipkf_morale);
            var status = getStatusText(Q.ipkf_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
        
        return baseTooltip.explanationText;
    }
  
    function applyWholesome(str) {
        const allWords = new Set([
            ...tooltipList.map(t => t.searchString),
            ...colourList.map(c => c.word)
        ]);
    
        // Escape special regex characters in the words
        const escapedWords = [...allWords].map(word => 
            word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );
        
        const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'g');
    
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

}());

// Western Province
function Colombo_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Colombo";
  Q.district_sinhala = Q.colombo_d_sinhala;
  Q.district_sltamil = Q.colombo_d_sltamil;
  Q.district_itamil = Q.colombo_d_itamil;
  Q.district_muslim = Q.colombo_d_muslim;
  Q.district_others = Q.colombo_d_other;
  Q.district_worker = Q.colombo_d_worker;
  Q.district_middle = Q.colombo_d_middle;
  Q.district_upper = Q.colombo_d_upper;
  Q.district_rural = Q.colombo_d_rural;
  Q.district_control = Q.colombo_d_control;
  Q.district_infastructure = Q.colombo_d_infastructure;
  Q.district_seats = Q.colombo_d_seats;
  Q.district_industries = Q.colombo_d_industries;  
  window.updateSidebarRight(); 
}

function Gampaha_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Gampaha";
  Q.district_sinhala = Q.gampaha_d_sinhala;
  Q.district_sltamil = Q.gampaha_d_sltamil;
  Q.district_itamil = Q.gampaha_d_itamil;
  Q.district_muslim = Q.gampaha_d_muslim;
  Q.district_others = Q.gampaha_d_other;
  Q.district_worker = Q.gampaha_d_worker;
  Q.district_middle = Q.gampaha_d_middle;
  Q.district_upper = Q.gampaha_d_upper;
  Q.district_rural = Q.gampaha_d_rural;
  Q.district_control = Q.gampaha_d_control;
  Q.district_infastructure = Q.gampaha_d_infastructure;
  Q.district_seats = Q.gampaha_d_seats;
  Q.district_industries = Q.gampaha_d_industries;
  window.updateSidebarRight();
}

function Kalutara_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Kalutara";
  Q.district_sinhala = Q.kalutara_d_sinhala;
  Q.district_sltamil = Q.kalutara_d_sltamil;
  Q.district_itamil = Q.kalutara_d_itamil;
  Q.district_muslim = Q.kalutara_d_muslim;
  Q.district_others = Q.kalutara_d_other;
  Q.district_worker = Q.kalutara_d_worker;
  Q.district_middle = Q.kalutara_d_middle;
  Q.district_upper = Q.kalutara_d_upper;
  Q.district_rural = Q.kalutara_d_rural;
  Q.district_control = Q.kalutara_d_control;
  Q.district_infastructure = Q.kalutara_d_infastructure;
  Q.district_seats = Q.kalutara_d_seats;
  Q.district_industries = Q.kalutara_d_industries;
  window.updateSidebarRight();
}

// Central Province
function Kandy_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Kandy";
  Q.district_sinhala = Q.kandy_d_sinhala;
  Q.district_sltamil = Q.kandy_d_sltamil;
  Q.district_itamil = Q.kandy_d_itamil;
  Q.district_muslim = Q.kandy_d_muslim;
  Q.district_others = Q.kandy_d_other;
  Q.district_worker = Q.kandy_d_worker;
  Q.district_middle = Q.kandy_d_middle;
  Q.district_upper = Q.kandy_d_upper;
  Q.district_rural = Q.kandy_d_rural;
  Q.district_control = Q.kandy_d_control;
  Q.district_infastructure = Q.kandy_d_infastructure;
  Q.district_seats = Q.kandy_d_seats;
  Q.district_industries = Q.kandy_d_industries;
  window.updateSidebarRight();
}

function Matale_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Matale";
  Q.district_sinhala = Q.matale_d_sinhala;
  Q.district_sltamil = Q.matale_d_sltamil;
  Q.district_itamil = Q.matale_d_itamil;
  Q.district_muslim = Q.matale_d_muslim;
  Q.district_others = Q.matale_d_other;
  Q.district_worker = Q.matale_d_worker;
  Q.district_middle = Q.matale_d_middle;
  Q.district_upper = Q.matale_d_upper;
  Q.district_rural = Q.matale_d_rural;
  Q.district_control = Q.matale_d_control;
  Q.district_infastructure = Q.matale_d_infastructure;
  Q.district_seats = Q.matale_d_seats;
  Q.district_industries = Q.matale_d_industries;
  window.updateSidebarRight();
}

function NuwaraEliya_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Nuwara Eliya";
  Q.district_sinhala = Q.nuwaraeliya_d_sinhala;
  Q.district_sltamil = Q.nuwaraeliya_d_sltamil;
  Q.district_itamil = Q.nuwaraeliya_d_itamil;
  Q.district_muslim = Q.nuwaraeliya_d_muslim;
  Q.district_others = Q.nuwaraeliya_d_other;
  Q.district_worker = Q.nuwaraeliya_d_worker;
  Q.district_middle = Q.nuwaraeliya_d_middle;
  Q.district_upper = Q.nuwaraeliya_d_upper;
  Q.district_rural = Q.nuwaraeliya_d_rural;
  Q.district_control = Q.nuwaraeliya_d_control;
  Q.district_infastructure = Q.nuwaraeliya_d_infastructure;
  Q.district_seats = Q.nuwaraeliya_d_seats;
  Q.district_industries = Q.nuwaraeliya_d_industries;
  window.updateSidebarRight();
}

// Southern Province
function Galle_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Galle";
  Q.district_sinhala = Q.galle_d_sinhala;
  Q.district_sltamil = Q.galle_d_sltamil;
  Q.district_itamil = Q.galle_d_itamil;
  Q.district_muslim = Q.galle_d_muslim;
  Q.district_others = Q.galle_d_other;
  Q.district_worker = Q.galle_d_worker;
  Q.district_middle = Q.galle_d_middle;
  Q.district_upper = Q.galle_d_upper;
  Q.district_rural = Q.galle_d_rural;
  Q.district_control = Q.galle_d_control;
  Q.district_infastructure = Q.galle_d_infastructure;
  Q.district_seats = Q.galle_d_seats;
  Q.district_industries = Q.galle_d_industries;
  window.updateSidebarRight();
}

function Matara_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Matara";
  Q.district_sinhala = Q.matara_d_sinhala;
  Q.district_sltamil = Q.matara_d_sltamil;
  Q.district_itamil = Q.matara_d_itamil;
  Q.district_muslim = Q.matara_d_muslim;
  Q.district_others = Q.matara_d_other;
  Q.district_worker = Q.matara_d_worker;
  Q.district_middle = Q.matara_d_middle;
  Q.district_upper = Q.matara_d_upper;
  Q.district_rural = Q.matara_d_rural;
  Q.district_control = Q.matara_d_control;
  Q.district_infastructure = Q.matara_d_infastructure;
  Q.district_seats = Q.matara_d_seats;
  Q.district_industries = Q.matara_d_industries;
  window.updateSidebarRight();
}

function Hambantota_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Hambantota";
  Q.district_sinhala = Q.hambantota_d_sinhala;
  Q.district_sltamil = Q.hambantota_d_sltamil;
  Q.district_itamil = Q.hambantota_d_itamil;
  Q.district_muslim = Q.hambantota_d_muslim;
  Q.district_others = Q.hambantota_d_other;
  Q.district_worker = Q.hambantota_d_worker;
  Q.district_middle = Q.hambantota_d_middle;
  Q.district_upper = Q.hambantota_d_upper;
  Q.district_rural = Q.hambantota_d_rural;
  Q.district_control = Q.hambantota_d_control;
  Q.district_infastructure = Q.hambantota_d_infastructure;
  Q.district_seats = Q.hambantota_d_seats;
  Q.district_industries = Q.hambantota_d_industries;
  window.updateSidebarRight();
}

// Northern Province
function Jaffna_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Jaffna";
  Q.district_sinhala = Q.jaffna_d_sinhala;
  Q.district_sltamil = Q.jaffna_d_sltamil;
  Q.district_itamil = Q.jaffna_d_itamil;
  Q.district_muslim = Q.jaffna_d_muslim;
  Q.district_others = Q.jaffna_d_other;
  Q.district_worker = Q.jaffna_d_worker;
  Q.district_middle = Q.jaffna_d_middle;
  Q.district_upper = Q.jaffna_d_upper;
  Q.district_rural = Q.jaffna_d_rural;
  Q.district_control = Q.jaffna_d_control;
  Q.district_infastructure = Q.jaffna_d_infastructure;
  Q.district_seats = Q.jaffna_d_seats;
  Q.district_industries = Q.jaffna_d_industries;
  window.updateSidebarRight();
}

function Kilinochchi_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Kilinochchi";
  Q.district_sinhala = Q.kilinochchi_d_sinhala;
  Q.district_sltamil = Q.kilinochchi_d_sltamil;
  Q.district_itamil = Q.kilinochchi_d_itamil;
  Q.district_muslim = Q.kilinochchi_d_muslim;
  Q.district_others = Q.kilinochchi_d_other;
  Q.district_worker = Q.kilinochchi_d_worker;
  Q.district_middle = Q.kilinochchi_d_middle;
  Q.district_upper = Q.kilinochchi_d_upper;
  Q.district_rural = Q.kilinochchi_d_rural;
  Q.district_control = Q.kilinochchi_d_control;
  Q.district_infastructure = Q.kilinochchi_d_infastructure;
  Q.district_seats = Q.kilinochchi_d_seats;
  Q.district_industries = Q.kilinochchi_d_industries;
  window.updateSidebarRight();
}

function Mannar_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Mannar";
  Q.district_sinhala = Q.mannar_d_sinhala;
  Q.district_sltamil = Q.mannar_d_sltamil;
  Q.district_itamil = Q.mannar_d_itamil;
  Q.district_muslim = Q.mannar_d_muslim;
  Q.district_others = Q.mannar_d_other;
  Q.district_worker = Q.mannar_d_worker;
  Q.district_middle = Q.mannar_d_middle;
  Q.district_upper = Q.mannar_d_upper;
  Q.district_rural = Q.mannar_d_rural;
  Q.district_control = Q.mannar_d_control;
  Q.district_infastructure = Q.mannar_d_infastructure;
  Q.district_seats = Q.mannar_d_seats;
  Q.district_industries = Q.mannar_d_industries;
  window.updateSidebarRight();
}

function Mullaitivu_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Mullaitivu";
  Q.district_sinhala = Q.mullaitivu_d_sinhala;
  Q.district_sltamil = Q.mullaitivu_d_sltamil;
  Q.district_itamil = Q.mullaitivu_d_itamil;
  Q.district_muslim = Q.mullaitivu_d_muslim;
  Q.district_others = Q.mullaitivu_d_other;
  Q.district_worker = Q.mullaitivu_d_worker;
  Q.district_middle = Q.mullaitivu_d_middle;
  Q.district_upper = Q.mullaitivu_d_upper;
  Q.district_rural = Q.mullaitivu_d_rural;
  Q.district_control = Q.mullaitivu_d_control;
  Q.district_infastructure = Q.mullaitivu_d_infastructure;
  Q.district_seats = Q.mullaitivu_d_seats;
  Q.district_industries = Q.mullaitivu_d_industries;
  window.updateSidebarRight();
}

function Vavuniya_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Vavuniya";
  Q.district_sinhala = Q.vavuniya_d_sinhala;
  Q.district_sltamil = Q.vavuniya_d_sltamil;
  Q.district_itamil = Q.vavuniya_d_itamil;
  Q.district_muslim = Q.vavuniya_d_muslim;
  Q.district_others = Q.vavuniya_d_other;
  Q.district_worker = Q.vavuniya_d_worker;
  Q.district_middle = Q.vavuniya_d_middle;
  Q.district_upper = Q.vavuniya_d_upper;
  Q.district_rural = Q.vavuniya_d_rural;
  Q.district_control = Q.vavuniya_d_control;
  Q.district_infastructure = Q.vavuniya_d_infastructure;
  Q.district_seats = Q.vavuniya_d_seats;
  Q.district_industries = Q.vavuniya_d_industries;
  window.updateSidebarRight();
}

// Eastern Province
function Batticaloa_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Batticaloa";
  Q.district_sinhala = Q.batticaloa_d_sinhala;
  Q.district_sltamil = Q.batticaloa_d_sltamil;
  Q.district_itamil = Q.batticaloa_d_itamil;
  Q.district_muslim = Q.batticaloa_d_muslim;
  Q.district_others = Q.batticaloa_d_other;
  Q.district_worker = Q.batticaloa_d_worker;
  Q.district_middle = Q.batticaloa_d_middle;
  Q.district_upper = Q.batticaloa_d_upper;
  Q.district_rural = Q.batticaloa_d_rural;
  Q.district_control = Q.batticaloa_d_control;
  Q.district_infastructure = Q.batticaloa_d_infastructure;
  Q.district_seats = Q.batticaloa_d_seats;
  Q.district_industries = Q.batticaloa_d_industries;
  window.updateSidebarRight();
}

function Ampara_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Ampara";
  Q.district_sinhala = Q.ampara_d_sinhala;
  Q.district_sltamil = Q.ampara_d_sltamil;
  Q.district_itamil = Q.ampara_d_itamil;
  Q.district_muslim = Q.ampara_d_muslim;
  Q.district_others = Q.ampara_d_other;
  Q.district_worker = Q.ampara_d_worker;
  Q.district_middle = Q.ampara_d_middle;
  Q.district_upper = Q.ampara_d_upper;
  Q.district_rural = Q.ampara_d_rural;
  Q.district_control = Q.ampara_d_control;
  Q.district_infastructure = Q.ampara_d_infastructure;
  Q.district_seats = Q.ampara_d_seats;
  Q.district_industries = Q.ampara_d_industries;
  window.updateSidebarRight();
}

function Trincomalee_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Trincomalee";
  Q.district_sinhala = Q.trincomalee_d_sinhala;
  Q.district_sltamil = Q.trincomalee_d_sltamil;
  Q.district_itamil = Q.trincomalee_d_itamil;
  Q.district_muslim = Q.trincomalee_d_muslim;
  Q.district_others = Q.trincomalee_d_other;
  Q.district_worker = Q.trincomalee_d_worker;
  Q.district_middle = Q.trincomalee_d_middle;
  Q.district_upper = Q.trincomalee_d_upper;
  Q.district_rural = Q.trincomalee_d_rural;
  Q.district_control = Q.trincomalee_d_control;
  Q.district_infastructure = Q.trincomalee_d_infastructure;
  Q.district_seats = Q.trincomalee_d_seats;
  Q.district_industries = Q.trincomalee_d_industries;
  window.updateSidebarRight();
}

// North Western Province
function Kurunegala_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Kurunegala";
  Q.district_sinhala = Q.kurunegala_d_sinhala;
  Q.district_sltamil = Q.kurunegala_d_sltamil;
  Q.district_itamil = Q.kurunegala_d_itamil;
  Q.district_muslim = Q.kurunegala_d_muslim;
  Q.district_others = Q.kurunegala_d_other;
  Q.district_worker = Q.kurunegala_d_worker;
  Q.district_middle = Q.kurunegala_d_middle;
  Q.district_upper = Q.kurunegala_d_upper;
  Q.district_rural = Q.kurunegala_d_rural;
  Q.district_control = Q.kurunegala_d_control;
  Q.district_infastructure = Q.kurunegala_d_infastructure;
  Q.district_seats = Q.kurunegala_d_seats;
  Q.district_industries = Q.kurunegala_d_industries;
  window.updateSidebarRight();
}

function Puttalam_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Puttalam";
  Q.district_sinhala = Q.puttalam_d_sinhala;
  Q.district_sltamil = Q.puttalam_d_sltamil;
  Q.district_itamil = Q.puttalam_d_itamil;
  Q.district_muslim = Q.puttalam_d_muslim;
  Q.district_others = Q.puttalam_d_other;
  Q.district_worker = Q.puttalam_d_worker;
  Q.district_middle = Q.puttalam_d_middle;
  Q.district_upper = Q.puttalam_d_upper;
  Q.district_rural = Q.puttalam_d_rural;
  Q.district_control = Q.puttalam_d_control;
  Q.district_infastructure = Q.puttalam_d_infastructure;
  Q.district_seats = Q.puttalam_d_seats;
  Q.district_industries = Q.puttalam_d_industries;
  window.updateSidebarRight();
}

// North Central Province
function Anuradhapura_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Anuradhapura";
  Q.district_sinhala = Q.anuradhapura_d_sinhala;
  Q.district_sltamil = Q.anuradhapura_d_sltamil;
  Q.district_itamil = Q.anuradhapura_d_itamil;
  Q.district_muslim = Q.anuradhapura_d_muslim;
  Q.district_others = Q.anuradhapura_d_other;
  Q.district_worker = Q.anuradhapura_d_worker;
  Q.district_middle = Q.anuradhapura_d_middle;
  Q.district_upper = Q.anuradhapura_d_upper;
  Q.district_rural = Q.anuradhapura_d_rural;
  Q.district_control = Q.anuradhapura_d_control;
  Q.district_infastructure = Q.anuradhapura_d_infastructure;
  Q.district_seats = Q.anuradhapura_d_seats;
  Q.district_industries = Q.anuradhapura_d_industries;
  window.updateSidebarRight();
}

function Polonnaruwa_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Polonnaruwa";
  Q.district_sinhala = Q.polonnaruwa_d_sinhala;
  Q.district_sltamil = Q.polonnaruwa_d_sltamil;
  Q.district_itamil = Q.polonnaruwa_d_itamil;
  Q.district_muslim = Q.polonnaruwa_d_muslim;
  Q.district_others = Q.polonnaruwa_d_other;
  Q.district_worker = Q.polonnaruwa_d_worker;
  Q.district_middle = Q.polonnaruwa_d_middle;
  Q.district_upper = Q.polonnaruwa_d_upper;
  Q.district_rural = Q.polonnaruwa_d_rural;
  Q.district_control = Q.polonnaruwa_d_control;
  Q.district_infastructure = Q.polonnaruwa_d_infastructure;
  Q.district_seats = Q.polonnaruwa_d_seats;
  Q.district_industries = Q.polonnaruwa_d_industries;
  window.updateSidebarRight();
}

// Uva Province
function Badulla_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Badulla";
  Q.district_sinhala = Q.badulla_d_sinhala;
  Q.district_sltamil = Q.badulla_d_sltamil;
  Q.district_itamil = Q.badulla_d_itamil;
  Q.district_muslim = Q.badulla_d_muslim;
  Q.district_others = Q.badulla_d_other;
  Q.district_worker = Q.badulla_d_worker;
  Q.district_middle = Q.badulla_d_middle;
  Q.district_upper = Q.badulla_d_upper;
  Q.district_rural = Q.badulla_d_rural;
  Q.district_control = Q.badulla_d_control;
  Q.district_infastructure = Q.badulla_d_infastructure;
  Q.district_seats = Q.badulla_d_seats;
  Q.district_industries = Q.badulla_d_industries;
  window.updateSidebarRight();
}

function Monaragala_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Monaragala";
  Q.district_sinhala = Q.monaragala_d_sinhala;
  Q.district_sltamil = Q.monaragala_d_sltamil;
  Q.district_itamil = Q.monaragala_d_itamil;
  Q.district_muslim = Q.monaragala_d_muslim;
  Q.district_others = Q.monaragala_d_other;
  Q.district_worker = Q.monaragala_d_worker;
  Q.district_middle = Q.monaragala_d_middle;
  Q.district_upper = Q.monaragala_d_upper;
  Q.district_rural = Q.monaragala_d_rural;
  Q.district_control = Q.monaragala_d_control;
  Q.district_infastructure = Q.monaragala_d_infastructure;
  Q.district_seats = Q.monaragala_d_seats;
  Q.district_industries = Q.monaragala_d_industries;
  window.updateSidebarRight();
}

// Sabaragamuwa Province
function Ratnapura_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Ratnapura";
  Q.district_sinhala = Q.ratnapura_d_sinhala;
  Q.district_sltamil = Q.ratnapura_d_sltamil;
  Q.district_itamil = Q.ratnapura_d_itamil;
  Q.district_muslim = Q.ratnapura_d_muslim;
  Q.district_others = Q.ratnapura_d_other;
  Q.district_worker = Q.ratnapura_d_worker;
  Q.district_middle = Q.ratnapura_d_middle;
  Q.district_upper = Q.ratnapura_d_upper;
  Q.district_rural = Q.ratnapura_d_rural;
  Q.district_control = Q.ratnapura_d_control;
  Q.district_infastructure = Q.ratnapura_d_infastructure;
  Q.district_seats = Q.ratnapura_d_seats;
  Q.district_industries = Q.ratnapura_d_industries;
  window.updateSidebarRight();
}

function Kegalle_info() {
  var Q = window.dendryUI.dendryEngine.state.qualities;
  Q.district_name = "Kegalle";
  Q.district_sinhala = Q.kegalle_d_sinhala;
  Q.district_sltamil = Q.kegalle_d_sltamil;
  Q.district_itamil = Q.kegalle_d_itamil;
  Q.district_muslim = Q.kegalle_d_muslim;
  Q.district_others = Q.kegalle_d_other;
  Q.district_worker = Q.kegalle_d_worker;
  Q.district_middle = Q.kegalle_d_middle;
  Q.district_upper = Q.kegalle_d_upper;
  Q.district_rural = Q.kegalle_d_rural;
  Q.district_control = Q.kegalle_d_control;
  Q.district_infastructure = Q.kegalle_d_infastructure;
  Q.district_seats = Q.kegalle_d_seats;
  Q.district_industries = Q.kegalle_d_industries;
  window.updateSidebarRight();
}

document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mytooltiptext').forEach(el => {
        el.style.setProperty('--mouse-x', e.clientX + 'px');
        el.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});