
// Change seats setup : 
// [party_region] -> [ccf_ss_]







var Q = window.dendryUI?.dendryEngine?.state?.qualities;


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

// main.js
async function loadElectionData() {
    try {
        console.log("Loading election data...");
        const response = await fetch('demographics/1934_Saskatchewan_General_Election_55_Seats.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const parsed = parseElectionData(csvText);
        console.log("Election data loaded successfully:", parsed);
        return parsed;
    } catch (error) {
        console.error("Failed to load CSV:", error);
    }
}

// Load election data when script initializes
loadElectionData();