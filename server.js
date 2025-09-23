
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import tutorRoute from './routes/tutor.js';
import doctorRoute from './routes/doctor.js';
import codingRoute from './routes/coding.js';
import mentorRoute from './routes/mentor.js';
import designerRoute from './routes/designer.js';
import businessRoute from './routes/business.js';
import socialRoute from './routes/social.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tutor', tutorRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/coding', codingRoute);
app.use('/api/mentor', mentorRoute);
app.use('/api/designer', designerRoute);
app.use('/api/business', businessRoute);
app.use('/api/social', socialRoute);

app.get('/', (req,res)=> res.send('Master of Universe AI backend running'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
