import app from "./app";
import * as dotenv from "dotenv";
import startServer from "./controllers/server.controller";

dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = process.env.PORT || 8080; //server port

//start the server
app.listen(port, async () => startServer(Number(port)));
