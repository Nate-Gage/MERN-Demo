const sgMail = require('@sendgrid/mail');
const sendgridAPIkey = process.env.SENDGRID_API;

sgMail.setApiKey(sendgridAPIkey);

sgMail.send({
    to: 'nate.d.gage@gmail.com',
    from: 'nate.d.gage@gmail.com',
    subject: 'Create a Wishlist with My App!',
    text: 'Testing out an email from my Wishlist app'
});