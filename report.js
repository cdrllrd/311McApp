function getRange() {
  var from_str = $.getUrlVar('from').replace('+',' ');
  var to_str = $.getUrlVar('to').replace('+',' ');
  if (from_str == "")
    var from_date = new Date(0);
  else
    var from_date = new Date(from_str+" GMT-0500 (EST)");
  if (to_str == "")
    var to_date = new Date("Dec 31 2500 23:59:00 GMT-0500 (EST)");
  else {
    var to_date = new Date(to_str+" GMT-0500 (EST)");
    to_date.setMinutes(to_date.getMinutes()+1);
  }
  return [from_date,to_date];
}

function allMostColors(color_count) {
  var max_color = color_count['red'];
  for (var c in color_count) {
    if ( color_count[c] > max_color ) {
      max_color = color_count[c];
    }
  }
  var max_colors = [];
  for (var c in color_count) {
    if ( color_count[c] == max_color) {
      max_colors.push(c);
    }
  }
  return max_colors;
}

function allLeastPurchs(purch_count) {
  var min_purch = purch_count[0];
  for (var p in purch_count) {
    if ( purch_count[p] < min_purch ) {
      min_purch = purch_count[p];
    }
  }
  var min_purchs = [];
  for (var p in purch_count) {
    if ( purch_count[p] == min_purch ) {
      min_purchs.push(p);
    }
  }
  return min_purchs;
}

function plotGraph(color_count) {
  var color_data = [];
  for (var c in color_count) {
    color_data.push({label:c,data:color_count[c],color:color_names[c]});
  }
  $.plot($("#default"), color_data, 
    {
      series: { 
        pie: { 
          show: true, 
          radius: 1, 
          label: {
            show: true,
            radius: 3/4,
            formatter: function(label, series){
              return '<div style="font-weight:bold;font-size:13pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
            },
            background: { opacity: 0 }
          }
        }
      },
      legend: {
        show: false
      }
    });
}


getFS(function(fs) {
  var range = getRange();
  var from_date = range[0];
  var to_date = range[1];
  var table = $("#items")[0];
  var rngTag = $("#range")[0];
  rngTag.innerText = "from " + getDate(from_date) + " " + getTime(from_date) + " to " + getDate(to_date) + " " +getTime(to_date);
  fs.root.getFile('items.dat', {create:true}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        var purch_count = [];
        for (var i = 0; i < max_id+1; i++) {
          purch_count.push(0);
        }
        var color_count = {};
        for (var i in color_names) {
          color_count[i] = 0;
        }
        var purchs = this.result.split('\n');
        for (var i in purchs){
          if ( purchs[i] != '' ) {
            var purch = JSON.parse(purchs[i]);
            var date = new Date(purch.d);
            if ( date <= to_date && date >= from_date ) {
              ++purch_count[purch.id];
              for (var i in purch.colr){
                color_count[i] += 1;
              }
            }
          }
        }
        var max_colors = allMostColors(color_count);
        var min_purchs = allLeastPurchs(purch_count);
        var specials = [];
        for (p in min_purchs) {
          for (c in max_colors) {
            var itm = items[min_purchs[p]];
            var clr = max_colors[c];
            if (itm.colrs[clr] != undefined){
              specials.push(itm);
              break;
            }
          }
        }
        var ulSpcl = $('#specials')[0];
        for (sp in specials) {
          var li = document.createElement("li");
          li.innerText = specials[sp].name;
          ulSpcl.appendChild(li);
        }
        plotGraph(color_count);
      };
      reader.readAsText(file);
    }, errorHandler);
  }, errorHandler);
});
