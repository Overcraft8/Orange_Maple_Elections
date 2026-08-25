//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                  TAXES AND REVENUE CALCULATIONS

// window.calculate_corporate_tax = function() {
//     var Q = window.dendryUI?.dendryEngine?.state?.qualities; 
//     
// };

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//                          Economic simulation                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////


// Basic information for each building/project type
// [ Name of item (factory, infrastructure, etc.) ] : [jobs, standard_economic_output, standard_budget_influx, photo]
// DEFUNCT
window.economy_presets = {
    'Manufacturing' : {
        'Car Manufacturing Plant' : [0.2, 0.4, 2, 'robin_hood_mill.jpg']
    },
    'Mining' : {
        'Potash Mine' : [0.4, 0.5, 3, 'coal_mining.jpg']
    },
    'Agriculture' : {
        'Family Farm' : [0.1, 0.5, 2, 'sask_farming.jpg'],
        'Grain Elevator' : [0.1, 0.5, 2, 'grain_elevator.jpg']
    },
    'Finance' : {
        'Bank' : [0.1, 0.5, 2, 'bank.png'], 
        'Credit Union' : [0.1, 0.5, 2, 'credit_union.jpg']
    }
};

window.economy_images = {
    'Manufacturing' : 'robin_hood_mill.jpg',
    'Coal Mining' : 'coal_mining.jpg', 
    'Farming' : 'sask_farming.jpg', 
    'Agricultural Marketing' : 'grain_elevator.jpg',
    'Finance' : 'bank.png',
    'Government' : 'Saskatchewan_Legislature.jpg', 
    'Foresty' : 'placeholder',
    'electricity' : 'powerhouse.jpg',
    'telecoms' : 'telecom_lines.jpg', 
    'transport' : 'regina_trolleybus.jpg'
};






//------------------------------------------------------------//
//                      REGIONAL INFO                         //
//------------------------------------------------------------//

// This is for displaying regional information
window.region_info_display = function(region_id) {

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    if (!Q.district_economy[region_id]) {
        console.log("This doesn't exist")
        return;
    }

    //------------------------------------------------------
    //                   Region Name                      //
    //------------------------------------------------------

    var region = Q.region_names[region_id]; 
    Q.region_name = region;

    window.updateBar('bottom');

    //------------------------------------------------------
    //                   Demographics                     //
    //------------------------------------------------------

    var strengths = [];
    var class_info = [];
    var tooltip = [];

    for (var c of Q.classes) {

        var region_class = region_id + '_' + c;

        if (Q[region_class] && Q[region_class] > 0) {
            for (var class_collect of Q.class_info) {
                if (class_collect[0] == c) {
                    class_info.push(class_collect[2]);
                    tooltip.push(class_collect[1])
                }
            }

            strengths.push(Q[region_class]);
        }
    };
    
    Q.region_demography = window.customgeneratemultibar(
        strengths, 
        "#333333", 
        class_info, 
        'return_html', 
        tooltip
    );

    //---------------------------------------------------------
    //                   Economy                             //
    //---------------------------------------------------------

    var districtData = Q.district_economy[region_id];
    var economy_sectors = districtData ? districtData.economy : null;

    var containerHtml = '<div id="region_economy" style="display: flex; flex-wrap: wrap; gap: 0.5em; justify-content: center; margin: 0.5em;">';

    if (economy_sectors) {
        for (const [sectorName, sectorData] of Object.entries(economy_sectors)) {
            console.log(`Sector: ${sectorName}`);
            
            if (Array.isArray(sectorData)) {
                var ownership = sectorData[0]; // [private, cooperative, state] ratios
                var contribution = sectorData[1]; // economic contribution value

                var privateShare = Math.round(ownership[0] * 100);
                var coopShare = Math.round(ownership[1] * 100);
                var stateShare = Math.round(ownership[2] * 100);

                // Calculate cumulative percentage stops
                var stop1 = privateShare;
                var stop2 = privateShare + coopShare;
                var tooltipText = `Private (Blue): ${privateShare}%\nCo-op (Yellow): ${coopShare}%\nState (Orange): ${stateShare}%`;

                var imageName = window.economy_images && window.economy_images[sectorName] ? window.economy_images[sectorName] : 'default.png';

                containerHtml += `
                    <div class="project_container" style="
                        position: relative; 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                        justify-content: center; 
                        text-align: center; 
                        background-image: url('img/${imageName}'); 
                        background-size: cover; 
                        background-position: center;
                        padding: 16px;
                        min-width: 80px;
                        color: #ffffff;
                        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
                        border: 2px ridge #9c8c64;
                        border-radius: 4px;
                    ">
                        <div style="background-color: rgba(0, 0, 0, 0.6); padding: 6px 10px; border-radius: 3px; width: 100%; display: flex; flex-direction: column; align-items: center;">
                            <span style="font-size: 14px; font-weight: bold; display: block; color: #f1c40f;">${sectorName}</span>
                            <span style="font-size: 13px; display: block;">Contribution: ${contribution}</span>
                            <figure class="pie_chart" data-tooltip="${tooltipText}" style="
                                background: conic-gradient(
                                    rgba(90, 90, 209, 0.9) 0% ${stop1}%, 
                                    rgba(218, 222, 103, 0.9) ${stop1}% ${stop2}%, 
                                    rgba(222, 157, 103, 0.9) ${stop2}% 100%
                                );">
                            </figure>
                        </div>
                    </div>
                `;
            }
        }
    }

containerHtml += '</div>';

Q.region_economy = containerHtml;
Q.current_region_id = region_id;

    window.updateBar('bottom');
    console.log("eco-sim");
};

console.log("got to end of eco simulation");