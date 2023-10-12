import React from "react";

const Reading_List = ({
  Book_CIDs = [],
  openPDF,
  selected_CID,
  return_this_book,
  is_borrowed_Book,
}) => {
  return (
    <div>
      <h2> Reading List</h2>
      {is_borrowed_Book?.map((Book_ID, index) => {
        const book_CID = Book_CIDs.find((book) => book.Book_ID === Book_ID);
        return (
          <div key={index}>
            <button onClick={() => openPDF(book_CID.pinata_CID)}>
              Open Book {Book_ID}
            </button>
            <button onClick={() => return_this_book(Book_ID)}>
              Return Book {Book_ID}
            </button>
          </div>
        );
      })}
      {selected_CID && (
        <iframe
          title="PDF Viewer"
          src={`https://gateway.pinata.cloud/ipfs/${selected_CID}`}
          width="100%"
          height="600"
        />
      )}
    </div>
  );
};
export default Reading_List;