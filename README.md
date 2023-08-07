
# 日本-Classics

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
This is a code repository for a website designed for enthusiasts of old Japanese cars. Please access it through the following [link](https://papas-pizza.vercel.app/)

<h3>Requirements</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To use this website locally, you need to install all the required libraries, both in the server and client folder, by using the following command:</p> 

```bash
 npm run install --force
```

<h3>Build</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To generate the frontend build for this project, please use the following command::</p> 

```bash
 npm run build
```

<h3>Run</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please use the following commands to run the client and server folders:</p> 

client:
```bash
 npm run dev
```

server:
```bash
 npm run start
```

<h3>Environment Variables</h3>

For security purposes, the server folder of this project utilizes four environment variables, as exemplified in the .env.example file:

`PORT` = "5000"

`NODE_ENV` = "production"

`MONGODB_URI` = "YOUR MONGODB URI"

`JWT_SECRET` = "A RANDOM STRING"
