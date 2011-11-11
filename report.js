getFS(function(fs) {
  var from_str = $.getUrlVar('from').replace('+',' ');
  var to_str = $.getUrlVar('to').replace('+',' ');
  if (from_str == "") {
    var from_date = new Date(0);
  }
  else {
    var from_date = new Date(from_str+" GMT-0500 (EST)");
  }
  if (to_str == "") {
    var to_date = new Date("Dec 31 2500 23:59:00 GMT-0500 (EST)");
  }
  else {
    var to_date = new Date(to_str+" GMT-0500 (EST)");
    to_date.setMinutes(to_date.getMinutes()+1);
  }
  console.log(from_date.toString());
  console.log(to_date.toString());
  var table = $("#items")[0];
  fs.root.getFile('items.dat', {create:true}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        var items = this.result.split('\n');
        var colrs = {};
        for (var i in items){
          if ( items[i] != '' ) {

            var item = JSON.parse(items[i]);
            var date = new Date(item.d);

            if ( date <= to_date && date >= from_date ) {
              var tr = document.createElement('tr');
              var td_name = document.createElement('td');
              var td_colr = document.createElement('td');
              var td_date = document.createElement('td');

              td_name.innerText = item.name;
              td_colr.innerText = getColr(item.colr);
              td_date.innerText = getDate(date) + " " + getTime(date);
              tr.appendChild(td_name);
              tr.appendChild(td_colr);
              tr.appendChild(td_date);
              table.appendChild(tr);
              for (var i in item.colr){
                if ( colrs[i] ){
                  colrs[i] += 1;
                }
                else{
                  colrs[i] = 1;
                }
              }
            }

          }
        }
        var colors = [];
        for (var c in colrs)
        {
          colors.push({label:c,data:colrs[c],color:color_names[c]});
        }
        $.plot($("#default"), colors, 
            {
              series: {
                        pie: { 
                               show: true,
          radius: 1,
          label: {
            show: true,
          radius: 3/4,
          formatter: function(label, series){
            return '<div style="font-size:11pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
          },
          background: { opacity: 0.5 }
          }
                             }
                      },
          legend: {
                    show: false
                  }
            });
      };
      reader.readAsText(file);
    }, errorHandler);
  }, errorHandler);
});
