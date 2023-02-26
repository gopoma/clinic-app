const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const {
    emailHost,
    emailPort,
    emailSecure,
    emailUser,
    emailPassword,
    emailFrom
} = require("../config");

const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
        user: emailUser,
        pass: emailPassword
    }
});

transporter.verify(function(error, success) {
    if(success) {
        // eslint-disable-next-line
        console.log("Server is ready to take our messages");
    } else {
        // eslint-disable-next-line
        throw new Error(error.message);
    }
});

class Email {
    constructor(user, url = "") {
        this.to = user.email;
        this.firstName = user?.nombre?.split(" ")[0] || "Messi";
        this.url = url;
        this.from = `Gustavo Ordoño Poma <${emailFrom}>`;
    }

    // Send the actual email
    async send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html)
        };

        // 3) Use the transport to send email
        await transporter.sendMail(mailOptions);
    }

    async sendEmailVerification() {
        await this.send(
            "verification",
            "Registro exitoso | Clinic App"
        );
    }

    async sendWelcome() {
        await this.send(
            "welcome",
            "Bienvenido a la familia de Clinic App!"
        );
    }

    async sendPasswordReset() {
        await this.send(
            "passwordReset",
            "Solicitud de cambio de contraseña en ClinicApp"
        );
    }
}

module.exports = Email;
