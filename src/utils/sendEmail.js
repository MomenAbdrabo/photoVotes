import nodemailer from "nodemailer";
import * as dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
service:"gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail({to=[],cc=[],bcc=[],
    subject='',text='',html='',attachment=[]}) {
  // send mail with defined transport object
  const info =await transporter.sendMail({
    from: `"voteApp" <${process.env.user}>`, // sender address
    to , //"momenabdrabooo@gmail.com", // list of receivers
    cc,
    bcc,
    subject,// "Hello ✔", // Subject line
    text,// "Hello world?", // plain text body
    html,
    attachment             // "<b><a hraf=url ></a></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  return info.rejected.length ? false:true
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

//sendEmail().catch(console.error);
