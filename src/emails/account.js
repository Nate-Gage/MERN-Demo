const sgMail = require('@sendgrid/mail');
const sendgridAPIkey = process.env.SENDGRID_API;

sgMail.setApiKey(sendgridAPIkey);

sgMail.send({
    to: 'nate.d.gage@gmail.com',
    from: 'nate.d.gage@gmail.com',
    subject: 'Create a Wishlist with My App!',
    text: 'View my Wishlist! Claim some of my items because I am not rich but want more stuff!'
});