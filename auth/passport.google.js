var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var config = require("./config");

var strategySettings = {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "http://" + config.apiHostname + "/auth/google/callback"
};

passport.serializeUser((user, done) => {
    console.log("Serialzed user -", JSON.stringify(user));
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserialized user -", JSON.stringify(user));

    // Check if the user exists in the "database"
    if (config.allowedEmailAddresses.indexOf(user.email) === -1) {
        console.error(
            "User not found in allow list - ",
            JSON.stringify(user.email)
        );
        done(null, false);
    } else {
        console.info("Validated username and password");
        done(null, user);
    }
});

module.exports = passport.use(
    new GoogleStrategy(
        strategySettings,
        (req, accessToken, refreshToken, profile, done) => {
            // Build a user object from the google profile result.
            // This user object will be contained in the request context.
            var user = {
                id: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName
            };
            done(null, user);
        }
    )
);
