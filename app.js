function errorHandler(e)
{
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
  console.log('Error: ' + msg);
}

function pad(n,c,l)
{
  a = ""+n;
  while ( a.length < l )
    a = c+a;
  return a;
}

function getTime(d)
{
  t = "";
  if ( d.getHours() < 13 )
    t += d.getHours();
  else
    t += (d.getHours()-12);
  t += ":" + pad(d.getMinutes(),"0",2);
  if ( d.getHours() < 13 )
    t += 'am';
  else
    t += 'pm';
  return t;
}

function getDate(d)
{
  t = "";
  t += pad(d.getMonth()+1,"0",2);
  t += "/";
  t += pad(d.getDate(),"0",2);
  t += "/";
  t += d.getFullYear();
  return t;
}

function getColr(c)
{
  var out = '';
  var q = []
    for (var i in c)
      q.push(i);
  return q.join(', ');
}

function Purchase (id,name,colr,time)
{
  this.id = id;
  this.d = new Date();
  this.name = name;
  this.colr = colr;
}

function Item(id,price,name,colrs)
{
  this.price = price;
  this.id = id;
  this.name = name;
  this.colrs = colrs;
}

function getFS(callback) 
{
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.PERSISTENT, 5*1024*1024,function(fileSys) {
    callback(fileSys);
  },errorHandler);
}

function encrypt(str) {
  key = "lkajbvkjaebrfjalskjdfhaklsdfhlaksjhdfjcnlakrnvkljashdkfjhalskdjnlakwefqwehfak";
  var res = "";
  for (var i in str) {
    res += String.fromCharCode(str.charCodeAt(i)^key.charCodeAt(i%key.length))
  }
  return res;
}


$.extend( {
  getUrlVar: 
  function(q,s){
    s = s ? s : window.location.search; 
    var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
    return (s=s.replace(/^\?/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : ''; 
  } 
});

color_names = {
  red:"#EE1D23",
  yellow:"#F2EB0B",
  green:"#11AE4B",
  pink:"#F59496",
  other:"#3DA9C4",
}

var max_id = -1;
var items = [];
items.push(new Item(++max_id,5.99,"Beef and Barley Stew",{red:1}));
items.push(new Item(++max_id,7.49,"Potato Wedges",{red:1,green:1,yellow:1}));
items.push(new Item(++max_id,3.99,"Stuffed Pork Loin",{red:1}));
items.push(new Item(++max_id,5.49,"Beef Fajitas",{red:1,yellow:1,pink:1}));
items.push(new Item(++max_id,6.99,"Stuffed Peppers",{red:1,green:1}));
items.push(new Item(++max_id,2.49,"Healthy Caesar Salad",{red:1,green:1,pink:1}));
items.push(new Item(++max_id,4.99,"Balsamic Glazed Brussels Sprouts",{green:1,yellow:1}));
items.push(new Item(++max_id,9.49,"Baked Stuffed Tomatoes",{green:1}));
items.push(new Item(++max_id,5.99,"Mixed Veggie Casserole",{green:1,yellow:1}));
items.push(new Item(++max_id,6.49,"Mushroom Chili",{green:1,}));
items.push(new Item(++max_id,3.99,"Eggplant Lasagna",{green:1,yellow:1,pink:1}));
items.push(new Item(++max_id,1.49,"Garlic-Stuffed Sirloin Steak",{yellow:1}));
items.push(new Item(++max_id,2.99,"Fruit salad with mojito dressing",{green:1,yellow:1}));
items.push(new Item(++max_id,3.49,"Blueberry-lemon country cobbler",{yellow:1}));
items.push(new Item(++max_id,4.99,"Grilled Cajun Bass",{red:1, yellow:1}));
items.push(new Item(++max_id,5.49,"Shrimp and Veggie Creole Kebabs",{pink:1}));
items.push(new Item(++max_id,6.99,"Turkey Mock Tacos",{pink:1}));
items.push(new Item(++max_id,3.49,"Herbed Chicken Pasta Salad",{yellow:1,pink:1}));
items.push(new Item(++max_id,4.99,"Chicken Fried Rice",{pink:1}));
items.push(new Item(++max_id,9.49,"Banana Split ontop of a Pie",{other:1}));
items.push(new Item(++max_id,0.99,"Glue",{other:1}));
