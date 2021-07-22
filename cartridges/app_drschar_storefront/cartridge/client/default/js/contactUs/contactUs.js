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

function createTicket(data){
    var url = data.domain + '/api/v2/tickets.json';
    var reqData = {
        ticket: {
            comment: {
                body: data.problem
            },
            priority: "urgent",
            subject: data.subject,
            requester: {
                name: data.name + ' ' + data.lastName,
                email: data.email
            }
        }
    }

    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType:'application/json',
        crossDomain: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + data.token 
        },
        data: JSON.stringify(reqData),
        success: function (data) {
           console.log(data);
        },
        error: function (err) {
            console.log('Mayday mayday...do you copy?');
        }
    });
}

module.exports = {
    subscribeContact: function () {
        $('form.contact-us').submit(function (e) {
            e.preventDefault();
            var RCSK = $('#siteKey').val();
            var form = $(this);
            var button = $('.subscribe-contact-us');
            var url = form.attr('action');
            var formData = {
                name: $('#contact-first-name').val(),
                lastName: $('#contact-last-name').val(),
                email: $('#contact-email').val(),
                subject: $('#contact-subject').val(),
                problem: $('#contact-problem').val(),
                domain: $('#zendeskDomain').val(),
                token: $('#ticketKey').val()
            }

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
                                createTicket(formData);
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
