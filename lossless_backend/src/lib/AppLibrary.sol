// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AuctionLibrary.sol";
import "../interface/IAutomationRegistrarInterface.sol";
import "../interface/IAutomationRegistryInterface.sol";

library AppLibrary {

    struct Layout {
        address owner;

        address nftContractAddress;

        address auctionTokenFacetAddress;

        uint auctionCount;

        uint aunctionLiveCount;

        mapping(uint256 => uint256) auctionIdToAuctionLiveId;

        mapping(uint256 => bool) auctionLive;

        mapping(address => uint256) balances;

        mapping(address => mapping(address => uint256)) allowances;

        mapping (uint => AuctionLibrary.AuctionDetails) auctions;

        AuctionLibrary.AuctionDetails[] auctionsArray;

        AuctionLibrary.AuctionDetails[] liveAuctionsArray;

        mapping (uint256 => mapping (address => bool)) auctionsParticipant;

        mapping (uint256 => address[]) auctionsParticipantArray;

        mapping (address => uint256[]) userAuctionsParticipation;

        mapping (address => uint256[]) userAuctionsCreated;

        mapping (address => uint256) usersales;

        address teamWallet;

        mapping(uint => mapping(address => bool)) aunctionWinnerNFTClaim;

        mapping(uint => mapping(address => bool)) aunctionParticipantNFTClaim;

        ChainlinkLibrary.RegistrationParams chainlinkRegParams;

        Authorization authorizationContract;

        AuctionNFT auctionNFTContract;

        LinkTokenInterface i_link;

        IAutomationRegistrarInterface i_registrar;

        IAutomationRegistryInterface i_registry;
    }

    // Convert uint256 to bytes
    function uintToBytes(uint256 _value) internal pure returns (bytes memory) {
        return abi.encodePacked(_value);
    }

    // Convert bytes to uint256
    function bytesToUint(bytes memory _bytes) internal pure returns (uint256) {
        return abi.decode(_bytes, (uint256));
    }

    // Convert string to bytes
    function stringToBytes(string memory str) internal pure returns (bytes memory) {
        return bytes(str);
    }

    // Convert bytes to string
    function bytesToString(bytes memory byteArray) internal pure returns (string memory) {
        return string(byteArray);
    }

    function addToLiveArray(AuctionLibrary.AuctionDetails storage auction, AppLibrary.Layout storage layout) external {
        
        if(layout.auctionLive[auction.auctionId]) return;

        uint _newAuctionLiveCount = layout.aunctionLiveCount;

        layout.liveAuctionsArray.push(auction);

        layout.auctionIdToAuctionLiveId[auction.auctionId] = _newAuctionLiveCount;

        layout.auctionLive[auction.auctionId] = true;

        layout.aunctionLiveCount++;
    
    }

    function removeFromLiveArray(uint _auctionId, AppLibrary.Layout storage layout) external  {
        
        if(!layout.auctionLive[_auctionId]) return;

        uint256 auctionLiveId = layout.auctionIdToAuctionLiveId[_auctionId];

        layout.liveAuctionsArray[auctionLiveId] = layout.liveAuctionsArray[layout.liveAuctionsArray.length -1];

        uint256 auctionInLastLivePositionId = layout.liveAuctionsArray[layout.liveAuctionsArray.length -1].auctionId;

        layout.auctionIdToAuctionLiveId[auctionInLastLivePositionId]= auctionLiveId;

        layout.auctionLive[_auctionId] = false;

        layout.auctionIdToAuctionLiveId[_auctionId]= 0;

        layout.liveAuctionsArray.pop();

        layout.aunctionLiveCount--;
    }
}