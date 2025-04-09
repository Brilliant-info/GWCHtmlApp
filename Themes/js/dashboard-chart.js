var isStaticSite = 'no';
function clearText(field) {
    if (field.defaultValue == field.value) field.value = '';
    else if (field.value == '') field.value = field.defaultValue;
}

$(document).ready(function () {
    $(".msg_head").click(function () {
        $(this).next(".msg_body").slideToggle(600);
    });
});

function setActiveTab(objId) {
    var getTabObj = document.getElementById(objId);
    if (getTabObj != null) {
        getTabObj.className = 'satActiveTab';
    }
}
function setActiveReportNav(reportNavObj) {
    var getReportNavObj = document.getElementById(reportNavObj);
    if (getReportNavObj != null) {
        getReportNavObj.className = 'activeReportNav';
    }
}

function createSliderBar(sliderMaxRange, sliderVal) {
    var sliderVal1 = 0;
    var sliderVal2 = Math.round((sliderMaxRange / 4) * 1);
    var sliderVal3 = Math.round((sliderMaxRange / 4) * 2);
    var sliderVal4 = Math.round((sliderMaxRange / 4) * 3);
    var sliderVal5 = sliderMaxRange;
    var sliderPosition = Math.round(((sliderVal * 619) / sliderMaxRange) - 40);
    document.write("<div align='center'><div class='divSliderControlHolder' align='center'><div class='sliderControlBar'></div><div class='sliderControlPointer' style='left:" + sliderPosition + "px'>" + sliderVal + "</div><div class='sliderControlVal1' align='center'>" + sliderVal1 + "</div><div class='sliderControlVal2' align='center'>" + sliderVal2 + "</div><div class='sliderControlVal3' align='center'>" + sliderVal3 + "</div><div class='sliderControlVal4' align='center'>" + sliderVal4 + "</div><div class='sliderControlVal5' align='center'>" + sliderVal5 + "</div></div></div>");
}
function createZigZagLineChart(myCanvasScoreArray, getMaxScore) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = getMaxScore;
    var getScoreForTimeChart = myCanvasScoreArray.split(',');

    document.write("<div align='center'><canvas id='timeAnalysisChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart) + "'></canvas></div>");
    // get the canvas element using the DOM
    var canvas = document.getElementById('timeAnalysisChart');

    // Make sure we don't execute when canvas isn't supported
    if (canvas.getContext) {
        // use getContext to use the canvas for drawing
        var ctx = canvas.getContext('2d');
        // Filled triangle
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            // set line color
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = getMaxScore - Math.round((getMaxScore / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }

        ctx.beginPath();
        var isLineDrawStarted = 'no';
        // ctx.moveTo(extraLeftSpaceForChart, 400);
        //New code by Abhijit to distribute lables
        var currentPosStep = 1;
        var currentPosForText = 1;        
        var getPosGapForText = (getScoreForTimeChart.length - 1) / 11;
        var nextPosForText = Math.round(currentPosStep * getPosGapForText);        
        //New code by Abhijit to distribute lables
        for (drLine = 0; drLine <= (getScoreForTimeChart.length - 1); drLine++) {
            var currentScore = getScoreForTimeChart[drLine];
            var convertScoreInProportion = Math.round((currentScore * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getScoreForTimeChart.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertScoreInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            if ((drLine == 0) || (drLine == nextPosForText)) {                
                    ctx.font = "12px Arial";
                    ctx.fillText((drLine + 1), (((drLine + 1) * (400 / getScoreForTimeChart.length)) + extraLeftSpaceForChart), 460);                
            } else {
                if (drLine > nextPosForText) {
                    currentPosForText = drLine;
                    currentPosStep = currentPosStep + 1;
                    nextPosForText = Math.round(currentPosStep * getPosGapForText);
                }
            }
        }
        ctx.lineWidth = 1;
        var colorCodeA = readThemeWmsColor('wms-color-primary');
        var colorCodeB = readThemeWmsColor('wms-color-secondary');
        var colorCodeC = readThemeWmsColor('wms-color-third');
        ctx.strokeStyle = colorCodeB;
        ctx.stroke();
    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}


function createTestByTestChart(getScoreForTimeChart, getXAxisLabels, getMaxScore) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = getMaxScore;
    var createDotAPos = new Array();
    var createDotBPos = new Array();
    document.write("<div align='center'><canvas id='testByTestChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart) + "'></canvas></div>");
    // get the canvas element using the DOM
    var canvas = document.getElementById('testByTestChart');

    // Make sure we don't execute when canvas isn't supported
    if (canvas.getContext) {
        // use getContext to use the canvas for drawing
        var ctx = canvas.getContext('2d');
        // Filled triangle
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            // set line color
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = getMaxScore - Math.round((getMaxScore / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }

        ctx.beginPath();
        var isLineDrawStarted = 'no';
        // ctx.moveTo(extraLeftSpaceForChart, 400);
        for (drLine = 0; drLine <= (getScoreForTimeChart.length - 1); drLine++) {
            var currentScore = getScoreForTimeChart[drLine];
            var convertScoreInProportion = Math.round((currentScore * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getScoreForTimeChart.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertScoreInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            createDotAPos[drLine] = getLineDrawYAxisPoint;
            createDotBPos[drLine] = getLineDrawXAxisPoint;

            prepareYAxisTxtLabel = getXAxisLabels[drLine];
            textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftSpace = Math.round(textWidth / 2);
            ctx.font = "12px Arial";
            ctx.fillText(getXAxisLabels[drLine], (((drLine + 1) * (400 / getScoreForTimeChart.length)) + extraLeftSpaceForChart) - textLeftSpace, 460);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2685A8';
        ctx.stroke();

        var dotScoreColor = '#2685A8';
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPos.length - 1); drawLn++) {
            ctx.beginPath();
            ctx.arc(createDotAPos[drawLn], createDotBPos[drawLn], dotRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotScoreColor;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = dotScoreColor;
            ctx.stroke();
            //    alert(createDotXPos[drawLn]);
        }


    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}

/*function comparisonWithToppersChart(getUserDataA, getUserDataB, getUserDataC getXAxisLabels, getMaxScore) {*/
function comparisonWithToppersChart(getUserDataA, getUserDataB, getXAxisLabels, getMaxScore) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = getMaxScore;
    var createDotAPos = new Array();
    var createDotBPos = new Array();

    var createDotAPosForUsrB = new Array();
    var createDotBPosForUsrB = new Array();

    var createDotAPosForUsrC = new Array();
    var createDotBPosForUsrC = new Array();


    document.write("<div align='center'><canvas id='compWithToppersChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart) + "'></canvas></div>");
    var canvas = document.getElementById('compWithToppersChart');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = getMaxScore - Math.round((getMaxScore / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }


        // Result for User A
        ctx.beginPath();
        var isLineDrawStarted = 'no';

        //Code by Abhijit 
        var currentPosStep = 1;
        var currentPosForText = 1;
        var getPosGapForText = (getUserDataA.length - 1) / 11;
        var nextPosForText = Math.round(currentPosStep * getPosGapForText);
        //Code by Abhijit 

        for (drLine = 0; drLine <= (getUserDataA.length - 1); drLine++) {
            var currentData = getUserDataA[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getUserDataA.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            createDotAPos[drLine] = getLineDrawYAxisPoint;
            createDotBPos[drLine] = getLineDrawXAxisPoint;

            prepareYAxisTxtLabel = getXAxisLabels[drLine];
            textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftSpace = Math.round(textWidth / 2);
            if ((drLine == 0) || (drLine == nextPosForText)) {
                ctx.font = "12px Arial";
                ctx.fillText((drLine + 1), (((drLine + 1) * (400 / getUserDataA.length)) + extraLeftSpaceForChart), 460);
                //ctx.fillText(getXAxisLabels[drLine], (((drLine + 1) * (400 / getUserDataA.length)) + extraLeftSpaceForChart) - textLeftSpace, 460);
            } else {
                if (drLine > nextPosForText) {
                    currentPosForText = drLine;
                    currentPosStep = currentPosStep + 1;
                    nextPosForText = Math.round(currentPosStep * getPosGapForText);
                }
            } 
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2685A8';
        ctx.stroke();

        var dotScoreColor = '#2685A8';
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPos.length - 1); drawLn++) {
            ctx.beginPath();
            ctx.arc(createDotAPos[drawLn], createDotBPos[drawLn], dotRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotScoreColor;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = dotScoreColor;
            ctx.stroke();
        }

        // Result for User A

        // Result for User B
        ctx.beginPath();
        var isLineDrawStarted = 'no';
        for (drLine = 0; drLine <= (getUserDataB.length - 1); drLine++) {
            var currentData = getUserDataB[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getUserDataB.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            createDotAPosForUsrB[drLine] = getLineDrawYAxisPoint;
            createDotBPosForUsrB[drLine] = getLineDrawXAxisPoint;
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#99B41C';
        ctx.stroke();

        var dotScoreColor = '#99B41C';
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPosForUsrB.length - 1); drawLn++) {
            ctx.beginPath();
            ctx.arc(createDotAPosForUsrB[drawLn], createDotBPosForUsrB[drawLn], dotRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotScoreColor;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = dotScoreColor;
            ctx.stroke();
        }

        // Result for User B


        // Result for User C
        /*ctx.beginPath();
        var isLineDrawStarted = 'no';
        for (drLine = 0; drLine <= (getUserDataC.length - 1); drLine++) {
        var currentData = getUserDataC[drLine];
        var convertDataInProportion = Math.round((currentData * 400) / getMaxScore);
        var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getUserDataC.length) + extraLeftSpaceForChart);
        var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
        if (isLineDrawStarted == 'no') {
        ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
        isLineDrawStarted = 'yes';
        } else {
        ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
        }
        createDotAPosForUsrC[drLine] = getLineDrawYAxisPoint;
        createDotBPosForUsrC[drLine] = getLineDrawXAxisPoint;
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#CC801E';
        ctx.stroke();

        var dotScoreColor = '#CC801E';
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPosForUsrC.length - 1); drawLn++) {
        ctx.beginPath();
        ctx.arc(createDotAPosForUsrC[drawLn], createDotBPosForUsrC[drawLn], dotRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = dotScoreColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = dotScoreColor;
        ctx.stroke();
        }
        */
        // Result for User C

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}


function getThemeWmsTopicGroupBarChart(chartDataA, chartDataB, chartDataC, xAxisLabel, getMaxRange) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = getMaxRange;

    var getXAxisLabels = xAxisLabel.split(',');
    var getChartDataA = chartDataA.split(',');
    var getChartDataB = chartDataB.split(',');
    var getChartDataC = chartDataC.split(',');

    var colorCodeA = readThemeWmsColor('wms-color-primary');
    var colorCodeB = readThemeWmsColor('wms-color-secondary');
    var colorCodeC = readThemeWmsColor('wms-color-third');
    //var setColor = '#2685A8, #99B41C, #CC801E';
    var setColor = colorCodeA + '|' + colorCodeB + '|' + colorCodeC;
    var splitColor = setColor.split('|');

    document.write("<div align='center'><canvas id='topicWiseChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart) + "'></canvas></div>");
    var canvas = document.getElementById('topicWiseChart');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = getMaxRange - Math.round((getMaxRange / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }

        var chartBarWidth = 25;
        var chartBarLeftPos = 1 * (440 / 11) + extraLeftSpaceForChart;

        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.fillText(getXAxisLabels[0], chartBarLeftPos, 460);

        // Result for User A
        for (drLine = 0; drLine <= (getChartDataA.length - 1); drLine++) {
            var currentData = getChartDataA[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxRange);
            var getLineDrawYAxisPoint = chartBarLeftPos;
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            ctx.beginPath();
            ctx.rect((chartBarLeftPos + (drLine + 1)), getLineDrawXAxisPoint, chartBarWidth, (440 - getLineDrawXAxisPoint));
            ctx.fillStyle = splitColor[drLine];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = splitColor[drLine];
            ctx.stroke();
            chartBarLeftPos = chartBarLeftPos + chartBarWidth;
        }
        // Result for User A
        chartBarLeftPos = chartBarLeftPos + 65;
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.fillText(getXAxisLabels[1], chartBarLeftPos, 460);
        // Result for User B
        for (drLine = 0; drLine <= (getChartDataB.length - 1); drLine++) {
            var currentData = getChartDataB[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxRange);
            var getLineDrawYAxisPoint = chartBarLeftPos;
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            ctx.beginPath();
            ctx.rect(((chartBarLeftPos) + (drLine + 1)), getLineDrawXAxisPoint, chartBarWidth, (440 - getLineDrawXAxisPoint));
            ctx.fillStyle = splitColor[drLine];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = splitColor[drLine];
            ctx.stroke();
            chartBarLeftPos = chartBarLeftPos + chartBarWidth;
        }

        // Result for User B
        chartBarLeftPos = chartBarLeftPos + 65;
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.fillText(getXAxisLabels[2], chartBarLeftPos, 460);

        // Result for User B
        for (drLine = 0; drLine <= (getChartDataC.length - 1); drLine++) {
            var currentData = getChartDataC[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxRange);
            var getLineDrawYAxisPoint = chartBarLeftPos;
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            ctx.beginPath();
            ctx.rect(((chartBarLeftPos) + (drLine + 1)), getLineDrawXAxisPoint, chartBarWidth, (440 - getLineDrawXAxisPoint));
            ctx.fillStyle = splitColor[drLine];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = splitColor[drLine];
            ctx.stroke();
            chartBarLeftPos = chartBarLeftPos + chartBarWidth;
        }

        // Result for User A


        /*
        prepareYAxisTxtLabel = getXAxisLabels[drLine];
        textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
        var textLeftSpace = Math.round(textWidth / 2);
        ctx.font = "12px Arial";
        ctx.fillText(getXAxisLabels[drLine], (((drLine + 1) * (400 / getChartDataA.length)) + extraLeftSpaceForChart) - textLeftSpace, 460);
        */

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}

function getThemeWmsBarChartWithVerticalLabel(chartData, xAxisLabel, chartYAxisRange) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraBottomSpaceForChart = 100;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = chartYAxisRange;

    var getXAxisLabels = xAxisLabel.split(',');
    var getChartData = chartData.split(',');

    var colorCodeBar = readThemeWmsColor('wms-color-primary');

    document.write("<div align='center'><canvas id='BarChartWithVerticalLabel' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart + extraBottomSpaceForChart) + "'></canvas></div>");
    var canvas = document.getElementById('BarChartWithVerticalLabel');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = chartYAxisRange - Math.round((chartYAxisRange / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }

        var chartBarWidth = 25;
        var chartBarLeftPos = 1 * (440 / 11) + extraLeftSpaceForChart;
        var startUpTextPos = chartBarLeftPos - 530;
        // Result for User A
        for (drLine = 0; drLine <= (getChartData.length - 1); drLine++) {
            ctx.save();
            ctx.rotate((-90) * Math.PI / 180);
            ctx.font = "normal 12px Verdana";
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";         
            ctx.textAlign = "right";
            ctx.fillText(getXAxisLabels[drLine], startUpTextPos, (chartBarLeftPos + (drLine + 1) + 15));
             
            ctx.restore();
            var currentData = getChartData[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / chartYAxisRange);
            var getLineDrawYAxisPoint = chartBarLeftPos;
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            ctx.beginPath();
            ctx.rect((chartBarLeftPos + (drLine + 1)), getLineDrawXAxisPoint, chartBarWidth, (440 - getLineDrawXAxisPoint));
            ctx.fillStyle = colorCodeBar;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colorCodeBar;
            ctx.stroke();
            chartBarLeftPos = chartBarLeftPos + chartBarWidth + chartBarWidth;
        }

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}

function getThemeWmsSimpleBarChart(chartData, xAxisLabel, chartYAxisRange) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraBottomSpaceForChart = 0;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = chartYAxisRange;

    var getXAxisLabels = xAxisLabel.split(',');
    var getChartData = chartData.split(',');

    var colorCodeBar = readThemeWmsColor('wms-color-primary');

    document.write("<div align='center'><canvas id='SimpleBarChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart + extraBottomSpaceForChart) + "'></canvas></div>");
    var canvas = document.getElementById('SimpleBarChart');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = chartYAxisRange - Math.round((chartYAxisRange / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }

        var chartBarWidth = 25;
        var chartBarLeftPos = 1 * (440 / 11) + extraLeftSpaceForChart;
        var startUpTextPos = chartBarLeftPos - 530;
        // Result for User A
        for (drLine = 0; drLine <= (getChartData.length - 1); drLine++) {
            ctx.save();
           // ctx.rotate((-90) * Math.PI / 180);
            ctx.font = "bold 12px Arial";
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";
          //  ctx.fillText(getXAxisLabels[drLine], startUpTextPos, (chartBarLeftPos + (drLine + 1) + 15));
            ctx.fillText(getXAxisLabels[drLine], chartBarLeftPos, 460);

            ctx.restore();
            var currentData = getChartData[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / chartYAxisRange);
            var getLineDrawYAxisPoint = chartBarLeftPos;
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            ctx.beginPath();
            ctx.rect((chartBarLeftPos + (drLine + 1)), getLineDrawXAxisPoint, chartBarWidth, (440 - getLineDrawXAxisPoint));
            ctx.fillStyle = colorCodeBar;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colorCodeBar;
            ctx.stroke();
            chartBarLeftPos = chartBarLeftPos + chartBarWidth + chartBarWidth;
        }

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}

function twoWaySpotLineChart(timeDataForDifficulty, scoreDataForDifficulty, scorerange, timerange, myXAxisLabel) {
    if ((timeDataForDifficulty != null) && (scoreDataForDifficulty != null)) {
        var myXAxisLabelSplit = myXAxisLabel.split(',');

        var timeDataForDifficultySplit = timeDataForDifficulty.split(',');
        var scoreDataForDifficultySplit = scoreDataForDifficulty.split(',');

        var newTimeString = '';
        for (nTimeCount = 0; nTimeCount <= (timeDataForDifficultySplit.length - 1); nTimeCount++) {
            var oldTimeInvidData = timeDataForDifficultySplit[nTimeCount];
            var newTimeInvidData = (scorerange * oldTimeInvidData) / timerange;
            timeDataForDifficultySplit[nTimeCount] = Math.round(newTimeInvidData);
        }
        difficultyLevelChart(timeDataForDifficultySplit, scoreDataForDifficultySplit, myXAxisLabelSplit, scorerange, timerange);
    }
}

function difficultyLevelChart(getUserDataA, getUserDataB, getXAxisLabels, getMaxScore, getMaxTimeRange) {
    var chartWidth = 440;
    var chartHeight = 440;
    var extraLeftSpaceForChart = 40;
    var extraTopSpaceForChart = 40;
    var extraRightSpaceForChart = 40;
    var setMaxScoreForChart = getMaxScore;
    var createDotAPos = new Array();
    var createDotBPos = new Array();

    var createDotAPosForUsrB = new Array();
    var createDotBPosForUsrB = new Array();

    var colorCodeA = readThemeWmsColor('wms-color-primary');
    var colorCodeB = readThemeWmsColor('wms-color-secondary');
    var colorCodeC = readThemeWmsColor('wms-color-third');
	
    document.write("<div align='center'><canvas id='compWithToppersChart' width='" + (chartWidth + (extraLeftSpaceForChart + extraRightSpaceForChart)) + "' height='" + (chartHeight + extraTopSpaceForChart) + "'></canvas></div>");
    var canvas = document.getElementById('compWithToppersChart');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (hrLine = 0; hrLine <= 11; hrLine++) {
            var newPathStartVal = hrLine * 40;
            ctx.beginPath();
            ctx.moveTo(extraLeftSpaceForChart, newPathStartVal);
            ctx.lineTo((chartWidth + extraLeftSpaceForChart), newPathStartVal);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabel = getMaxScore - Math.round((getMaxScore / 10) * (hrLine - 1));
            var textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftPos = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabel, ((textLeftPos - textWidth) - 10), newPathStartVal);

            ctx.font = "13px Arial";
            var prepareYAxisTxtLabelB = getMaxTimeRange - Math.round((getMaxTimeRange / 10) * (hrLine - 1));
            var textWidthB = ctx.measureText(prepareYAxisTxtLabelB).width;
            var textLeftPosB = extraLeftSpaceForChart;
            ctx.fillText(prepareYAxisTxtLabelB, ((textLeftPosB + chartWidth) + 10), newPathStartVal);
        }

        for (vrLine = 0; vrLine <= 11; vrLine++) {
            var newPathVrStartVal = vrLine * 40;
            ctx.beginPath();
            ctx.moveTo((40 * vrLine) + extraLeftSpaceForChart, 0);
            ctx.lineTo((40 * vrLine) + extraLeftSpaceForChart, (chartHeight));
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
        }


        // Result for User A
        ctx.beginPath();
        var isLineDrawStarted = 'no';
        for (drLine = 0; drLine <= (getUserDataA.length - 1); drLine++) {
            var currentData = getUserDataA[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getUserDataA.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            createDotAPos[drLine] = getLineDrawYAxisPoint;
            createDotBPos[drLine] = getLineDrawXAxisPoint;

            prepareYAxisTxtLabel = getXAxisLabels[drLine];
            textWidth = ctx.measureText(prepareYAxisTxtLabel).width;
            var textLeftSpace = Math.round(textWidth / 2);
            ctx.font = "12px Arial";
            ctx.fillText(getXAxisLabels[drLine], (((drLine + 1) * (400 / getUserDataA.length)) + extraLeftSpaceForChart) - textLeftSpace, 460);
        }
      

        ctx.lineWidth = 2;
        ctx.strokeStyle = colorCodeA;
        ctx.stroke();

        var dotScoreColor = colorCodeA;
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPos.length - 1); drawLn++) {
            ctx.beginPath();
            ctx.arc(createDotAPos[drawLn], createDotBPos[drawLn], dotRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotScoreColor;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = dotScoreColor;
            ctx.stroke();
        }

        // Result for User A

        // Result for User B
        ctx.beginPath();
        var isLineDrawStarted = 'no';
        for (drLine = 0; drLine <= (getUserDataB.length - 1); drLine++) {
            var currentData = getUserDataB[drLine];
            var convertDataInProportion = Math.round((currentData * 400) / getMaxScore);
            var getLineDrawYAxisPoint = ((drLine + 1) * (400 / getUserDataB.length) + extraLeftSpaceForChart);
            var getLineDrawXAxisPoint = (chartHeight - convertDataInProportion);
            if (isLineDrawStarted == 'no') {
                ctx.moveTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
                isLineDrawStarted = 'yes';
            } else {
                ctx.lineTo(getLineDrawYAxisPoint, getLineDrawXAxisPoint);
            }
            createDotAPosForUsrB[drLine] = getLineDrawYAxisPoint;
            createDotBPosForUsrB[drLine] = getLineDrawXAxisPoint;
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = colorCodeB ;
        ctx.stroke();

        var dotScoreColor = colorCodeB;
        var dotRadius = 5;

        for (drawLn = 0; drawLn <= (createDotAPosForUsrB.length - 1); drawLn++) {
            ctx.beginPath();
            ctx.arc(createDotAPosForUsrB[drawLn], createDotBPosForUsrB[drawLn], dotRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = dotScoreColor;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = dotScoreColor;
            ctx.stroke();
        }

        // Result for User B

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}
