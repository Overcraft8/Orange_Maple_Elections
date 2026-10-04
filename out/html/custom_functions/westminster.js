window.westminster = function(container_id, forming_government) {
    // container_id has to be an svg for this to work
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var brit_mode = false; // Handles whether speaker is non-affiliated (uk) or a party member (canada) and whether circles (uk) or squares (canada)
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

    // This will color the Speaker with their party
    if (!brit_mode && speaker_party) {
        var soth = brit_mode ? `<circle id="soth" cx="15" cy="65" r="6"></circle>` : `<rect id="soth" x="15" y="65" height="15px" width="15px" stroke="black" stroke-width="2" />`; // This is the speaker of the house circle and it's cords
    }

    var parliament_html = soth;

    // For now, this will be for displaying parliament, not creating a new government
    // Animations are planned for forming new government
    if (!forming_government) {

        // This is for opposition seats
        var x = 40; 
        var y = 60; 
        var seats_in_row = 0;
        var opp_count = 1;

        for (var party of opposition_parties_list) {
            var party_id = party[0];
            var seats_to_add = party[1]; 
            
            for (var s = 0; s < seats_to_add; s++) {
                // Start a new column once we are past house_width
                if (seats_in_row >= house_width) {
                    x += 15; 
                    y = 60;
                    seats_in_row = 0;
                }
                y -= 15; 
                seats_in_row += 1;

                var id = 'O' + opp_count;
                // Generate the circle with party class, ternary operator for circles vs squares
                parliament_html += brit_mode ? `<circle id="${id}" class="seat ${party_id}" cx="${x}" cy="${y}" r="6"></circle>` : `<rect id="${id}" class="seat ${party_id}" x="${x}" y="${y}" height="15px" width="15px" stroke="black" stroke-width="2" />`;
                
                opp_count += 1;
            }
        };

        // Now let's load government seats
        // Reset base settings for government side
        x = 40; 
        y = 70; 
        seats_in_row = 0;
        var gov_count = 1;

        for (var party of governing_parties_list) {
            var party_id = party[0];
            var seats_to_add = party[1]; 
            
            for (var s = 0; s < seats_to_add; s++) {
                if (seats_in_row >= house_width) {
                    x += 15; 
                    y = 70;
                    seats_in_row = 0;
                }
                y += 15; 
                seats_in_row += 1;

                var id = 'G' + gov_count;
                parliament_html += brit_mode ? `<circle id="${id}" class="seat ${party_id}" cx="${x}" cy="${y}" r="6"></circle>` : `<rect id="${id}" class="seat ${party_id}" x="${x}" y="${y}" height="15px" width="15px" stroke="black" stroke-width="2" />`;
                
                gov_count += 1;
            }
        };
    }

    // Now let's apply all of that to the container
    container.innerHTML += parliament_html;
};

// Thanks so much to LBJ's Force Ghost on the SDAAH discord for the idea behind this function!