window.westminster = function(container_id, forming_government) {
    // container_id has to be an svg for this to work
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var brit_mode = false; // Handles whether speaker is non-affiliated (uk) or a party member (canada) and whether circles (uk) or squares (canada)
    var sask_mode = true; // This will create paired seats
    var house_width = 3; 
    var container = document.getElementById(container_id);

    container.innerHTML = ''; //Remove any previous html inside the container first

    var data = Q.parliament_diagram; // This may not be applicable to base game
    // If you are seeking to use this function yourself, find all instances of the 'vara data' variable (1 in root, 1 in 1928_election scene, and possibly 1 in post_event) and then make Q.parliament_diagram equal to it. 
    
    var parties_list = Q.parties || ['ccf', 'cpc_s', 'pps', 'lps', 'cps', 'scps', 'other']; ;

    var governing_parties_list = [];
    var governing_seats = 0; 
    var opposition_parties_list = []; 
    var opposition_seats = 0; 

    var party_seats = 0;
    var speaker_party = null;

    // Lets get seats and id for government parties and hand speaker to the largest
    for (var party of parties_list) {
        if (Q[party + '_in_government']) {
            var old_party_seats = party_seats;
            party_seats = Q[party + '_seats']; 
            governing_parties_list.push([party, party_seats]);

            governing_seats += party_seats; 

            if (old_party_seats < party_seats) {
                speaker_party = party;
            };
        }
    };

    // This removes one seat from the SOTH party
    var gov_spk_entry = governing_parties_list.find(p => p[0] == speaker_party);
    if (gov_spk_entry) gov_spk_entry[1] -= 1;

    // Now let's get seats and id for opposition parties
    for (var party of parties_list) {
        if (!Q[party + '_in_government']) {
            party_seats = Q[party + '_seats']; 
            opposition_parties_list.push([party, party_seats]);

            opposition_seats += party_seats;
        }
    };

    // First option: british mode second: Canada
    var soth = brit_mode ? `<circle id="soth" cx="-60" cy="65" r="6"></circle>` : `<rect id="soth" class="seat ${speaker_party}" x="-60" y="65" height="12px" width="12px" stroke="black" stroke-width="1" />`; // This is the speaker of the house circle and it's cords

    var parliament_html = soth;

    // For now, this will be for displaying parliament, not creating a new government
    // Animations are planned for forming new government
    if (!forming_government) {

        var x = -30; 
        var opp_y_base = 60;
        var y = opp_y_base; 
        var seats_in_row = 0;
        var opp_count = 1;
        var opp_col_index = 0;

        for (var party of opposition_parties_list) {
            var party_id = party[0];
            var seats_to_add = party[1]; 
            
            for (var s = 0; s < seats_to_add; s++) {

                // This is for new row
                if (seats_in_row >= house_width) {
                    opp_col_index++;
                    x += 15; 
                    y = opp_y_base; 
                    seats_in_row = 0;
                    
                    // Extra gap after every second column
                    if (sask_mode && opp_col_index % 2 === 0) {
                        x += 5; 
                    }
                }
                
                y -= 15; 
                seats_in_row += 1;

                var id = 'O' + opp_count;
                addSeat(id, party_id, x, y, container);
                opp_count += 1;
            }
        }

        // Let's load base settings for government side
        var x = -30; 
        var gov_y_base = 75; 
        y = gov_y_base; 
        var seats_in_row = 0;
        var gov_count = 1;
        var gov_col_index = 0;

        for (var party of governing_parties_list) {
            var party_id = party[0];
            var seats_to_add = party[1]; 
            
            for (var s = 0; s < seats_to_add; s++) {
                if (seats_in_row >= house_width) {
                    gov_col_index++;
                    x += 15; 
                    y = gov_y_base; // Reset to base Y
                    seats_in_row = 0;
                    
                    // Extra gap after every second column
                    if (sask_mode && gov_col_index % 2 === 0) {
                        x += 5; 
                    }
                }
                
                // Adding 15 moves the government seats DOWN towards the bottom of the screen
                y += 15; 
                seats_in_row += 1;

                var id = 'G' + gov_count;
                addSeat(id, party_id, x, y, container);
                gov_count += 1;
            }
        }
    };

    // Now let's apply all of that to the container
    container.innerHTML += parliament_html;
};

function addSeat(id, party_id, x, y, container) {

    var dx;
    var dy;

    var viewBox = container.viewBox.baseVal;

    var centerX = viewBox.width
        ? viewBox.x + viewBox.width / 2
        : 0;

    var centerY = viewBox.height
        ? viewBox.y + viewBox.height / 2
        : 0;

    if (brit_mode) {
        // Circle's center is cx/cy
        dx = centerX - x;
        dy = centerY - y;

        parliament_html +=
            `<circle id="${id}" class="seat ${party_id}"
                cx="${x}" cy="${y}" r="6"
                ${forming_government ? `transform="translate(${dx} ${dy})"` : ''}>
            </circle>`;
    } else {
        // Rect's center is x+6 / y+6
        dx = centerX - (x + 6);
        dy = centerY - (y + 6);

        parliament_html +=
            `<rect id="${id}" class="seat ${party_id}"
                x="${x}" y="${y}"
                height="12px" width="12px"
                stroke="black" stroke-width="1"
                ${forming_government ? `transform="translate(${dx} ${dy})"` : ''} />`;
    }
}

// Thanks so much to LBJ's Force Ghost on the SDAAH discord for the idea behind this function!