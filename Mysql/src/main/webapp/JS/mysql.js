$(window).on(
    'load',
    function() {
        var uname = null;
        var pass = null;
        var dab = null;
        var mt = null;
        $(document).on(
            'click',
            '#butt',
            function() {

                uname = $('#uname').val();
                pass = $('#pass').val();
                if (uname, pass != "") {
                    $('#login').hide();
                } else {
                    alert("Enter the value");
                }
                var url = "/Mysql/Mysql?operation=getdb&uname=" + uname +
                    "&pass=" + pass;
                $.ajax(url).done(function(result) {
                    // console.log();
                    // alert(result);
                    var rs = JSON.parse(result);
                    var div1 = document.createElement("div");
                    document.body.appendChild(div1);
                    div1.setAttribute("class","first");
                    var table = document.createElement("table");
                    div1.appendChild(table);
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
                dab = $($(this)[0]).text();
               // $('.first').hide();
                var url = "/Mysql/Mysql?operation=gettable&uname=" +
                    uname + "&pass=" + pass + "&dab=" + dab;
                $.ajax(url).done(function(result) {
                    // console.log();
                    // alert(result);
                    //alert(dab + " selected");
                    var rs = JSON.parse(result)
                     var div2 = document.createElement("div");
                    document.body.appendChild(div2);
                    div2.setAttribute("class","second");
                    var table = document.createElement("table");
                    div2.appendChild(table);
                    var tr1 = document.createElement("tr");
                    table.appendChild(tr1);
                    var h1 = document.createElement("h1");
                    var h1t = document.createTextNode(dab);
                    h1.appendChild(h1t);
                    tr1.appendChild(h1);
                    for (
                        var i = 0; i < rs.length; i++) {
                        // $('#table').append(rs[i]);

                        var tr = document.createElement("tr");
                        table.appendChild(tr);
                        tr.setAttribute("id", "tableName")
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
        $(document).on(
            'click',
            '#tableName',
            function() {
                uname = $('#uname').val();
                pass = $('#pass').val();
                tableName = $($(this)[0]).text();
                //$('.second').hide();
                var url = "/Mysql/Mysql?operation=ssft&uname=" + uname +
                    "&pass=" + pass + "&dab=" + dab +
                    "&tableName=" + tableName;
                $.ajax(url).done(function(result) {
                    var response = JSON.parse(result);
                    var columns = response.columnName;
                    var table = "<div class=third><table><th>"
                    for (var i = 0; i < columns.length; i++) {
                        table += "<td>" + columns[i] + "</td>"
                    }
                    table += "</th>"
                    var rowCount = response.keys.length;
                    for (var i = 0; i < rowCount; i++) {
                        //var keyString =  "r" + i;
                        var row = response['r' + i];
                        table += "<tr>"
                        for (var j = 0; j < columns.length; j++) {
                            table += "<td>" + row[j] + "</td>"
                        }
                        table += "</tr>"
                    }
                    $("#table").append(table);
                    // alert(result);
                }).fail(function(result) {
                    // console.log();
                    // alert(result);
                })
            });

    });
