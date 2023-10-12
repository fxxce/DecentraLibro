/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";
import {
  Navbar,
  Welcome,
  add_Book,
  List_of_Books,
  Reading_List,
} from "./components/Index";

function App() {
  const [Current_Account, setCurrentAccount] = useState("");
  const [books, setBooks] = useState([]);
  const [contract, setContractInstance] = useState(null);
  const [User_Borrowed_Books, setUserBorrowedBooks] = useState([]);
  const [Book_CIDs, setBookCIDs] = useState([]);
  const [selected_CID, setSelectedCID] = useState("");

  const initContract = useCallback(async () => {
    try {
      if (!window.ethereum) {
        console.error("Celo Wallet extension not detected");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const kit = newKitFromWeb3(web3);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

      setCurrentAccount((await kit.web3.eth.getAccounts())[0]);
      setContractInstance(contract);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (Current_Account) {
      initContract();
    }
  }, [Current_Account, initContract]);

  const Check_If_Wallet_Is_Connected = useCallback(() => {
    try {
      if (!window.ethereum)
        return alert("Please install the Celo wallet extension");

      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          console.error(err);
          throw new Error("Failed to get accounts");
        }
        if (accounts && accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          console.log("No accounts found");
        }
        console.log(accounts);
      });
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }, []);

  useEffect(() => {
    Check_If_Wallet_Is_Connected();
  }, [Check_If_Wallet_Is_Connected]);

  const Connect_to_Wallet = async () => {
    try {
      if (!window.ethereum)
        throw new Error("Celo wallet extension not detected");

      await window.ethereum.enable({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to Celo wallet");
    }
  };

  const Add_Book = async (title, author, pinata_CID, avail_copies) => {
    try {
      console.log(
        "title:",
        title,
        "author:",
        author,
        "pinata_CID:",
        pinata_CID,
        "avail_copies:",
        avail_copies
      );

      await contract.methods
        .Add_Book(title, author, pinata_CID, avail_copies)
        .send({ from: Current_Account, gasLimit: 2000000 });

      const Book_Count = await contract.methods.getBookCount().call();
      setBooks([...books, Book_Count]);
    } catch (error) {
      console.error(error);
    }
  };

  const Fetch_Books = async () => {
    try {
      if (!contract) return;
      const books_Array = await contract.methods.getAllBooks().call();

      setBooks(books_Array);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    Fetch_Books();
  }, [contract]);

  const borrow_this_book = async (Book_ID) => {
    try {
      await contract.methods
        .borrow_this_book(Book_ID)
        .send({ from: Current_Account, gasLimit: 2000000 });
      const updatedBooks = books.map((book) => {
        if (book.id === Book_ID) {
          return { ...book, avail_copies: book.avail_copies - 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  const Borrowed_Book_List = useCallback(async () => {
    try {
      const is_borrowed_Book = await contract.methods
        .Borrowed_Book_List(Current_Account)
        .call();
      setUserBorrowedBooks(is_borrowed_Book);
    } catch (error) {
      console.error("Error fetching reading list:", error);
    }
  }, [contract, Current_Account]);

  useEffect(() => {
    if (Current_Account && contract) {
      Borrowed_Book_List();
    }
  }, [Current_Account, contract, Borrowed_Book_List]);

  const getBookCIDs = async () => {
    const Book_CIDs = await Promise.all(
      User_Borrowed_Books.map(async (Book_ID) => {
        const pinata_CID = await contract.methods.getBookCID(Book_ID).call();

        return { Book_ID, pinata_CID };
      })
    );

    setBookCIDs(Book_CIDs);
  };

  useEffect(() => {
    if (User_Borrowed_Books.length > 0) {
      getBookCIDs();
    }
  }, [User_Borrowed_Books]);

  const openPDF = (pinata_CID) => {
    setSelectedCID(pinata_CID);
  };

  const return_this_book = async (Book_ID) => {
    try {
      await contract.methods
        .return_this_book(Book_ID)
        .send({ from: Current_Account, gasLimit: 200000 });
      const updatedBooks = books.map((book) => {
        if (book.id === Book_ID) {
          return { ...book, avail_copies: book.avail_copies + 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome
          Connect_to_Wallet={Connect_to_Wallet}
          Current_Account={Current_Account}
        />
      </div>
      <add_Book Add_Book={Add_Book} />
      <List_of_Books
        books={books}
        borrow_this_book={borrow_this_book}
        Borrowed_Book_List={Borrowed_Book_List}
      />
      <Reading_List
        is_borrowed_Book={User_Borrowed_Books}
        Book_CIDs={Book_CIDs}
        openPDF={openPDF}
        selected_CID={selected_CID}
        return_this_book={return_this_book}
      />
    </div>
  );
}

export default App;
