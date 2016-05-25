# staudestedet
Produktkatalog til Staudestedet - bachelorprojekt forår 2016

For at køre produktkataloget:

***************************************
Hent koden

Kør "npm install" (sørger også for at køre bower)

I server/config/database.config.js indsæt dbUser og dbPassword (databasebruger og password findes i rapporten)


I kommandoprompt 

server folderen

run: "node server/server.js"

Åbn en browser:
Produktkataloget: http://localhost:3000/#/
Administrationsdlen: http://localhost:3000/#/admin

Genopretning af data:

*******************************************

Hvis data skal genopfriskes er der et script, der genopretter de oprindelige data:
test/create.test.data.js
