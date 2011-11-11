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

function Purchase (name,colr,time)
{
  this.d = new Date();
  this.name = name;
  this.colr = colr;
}

function Item(name,colrs)
{
  this.name = name;
  this.colrs = colrs;
}

function getFS(callback) {
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.PERSISTENT, 5*1024*1024,function(fileSys) {
    callback(fileSys);
  },errorHandler);
}

$.extend({
  getUrlVar: 
  function(q,s){
    s = s ? s : window.location.search; 
    var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
    return (s=s.replace(/^\?/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined; 
  } 
});

color_names = {
  red:"#EE1D23",
  yellow:"#F2EB0B",
  green:"#11AE4B",
  pink:"#F59496",
  other:"#3DA9C4",
}
