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

                } else {
                    alert("Enter the value");
                }
                var url = "/Mysql/Mysql?operation=getdb&uname=" + uname +
                    "&pass=" + pass;
                $.ajax(url).done(function(result) {
                    var rs = JSON.parse(result);
                    if ($(".first").length > 0) {
                        $(".first").remove();
                    }
                    var div1 = document.createElement("div");
                    document.body.appendChild(div1);
                    div1.setAttribute("class", "first");
                    var table = document.createElement("table");
                    var th = document.createElement("th");
                    th.setAttribute("class", "row header blue");
                    table.appendChild(th);
                    $(th).append("Databases")
                    $(div1).append(table);
                    for (var i = 0; i < rs.length; i++) {
                        var tr = document.createElement("tr");
                        table.appendChild(tr);
                        tr.setAttribute("id", "db");
                        tr.setAttribute("class", "row")
                        $(tr).append(rs[i]);
                    }
                }).fail(function(result) {})
            });
        $(document).on(
            'click',
            '#db',
            function() {
                uname = $('#uname').val();
                pass = $('#pass').val();
                dab = $($(this)[0]).text();
                var url = "/Mysql/Mysql?operation=gettable&uname=" +
                    uname + "&pass=" + pass + "&dab=" + dab;
                $.ajax(url).done(function(result) {
                    var rs = JSON.parse(result);
                    if ($(".second").length > 0) {
                        $(".second").remove();
                    }
                    var div2 = document.createElement("div");
                    document.body.appendChild(div2);
                    div2.setAttribute("class", "second");
                    var table = document.createElement("table");
                    var th = document.createElement("th");
                    table.appendChild(th);
                    th.setAttribute("class", "row header blue");
                    $(th).append("Tables in " + dab)
                    div2.appendChild(table);
                    for (var i = 0; i < rs.length; i++) {
                        var tr = document.createElement("tr");
                        table.appendChild(tr);
                        tr.setAttribute("id", "tableName");
                        tr.setAttribute("class", "row");
                        $(tr).append(rs[i]);
                    }
                }).fail(function(result) {})
            });
        $(document).on(
            'click',
            '#tableName',
            function() {
                uname = $('#uname').val();
                pass = $('#pass').val();
                tableName = $($(this)[0]).text();
                var url = "/Mysql/Mysql?operation=ssft&uname=" + uname +
                    "&pass=" + pass + "&dab=" + dab +
                    "&tableName=" + tableName;
                $.ajax(url).done(function(result) {
                    var response = JSON.parse(result);
                    var columns = response.columnName;
                    if ($(".third").length > 0) {
                        $(".third").remove();
                    }
                    var table = "<div class=third><h3>" + tableName + " </h3><table>";
                    for (var i = 0; i < columns.length; i++) {
                        table += "<th class=\"green\">" + columns[i] + "</th>"
                    }
                    table += "</div>"
                    var rowCount = response.keys.length;
                    for (var i = 0; i < rowCount; i++) {
                        var row = response['r' + i];
                        table += "<tr class=row>"
                        for (var j = 0; j < columns.length; j++) {
                            table += "<td class=td>" + row[j] + "</td>"
                        }
                        table += "</tr>";
                    }
                    $("#table").append(table);
                }).fail(function(result) {
                })
            });

    });
