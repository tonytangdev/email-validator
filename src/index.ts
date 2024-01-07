import express from "express";
import {
  validateEmail,
  extractDomainName,
  validateDomain,
} from "./helpers/emails";

const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse json body
app.use(express.json());


// request example : http://localhost:3000/validate-email
// body example : { "email": "test@gmail" }
// response example : Email is invalid
app.post("/validate-email", async (req, res) => {
  const email = req.body.email as string;

  const emailIsValid = validateEmail(email);
  if (!emailIsValid) {
    res.send("Email is invalid");
    return;
  }

  const domaineName = extractDomainName(email);
  if (!domaineName) {
    res.send("Email is invalid");
    return;
  }

  const domainIsValid = await validateDomain(domaineName);
  if (!domainIsValid) {
    res.send("Email is invalid");
    return;
  }

  res.send("Email is valid");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
