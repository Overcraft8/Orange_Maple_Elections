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
// [ Name of item (factory, infrastructure, etc.) ] : [jobs, standard_economic_output, standard_budget_influx]
window.economy_presets = {
    'Manufacturing' : {
        'Car Manufacturing Plant' : [0.2, 0.4, 2]
    },
    'Mining' : {
        'Potash Mine' : [0.4, 0.5, 3]
    }
};

// This is for displaying region information
window.region_info_display = function(region_id) {

    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    if (!Q.district_economy[region_id]) {
        return;
    }

    // Region Name
    var region = Q.region_names[region_id]; 
    Q.region_name = region;

    //------------------------------------------------------
    //                   Demographics                     //
    //------------------------------------------------------

    if (window && window.customgeneratemultibar) {
        var strengths = [];
        var class_info = [];
        var tooltip = [];

        for (var c of Q.classes) {
            if (region_id + c) {
                for (var class_collect of Q.class_info) {
                    if (class_collect[0] == c) {
                        class_info.push(class_collect[2]);
                        tooltip.push(class_collect[1])
                    }
                }

                strengths.push(region_id + c)
            }
        };
        
        window.customgeneratemultibar(
            strengths, 
            "#333333", 
            class_info, 
            "region_demography", 
            tooltip
        );
    }








    //---------------------------------------------------------
    //                   Economy                             //
    //---------------------------------------------------------

    var economy_sectors = Q.district_economy[region_id].economy;

    var containerHtml = '<div id="region_economy" style="display: flex; flex-direction: column;">';

    for (const [industryName, industriesList] of Object.entries(economy_sectors)) {
        console.log(`Industry Category: ${industryName}`);
        
        // Loop through the projects inside each category
        industriesList.forEach(project => {
            console.log("-", project);
            var project_name = project[0];
            var project_owner = project[1];
            var project_quantity = project[2] !== undefined ? project[2] : '';

             // var project_photo = window.project_photos.project_name[1]

            // Format the quantity nicely with a space if it exists
            var displayQuantity = project_quantity !== '' ? project_quantity + ' ' : '';

            // Append each project's HTML to master string
            containerHtml += `
                <div class="project_container" style="position: relative; width: 100%;">
                    <span class="h1" style="text-align: center;">${displayQuantity}${project_name}</span>
                    <span>${project_owner}</span>
                </div>
            `;
        });
    }

    // Close the container div
    containerHtml += '</div>';

    // Assign the entire block to your Dendry quality so the engine renders it safely
    Q.region_economy = containerHtml;
    window.updateBarContent('bottom');
};

console.log("got to end of eco simulation");