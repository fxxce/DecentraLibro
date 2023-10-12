import React from "react";

const List_of_Books = ({ books, borrow_this_book, Borrowed_Book_List }) => {
  // The function that handles borrowing a book and updating the reading list
  const handle_borrowed_books = async (Book_ID) => {
    try {
      // Call the borrow_this_book function and wait for it to complete
      await borrow_this_book(Book_ID);

      // After successfully borrowing the book, update the reading list
      await Borrowed_Book_List();
    } catch (error) {
      console.error(
        "Error borrowing the book and updating the reading list:",
        error
      );
    }
  };

  return (
    <div className="books">
      <h2> Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.avail_copies}</td>
              <td>
                <button onClick={() => handle_borrowed_books(book.id)}>
                  Borrow Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List_of_Books;