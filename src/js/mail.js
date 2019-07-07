$(function () {
    let form = $(".contact_form");
    form.submit(function (e) {
        e.preventDefault();
        $(".loader").removeClass('hide-loader');
        var form_data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://ssrassesoriacontabil.ml/mail.php",
            data: form_data,
            success: function (data) {
                let status = data;
                if (status == 'ok') {
                    $(".loader").addClass('hide-loader');
                    $(".alert-success").show(600)
                    setTimeout(() => {
                        $(".alert-success").hide(200)
                    }, 3000)
                    form.find("input[type=text], input[type=email] textarea").val("");
                } else {
                    $(".loader").addClass('hide-loader');
                    $(".alert-error").show(600)
                    setTimeout(() => {
                        $(".alert-error").hide(200)
                    }, 3000)
                }
            }

        })
    });
});