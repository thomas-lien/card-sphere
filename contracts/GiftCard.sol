// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GiftCard is ERC721, ERC721Enumerable, Ownable {
    uint256 private _nextTokenId;

    struct GiftCardDetails {
        uint256 price;
        uint256 expiryDate;
        bool isUsed;
    }

    // Mapping from token ID to gift card details
    mapping(uint256 => GiftCardDetails) private _giftCardDetails;

    // Events
    event GiftCardMinted(address indexed to, uint256 indexed tokenId, uint256 price, uint256 expiryDate);
    event GiftCardUsed(uint256 indexed tokenId);
    event GiftCardTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("Gift Card", "GCARD") Ownable(msg.sender) {}

    function mint(address to, uint256 price, uint256 expiryDate) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        _giftCardDetails[tokenId] = GiftCardDetails({
            price: price,
            expiryDate: expiryDate,
            isUsed: false
        });

        emit GiftCardMinted(to, tokenId, price, expiryDate);
    }

    function useGiftCard(uint256 tokenId) public {
        require(_isAuthorized(ownerOf(tokenId), _msgSender(), tokenId), "Not owner nor approved");
        require(!_giftCardDetails[tokenId].isUsed, "Gift card already used");
        require(block.timestamp <= _giftCardDetails[tokenId].expiryDate, "Gift card expired");

        _giftCardDetails[tokenId].isUsed = true;
        emit GiftCardUsed(tokenId);
    }

    function getGiftCardDetails(uint256 tokenId) public view returns (uint256 price, uint256 expiryDate, bool isUsed) {
        require(_ownerOf(tokenId) != address(0), "Gift card does not exist");
        GiftCardDetails memory details = _giftCardDetails[tokenId];
        return (details.price, details.expiryDate, details.isUsed);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        if (from != address(0)) {
            emit GiftCardTransferred(tokenId, from, to);
        }
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 