import { config } from 'dotenv';
config();

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

interface UserAuthentication {
  username: string;
  passwordHash: string;
}

interface IncidentAssociation {
  incidentId: string;
  date: Date;
  description: string;
}

class User {
  details: UserDetails;
  authentication: UserAuthentication;
  incidents: IncidentAssociation[];

  constructor(details: UserDetails, authentication: UserAuthentication, incidents: IncidentAssociation[] = []) {
    this.details = details;
    this.authentication = authentication;
    this.incidents = incidents;
  }

  addIncident(incident: IncidentAssociation) {
    this.incidents.push(incident);
  }

  getFullName(): string {
    return `${this.details.firstName} ${this.details.lastName}`;
  }

  authenticate(username: string, passwordHash: string): boolean {
    return this.authentication.username === username && this.authentication.passwordHash === passwordHash;
  }
}

export { UserDetails, UserAuthentication, IncidentAssociation, User };
