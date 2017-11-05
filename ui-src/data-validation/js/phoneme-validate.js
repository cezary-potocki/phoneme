$(function () {
    var login  = '';
    var index = '';
    $("#form1").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var data = {}
        var updated = {}

        var engCheckboxes = [];
        $("input:checkbox[id=eng]:checked").each(function() {
          engCheckboxes.push($(this).val());
        });

        var arbCheckboxes = [];
        $("input:checkbox[id=arb]:checked").each(function() {
          arbCheckboxes.push($(this).val());
        });

        var arbYamliCheckboxes = [];
        $("input:checkbox[id=yamli]:checked").each(function() {
          arbYamliCheckboxes.push($(this).val());
        });

        updated['eng_invalidated'] = engCheckboxes;
        updated['arb_invalidated'] = arbCheckboxes;
        updated['arb_yamli_invalidated'] = arbYamliCheckboxes;


        data['login'] = $.trim($("[id*=inputLogin]").val());
        data['index'] = $.trim($("[id*=inputIndex]").val());
        data['updated'] = updated;
        console.log('data: ' + JSON.stringify(data));

        $.ajax({
            cache: false,
            type: "POST",
            url: "../validate",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            context : form,
            success: function (r) {
                console.log('success');
                console.log(r);
                var data = r.result.data;
                index = data.id;

                eng_txt = "<table>"
                var i = 0;
                for (x in data.eng_variants) {
                  eng_txt += "<tr><td align=\"left\"><input type=\"checkbox\" name=\"engCheckboxes[]\" id=\"eng\" value=\"" + x + "\"/>&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                  i = i + 1;
                }

                eng_txt += "</table>"

                arb_txt = "<table>"
                i = 0;
                for (x in data.arb_variants) {
                  arb_txt += "<tr><td align=\"left\"><input type=\"checkbox\" name=\"arbCheckboxes[]\" id=\"arb\" value=\"" + x + "\"/>&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                  i = i + 1;
                }
                arb_txt += "</table>"

                arb_yamli_txt = "<table>"
                i = 0;
                for (x in data.arb_yamli_variants) {
                  arb_yamli_txt += "<tr><td align=\"left\"><input type=\"checkbox\" name=\"arbYamliCheckboxes[]\" id=\"yamli\" value=\"" + x + "\"/>&nbsp;</td><td align=\"left\">" + x + "</td></tr>";
                  i = i + 1;
                }
                arb_yamli_txt += "</table>"

                document.getElementById("labelEnglish").hidden = false;
                document.getElementById("labelArabic").hidden = false;
                document.getElementById("labelArabicYamli").hidden = false;
                document.getElementById("labelDesc").hidden = false;
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
