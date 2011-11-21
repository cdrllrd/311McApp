function upload(){
  getFS(function(fs){
    fs.root.getFile('items.dat', {create:true}, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var data = encrypt(this.result);
          $.post("http://cs.uwindsor.ca/~drouill8/311app/upload.php", {data:data},
            function(data) {
              console.log("xhr response: "+data);
            });
        }
        reader.readAsText(file);
      });
    });
  });
}

getFS(function(fs){
  var ul = $('#items')[0];
  for (var i = 0; i < items.length; ++i) {
    var d = document.createElement('li');
    var test = "";
    
      /*Get all the colors for each element, add them to the li element's class for
      styling*/
      for(var c in items[i].colrs)
    	{
    	  d.classList.add(c);
    	}
    	
    	d.innerText = items[i].name;
    d.id = i;
    d.addEventListener("click",function(e) {
      that = this;
      fs.root.getFile('items.dat', {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.seek(fileWriter.length);
          var bb = new window.WebKitBlobBuilder();
          var item = items[that.id];
          var purch = new Purchase(item.id,item.name,item.colrs);
          var money = parseFloat(localStorage.getItem("money")) + item.price;
          var receipts = parseInt(localStorage.getItem("receipts")) + 1;
          money = money.toFixed(2);

          localStorage.setItem("receipts",receipts);
          localStorage.setItem("money",money);
          $('#receipts')[0].innerText = localStorage.getItem("receipts");
          $('#money')[0].innerText = "$" + localStorage.getItem("money");

          bb.append(JSON.stringify(purch)+"\n");
          fileWriter.write(bb.getBlob('text/plain'));
          upload();
        }, errorHandler);
      }, errorHandler);
    },false);
    ul.appendChild(d);
  }
});

getFS(function(fs){
  var clear = $("#clearLog")[0];
  clear.addEventListener("click",
    function() {
      fs.root.getFile('items.dat', {create:true}, function(fe) {
        fe.remove(function() {
          console.log("File Deleted");
        },errorHandler);
      }, errorHandler);
      localStorage.setItem("receipts",0);
      localStorage.setItem("money",0);
      $('#receipts')[0].innerText = localStorage.getItem("receipts");
      $('#money')[0].innerText = "$" + localStorage.getItem("money");
    },false);
});

$('#validReset')[0].addEventListener("click",function(){
  localStorage.setItem("receipts",0);
  localStorage.setItem("money",0);
  $('#receipts')[0].innerText = localStorage.getItem("receipts");
  $('#money')[0].innerText = "$" + localStorage.getItem("money");
},false);

if(localStorage.getItem("receipts") == null) {
  localStorage.setItem("receipts",0);
}
if(localStorage.getItem("money") == null) {
  localStorage.setItem("money",0);
}
$('#receipts')[0].innerText = localStorage.getItem("receipts");
$('#money')[0].innerText = "$" + localStorage.getItem("money");

$('#to').datetimepicker({ampm:true});
$('#from').datetimepicker({ampm:true});
