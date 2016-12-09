$(window).on('load', function() {
  $(document).on('click', '#butt', function() {
    var uname=$('#uname').val();
    var  pass=$('#pass').val();
    var url="/Mysql/Mysql?operation=add&uname="+uname+"&pass="+pass+
$.ajax(url)
.done(function(result){
 console.log();
  //  alert(result);
  }).
  fail(function(result){
   console.log();
  // alert(result);
  })
  });
});
