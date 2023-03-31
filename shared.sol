pragma solidity ^0.5.17;

 
contract sharedWallet {

    address  _owner;

    //create a mapping so other addresses can interact with this wallet.  Uint8 is used to determine is the address enabled of disabled
    mapping(address => uint8) private _owners;

    //in order to interact with the wallet you need to be the owner so added a require statement then execute the function _;
    modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }

    
    //Require the msg.sender/the owner OR || Or an owner with a 1 which means enabled owner
    modifier validOwner() {
        require(msg.sender == _owner || _owners[msg.sender] == 1);
        _;
    }

    
    event DepositFunds(address from, uint amount);
    event WithdrawFunds(address from, uint amount);
    event TransferFunds(address from, address to, uint amount);


    //the creator is the owner of the wallet
    constructor() 
        public {
        _owner = msg.sender;
    }

    
    //this function is used to add owners of the wallet.  Only the isOwner can add addresses.  1 means enabled
    function addOwner(address owner) 
        isOwner 
        public {
        _owners[owner] = 1;
    }

    
    //remove an owner from the wallet.  0 means disabled
    function removeOwner(address owner)
        isOwner
        public {
        _owners[owner] = 0;   
    }

    
    //Anyone can deposit funds into the wallet and emit an event called depositfunds
    function ()
        external
        payable {
        emit DepositFunds(msg.sender, msg.value);
    }

    
    //to withdraw you need to be an owner, the amount needs to be >= balance of acct.  then transfer and emit an event
    function withdraw (uint amount)
        validOwner
        public {
        require(address(this).balance >= amount);
        (msg.sender).transfer(amount);
        emit WithdrawFunds(msg.sender, amount);
    }

    
    function transferTo(address payable to, uint amount) 
        validOwner
        public {
        require(address(this).balance >= amount);
        to.transfer(amount);
        emit TransferFunds(msg.sender, to, amount);
    }
}
