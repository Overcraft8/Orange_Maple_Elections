window.westminster = function(container_id, forming_government) {
    // container_id has to be an svg for this to work????
    // forming_government planned to be boolean indicating whether loading initial seat counts or actual government formation

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var house_length = 10; // How much seats in each row?
    var house_width = 3; // how many rows?
    var seats = 50;
    var container = document.getElementById(container_id);

    container.innerHTML = ''; //This removes all html inside the westminster parliament container

    var data = Q.parliament_diagram; // Retrieving data (Might not be applicable to base game)
    // Basically just find the data variable in root scene that holds party info like legend, id, seats - declare Q[any_var_name_really] = data right after data has appended all parties and then place it here
    // you'd also probably have to do same with data var inside election_1928 scene

    var practice_svg = `<svg width="40" height="40" style="vertical-align: middle;">
        <circle cx="20" cy="20" r="6" stroke="black" stroke-width="3" fill="orange"></circle>
    </svg>`; //This loads an svg with an orange circle

    var base_circle = `<circle cx="40" cy="20" r="6" stroke="black" stroke-width="3" fill="orange"></circle>`;
    // The orange circle in question

    var x = 10; 
    var y = 5; 
    var id_number = 0;
    var seats_in_row = 0;

    for (var i = 0; i < seats; i++) {
        if (seats_in_row < house_width) {
            y += 10; 
            seats_in_row += 1;
        }

        else {
            x += 15; 
            y = 15;
            seats_in_row = 0;
        }

        id_number += 1;

        var id = 'O' + id_number

        var calc_circle = `<circle id="${id}" cx="${x}" cy="${y}" r="6" fill="tan"></circle>`;

        container.innerHTML += calc_circle;

        // seats_in_row += 3; //I must've been hallucinating to put this here
    }

    // container.innerHTML += base_circle





    for (var i = 0; i < data.length; i++) {
        var party = data[i]; // Calling index
        var partyName = party.name; // Calling index property essentially
        var seatCount = party.seats;

        console.log(partyName + ": " + seatCount + " seats");
    };



}