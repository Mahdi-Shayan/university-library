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

export interface BorrowedBook {
  id: string;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
  status: "BORROWED" | "RETURNED";
  createAt: Date | null;
}

interface UserParams {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  role: "USER" | "ADMIN";
  lastActivityDate: string | null;
  createdAt: Date | null;
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

export interface BorrowBookParams {
  userId: string;
  bookId: string;
}

export interface BorrowBookWithDetails {
  books: SampleBooks;
  users: UserParams;
  borrow_records: BorrowedBook;
}

export interface ReceiptParams {
  body: Pick<SampleBooks, "author" | "genre" | "title"> &
    Pick<BorrowedBook, "borrowDate" | "dueDate"> &
    Pick<UserParams, "email">;
}
