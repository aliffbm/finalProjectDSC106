$(document).ready(function () {

    setTimeout(function(){
        
        $("#intro-text").fadeOut(2000, function(){
            $("#intro-text").text("Do we look for more money?").fadeIn(2000);
            $("#intro-text").fadeOut(2000, function(){
                $("#intro-text").text("Does economic health determine some level of happines?").fadeIn(2000);
                $("#intro-text").fadeOut(2000, function(){
                    $("#intro-text").text("Let's find out what the data says").fadeIn(2000);
                    $("#intro").fadeOut(2000, function(){
                        $("#theRest").fadeIn(2000);
                    })
                })
            })
        });
       
       
        
    }, 1000)
    

    $("#buttons").on("click", function (e) {
        let id = e.target.id;
        console.log("the target is: ", e.target.id);
        getData(id)
    })
    getData(15);
    function getData(id) {
        $.getJSON('./data/' + id, function (data) {
            console.log(data);
            series = data.happinessData;
            let suicides = data.suicideData;

            let top = (data.top) ? data.top : null;
            let topKeys = (top) ? Object.keys(top[0]) : null

            if (top != null) {
                let tableHeaders = "<tr>";
                let tableBody = "";
                let tr = "";
                for (let i = 0; i < topKeys.length; i++) {
                    tableHeaders += `<th>${topKeys[i]}</th>`
                }
                tableHeaders += "</tr>";
                for (let i = 0; i < top.length; i++) {
                    let tableRowData = "";
                    let keys = Object.keys(top[i]);
                    tr = "<tr>";
                    for (let j = 0; j < keys.length; j++) {
                        tableRowData += `<td>${top[i][keys[j]]}</td>`
                    }
                    tr += tableRowData;
                    tr += '</tr>';
                    tableBody += tr;
                }
                let table = `<h2>Top 10 Suicides by Country - 20${id}</h2><table class="table"><thead>${tableHeaders}</thead><tbody>${tableBody}</tbody></table>`
                $("#top-suicides").html(table)
                $("#top-suicides").css("font-size", "20px")
            } else {
                $("#top-suicides").html("No Data Available").css("font-size", "25px").css("text-align", "center")
            }
            Highcharts.chart('highContainer', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                accessibility: {
                    description: ''
                },
                title: {
                    text: 'GDP per Capita Versus Happiness Score of Countries for the year 20' + id
                },
                subtitle: {
                    text: 'Source: Kaggle'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'GDP Per Capitan Normalized'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: false
                },
                yAxis: {
                    title: {
                        text: 'Happiness Score Normalized'
                    },
                    showLastLabel: false
                },
                legend: {
                    enabled: false
                    // layout: 'horizontal',
                    // align: 'right',
                    // verticalAlign: 'bottom',
                    // x: 100,
                    // y: 120,
                    // floating: true,
                    // backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                    // borderWidth: 1
                },
                plotOptions: {
                    series: {
                        events: {
                            mouseOver: function () {
                                suicide(suicides, this.name, this.yData);
                            }
                        }
                    },
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: 'GDP/capita: {point.x}, Happiness Score: {point.y}'
                        }
                    }
                },
                series: series
            });
        });

    }

    function suicide(data, key, happyScore) {
        if (!data[key]) {
            let el = document.getElementById("suicide-container")
            el.innerHTML = "No Data Available";
            el.style.color = "#fff";
            if(happyScore < .50) {
                
                el.style.background = "url('assets/images/depressed.png')";
                el.innerText = `No Suicide Data Available ... But Happiness score in ${key} is  ${happyScore}, which is ~ less than half of the countries`
                } else {
                el.style.background = "url('assets/images/happy.jpeg')";
                el.innerText = `No Suicide Data Available ... But Happiness score in ${key} is ${happyScore}, which is ~ greater than half of the countries`
            }
            
            el.style.backgroundSize = "contain";
            el.style.width = "50vw";
            el.style.backgroundRepeat = "no-repeat";
            el.style.textAlign = "center";
            el.style.fontSize = "20px"
            
        } else {

            let el = document.getElementById("suicide-container")
            el.innerHTML = "";
            el.style.background = "";
            var chart = {
                type: 'bar'
            };
            var title = {
                text: 'Number of Suicides by Male, Female for the Counrty ' + key
            };
            var subtitle = {
                text: 'Source: Kaggle'
            };
            var xAxis = {
                //
                categories: ["Boomers", "Generation X", "Millenials", "Silent"],
                title: {
                    text: null
                }
            };
            var yAxis = {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            };
            var tooltip = {
                valueSuffix: ' millions'
            };
            var plotOptions = {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            };
            var legend = {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,

                backgroundColor: (
                    (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
                    '#FFFFFF'),
                shadow: true
            };
            var credits = {
                enabled: false
            };

            let keys;
            let seriess = [];
            if (data[key]) {
                keys = Object.keys(data[key])
                for (let i = 0; i < keys.length; i++) {
                    seriess.push({
                        name: keys[i],
                        data: data[key][keys[i]]
                    })
                }
            }

            var series = seriess;
            // [
            //     {
            //         name: 'Year 1800',
            //         data: [107, 31, 635, 203, 2]
            //     },
            //     {
            //         name: 'Year 1900',
            //         data: [133, 156, 947, 408, 6]
            //     },
            //     {
            //         name: 'Year 2008',
            //         data: [973, 914, 4054, 732, 34]
            //     }
            // ];

            var json = {};
            json.chart = chart;
            json.title = title;
            json.subtitle = subtitle;
            json.tooltip = tooltip;
            json.xAxis = xAxis;
            json.yAxis = yAxis;
            json.series = series;
            json.plotOptions = plotOptions;
            json.legend = legend;
            json.credits = credits;


            console.log(data[key])
            Highcharts.chart('suicide-container', json);
            

        }
    }

    // $('#suicide-container').highcharts(json);


});