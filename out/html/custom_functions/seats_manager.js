
// Change seats setup : 
// [party_region] -> [ccf_]



window.change_seats = function([party_region], [seat_changes]) {
    
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;
}; 

window.preset_demographics = {
    'urban_city' : {
        'workers' : 40, 
        'old_middle' : 20, 
        'new_middle' : 20, 
        'unemployed' : 20
    }, 
    'small_town' : {
        'workers' : 30, 
        'old_middle' : 25, 
        'new_middle' : 25, 
        'unemployed' : 30
    }, 
    'rural_farms' : {
        'workers' : 10, 
        'old_middle' : 5, 
        'new_middle' : 10, 
        'farmers' : 75, 
        'unemployed' : 10
    }, 
    'north' : {
        'workers' : 45, 
        'old_middle' : 15, 
        'new_middle' : 10, 
        'farmers' : 5, 
        'unemployed' : 25
    }
}

// Below is AI code by the way


function parseElectionData(csvText) {
    // Normalize line endings and split cleanly
    const lines = csvText.replace(/\r/g, '').trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        if (!currentLine) continue;
        
        const values = currentLine.split(',').map(v => v.trim());
        const entry = {};

        headers.forEach((header, index) => {
            let val = values[index];
            if (header === 'Seat' || header === 'Votes') {
                val = Number(val);
            }
            entry[header] = val;
        });

        parsedData.push(entry);
    }

    console.log(parsedData);
    return parsedData;
}

window.loadElectionData = async function() {
    try {
        const response = await fetch('demographics/1934_Saskatchewan_General_Election_55_Seats.csv'); 
        const csvText = await response.text();
        const parsed = parseElectionData(csvText);
        return parsed;
    } catch (error) {
        console.error("Failed to load CSV:", error);
    }
};

// Load election data when script initializes
window.loadElectionData();








// -------------------------------------------------
//            ELECTORAL STRATEGY CODE
// -------------------------------------------------








window.electoral_strat = function(region, party) {
     var Q = window.dendryUI.dendryEngine.state.qualities;
     var totalSeats = Q.districts[region].seats;
     var party_contesting_ratio = Q[region + '_' + party + '_rcr'] !== undefined ? Q[region + '_' + party + '_rcr'] : 1;
     party_contesting_ratio = Math.max(0, Math.min(1, party_contesting_ratio));
     var contestedSeats = Math.floor(totalSeats * party_contesting_ratio);
     //Q[party + '_contests'] += contestedSeats;
     Q[region + '_' + party + '_contested'] = contestedSeats
     var uncontestedSeats = totalSeats - contestedSeats;

       // Active orange circle for a running candidate
       var activeCircle = `<div style="border-radius:50%; width:0.8em; height:0.8em; background-color:${Q.party_colours[party]}; display:inline-block;" title="Candidate Running"></div>`;
       
       // Faded grey ring for an un-contested seat
       var emptyCircle = `<div style="border-radius:50%; width:0.8em; height:0.8em; border: 1.5px dashed #9c8c64; display:inline-block;" title="No Candidate"></div>`;
       
       return activeCircle.repeat(contestedSeats) + emptyCircle.repeat(uncontestedSeats);
   }; 

window.get_party_total_contests = function(party) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var total = 0;
    for (var region in Q.districts) {
        var seats = Q.districts[region].seats;
        var rcr = Q[region + '_' + party + '_rcr'] !== undefined ? Q[region + '_' + party + '_rcr'] : 1;
        rcr = Math.max(0, Math.min(1, rcr));
        total += Math.floor(seats * rcr);
    }
    Q[party + '_contests'] = total;
};


window.electoral_map = function(party) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    return `
        <div style="text-align:center;">Rural Ridings</div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>North (${Q.districts.north.seats} seats) : </span>
            ${Q.north_contests}
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Central (${Q.districts.central.seats} seats) : </span>
            ${Q.central_contests}
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Southwest (${Q.districts.southwest.seats} seats) : </span>
            ${Q.southwest_contests}
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Southeast (${Q.districts.southeast.seats} seats) : </span>
            ${Q.southeast_contests}
        </div>
        <div style="text-align:center;">Urban Ridings</div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Regina (${Q.districts.regina.seats} seats) : </span>
            ${Q.regina_contests}
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Saskatoon (${Q.districts.saskatoon.seats} seats) : </span> 
            ${Q.saskatoon_contests}
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Moose Jaw (${Q.districts.moose_jaw.seats} seats) : </span>
            ${Q.moose_jaw_contests}
        </div>
        ${Q.districts.prince_albert.seats > 0 ? `
        <div style="display:flex;align-items:center;gap:8px;margin:5px 0;flex-wrap:wrap">
            <span>Prince Albert (${Q.districts.prince_albert.seats} seats) : </span>${Q.prince_albert_contests}
        </div>
        ` : ''}
        The ${Q.party_names[party]} is currently contesting ${Q[party + '_contests']} of ${Q.total_seats} seats.`;
}