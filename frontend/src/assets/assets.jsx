import banner from "./banner.jpg";
import book from "./book.jpg";
import close from "./close-img.png";
import menubgimg from "./banner-bg.jpg";
import profile from "./profile.jpg";
import group from "./group1.jpg";
import group2 from "./group2.jpg";
import about1 from "./about1.jpg";
import about2 from "./about2.jpg";
import about3 from "./about3.jpg";
import about4 from "./about4.jpg";

export const assets = {
  banner,
  book,
  close,
  menubgimg,
  profile,
  group,
  group2,
  about1,
  about2,
  about3,
  about4,
};

export const bookdata = [
  {
    Name: "maths",
    Image: book,
    Price: "100",
    Category: "10'th",
    Discount: "10",
    author: "karan sharma",
  },
  {
    Name: "science",
    Image: book,
    Price: "290",
    Category: "12'th",
    Discount: "10",
    author: "karan sharma",
  },
  {
    Name: "maths",
    Image: book,
    Price: "500",
    Category: "collage",
    Discount: "10",
    author: "karan sharma",
  },
];

export const allbooks = [
  {
    Name: "The Great Gatsby",
    Image: "https://covers.openlibrary.org/b/id/7222166-L.jpg",
    Price: "15.99",
    Category: "Classic",
    Discount: "10",
    author: "F. Scott Fitzgerald",
  },
  {
    Name: "To Kill a Mockingbird",
    Image: "https://covers.openlibrary.org/b/id/8225266-L.jpg",
    Price: "12.99",
    Category: "Classic",
    Discount: "5",
    author: "Harper Lee",
  },
  {
    Name: "1984",
    Image: "https://covers.openlibrary.org/b/id/153091-L.jpg",
    Price: "14.99",
    Category: "Dystopian",
    Discount: "8",
    author: "George Orwell",
  },
  {
    Name: "Pride and Prejudice",
    Image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    Price: "9.99",
    Category: "Classic",
    Discount: "12",
    author: "Jane Austen",
  },
  {
    Name: "The Catcher in the Rye",
    Image: "https://covers.openlibrary.org/b/id/8221701-L.jpg",
    Price: "13.99",
    Category: "Fiction",
    Discount: "7",
    author: "J.D. Salinger",
  },
  {
    Name: "The Hobbit",
    Image: "https://covers.openlibrary.org/b/id/7226121-L.jpg",
    Price: "18.99",
    Category: "Fantasy",
    Discount: "15",
    author: "J.R.R. Tolkien",
  },
  {
    Name: "Moby Dick",
    Image: "https://covers.openlibrary.org/b/id/7224277-L.jpg",
    Price: "17.99",
    Category: "Classic",
    Discount: "10",
    author: "Herman Melville",
  },
  {
    Name: "War and Peace",
    Image: "https://covers.openlibrary.org/b/id/8240844-L.jpg",
    Price: "25.99",
    Category: "Historical",
    Discount: "5",
    author: "Leo Tolstoy",
  },
  {
    Name: "The Odyssey",
    Image: "https://covers.openlibrary.org/b/id/7316267-L.jpg",
    Price: "16.99",
    Category: "Classic",
    Discount: "10",
    author: "Homer",
  },
  {
    Name: "Crime and Punishment",
    Image: "https://covers.openlibrary.org/b/id/8224064-L.jpg",
    Price: "14.49",
    Category: "Classic",
    Discount: "6",
    author: "Fyodor Dostoevsky",
  },
  {
    Name: "Brave New World",
    Image: "https://covers.openlibrary.org/b/id/8227085-L.jpg",
    Price: "13.49",
    Category: "Dystopian",
    Discount: "8",
    author: "Aldous Huxley",
  },
  {
    Name: "Jane Eyre",
    Image: "https://covers.openlibrary.org/b/id/8225958-L.jpg",
    Price: "11.99",
    Category: "Classic",
    Discount: "7",
    author: "Charlotte Brontë",
  },
  {
    Name: "Wuthering Heights",
    Image: "https://covers.openlibrary.org/b/id/8234575-L.jpg",
    Price: "14.99",
    Category: "Classic",
    Discount: "12",
    author: "Emily Brontë",
  },
  {
    Name: "The Lord of the Rings",
    Image: "https://covers.openlibrary.org/b/id/7220352-L.jpg",
    Price: "29.99",
    Category: "Fantasy",
    Discount: "20",
    author: "J.R.R. Tolkien",
  },
  {
    Name: "The Little Prince",
    Image: "https://covers.openlibrary.org/b/id/8230166-L.jpg",
    Price: "10.99",
    Category: "Children",
    Discount: "10",
    author: "Antoine de Saint-Exupéry",
  },
  {
    Name: "The Chronicles of Narnia",
    Image: "https://covers.openlibrary.org/b/id/8231197-L.jpg",
    Price: "22.99",
    Category: "Fantasy",
    Discount: "15",
    author: "C.S. Lewis",
  },
  {
    Name: "Gone with the Wind",
    Image: "https://covers.openlibrary.org/b/id/8220354-L.jpg",
    Price: "24.99",
    Category: "Historical",
    Discount: "5",
    author: "Margaret Mitchell",
  },
  {
    Name: "The Alchemist",
    Image: "https://covers.openlibrary.org/b/id/8286512-L.jpg",
    Price: "13.99",
    Category: "Fiction",
    Discount: "10",
    author: "Paulo Coelho",
  },
  {
    Name: "Fahrenheit 451",
    Image: "https://covers.openlibrary.org/b/id/7220356-L.jpg",
    Price: "15.49",
    Category: "Dystopian",
    Discount: "8",
    author: "Ray Bradbury",
  },
  {
    Name: "The Da Vinci Code",
    Image: "https://covers.openlibrary.org/b/id/7697810-L.jpg",
    Price: "19.99",
    Category: "Thriller",
    Discount: "12",
    author: "Dan Brown",
  },
  {
    Name: "The Shining",
    Image: "https://covers.openlibrary.org/b/id/7221765-L.jpg",
    Price: "17.99",
    Category: "Horror",
    Discount: "5",
    author: "Stephen King",
  },
];

export const CategoryData = [
  {
    Name: "History",
    Image:
      "https://c8.alamy.com/comp/P3G9HJ/vector-artistic-drawing-illustration-of-old-closed-history-book-P3G9HJ.jpg",
  },
  {
    Name: "Science fiction",
    Image:
      "https://png.pngtree.com/png-clipart/20230820/original/pngtree-science-fiction-book-icon-picture-image_8087859.png",
  },
  {
    Name: "Thriller",
    Image:
      "https://cdn3.vectorstock.com/i/1000x1000/62/52/thriller-book-icon-outline-style-vector-34216252.jpg",
  },
  {
    Name: "Horror",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJ-RxuUPFoWdc4MLhs-YqpvRS7WpOEeXAyg&s",
  },
  {
    Name: "Art & Music",
    Image:
      "https://c8.alamy.com/comp/2D4KJKA/adventure-book-icon-outline-adventure-book-vector-icon-for-web-design-isolated-on-white-background-2D4KJKA.jpg",
  },
  {
    Name: "maths",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBDgG1YKf7sLRPjQdmWZ9N0uK8aZxHGnWlxg&s",
  },
];
