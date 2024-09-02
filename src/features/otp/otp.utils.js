import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.EMAIL_PASSWORD // Your email password
      }
});

export const sendMail = async (to, subject, text) => {
      
      const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text
      };

      try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
      } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending email");
      }
};


