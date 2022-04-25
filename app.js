import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import routes from './routes/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './config/.env')})

const port = process.env.PORT || 3000

db.connectToDb();

const app = express()

app.set('port', port);
app.use(cors())
app.use(express.json())

// Routes
routes.loadRoutes(app);

// Listen to port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

export default app