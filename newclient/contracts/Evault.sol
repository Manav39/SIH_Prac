// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evault {
    address public admin = 0x46A2A666fc06681e2cB49440a0776a6C4Cc21906;

    struct Judge {
        address judgeAddress;
        string name;
        uint[] caseIds; // Array to store the case IDs associated with the judge
    }

    struct Client {
        address clientAddress;
        string name;
        uint[] caseIds; // Array to store the case IDs associated with the client
    }

    struct Lawyer {
        address lawyerAddress;
        string name;
        uint[] caseIds; // Array to store the case IDs associated with the lawyer
    }

    struct Document {
        string documentHash;
        string description;
        address uploader;
    }

    struct Case {
        uint caseId;
        string caseName;
        string caseDesc;
        address[] judgeAddresses; // Array to store judge addresses for the case
        address[] lawyerAddresses;
        address[] clientAddresses;
        mapping(uint => Document) documents; // Mapping to track documents by index
        uint documentCount;
    }

    Judge[] public judgeList;
    Client[] public clientList;
    Lawyer[] public lawyerList;
    Case[] public caseList;

    mapping(address => Judge) public judges;
    mapping(address => Client) public clients;
    mapping(address => Lawyer) public lawyers;
    mapping(uint => Case) public cases;

    uint public caseIdCounter = 1;

    // Modifier to restrict functions to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    modifier onlyCaseParticipants(uint _caseId) {
        Case storage caseInstance = cases[_caseId];
        require(
            isJudgeInCase(msg.sender, _caseId) ||
                isLawyerInCase(msg.sender, _caseId),
            "Only judges and lawyers of the case can perform this operation"
        );
        _;
    }

    function isJudgeInCase(
        address _judgeAddress,
        uint _caseId
    ) internal view returns (bool) {
        Case storage caseInstance = cases[_caseId];
        for (uint i = 0; i < caseInstance.judgeAddresses.length; i++) {
            if (caseInstance.judgeAddresses[i] == _judgeAddress) {
                return true;
            }
        }
        return false;
    }

    function isLawyerInCase(
        address _lawyerAddress,
        uint _caseId
    ) internal view returns (bool) {
        Case storage caseInstance = cases[_caseId];
        for (uint i = 0; i < caseInstance.lawyerAddresses.length; i++) {
            if (caseInstance.lawyerAddresses[i] == _lawyerAddress) {
                return true;
            }
        }
        return false;
    }

    // Function to create a new judge (restricted to admin)
    function addJudge(
        address _judgeAddress,
        string memory _name
    ) public onlyAdmin {
        // Validate input
        require(_judgeAddress != address(0), "Invalid judge address");
        require(bytes(_name).length > 0, "Judge name cannot be empty");

        // Check if the judge already exists
        require(
            judges[_judgeAddress].judgeAddress == address(0),
            "Judge already exists"
        );

        Judge storage judge = judges[_judgeAddress];
        judge.judgeAddress = _judgeAddress;
        judge.name = _name;
        judgeList.push(judge);
    }

    // Function to create a new client (restricted to admin)
    function addClient(
        address _clientAddress,
        string memory _name
    ) public onlyAdmin {
        // Validate input
        require(_clientAddress != address(0), "Invalid client address");
        require(bytes(_name).length > 0, "Client name cannot be empty");

        // Check if the client already exists
        require(
            clients[_clientAddress].clientAddress == address(0),
            "Client already exists"
        );

        Client storage client = clients[_clientAddress];
        client.clientAddress = _clientAddress;
        client.name = _name;
        clientList.push(client);
    }

    // Function to create a new lawyer (restricted to admin)
    function addLawyer(
        address _lawyerAddress,
        string memory _name
    ) public onlyAdmin {
        // Validate input
        require(_lawyerAddress != address(0), "Invalid lawyer address");
        require(bytes(_name).length > 0, "Lawyer name cannot be empty");

        // Check if the lawyer already exists
        require(
            lawyers[_lawyerAddress].lawyerAddress == address(0),
            "Lawyer already exists"
        );

        Lawyer storage lawyer = lawyers[_lawyerAddress];
        lawyer.lawyerAddress = _lawyerAddress;
        lawyer.name = _name;
        lawyerList.push(lawyer);
    }

    // Function to create a new case (restricted to admin)
    function createCase(
        string memory _caseName,
        string memory _caseDesc,
        address[] memory _judgeAddresses,
        address[] memory _clientAddresses,
        address[] memory _lawyerAddresses
    ) public {
        // Check permissions and validate input
        require(msg.sender == admin, "Only admin can create cases");

        for (uint i = 0; i < _judgeAddresses.length; i++) {
            require(
                judges[_judgeAddresses[i]].judgeAddress == _judgeAddresses[i],
                "Invalid judge address"
            );
        }

        for (uint i = 0; i < _clientAddresses.length; i++) {
            require(
                clients[_clientAddresses[i]].clientAddress ==
                    _clientAddresses[i],
                "Invalid client address"
            );
        }

        for (uint i = 0; i < _lawyerAddresses.length; i++) {
            require(
                lawyers[_lawyerAddresses[i]].lawyerAddress ==
                    _lawyerAddresses[i],
                "Invalid lawyer address"
            );
        }

        // caseList.push(newCase);
        uint idx = caseList.length;
        caseList.push();
        Case storage newCase = cases[idx];
        newCase.caseId = caseIdCounter;
        newCase.caseName = _caseName;
        newCase.caseDesc = _caseDesc;
        newCase.judgeAddresses = _judgeAddresses;
        newCase.clientAddresses = _clientAddresses;
        newCase.lawyerAddresses = _lawyerAddresses;

        // Update the Judge's caseIds array
        for (uint i = 0; i < _judgeAddresses.length; i++) {
            judges[_judgeAddresses[i]].caseIds.push(caseIdCounter);
        }

        // Update the Client's caseIds array
        for (uint i = 0; i < _clientAddresses.length; i++) {
            clients[_clientAddresses[i]].caseIds.push(caseIdCounter);
        }

        // Update the Lawyer's caseIds array
        for (uint i = 0; i < _lawyerAddresses.length; i++) {
            lawyers[_lawyerAddresses[i]].caseIds.push(caseIdCounter);
        }

        caseIdCounter++;
    }

    // Function to get the caseIds of a judge
    function getJudgeCaseIds(
        address _judgeAddress
    ) public view returns (uint[] memory) {
        return judges[_judgeAddress].caseIds;
    }

    // Function to get the caseIds of a client
    function getClientCaseIds(
        address _clientAddress
    ) public view returns (uint[] memory) {
        return clients[_clientAddress].caseIds;
    }

    // Function to get the caseIds of a lawyer
    function getLawyerCaseIds(
        address _lawyerAddress
    ) public view returns (uint[] memory) {
        return lawyers[_lawyerAddress].caseIds;
    }

    // Function to get client addresses, judge addresses, and lawyer addresses for a case
    function getCaseDetails(
        uint _caseId
    )
        public
        view
        returns (
            string memory caseName,
            string memory caseDesc,
            address[] memory judgeAddresses,
            address[] memory lawyerAddresses,
            address[] memory clientAddresses,
            string[] memory documentHashes,
            string[] memory documentDescriptions,
            address[] memory documentUploaders
        )
    {
        Case storage caseInstance = cases[_caseId];
        caseName = caseInstance.caseName;
        caseDesc = caseInstance.caseDesc;
        judgeAddresses = caseInstance.judgeAddresses;
        lawyerAddresses = caseInstance.lawyerAddresses;
        clientAddresses = caseInstance.clientAddresses;

        uint documentCount = caseInstance.documentCount;
        documentHashes = new string[](documentCount);
        documentDescriptions = new string[](documentCount);
        documentUploaders = new address[](documentCount);

        for (uint i = 0; i < documentCount; i++) {
            documentHashes[i] = caseInstance.documents[i].documentHash;
            documentDescriptions[i] = caseInstance.documents[i].description;
            documentUploaders[i] = caseInstance.documents[i].uploader;
        }
    }

    function addDocument(
        uint _caseId,
        string memory _documentHash,
        string memory _description
    ) public onlyCaseParticipants(_caseId) {
        require(
            bytes(_documentHash).length > 0,
            "Document hash cannot be empty"
        );
        require(
            bytes(_description).length > 0,
            "Document description cannot be empty"
        );

        Case storage caseInstance = cases[_caseId];
        uint documentIndex = caseInstance.documentCount; // Get the current document index

        Document memory newDocument = Document(
            _documentHash,
            _description,
            msg.sender
        );
        caseInstance.documents[documentIndex] = newDocument; // Store the document at the index
        caseInstance.documentCount++; // Increment the document count
    }

    function isJudge(address member) public view returns (bool) {
        for (uint i = 0; i < judgeList.length; i++) {
            if (judgeList[i].judgeAddress == member) {
                return true;
            }
        }
        return false;
    }

    function isClient(address member) public view returns (bool) {
        for (uint i = 0; i < clientList.length; i++) {
            if (clientList[i].clientAddress == member) {
                return true;
            }
        }
        return false;
    }

    function isLawyer(address member) public view returns (bool) {
        for (uint i = 0; i < lawyerList.length; i++) {
            if (lawyerList[i].lawyerAddress == member) {
                return true;
            }
        }
        return false;
    }
}
