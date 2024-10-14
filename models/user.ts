import { config } from 'dotenv';
config();

interface IPersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

interface ILoginCredentials {
  username: string;
  hashedPassword: string;
}

interface IIncidentDetails {
  incidentId: string;
  incidentDate: Date;
  incidentDescription: string;
}

class CommunityMemberProfile {
  personalInfo: IPersonalDetails;
  loginInfo: ILoginCredentials;
  incidentRecords: IIncidentDetails[];

  constructor(personalInfo: IPersonalDetails, loginInfo: ILoginCredentials, incidentRecords: IIncidentDetails[] = []) {
    this.personalInfo = personalInfo;
    this.loginInfo = loginInfo;
    this.incidentRecords = incidentRecords;
  }

  addIncident(incidentDetail: IIncidentDetails) {
    this.incidentRecords.push(incidentDetail);
  }

  getFullName(): string {
    return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
  }

  isAuthenticated(username: string, hashedPassword: string): boolean {
    return this.loginInfo.username === username && this.loginInfo.hashedPassword === hashedPassword;
  }
}

export { IPersonalDetails, ILoginCredentials, IIncidentDetails, CommunityMemberProfile };