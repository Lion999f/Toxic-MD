const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUxzQi9jUnRpZDFGUTJIdW1MRG9RN2E0RVhTNCtqWFArTHhFSFhaYk8zWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWtuczJzbGNtdHd4ajdhMkUwYlIrQnhoK1d0Wnd6c3FuZEx1Wi9aN2doYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJREN6QkRNODFHbkorVUZWMlN3YVV3VUxZemo0NWtqbTF1WXVkaDc3TFVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlM3pHak5ETEREemovZkdjbFFvcHovcTh2dzcwcFJPcytMOXd2Tkh4bUhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JdUR6YysxRGYzY1RUTkI3UVptSGMzVEYrL2tYRDZjRVd0MTFpWmQyMTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVaVEJBRC9CQ216aWVyOXo1bzY5eTllSjc2Qkh2RFJUcGJxbG55LzVEaEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0Q4WnM5UGtkdG5Od0FKNm9tTlpiS2s4MlV3MUlXcUlxK1hCMURDUS9FRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmdocEdETmxoSDJWM3BrQ1lydVNUZmJ4VEJubHFFdnB3ZG1jTVE3dkdYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNDQWpKWEZMK1Zva1pGaFRVUFc0OFE3MjRmaTFkZXh6dGJjYzYwNytHSFhmbVdDbTZJeG94RG9oWm5RZFdIMkVTL3pGTGJRZklVQXhRdyt4d2VzNmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQwLCJhZHZTZWNyZXRLZXkiOiJxRDQ3dkd5VU5zV1UwdjA2elQ1bnhTdGU1a01pVDZZYVdmc050T1o2RTdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBOXdCSnluMlRzbUx6bEFwTWlPa3FRIiwicGhvbmVJZCI6ImQ2MTA0NzA0LWJmODMtNDY1OC05YzJhLWJhNDQ1NzBlOWI1NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpckpqYkk2cmEyMlcxSEdDUEI0WFk0a2VheTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidm4wWEc3TEdkQ2VZblhmWmgrUWcycHYyN1U4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpBV0VaU1JDIiwibWUiOnsiaWQiOiI1MDk0MDUyMjk0Mjo3MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHFleU13R0VNL1Vpc0VHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWUxBRDhkejh0bkcvOFV1bGFvUkdxMlo1RnoyTEdqYVJ6emticmpHZmRTdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWnpWVlFUbzNZd1U1bE9oaGtwV2F4T09XRWlBTGczT2NLb2FYZU1IaW0rUldMOVVPZnBNd2NQbi9RQkVTbTE2VDBTS0N1STUvZHNqa1lXZ0w3YVByZ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjZvRTYxYi80MmFwLzh2MjNDN1VOWkFaYnBpdWZ3N0dtU2E5RG1WZ1BrbDUyNDYrbG1CM0QzKzd5ZVNrZkZuRm9veklnb2padUF5M2ZRZzVvak10U2dBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5NDA1MjI5NDI6NzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0N3QS9IYy9MWnh2L0ZMcFdxRVJxdG1lUmM5aXhvMmtjODVHNjR4bjNVcyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MTAyMzAwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU80SSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254735342808",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
