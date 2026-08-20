window.westminster = function(container_id) {
    // container_id has to be an svg for this to work????

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var house_length = 10; // How much seats in each row?
    var house_width = 3; // how many rows?
    var container = document.getElementById(container_id);

    container.innerHTML = ''; //This removes all html inside the westminster parliament container

    var data = Q.parliament_diagram; // Retrieving data (Might not be applicable to base game)
    // Basically just find the data variable in root scene that holds party info like legend, id, seats - declare Q[any_var_name_really] = data right after data has appended all parties and then place it here
    // you'd also probably have to do same with data var inside election_1928 scene


    var base_circle = `<svg width="40" height="40" style="vertical-align: middle;">
        <circle cx="20" cy="20" r="16" stroke="black" stroke-width="3" fill="orange"></circle>
    </svg>`

    container.innerHTML = base_circle





    for (var i = 0; i < data.length; i++) {
        var party = data[i]; // Calling index
        var partyName = party.name; // Calling index property essentially
        var seatCount = party.seats;

        console.log(partyName + ": " + seatCount + " seats");
    }



}