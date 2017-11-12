const fs = require("fs");
const process = require("process");

const clientID = fs.readFileSync("/run/secrets/sp_client_id", "utf8").trim();
const clientSecret = fs
    .readFileSync("/run/secrets/sp_client_secret", "utf8")
    .trim();

const apiHostname = process.env.API_BASE_URL || "localhost:4000";
const callbackURL = `${apiHostname}/auth/google/callback`;

module.exports = {
    // Google API creds
    google: {
        clientID,
        clientSecret,
        callbackURL
    }
};
