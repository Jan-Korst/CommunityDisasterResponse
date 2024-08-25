import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/incidents', (req: Request, res: Response) => {
    console.log('Creating an incident...');
    res.status(201).send('Incident created.');
});

app.get('/incidents', (req: Request, res: Response) => {
    console.log('Retrieving all incidents...');
    res.status(200).send('All incidents retrieved.');
});

app.get('/incidents/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Retrieving incident with ID: ${id}`);
    res.status(200).send(`Incident ${id} retrieved.`);
});

app.put('/incidents/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Updating incident with ID: ${id}`);
    res.status(200).send(`Incident ${id} updated.`);
});

app.delete('/incidents/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deleting incident with ID: ${id}`);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Incident management server running on port ${port}`);
});