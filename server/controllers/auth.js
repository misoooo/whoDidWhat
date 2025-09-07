import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyToken = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    // 1. Try custom header
    let token = req.header(process.env.TOKEN_HEADER_KEY);

    // 2. Fallback: Try "Authorization: Bearer <token>"
    if (!token) {
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
      console.log("Token from Authorization header:", token)
    }

    // 3. If still no token
    if (!token) {
      return res.status(403).json({ message: "Token not provided" });
    }

    // 4. Verify
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log("Decoded token:", decoded);

    // At this point, token is valid
    return res.status(200).json({
      message: "Successfully Verified",
      data: decoded, //  userId here wanted
    });

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
      error: error.message,
    });
  }
};
