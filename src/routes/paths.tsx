import Dashboard from "../pages/dashboard";
import Students from "../pages/students";
import Books from "../pages/books";
import BookDetails from "../pages/bookDetails.tsx";
import StudentDetails from "../pages/studentDetails.tsx";
import AddEditBookForm from "../sections/AddEditBookForm"
import AddEditStudentForm from "../sections/AddEditStudentForm"

export const paths = {
  dashboard: "/",
  books: "/books",
  students: "/students",
  bookDetails: "/book-details/",
  addEditBook: "/add-edit-book/",
  studentDetails: "/student-details/",
  addEditStudent: "/add-edit-student/",
  error: "*",
};

export const routes = {
  dashboard: '/',
  books: "/books",
  students: "/students",
  bookDetails: "/book-details/:id",
  studentDetails: "/student-details/:id",
  addEditBook: "/add-edit-book/:id",
  addEditStudent: "/add-edit-student/:id",
  error: "*",
};

export const publicRoutes = {
  [paths.dashboard]: {
    name: "Dashboard",
    path: routes.dashboard,
    component: <Dashboard />,
  },
  [paths.books]: {
    name: "Books",
    path: routes.books,
    component: <Books />,
  },
  [paths.students]: {
    name: "Students",
    path: routes.students,
    component: <Students />,
  },
  [paths.bookDetails]: {
    name: "Book Details",
    path: routes.bookDetails,
    component: <BookDetails />,
  },
  [paths.studentDetails]: {
    name: "Student Details",
    path: routes.studentDetails,
    component: <StudentDetails />,
  },
  [paths.addEditBook]: {
    name: "Add Edit Book",
    path: routes.addEditBook,
    component: <AddEditBookForm />,
  },
  [paths.addEditStudent]: {
    name: "Add Edit Student",
    path: routes.addEditStudent,
    component: <AddEditStudentForm />,
  },
};
