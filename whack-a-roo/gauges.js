//(function() {
  google.load("visualization", "1", {packages:["gauge"]});
  google.setOnLoadCallback(drawChart);
  
  var roo_cull = { "dart": 0, "bullet": 0} 
  
  function drawChart() {
    var height = 200;
    var width = 200;
    var interval = 5000;
    var cur_opinion = 75;
    var cur_pop = 3000000;
    var cur_cost = 0;
    
    // ------------------------------------------------------------------------------------------
    // Opinion Setup ------------------
    var opinion_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Opinion', cur_opinion]
    ]);
    
    var opinion_options = {
      width: width, height: height,
      redFrom: 0, redTo: 50,
      yellowFrom:50, yellowTo: 60,
      minorTicks: 5
    };
    
    var opinion_chart = new google.visualization.Gauge(document.getElementById('opinion_chart_div'));
    
    opinion_chart.draw(opinion_data, opinion_options);
    
    // ------------------------------------------------------------------------------------------
    // Cost Setup ------------------
    var budget = 10000000;
    var cost_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Cost', cur_cost]
    ]);
    
    var cost_options = {
      width: width, height: height,
      redFrom: budget*0.9, redTo: budget,
      yellowFrom:budget*0.8, yellowTo: budget*0.9,
      minorTicks: 5, max: budget
    };
    
    var cost_chart = new google.visualization.Gauge(document.getElementById('cost_chart_div'));
    
    cost_chart.draw(cost_data, cost_options);
    
    // ------------------------------------------------------------------------------------------
    // Population Setup ------------------
    var population = 10000000;
    var pop_data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Population', cur_pop]
    ]);
    
    var pop_options = {
      width: width, height: height,
      redFrom: population*0.85, redTo: population,
      yellowFrom:population*0.6, yellowTo: population*0.85,
      minorTicks: 5, max: population
    };
    
    var pop_chart = new google.visualization.Gauge(document.getElementById('pop_chart_div'));
    
    pop_chart.draw(pop_data, pop_options);
    
    // ------------------------------------------
    function increase_cull_number(){
      roo_cull["dart"] =  document.getElementById("dart_num").value;
      roo_cull["bullet"] =  document.getElementById("bullet_num").value;
      document.getElementById("demo").innerHTML = JSON.stringify(roo_cull);
    }
    
    function updateGauges() {
      increase_cull_number()
      
      cur_pop += 10000 - roo_cull["dart"] - roo_cull["bullet"] 
      pop_data.setValue(0, 1, cur_pop);
      pop_chart.draw(pop_data, pop_options);
      
      cur_cost += 1000
      cost_data.setValue(0, 1, cur_cost);
      cost_chart.draw(cost_data, cost_options);
      
      opinion_data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
      opinion_chart.draw(opinion_data, opinion_options);
    }
    
    // ------------------------------------------------------------------------------------------
    // Countdown timer ------------------
    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
	  updateGauges()
          timer = duration;
        }
      }, 1000);
    }

    var fiveSeconds = 1;
    startTimer(fiveSeconds, document.getElementById("time"));
  }   
//})();