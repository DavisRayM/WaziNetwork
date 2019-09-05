const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const ErrorSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    error_status: Number,
    detail: String,
    solved_on: {
        type: Date,
        default: null
    },
    solved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

ErrorSchema.post('save', (doc) => {
    const transporter = nodemailer.createTransport(nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    }));

    const mailOptions = {
        from: "Wazi Network <no-reply@wazi-network.com>",
        to: [`${process.env.ADMIN_EMAIL}`],
        subject: `Error Encountered on ${doc.created_at}`,
        text: "An error has been encountered on the Wazi Network Platform please log-in to the Admin Portal to review"
    }

    transporter.sendMail(mailOptions);
});

module.exports = mongoose.model('Error', ErrorSchema);
