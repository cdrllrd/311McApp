function getLogTR(purch) {
  var tr = document.createElement('tr');
  var td_name = document.createElement('td');
  var td_colr = document.createElement('td');
  var td_date = document.createElement('td');
  var date = new Date(purch.d);

  td_name.innerText = purch.name;
  td_colr.innerText = getColr(purch.colr);
  td_date.innerText = getDate(date) + " " + getTime(date);
  tr.appendChild(td_name);
  tr.appendChild(td_colr);
  tr.appendChild(td_date);
  return tr;
}

getFS(function(fs) {
  var table = $("#items")[0];
  fs.root.getFile('items.dat', {create:true}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        var purchs = this.result.split('\n');
        for (var i in purchs){
          if ( purchs[i] != '' ) {
            var purch = JSON.parse(purchs[i]);
            table.appendChild(getLogTR(purch));
          }
        }
      };
      reader.readAsText(file);
    }, errorHandler);
  }, errorHandler);
});
