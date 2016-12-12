$(window).on('load', function() {
	var uname=null;
	var pass=null;
  $(document).on('click', '#butt', function() {
	  $('#butt').hide();
    uname=$('#uname').val();
      pass=$('#pass').val();
    var url="/Mysql/Mysql?operation=getdb&uname="+uname+"&pass="+pass;
$.ajax(url)
.done(function(result){
 //console.log();
   //alert(result);
  var rs = JSON.parse(result)
  var table=document.createElement("table");
	  document.body.appendChild(table);
  for(var i=0;i<rs.length;i++){
	 // $('#table').append(rs[i]);
var tr=document.createElement("tr");
table.appendChild(tr);
$(tr).append(rs[i]);
var a=document.createElement("a")
	  tr.appendChild(a);
   //$('#p').append(rs[i]);
  }
  //alert(result);
  }).
  fail(function(result){
  // console.log();
   //alert(result);
  })
  });
});
