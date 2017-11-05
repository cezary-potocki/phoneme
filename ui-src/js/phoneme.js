$(function () {
    $("#btnCallService").click(function () {
        var name = $.trim($("[id*=inputName]").val());
        var distance = $.trim($("[id*=inputDistance]").val());
        console.log(name);
        console.log(distance);
        $.ajax({
            type: "GET",
            url: "near_neighbors?name="+ name + "&distance=" + distance,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log('success');
                console.log(r);

                eng_txt = "<table>"
                for (x in r.english) {
                  var dist = (1 - r.english[x].cosine).toFixed(4);
                  eng_txt += "<tr><td align=\"left\">" + r.english[x].name + "</td><td>" + dist + "</td></tr>";
                }
                eng_txt += "</table>"

                arb_txt = "<table>"
                for (x in r.arabic) {
                  var dist = (1 - r.arabic[x].cosine).toFixed(4);
                  arb_txt += "<tr><td align=\"left\">" + r.arabic[x].name + "</td><td>" + dist + "</td></tr>";
                }
                arb_txt += "</table>"

                document.getElementById("labelEnglish").hidden = false;
                document.getElementById("labelArabic").hidden = false;
                document.getElementById("outputEnglish").innerHTML = eng_txt;
                document.getElementById("outputArabic").innerHTML = arb_txt;
            },
            error: function (r) {
                console.log('error');
                console.log(r);
                $('#outputEnglish').html(r);
            },
            failure: function (r) {
                console.log('failure');
                console.log(r);

                $('#outputEnglish').html(r);
            }
        });
        return false;
    });
});
