$(window).on(
		'load',
		function() {
			var uname = null;
			var pass = null;
			$(document).on(
					'click',
					'#butt',
					function() {
						
						uname = $('#uname').val();
						pass = $('#pass').val();
						if(uname,pass!=""){
							$('#login').hide();
						}
						else{
							alert("Enter the value");
						}
						var url = "/Mysql/Mysql?operation=getdb&uname=" + uname
								+ "&pass=" + pass;
						$.ajax(url).done(function(result) {
							// console.log();
							// alert(result);
							var rs = JSON.parse(result);
							var table = document.createElement("table");
							document.body.appendChild(table);
							for (var i = 0; i < rs.length; i++) {
								// $('#table').append(rs[i]);
								var tr = document.createElement("tr");
								table.appendChild(tr);
								tr.setAttribute("id", "db")
								$(tr).append(rs[i]);
								// var a=document.createElement("a")
								// tr.appendChild(a);
								// $('#p').append(rs[i]);
							}
							// alert(result);
						}).fail(function(result) {
							// console.log();
							// alert(result);
						})
					});
			$(document).on(
					'click',
					'#db',
					function() {
						// $('#butt').hide();
						uname = $('#uname').val();
						pass = $('#pass').val();
						var dab = $($(this)[0]).text();
						var url = "/Mysql/Mysql?operation=gettable&uname="
								+ uname + "&pass=" + pass + "&dab=" + dab;
						$.ajax(url).done(function(result) {
							// console.log();
							// alert(result);
							alert(dab + " selected");
							var rs = JSON.parse(result)
							var table = document.createElement("table");
							document.body.appendChild(table);
							var tr1 = document.createElement("tr");
							table.appendChild(tr1);
							var h1=document.createElement("h1");
							var h1t=document.createTextNode(dab);
							h1.appendChild(h1t);
							tr1.appendChild(h1);
							for (var i = 0; i < rs.length; i++) {
								// $('#table').append(rs[i]);
								
								var tr = document.createElement("tr");
								table.appendChild(tr);
								tr.setAttribute("id", "mt")
								$(tr).append(rs[i]);
								/*
								 * var a=document.createElement("a")
								 * tr.appendChild(a);
								 */
								// $('#p').append(rs[i]);
							}
							// alert(result);
						}).fail(function(result) {
							// console.log();
							// alert(result);
						})
					});

		});
