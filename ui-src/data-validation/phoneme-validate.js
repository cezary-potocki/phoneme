$(function () {
    var login  = '';
    var index = '';
    $("#form1").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var data = '{\"login\":\"a\"}'
        login = $.trim($("[id*=inputLogin]").val());
        console.log('data');
        console.log(JSON.stringify(data));
        $.ajax({
            cache: false,
            type: "POST",
            url: "../validate",
            contentType: "application/json",
            dataType: "json",
            data: data,
            success: function (r) {
                console.log('success');
                console.log(r);
                var data = r.result.data;
                index = data.id;

                eng_txt = "<table>"
                for (x in data.eng_variants) {
                  eng_txt += "<tr><td align=\"left\"><input type=\"checkbox\" id=e_" + x + ">&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                }
                eng_txt += "</table>"

                arb_txt = "<table>"
                for (x in data.arb_variants) {
                  arb_txt += "<tr><td align=\"left\"><input type=\"checkbox\" id=a_" + x + ">&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                }
                arb_txt += "</table>"

                arb_yamli_txt = "<table>"
                for (x in data.arb_yamli_variants) {
                  arb_yamli_txt += "<tr><td align=\"left\"><input type=\"checkbox\" id=ay_" + x + ">&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                }
                arb_yamli_txt += "</table>"

                document.getElementById("labelEnglish").hidden = false;
                document.getElementById("labelArabic").hidden = false;
                document.getElementById("labelArabicYamli").hidden = false;
                document.getElementById("labelEnglish").innerHTML = 'English: ' + data.eng;
                document.getElementById("labelArabic").innerHTML = 'Arabic: ' + data.arb;
                document.getElementById("labelArabicYamli").innerHTML = 'Arabic Yamli: ' + data.arb;

                document.getElementById("outputEnglish").innerHTML = eng_txt;
                document.getElementById("outputArabic").innerHTML = arb_txt;
                document.getElementById("outputArabicYamli").innerHTML = arb_yamli_txt;

                document.getElementById("inputIndex").value = index;

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
