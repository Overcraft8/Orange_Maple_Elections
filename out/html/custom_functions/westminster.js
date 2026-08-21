window.westminster = function(container_id, forming_government) {
    // container_id has to be an svg for this to work????
    // forming_government planned to be boolean indicating whether loading initial seat counts or actual government formation

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var brit_mode = false; 

    var house_width = 3; // how many rows?
    var seats = 70;
    var container = document.getElementById(container_id);

    container.innerHTML = ''; //This removes all html inside the westminster parliament container

    var data = Q.parliament_diagram; // Retrieving data (Might not be applicable to base game)
    // Basically just find the data variable in root scene that holds party info like legend, id, seats - declare Q[any_var_name_really] = data right after data has appended all parties and then place it here
    // you'd also probably have to do same with data var inside election_1928 scene if you want it to update with elections

    var practice_svg = `<svg width="40" height="40" style="vertical-align: middle;">
        <circle cx="20" cy="20" r="6" stroke="black" stroke-width="3" fill="orange"></circle>
    </svg>`; //This loads an svg with an orange circle

    var base_circle = `<circle cx="40" cy="20" r="6" stroke="black" stroke-width="3" fill="orange"></circle>`;
    // The orange circle in question

    var soth = `<circle id="soth" cx="15" cy="65" r="6"></circle>`;

    var governing_parties_list = [];

    // Let's find out who's the soth...
    // For now, this will give SOTH to the largest party in government

    var party_seats = 0;

    // Lets get seats for government parties and hand speaker to the largest
    for (var party of Q.parties) {
        if (Q[party + '_in_government']) {
            var old_party_seats = party_seats;
            party_seats = Q[party + '_seats']; 
            governing_parties_list.push([party, party_seats]);

            if (old_party_seats < party_seats) {
                var speaker_party = party;
            };
        }
    };

    // This will color the Speaker with their party
    if (!brit_mode) {
        soth = `<circle id="soth" class="seat ${speaker_party}" cx="5" cy="65" r="6"></circle>`;
    }

    // This finds the speaker party in the data var and subtracts one seat for the SOTH
    var speaker_entry = data.find(p => p.id == speaker_party);
    speaker_entry.seats -= 1;
    

    container.innerHTML += soth;

    // Base settings for opposition seats
    var x = 40; 
    var y = 60; 
    var id_number = 0;
    var seats_in_row = 0;

    // These are opposition benches
    for (var i = 0; i < seats; i++) {
        if (seats_in_row >= house_width) {
            x += 15; 
            y = 60;
            seats_in_row = 0;
        }

        y -= 15; 
        seats_in_row += 1;

        id_number += 1;

        var id = 'O' + id_number;

        var calc_circle = `<circle id="${id}" cx="${x}" cy="${y}" display="none" r="6" fill="tan"></circle>`;

        container.innerHTML += calc_circle;
    }

    // Base settings for government seats
    var x = 40; 
    var y = 70; 
    var id_number = 0;
    var seats_in_row = 0;

    // These are government benches
    for (var i = 0; i < seats; i++) {
        if (seats_in_row >= house_width) {
            x += 15; 
            y = 70;
            seats_in_row = 0;
        }

        y += 15; 
        seats_in_row += 1;

        id_number += 1;

        var id = 'G' + id_number;

        var calc_circle = `<circle id="${id}" cx="${x}" cy="${y}" display="none" r="6" fill="tan"></circle>`;

        container.innerHTML += calc_circle;
    }


    // container.innerHTML += base_circle

    // For now, this will be for displaying parliament, not creating a new government
    if (!forming_government) {

        var gov_count = 1;
        var opp_count = 1;

        for (var i = 0; i < data.length; i++) {
            var party = data[i]; // Calling index and returns party as the party's dictionary info
            var party_name = party.name; // Calling index property essentially
            var seat_count = party.seats;
            var party_id = party.id;
            var bench = party.bench; 

            // 0 Indicating Opposition
            if (bench == 0) {
                bench = 'O'

                // Now this is the loop to change base circles to coloured party circles
                for (var s = 0; s < seat_count; s++) {
                    var selected_circle = document.getElementById(bench + opp_count); 
                    selected_circle.classList.add('seat', party_id); 
                    selected_circle.style.display = 'block';
                    opp_count += 1;
                };
            }

            // 1 will indicate Government
            else {
                bench = 'G'

                // Now this is the loop to change base circles to coloured party circles
                for (var s = 0; s < seat_count; s++) {
                    var selected_circle = document.getElementById(bench + gov_count); 
                    selected_circle.classList.add('seat', party_id);
                    selected_circle.style.display = 'block'; 
                    gov_count += 1;
                };
            };

            console.log(party_name + ": " + seat_count + " seats"); //Just for testing purposes
        };
/*
        if (!brit_mode) {
            for (party of Q.parties) {
                if (Q.largest_party == party) {
                    if (Q[party + '_in_government']) {
                        var soth_dot = document.getElementById('soth'); // These snippets get soth circle 
                        soth_dot.classList.add('seat', party);          // Color of largest party (will be changed to be more interactive)

                        for (var i; i < seats; i++) { // This will remove the extra delegate from the SOTH party
                            var extra_delegate_selected_for_annihilation = document.getElementById('G' + i); 
                            // Wait is this necessary
                        }
                        

                        break;
                    }
                }
            }
        };

        if (brit_mode) { // Just makes SOTH an independent 
            var soth_dot = document.getElementById('soth'); 
            soth_dot.classList.add('seat', 'other');
        }
*/


    }; 



}