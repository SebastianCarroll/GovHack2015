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
    
    var fertile = cur_pop*0.6
    var costs = { "dart": 10, "bullet": 5, "overhead": 1000}
    
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
     var cost_med = 0.8;
     var cost_high = 0.9;
    var cost_options = {
      width: width, height: height,
      redFrom: budget*cost_high, redTo: budget,
      yellowFrom:budget*cost_med, yellowTo: budget*cost_high,
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
    
    var pop_high = 0.75;
    var pop_low = 0.25;
    
    var pop_options = {
      width: width, height: height,
      redFrom: population*pop_high, redTo: population, 
      //yellowFrom:population*0.6, yellowTo: population*0.85, yellow
      greenFrom: 0, greenTo: population*pop_low, greenColor: "#DC3912",
      minorTicks: 5, max: population
    };
    
    var pop_chart = new google.visualization.Gauge(document.getElementById('pop_chart_div'));
    
    pop_chart.draw(pop_data, pop_options);
    
    // ------------------------------------------
    function grab_user_input(){
      roo_cull["dart"] =  document.getElementById("dart_num").value;
      roo_cull["bullet"] =  document.getElementById("bullet_num").value;
      //document.getElementById("demo").innerHTML = JSON.stringify(roo_cull);
    }
    
    function updateGauges() {
      grab_user_input()
      var growth_rate = 1.05;
      cur_pop = parseInt((cur_pop - roo_cull["bullet"]  - roo_cull["dart"])*growth_rate)
      pop_data.setValue(0, 1, cur_pop);
      pop_chart.draw(pop_data, pop_options);
      
      cur_cost += costs["overhead"] + costs["dart"]*roo_cull["dart"] + costs["bullet"]*roo_cull["bullet"]
      cost_data.setValue(0, 1, cur_cost);
      cost_chart.draw(cost_data, cost_options);
      
      if(cur_pop > population*pop_high || cur_pop < population*pop_low){
	cur_opinion -= 2;
      }
      
      if(cur_cost > budget*cost_med){
	cur_opinion -= 1;
	if (cur_cost > budget*cost_high){
	  cur_opinion -= 1;
	}
      }
      
      cur_opinion += 1
      
      if(cur_opinion > 100) { cur_opinion = 100}
      opinion_data.setValue(0, 1, cur_opinion);
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
          timer = duration;
        }
        
        if (timer%3 === 0){
	  updateGauges()
	}
      }, 1000);
    }

    var twnMins = 10*60;
    startTimer(twnMins, document.getElementById("time"));
  }   
//})();