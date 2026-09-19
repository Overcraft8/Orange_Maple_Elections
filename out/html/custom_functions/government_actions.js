
window.generate_crown_info = function(crown_info) {
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;

    var expense_list = ``;
    var revenue_list = ``;

    var crown_expense = crown_info.expenses; 
    var crown_revenue = crown_info.revenue; 


    var Expenses_HTML = `<div style="flex: 1; min-width: 200px; background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 12px; box-sizing: border-box;">
                        <div style="background-color: #877b66; border: 2px ridge #6c512e; color: #ffffff; text-align: center; padding: 5px; font-size: 1.2em; margin-bottom: 10px; font-weight: bold;">
                            Expenses
                        </div>`;
    Object.entries(crown_expense).forEach(([expense_name, expense_cost]) => {
        var expense_capitalized = expense_name.charAt(0).toUpperCase() + str.slice(1);
        expense_list += `<div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #9c8c64; padding: 4px 0;">
                            <span>${expense_capitalized}</span>
                            <span>${expense_cost}</span>
                        </div>`; 
    });
    Expenses_HTML += `${expense_list}<div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 1.2em; border-top: 2px solid #9c8c64; padding-top: 8px; font-weight: bold;">
                            <span>Total Expenses</span>
                            <span style="color: #841715;">4</span>
                        </div>
                    </div>`; 

    var Revenue_HTML = `<div style="flex: 1; min-width: 200px; background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 12px; box-sizing: border-box;">
                        <div style="background-color: #877b66; border: 2px ridge #6c512e; color: #ffffff; text-align: center; padding: 5px; font-size: 1.2em; margin-bottom: 10px; font-weight: bold;">
                            Revenue
                        </div>`; 
    Object.entries(crown_revenue).forEach(([revenue_name, revenue_cost]) => {
        var revenue_capitalized = revenue_name.charAt(0).toUpperCase() + str.slice(1);
        revenue_list += `<div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #9c8c64; padding: 4px 0;">
                            <span>${revenue_capitalized}</span>
                            <span>${revenue_cost}</span>
                        </div>`; 
    });
    Revenue_HTML += `${revenue_list}<div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 1.2em; border-top: 2px solid #9c8c64; padding-top: 8px; font-weight: bold;">
                            <span>Total Revenue</span>
                            <span style="color: #2d662d;">4</span>
                        </div>
                    </div>`;

    var Ledger = `<!-- Financial Ledger Container -->
                <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 1.5em; width: 100%; box-sizing: border-box;">
                ${Revenue_HTML}${Expenses_HTML}</div>`;

    var Summary_Panel = `<div style="background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 10px 16px; margin-bottom: 1.5em; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.3em; font-weight: bold;">(Profit/Loss)</span>
                    
                    <span style="font-size: 1.4em; padding: 4px 16px; background-color: #2c2c2c; border: 2px ridge #6c512e; border-radius: 4px; text-shadow: 1px 1px 2px #000;">
                        ${crown_info.profit}
                    </span> 
                </div>`;

    return Ledger + Summary_Panel
    
    var base = `<!-- Financial Ledger Container -->
                <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 1.5em; width: 100%; box-sizing: border-box;">

                    <!-- Revenue Panel -->
                    <div style="flex: 1; min-width: 200px; background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 12px; box-sizing: border-box;">
                        <div style="background-color: #877b66; border: 2px ridge #6c512e; color: #ffffff; text-align: center; padding: 5px; font-size: 1.2em; margin-bottom: 10px; font-weight: bold;">
                            Revenue
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #9c8c64; padding: 4px 0;">
                            <span>Rates</span>
                            <span>[+ saskpower.revenue.rates +]</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 1.2em; border-top: 2px solid #9c8c64; padding-top: 8px; font-weight: bold;">
                            <span>Total Revenue</span>
                            <span style="color: #2d662d;">4</span>
                        </div>
                    </div>

                    <!-- Expenses Panel -->
                    <div style="flex: 1; min-width: 200px; background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 12px; box-sizing: border-box;">
                        <div style="background-color: #877b66; border: 2px ridge #6c512e; color: #ffffff; text-align: center; padding: 5px; font-size: 1.2em; margin-bottom: 10px; font-weight: bold;">
                            Expenses
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #9c8c64; padding: 4px 0;">
                            <span>Administration</span>
                            <span>[+ saskpower.expenses.admin +]</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #9c8c64; padding: 4px 0;">
                            <span>Maintenance</span>
                            <span>[+ saskpower.expenses.maintenance +]</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 1.2em; border-top: 2px solid #9c8c64; padding-top: 8px; font-weight: bold;">
                            <span>Total Expenses</span>
                            <span style="color: #841715;">4</span>
                        </div>
                    </div>

                </div>

                <!-- Net Balance Summary Panel -->
                <div style="background: rgba(0, 0, 0, 0.05); border: 3px solid #9c8c64; border-radius: 4px; padding: 10px 16px; margin-bottom: 1.5em; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.3em; font-weight: bold;">Net Balance (Profit/Loss)</span>
                    
                    <!-- This calls the dynamic color-coded function we built earlier -->
                    <span style="font-size: 1.4em; padding: 4px 16px; background-color: #2c2c2c; border: 2px ridge #6c512e; border-radius: 4px; text-shadow: 1px 1px 2px #000;">
                        [+ saskpower.profit +]
                    </span> 
                </div>`

}