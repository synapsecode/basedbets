// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasedBet {
    uint public creatorChoice;
    address public creator;
    address[] public players;
    mapping(address => uint) public choices;
    address[] public correctAddresses;
    address public treasury;

    constructor(address _treasury) {
        creator = msg.sender;
        treasury = _treasury;
        creatorChoice = 10; //DUMMYVAL
    }

    // Function to view the contract's balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    // Function for participants to make their choice
    function placeBet(uint _choice) external payable {
        require(msg.value > 0, "NO_WAGER");
        require(_choice == 0 || _choice == 1, "INVALID_CHOICE");
        //Hanlde duplicate choices
        if (msg.sender == creator) {
            creatorChoice = _choice;
        }
        players.push(msg.sender);
        choices[msg.sender] = _choice;
    }

    // Function to settle the game and distribute rewards
    function settle(uint correctChoice) external {
        //TODO: Add Caller Validation
        require(correctChoice == 0 || correctChoice == 1, "INVALID_CHOICE");
        uint correctCount = 0;
        delete correctAddresses; // Reset the array before populating it
        // Check each participant's choice and count those who chose correctly
        for (uint i = 0; i < players.length; i++) {
            if (choices[players[i]] == correctChoice) {
                correctCount++;
                correctAddresses.push(players[i]);
            }
        }
        if (correctAddresses.length == 0) {
            //NO WINNERS
            payable(treasury).transfer(address(this).balance);
        } else {
            uint reward = address(this).balance / correctCount;
            for (uint i = 0; i < correctAddresses.length; i++) {
                address payable recipient = payable(correctAddresses[i]);
                recipient.transfer(reward);
            }
            delete players;
            delete correctAddresses;
        }
    }
}
