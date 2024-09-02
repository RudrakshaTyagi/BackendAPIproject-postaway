import nodemailer from "nodemailer";
export const sendWelcomeEmail = async (user) => {
  
      const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASSWORD,
            },
      });

      const mailOptions = {
            from: process.env.STORFLEET_MAIL,
            to: user.email,
            subject: "User Registeration",
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://cdn.vectorstock.com/i/1000v/31/67/social-media-logo-template-vector-30543167.jpg" alt="Storefleet Logo">
                    <h1>Registeration Confirmation</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>We are happy to take you onboard</p>
                </div>
            </div>
        </body>
        </html>
    `,
      };

      await transporter.sendMail(mailOptions);
    
};



