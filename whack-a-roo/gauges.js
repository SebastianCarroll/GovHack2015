(function() {
  google.load("visualization", "1", {packages:["gauge"]});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var height = 200
    var width = 200
    
    // ------------------------------------------------------------------------------------------
    // Opinion Setup ------------------
    var opinion_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Opinion', 75]
    ]);
    
    var opinion_options = {
      width: width, height: height,
      redFrom: 0, redTo: 50,
      yellowFrom:50, yellowTo: 60,
      minorTicks: 5
    };
    
    var opinion_chart = new google.visualization.Gauge(document.getElementById('opinion_chart_div'));
    
    opinion_chart.draw(opinion_data, opinion_options);
    
    setInterval(function() {
      opinion_data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
      opinion_chart.draw(opinion_data, opinion_options);
    }, 3000);
    
    // ------------------------------------------------------------------------------------------
    // Cost Setup ------------------
    var budget = 10000000;
    var cost_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Cost', 0]
    ]);
    
    var cost_options = {
      width: width, height: height,
      redFrom: budget*0.9, redTo: budget,
      yellowFrom:budget*0.8, yellowTo: budget*0.9,
      minorTicks: 5, max: budget
    };
    
    var cost_chart = new google.visualization.Gauge(document.getElementById('cost_chart_div'));
    
    cost_chart.draw(cost_data, cost_options);
    
    setInterval(function() {
      old_val = cost_data.getValue(0,1);
      cost_data.setValue(0, 1, old_val + 1000);
      cost_chart.draw(cost_data, cost_options);
    }, 500);
    
    // ------------------------------------------------------------------------------------------
    // Population Setup ------------------
    var population = 10000000;
    var pop_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Population', 0]
    ]);
    
    var pop_options = {
      width: width, height: height,
      redFrom: population*0.85, redTo: population,
      yellowFrom:population*0.6, yellowTo: population*0.85,
      minorTicks: 5, max: population
    };
    
    var pop_chart = new google.visualization.Gauge(document.getElementById('pop_chart_div'));
    
    pop_chart.draw(pop_data, pop_options);
    
    setInterval(function() {
      old_val = pop_data.getValue(0,1);
      pop_data.setValue(0, 1, old_val + 1000);
      pop_chart.draw(pop_data, pop_options);
    }, 500);
  }
})();