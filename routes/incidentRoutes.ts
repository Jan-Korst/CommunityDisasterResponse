import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('An unexpected error occurred.');
};

const checkValidId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        res.status(400).send('Invalid ID format. ID must be a number.');
    } else {
        next();
    }
};

app.post('/incidents', (req: Request, res: Response) => {
    try {
        console.log('Creating an incident...');
        res.status(201).send('Incident created.');
    } catch (error) {
        next(error);
    }
});

app.get('/incidents', (req: Request, res: Response) => {
    try {
        console.log('Retrieving all incidents...');
        res.status(200).send('All incidents retrieved.');
    } catch (error) {
        next(error);
    }
});

app.get('/incidents/:id', checkValidId, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Retrieving incident with ID: ${id}`);
        res.status(200).send(`Incident ${id} retrieved.`);
    } catch (error) {
        next(error);
    }
});

app.put('/incidents/:id', checkValidId, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Updating incident with ID: ${id}`);
        res.status(200).send(`Incident ${id} updated.`);
    } catch (error) {
        next(error);
    }
});

app.delete('/incidents/:id', checkValidId, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Deleting incident with ID: ${id}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Incident management server running on port ${port}`);
});