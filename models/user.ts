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
  private fullNameCache: string | null = null; 

  constructor(personalInfo: IPersonalDetails, loginInfo: ILoginCredentials, incidentRecords: IIncidentDetails[] = []) {
    this.personalInfo = personalInfo;
    this.loginInfo = loginInfo;
    this.incidentRecords = incidentRecords;
  }

  addIncident(incidentDetail: IIncidentDetails) {
    this.incidentRecords.push(incidentDetail); 
  }

  getFullName(): string {
    if (this.fullNameCache !== null) {
      return this.fullNameCache;
    }
    this.fullNameCache = `${this.personalInfo.firstName} ${this.personalInfo.lastName}`; 
    return this.fullNameCache;
  }

  isAuthenticated(username: string, hashedPassword: string): boolean {
    return this.loginInfo.username === username && this.loginInfo.hashedPassword === hashedPassword;
  }
}

export { IPersonalDetails, ILoginCredentials, IIncidentDetails, CommunityMemberProfile };