document.addEventListener('DOMContentLoaded', async () => {
	// Set up the Web3 provider
	web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
	
	// Get the contract instance
	const contractAddress = '0xc6bBB9Fae0242E4f7A328b040350Ee934B481abF';
	const contractAbi=[
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "DepositFunds",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TransferFunds",
			"type": "event"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address payable",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferTo",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "WithdrawFunds",
			"type": "event"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		}
	];
	const contract = new web3.eth.Contract(contractAbi, contractAddress);
	const gasLimit = web3.utils.toHex(2000000);
	// Get the owner address
	
	// Add owner form submit event listener
	const ownerAddress = '0xC95ae1B59E367C8faDF34b4982B975C9162CEBCE';
    
	document.getElementById('ownerAddress').textContent = ownerAddress;
	const addOwnerForm = document.getElementById('addOwnerForm');
	addOwnerForm.addEventListener('submit', async (event) => {
	  event.preventDefault();
	  const newOwner = event.target.elements.newOwner.value;
	  await contract.methods.addOwner(newOwner).send({ from: ownerAddress });
	  alert('Owner added successfully!');
	});
	
	
	// Remove owner form submit event listener
	const removeOwnerForm = document.getElementById('removeOwnerForm');
	removeOwnerForm.addEventListener('submit', async (event) => {
	  event.preventDefault();
	  const existingOwner = event.target.elements.existingOwner.value;
	  await contract.methods.removeOwner(existingOwner).send({ from: ownerAddress });
	  alert('Owner removed successfully!');
	});
	
	// Transfer funds form submit event listener
	const transferFundsForm = document.getElementById('transferFundsForm');
	transferFundsForm.addEventListener('submit', async (event) => {
	
	  event.preventDefault();
	  const toAddress = event.target.elements.toAddress.value;
	  const transferAmount = event.target.elements.transferAmount.value;
	  await contract.methods.transferTo(toAddress, transferAmount).send({ from: ownerAddress,gas:gasLimit });
	  alert('Funds transferred successfully!');
	});
	
	// Withdraw funds form submit event listener
	const withdrawFundsForm = document.getElementById('withdrawFundsForm');
	withdrawFundsForm.addEventListener('submit', async (event) => {
	  event.preventDefault();
	  const withdrawAmount = event.target.elements.withdrawAmount.value;
	  await contract.methods.withdraw(withdrawAmount).send({ from: ownerAddress,gas:gasLimit });
	  alert('Funds withdrawn successfully!');
	});
  });
  