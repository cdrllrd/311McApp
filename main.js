var items = [];
items.push(new Item("cheese",{red:1,yellow:1,green:1}));
items.push(new Item("turkey bacon classic",{red:1,yellow:1,green:1}));
items.push(new Item("walrus liver with cream cheese",{red:1,green:1}));
items.push(new Item("chunk of duck lung",{yellow:1,green:1}));
items.push(new Item("running shoes",{pink:1,yellow:1}));
items.push(new Item("glue",{other:1}));

function upload(){
  getFS(function(fs){
    fs.root.getFile('items.dat', {create:true}, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          $.post("http://cs.uwindsor.ca/~drouill8/311app/upload.php", {data:this.result},
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
    d.id = i;
    d.addEventListener("click",function(e) {
      that = this;
      fs.root.getFile('items.dat', {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.seek(fileWriter.length);
          var bb = new window.WebKitBlobBuilder();
          var item = items[that.id];
          var purch = new Purchase(item.name,item.colrs);
          bb.append(JSON.stringify(purch)+"\n");
          fileWriter.write(bb.getBlob('text/plain'));
          upload();
        }, errorHandler);
      }, errorHandler);
    },false);
    ul.appendChild(d);
  }
});

var out = document.createElement("input");
out.type = "button";
out.value = "reset";
getFS(function(fs){
  out.addEventListener("click",function() {
    fs.root.getFile('items.dat', {create:true}, function(fe) {
      fe.remove(function() {
        console.log("File Deleted");
      },errorHandler);
    }, errorHandler);
  },false);
  document.body.appendChild(out);
});

$('#to').datetimepicker({ampm:true});
$('#from').datetimepicker({ampm:true});
