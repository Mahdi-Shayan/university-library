export interface AdminSideBarLinks {
  img: string;
  route: string;
  text:
    | "Home"
    | "All Users"
    | "All Books"
    | "Borrow Records"
    | "Account Requests";
}

export interface SampleBooks {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createAt?: Date | null;
}

export interface Sorts {
  value: string;
  label: string;
}

export interface UserRoles {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export interface BorrowStatuses {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}
