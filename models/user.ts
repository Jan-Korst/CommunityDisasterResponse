import { config } from 'dotenv';
config();

interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

interface IUserCredentials {
  username: string;
  passwordHash: string;
}

interface IIncidentRecord {
  incidentId: string;
  date: Date;
  description: string;
}

class CommunityMember {
  personalDetails: IUserDetails;
  credentials: IUserCredentials;
  relatedIncidents: IIncidentRecord[];

  constructor(personalDetails: IUserDetails, credentials: IUserCredentials, relatedIncidents: IIncidentRecord[] = []) {
    this.personalDetails = personalDetails;
    this.credentials = credentials;
    this.relatedIncidents = relatedIncidents;
  }

  appendIncident(incidentRecord: IIncidentRecord) {
    this.relatedIncidents.push(incidentRecord);
  }

  retrieveFullName(): string {
    return `${this.personalDetails.firstName} ${this.personalDetails.lastName}`;
  }

  verifyAuthentication(providedUsername: string, providedPasswordHash: string): boolean {
    return this.credentials.username === providedUsername && this.credentials.passwordHash === providedPasswordHash;
  }
}

export { IUserDetails, IUserCredentials, IIncidentRecord, CommunityMember };