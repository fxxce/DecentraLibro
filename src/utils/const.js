export const contractAddress=YOUR_CONTRACT_ADDRESS


export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pinata_CID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "avail_copies",
				"type": "uint256"
			}
		],
		"name": "Add_Book",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "Book_Added",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "book_borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "Borrowed_Book",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "book_borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "Book_Returned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "borrow_this_book",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "return_this_book",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBooks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pinata_CID",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "avail_copies",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "book_borrower",
						"type": "address"
					}
				],
				"internalType": "struct DecentraLibro.Book[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "Book_ID",
				"type": "uint256"
			}
		],
		"name": "getBookCID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBookCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "Borrowed_Book_List",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]