// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentraLibro {
    struct Book {
        uint id;
        string title;
        string author;
        string pinata_CID; // Pinata CID for the PDF file
        uint avail_copies;
        address book_borrower;
    }

    Book[] private book_list;

    mapping(uint => address) public owner;

    event Book_Added(address recipient, uint Book_ID);
    event Borrowed_Book(address book_borrower, uint Book_ID);
    event Book_Returned(address book_borrower, uint Book_ID);

    function Add_Book(
        string memory title,
        string memory author,
        string memory pinata_CID,
        uint avail_copies
    ) public {
        uint Book_ID = book_list.length;
        book_list.push(
            Book(Book_ID, title, author, pinata_CID, avail_copies, address(0))
        );
        owner[Book_ID] = msg.sender;
        emit Book_Added(msg.sender, Book_ID);
    }

    function getAllBooks() public view returns (Book[] memory) {
        return book_list;
    }

    function borrow_this_book(uint Book_ID) public {
        require(Book_ID >= 0 && Book_ID < book_list.length, "Invalid Book ID");
        require(book_list[Book_ID].avail_copies > 0, "No available copies.");
        require(
            msg.sender != owner[Book_ID],
            "You cannot borrow your own book."
        );
        require(
            book_list[Book_ID].book_borrower != msg.sender,
            "You already borrowed this book."
        );

        book_list[Book_ID].book_borrower = msg.sender;
        book_list[Book_ID].avail_copies--;

        emit Borrowed_Book(msg.sender, Book_ID);
    }

    function return_this_book(uint Book_ID) public {
        require(Book_ID >= 0 && Book_ID < book_list.length, "Invalid Book ID");
        require(
            book_list[Book_ID].book_borrower == msg.sender,
            "You didn't borrow this book"
        );

        book_list[Book_ID].book_borrower = address(0);
        book_list[Book_ID].avail_copies++;

        emit Book_Returned(msg.sender, Book_ID);
    }

    function Borrowed_Book_List(address user) public view returns (uint[] memory) {
        uint count = 0;

        for (uint i = 0; i < book_list.length; i++) {
            if (book_list[i].book_borrower == user) {
                count++;
            }
        }

        uint[] memory Borrowed_Book_IDs = new uint[](count);
        count = 0;
        for (uint i = 0; i < book_list.length; i++) {
            if (book_list[i].book_borrower == user) {
                Borrowed_Book_IDs[count] = i;
                count++;
            }
        }

        return Borrowed_Book_IDs;
    }

    function getBookCount() public view returns (uint256) {
        return book_list.length;
    }

    function getBookCID(uint Book_ID) public view returns (string memory) {
        require(Book_ID >= 0 && Book_ID < book_list.length, "Invalid Book ID");

        Book storage book = book_list[Book_ID];
        return book.pinata_CID;
    }
}