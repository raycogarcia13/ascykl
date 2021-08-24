const nodemailer = require("nodemailer");

async function myCustomMethod(ctx) {
    let cmd = await ctx.sendCommand(
        'AUTH PLAIN ' +
        Buffer.from(
            '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
            'utf-8'
        ).toString('base64')
    );

    if (cmd.status < 200 || cmd.status >= 300) {
        throw new Error('Failed to authenticate user: ' + cmd.text);
    }
}

async function sendMail(to, messageT = '', messageH = '', subject = 'Hello ✔') {

    let mail = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        // secure: false,
        auth: {
            user: process.env.MAIL_USERNAME, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
        tls: { rejectUnauthorized: false }
    });

    // send mail with defined transport object
    let info = await mail.sendMail({
        from: `"ASCYKL" <${process.env.MAIL_USERNAME}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: messageT, // plain text body
        html: messageH, // html body
    });

    console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

function messageRegister(user, lang) {
    let es = `
        Bienvenido ${user.name} usted se ha registrado en el sitio de la empresa ASCYKL. 
        Para completar su registro introduzca el siguiente PIN: ${user.verifyPin}
    `;
    let esH = `
       Bienvenido ${user.name} usted se ha registrado en el sitio de la empresa ASCYKL. <br />
       Para completar su registro introduzca el siguiente PIN: <br />
       <center> <div style="padding:5px; background-color: #119DA4; color: white;">${user.verifyPin}</div> </center>
    `;
    let en = `
        Welcome ${user.name}, you was registered in website of ASCKYL company.
        For complete your register, please introduce this PIN: ${user.verifyPin}
    `;
    let enH = `
       Welcome ${user.name}, you was registered in website of ASCKYL company. <br />
       For complete your register, please introduce this PIN: <br />
       <center> <div style="padding:5px; background-color: #119DA4; color: white;">${user.verifyPin}</div> </center>
    `;

    return (lang=='en')?{text:en,html:enH}:{text:es,html:esH}
}

module.exports = {
    sendMail,
    messageRegister
}