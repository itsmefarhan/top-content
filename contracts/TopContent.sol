//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TopContent {
    string public name = "TopContent";
    uint256 public fileCount = 0;
    mapping(uint256 => File) public files;

    struct File {
        uint256 id;
        string hash;
        string desc;
        uint256 tipAmount;
        address payable contentCreator;
    }

    event ContentCreated(
        uint256 id,
        string hash,
        string desc,
        uint256 tipAmount,
        address payable contentCreator
    );

    event ContentTipped(
        uint256 id,
        string hash,
        string desc,
        uint256 tipAmount,
        address payable contentCreator
    );

    function uploadContent(string memory _hash, string memory _desc) public {
        require(bytes(_hash).length > 0);
        require(bytes(_desc).length > 0);
        require(msg.sender != address(0));

        fileCount++;

        files[fileCount] = File(
            fileCount,
            _hash,
            _desc,
            0,
            payable(msg.sender)
        );

        emit ContentCreated(fileCount, _hash, _desc, 0, payable(msg.sender));
    }

    function tipCreator(uint256 _contentId) public payable {
        require(_contentId > 0 && _contentId <= fileCount);

        // fetch the content
        File memory _content = files[_contentId];
        // fetch the creator
        address payable _creator = _content.contentCreator;
        // pay to creator
        payable(_creator).transfer(msg.value);
        // update content tip amount
        _content.tipAmount += msg.value;
        // update content
        files[_contentId] = _content;

        emit ContentTipped(
            _contentId,
            _content.hash,
            _content.desc,
            _content.tipAmount,
            _creator
        );
    }
}
