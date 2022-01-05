const { isEmpty } = require('lodash');

$(document).ready(function () {
    var expemail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let formemail = $('#email');
    let id = $('#id-product');
    let warning = $('#lblemail-warning');
    let success = $('#lblemail-success');

    function validateForm() {
        if (isEmpty(formemail.val())) {
            success.removeClass('d-block');
            success.addClass('d-none');
            warning.html('Error: Email Address is Required');
            warning.addClass('d-block');
            return false;
        } else if (!expemail.test(formemail.val())) {
            success.removeClass('d-block');
            success.addClass('d-none');
            warning.html('Error: Invalid Email Address');
            warning.addClass('d-block');
            return false;
        }
        warning.removeClass('d-block');
        warning.addClass('d-none');
        success.removeClass('d-none');
        success.html(
            'Successfully added to email list. You will be notified once this item comes back in stock.'
        );
        success.addClass('d-block');
        return true;
    }

    $('#add-email').submit(function (e) {
        var $form = $(this);
        e.preventDefault();
        if (!validateForm()) {
            return false;
        }
        var url = $form.attr('action');
        $form.spinner().start();
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                Email: formemail.val(),
                Id: id.val(),
                csrf_token: $('#csrfToken').val()
            },
            success: function () {
                if (screen.width >= 1200) {
                    $('#modal').modal('toggle');
                }
                $form.spinner().stop();
            },
            error: function () {
                $('#lblemail-success').text(
                    'Error: You are already on the notification list for this model.'
                );
                $form.spinner().stop();
                $(this).trigger('reset');
            }
        });
        $(this).trigger('reset');
        return false;
    });
});
