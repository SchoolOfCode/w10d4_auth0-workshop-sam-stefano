import express from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import cookieParser from "cookie-parser";

const checkScopes = requiredScopes("read:messages");
const app = express();
const port = 8000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.status(200).json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
