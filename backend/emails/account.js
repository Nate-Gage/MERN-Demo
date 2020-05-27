const sgMail = require('@sendgrid/mail');
const sendgridAPIkey = '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';

sgMail.setApiKey(sendgridAPIkey);

sgMail.send({
    to: 'nate.d.gage@gmail.com',
    from: 'nate.d.gage@gmail.com',
    subject: 'Create a Wishlist with My App!',
    text: 'Testing out an email from my Wishlist app'
});