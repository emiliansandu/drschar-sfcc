'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for contact us sign-up
 */
function displayMessage(data, button) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.contact-us-signup-message').length === 0) {
        $('body').append(
            '<div class="contact-us-signup-message"></div>'
        );
    }
    $('.contact-us-signup-message')
        .append('<div class="contact-us-signup-alert text-center ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.contact-us-signup-message').remove();
        button.removeAttr('disabled');
    }, 3000);
}

module.exports = {
    subscribeContact: function () {
        $('form.contact-us').submit(function (e) {
            e.preventDefault();
            var RCSK = $('#siteKey').val();
            var form = $(this);
            var button = $('.subscribe-contact-us');
            var url = form.attr('action');

            $.spinner().start();
            button.attr('disabled', true);
            grecaptcha.ready(function() {
                grecaptcha.execute(RCSK, {action: 'contactUs'}).then(function(token) {
                    form.prepend('<input type="hidden" name="g_token" value="' + token + '">');
                    $.ajax({
                        url: url,
                        type: 'post',
                        dataType: 'json',
                        data: form.serialize(),
                        success: function (data) {
                            displayMessage(data, button);
                            if (data.success) {
                                $('.contact-us').trigger('reset');
                            }
                        },
                        error: function (err) {
                            displayMessage(err, button);
                        }
                    });
                });
              });
        });
    }
};
