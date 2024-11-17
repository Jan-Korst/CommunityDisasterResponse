import dotenv from 'dotenv';
dotenv.config();

enum Severity {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

interface Location {
    latitude: string;
    longitude: string;
}

interface Incident {
    description: string;
    location: Location;
    severity: Severity;
    userId: string;
}

const API_KEY: string = process.env.API_KEY || '';

export { Incident, Location, Severity, API_KEY };