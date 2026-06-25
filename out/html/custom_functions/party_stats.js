function get_party_stats() {
    // 1. Calculate the overall party performance multiplier (Base = 1.0)
    // Strength helps, while Factional Dissent and Bureaucracy drag it down
    var organizationBonus = (Q.party_organization_strength || 0) * 0.005;
    var dissentPenalty = (Q.dissent_percent || 0) * 0.008;
    var bureaucracyPenalty = (Q.party_bureaucracy || 0) * 0.003;
    
    var performanceMultiplier = 1.0 + organizationBonus - dissentPenalty - bureaucracyPenalty;
    
    // Safety floor so terrible stats don't completely zero-out or invert polling math
    if (performanceMultiplier < 0.2) performanceMultiplier = 0.2;

    // // 2. Loop through and update each passed demographic quality string
    // demographics.forEach(function(qName) {
    //     if (typeof Q[qName] === 'number') {
    //         // Apply multiplier to the current base polling value
    //         var updatedPolling = Q[qName] * performanceMultiplier;
    //         
    //         // Hard ceilings/floors for realistic polling bounds (0% to 100%)
    //         Q[qName] = Math.max(0, Math.min(100, Math.round(updatedPolling)));
    //     }
    // });

    for (var c of Q.classes) {
        updated_polling = Q[c + '_flp'] * performanceMultiplier;
        Q[c + '_flp'] = Math.max(0, Math.min(100, Math.round(updated_polling)))

    };
};