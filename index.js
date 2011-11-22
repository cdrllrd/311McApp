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
    d.innerText = items[i].name;
    
      /*Add css class based on JSON*/
      for(var c in items[i].colrs)
    	{
    	  d.classList.add(c);
    	  d.innerHTML += '<img src="circle_' + c + '.png" alt="blue" />';
    	}
    	
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
  //Add icon based on css class
  /*$('.yellow').append('<li><img src="circle_yellow.png" alt="yellow" /></li>');
  $('.green').append('<li><img src="circle_green.png" alt="green" /></li>');
  $('.blue').append('<li><img src="circle_blue.png" alt="blue" /></li>');
  $('.orange').append('<li><img src="circle_orange.png" alt="orange" /></li>');
  $('.red').append('<li><img src="circle_red.png" alt="red" /></li>');*/
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



