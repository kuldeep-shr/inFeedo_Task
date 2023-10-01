import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

async function guestTokenCreation() {
  const secretKey = String(process.env.SECRET_KEY);
  console.log(
    "process.env.GUEST_SECRET_NAME",
    String(process.env.GUEST_SECRET_NAME)
  );
  console.log(
    "process.env.GUEST_SECRET_EMAIL",
    String(process.env.GUEST_SECRET_EMAIL)
  );
  console.log(
    "process.env.GUEST_SECRET_PASSWORD",
    String(process.env.GUEST_SECRET_PASSWORD)
  );

  const guestData = {
    name: String(process.env.GUEST_SECRET_NAME),
    email: String(process.env.GUEST_SECRET_EMAIL),
    password: String(process.env.GUEST_SECRET_PASSWORD),
  };
  const guestToken = jwt.sign(guestData, secretKey);

  console.log("Guest Token:", guestToken);
}

guestTokenCreation();
