//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                  TAXES AND REVENUE CALCULATIONS


window.calculate_income_tax = function() {
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;
    var total_revenue = 0;

    // Define thresholds
    var middle_threshold = 0.4; // Income above this hits Middle rate
    // Threshold different from tax rate, (class taxed at 50% (rate) of income above 40% (threshold) for example)
    var upper_threshold = 0.8;  // Income above this hits Upper rate

    for (var d of Q.district_names) {
        for (var c in Q.class_incomes) {
            var proportion = (Q[d + '_' + c] || 0) / 10;
            var income = Q.class_incomes[c] || 0;

            if (proportion <= 0 || income <= 0) continue;

            // Marginal Taxation Calculation

            // 1. Portion taxed at Lower rate
            var lower_slice = Math.min(income, middle_threshold);
            var tax_from_lower = lower_slice * Q.lower_tax_rates;

            // 2. Portion taxed at Middle rate (only if income > middle_threshold)
            var middle_slice = Math.max(0, Math.min(income, upper_threshold) - middle_threshold);
            var tax_from_middle = middle_slice * Q.middle_tax_rates;

            // 3. Portion taxed at Upper rate (only if income > upper_threshold)
            var upper_slice = Math.max(0, income - upper_threshold);
            var tax_from_upper = upper_slice * Q.upper_tax_rates;

            // Sum the slices
            var total_tax_per_person = tax_from_lower + tax_from_middle + tax_from_upper;

            // Apply weight
            var revenue_slice = (Q[d + '_seats'] * proportion * total_tax_per_person) / 10;
            Number(revenue_slice.toFixed(5))
            total_revenue += revenue_slice;
            console.log('District and Class Data;', d, c, revenue_slice)
        }
    }
    console.log('THis is total revenue: ', total_revenue)
    return total_revenue.toFixed(2);
};



window.get_taxes_final = function(taxes_in_question) { 
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var lower_pop = Q.workers_population_percent + Q.rural_workers_population_percent + Q.farmhands_population_percent + Q.unemployed_population_percent + (Q.farmers_population_percent * 0.8);
    var middle_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.9 + (Q.farmers_population_percent)*0.2;
    var rich_pop = (Q.old_middle_population_percent + Q.new_middle_population_percent)*0.1;

    console.log("These are the populations by wealth status")
    console.log(lower_pop);
    console.log(middle_pop);
    console.log(rich_pop);
}


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//                          Detailed Economic simulation 
/////////////////////////////////////////////////////////////////////////////////////////////////


// Basic information for each building/project type
// [ Name of item (factory, infrastructure, etc.) ] : [jobs, standard_economic_output, standard_budget_influx, photo]
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
    'Mining' : 'coal_mining_.jpg', 
    'Agriculture' : 'sask_farming.jpg', 
    'Finance' : 'bank.png'
};






//------------------------------------------------------------//
//                      REGIONAL INFO                         //
//------------------------------------------------------------//

// This is for displaying regional information
window.region_info_display = function(region_id) {

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    if (!Q.district_economy[region_id]) {
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
            
            if (Array.isArray(sectorData) && sectorData.length === 2 && Array.isArray(sectorData[0]) && typeof sectorData[1] === 'number') {
                var ownership = sectorData[0]; // [private, cooperative, state] ratios
                var contribution = sectorData[1]; // economic contribution value

                var privateShare = Math.round(ownership[0] * 100);
                var coopShare = Math.round(ownership[1] * 100);
                var stateShare = Math.round(ownership[2] * 100);

                var private_pct = privateShare / 100;
                var coop_pct = coopShare / 100; 
                var state_pct = stateShare / 100; 

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
                        <div style="background-color: rgba(0, 0, 0, 0.7); padding: 6px 10px; border-radius: 3px; width: 100%;">
                            <span style="font-size: 14px; font-weight: bold; display: block; color: #f1c40f;">${sectorName}</span>
                            <span style="font-size: 13px; display: block;">Contribution: ${contribution}</span>
                            <span style="font-size: 11px; display: block; margin-top: 4px; color: #dcdcdc;">
                                Priv: ${privateShare}% | Coop: ${coopShare}% | State: ${stateShare}%
                            </span>
                            <figure class="pie_chart" style="background: conic-gradient(
                            from 0deg, 
                            rgba(90, 90, 209, 0.72) 0, 
                            rgba(90, 90, 209, 0.72) calc(${private_pct}), 
                            rgba(218, 222, 103, 0.93) calc(${private_pct}), 
                            rgba(218, 222, 103, 0.93) calc(${private_pct + coop_pct}), 
                            rgba(222, 157, 103, 0.93) calc(${private_pct + coop_pct}), 
                            rgba(222, 157, 103, 0.93) calc(100%), 
                            )">
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

/* 
console.log("-", project);
            // var project_name = project[0];
            // var project_owner = project[1];
            // var project_quantity = project[2] !== undefined ? project[2] : '';
            // 
            // var presetData = window.economy_presets[industryName]?.[project_name];
            // var image_display = (presetData && presetData[3]) ? presetData[3] : 'portraits/Question_Mark.jpg';
// 
            // // Format the quantity nicely with a space if it exists
            // var displayQuantity = project_quantity !== '' ? project_quantity + ' ' : '';

            var sector_name = industryName;
            var economic_contribution = project[1];

            var image_display = window.economy_images[industryName];

            Q.private_pct = project[0][0] || 0;
            Q.cooperative_pct = project[0][1] || 0;
            Q.state_pct = project[0][2] || 0;

            // Append each project's HTML to master string
            containerHtml += `
                <div class="project_container" style="
                    position: relative; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    text-align: center; 
                    background-image: url('img/${image_display}'); 
                    background-size: cover; 
                    background-position: center;
                    padding: 12px;
                    color: #ffffff;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
                    border: ridge; 
                    border-color: #9c8c64;
                ">
                    <div style="background-color: rgba(0, 0, 0, 0.5)">
                        <span class="h1" style="font-size: 10px;">${displayQuantity}${project_name}</span>
                        <span class="horizontal_line"></span>
                        <span style="font-size: 10px;">${project_owner}</span>
                    </div>
                </div>
            `;
            */