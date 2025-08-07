const admin = require("../config/firebase");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (err) {
    console.error("Firebase token verification failed:", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyFirebaseToken;
