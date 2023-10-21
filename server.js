const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors=require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the server!");
});

app.post("/sendEmail", (req, res) => {
  // Extract form data from the request
  const [name, email, message ] = req.body;

  // Create a Nodemailer transporter
 const transporter = nodemailer.createTransport({
   host:"smtp.gmail.com",
   port: 587,
   secure: true,
   requireTLS: true,
   auth: {
     user: "abc@gmail.com",
     pass: "Helloworld!",
   },
 });

  // Define the email message
  const mailOptions = {
    from: email,
    to: "mdfaruksp2@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
