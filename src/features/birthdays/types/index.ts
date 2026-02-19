export interface BirthdayPerson {
  id: string;
  fullName: string;
  position: string;
  date: string;
  avatarUrl?: string;
}

export interface NewEmployee {
  id: string;
  fullName: string;
  position: string;
  hireDate: string;
  avatarUrl?: string;
}

export interface AnniversaryPerson {
  id: string;
  fullName: string;
  position: string;
  date: string;
  years: number;
  avatarUrl?: string;
}
