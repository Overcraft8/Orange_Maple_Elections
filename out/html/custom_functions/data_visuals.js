
function GeneratePieChart(data, container_id = null) {
    var tooltipParts = [];
    var gradientParts = [];
    var currentStop = 0;

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var item = data[key];
            
            var share = Number(item.share) || 0; 

            if (share > 0) {
                var nextStop = currentStop + share;
                
                // Add to tooltip (e.g., "Private Sector: 45%")
                tooltipParts.push(`${item.tooltipInfo}: ${share}%`);
                
                gradientParts.push(`${item.color} ${currentStop}% ${nextStop}%`);
                
                currentStop = nextStop;
            }
        }
    }

    var tooltipText = tooltipParts.join('\n');
    var gradientStyle = gradientParts.length > 0 
        ? `conic-gradient(${gradientParts.join(', ')})`
        : 'transparent';

    // Build the HTML for the pie chart
    // Note: Added basic sizing and border-radius so it naturally shapes as a circle.
    // 'title' attribute is added so the browser handles the tooltip natively on hover.
    var pieChartHtml = `
        <figure class="pie_chart" 
                data-tooltip="${tooltipText}" 
                style="
                    margin: 0;
                    width: 60px; 
                    height: 60px; 
                    border-radius: 50%; 
                    background: ${gradientStyle};
                    box-shadow: 0px 2px 4px rgba(0,0,0,0.5);
                ">
        </figure>
    `;

    if (container_id) {
        var container = document.getElementById(container_id);
        if (container) {
            container.innerHTML = pieChartHtml;
        } else {
            console.warn("Container not found: " + container_id);
        }
    }

    return pieChartHtml;

};



window.customgeneratebar = function(data, outercolor, innercolor, elementID, tooltip) {

    function renderBar() {

        var container = document.getElementById(elementID);
        if (!container) {
            if (window.__customGenerateBarAttempts < 20) {
                window.__customGenerateBarAttempts += 1;
                setTimeout(renderBar, 25);
            }
            return;
        }

        var widthPercent = Number(data);
        if (isNaN(widthPercent)) widthPercent = 0;
        if (widthPercent > 100) widthPercent = 100;
        if (widthPercent < 0) widthPercent = 0;

        var finalTooltipText = tooltip;


        var barHtml = 
            '<div class="tooltip" style="position: relative; width: 100%;">' + 
                '<div style="height: 8px; background: ' + outercolor + '; border-radius: 4px; overflow: hidden; border: 1px solid #000000;">' +
                    '<div style="background: ' + innercolor + '; opacity: 0.7; height: 100%; width: ' + widthPercent + '%; transition: width 0.4s;"></div>' +
                '</div>' +
                '<span id="' + elementID + '_tooltip" class="tooltip-text" style="text-align: center;">' + finalTooltipText + '</span>' + 
            '</div>';


        container.innerHTML = barHtml;
    }

    if (typeof window.__customGenerateBarAttempts === 'undefined') {
        window.__customGenerateBarAttempts = 0;
    }
    window.__customGenerateBarAttempts = 0;
    renderBar();
};

window.customgeneratemultibar = function(dataArray, outercolor, colorsArray, elementID, tooltips) {
    var data = [].concat(dataArray);
    var colors = [].concat(colorsArray);
    var texts = [].concat(tooltips || []);

    // 1. Filter valid segments and calculate total
    var valid = [];
    var absoluteTotal = 0; 

    for (var j = 0; j < data.length; j++) {
        var val = Number(data[j]);
        if (val > 0) {
            valid.push({ val: val, color: colors[j] || '#ccc', text: texts[j] || '' });
            absoluteTotal += val; 
        }
    }

    // Handle empty data case
    if (absoluteTotal === 0) {
        if (elementID === 'return_html') return '';
        var container = document.getElementById(elementID);
        if (container) container.innerHTML = '';
        return;
    }

    // 2. Build segments HTML
    var innerSegmentsHtml = '';
    var currentPercentTotal = 0;

    for (var i = 0; i < valid.length; i++) {
        var width = (valid[i].val / absoluteTotal) * 100;

        if (currentPercentTotal + width > 100) width = 100 - currentPercentTotal;
        currentPercentTotal += width;

        var radiusStyle = '';
        if (i === 0) radiusStyle += 'border-top-left-radius: 3px; border-bottom-left-radius: 3px; ';
        if (i === valid.length - 1 || currentPercentTotal >= 99.9) radiusStyle += 'border-top-right-radius: 3px; border-bottom-right-radius: 3px; ';

        innerSegmentsHtml += 
            '<div class="tooltip" style="position: relative; height: 100%; width: ' + width + '%; display: block;">' + 
                '<div style="background: ' + valid[i].color + '; opacity: 0.8; height: 100%; width: 100%; ' + radiusStyle + '"></div>' +
                '<span class="tooltip-text">' + valid[i].text + '</span>' +
            '</div>';
    }

    var finalHtml = 
        '<div style="width: 100%; position: relative;">' + 
            '<div style="display: flex; height: 15px; background: ' + outercolor + '; border-radius: 2px; border: 1px solid #000; overflow: visible;">' +
                innerSegmentsHtml + 
            '</div>' +
        '</div>';

    // 3. Return HTML string or write directly to DOM
    if (elementID === 'return_html') {
        return finalHtml;
    } else {
        var container = document.getElementById(elementID);

        // Fallback retry loop if the DOM element isn't ready yet
        if (!container) {
            setTimeout(function() { 
                window.customgeneratemultibar(dataArray, outercolor, colorsArray, elementID, tooltips); 
            }, 25);
            return;
        }

        container.innerHTML = finalHtml;
    }
};