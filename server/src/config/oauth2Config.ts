import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH2_CLIENTE_ID,
    process.env.OAUTH2_CLIENTE_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
});

export { oauth2Client };
