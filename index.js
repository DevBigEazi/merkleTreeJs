

const eligibleAddresses = [
    "0x9bca8c69bf8cccd4d27c0940db63014518d25906",
    "0x1899632960f34009a0d4f3c104e57491382fdeac",
    "0x7d9cec2f4133fd6fd6a6c26eee3ea346c92b07ec",
    "0xab24bb87f393deae4327723f8354624b0df44df6",
    "0x59c19cc99ba47a0bc9a82856095a8c3b99b1330f"
];

// Map the addresses to SHA256 leaves
const leavesNodes = eligibleAddresses.map(address => CryptoJS.SHA256(address).toString());

// Create Merkle Tree using the library
const merkleTree = new MerkleTree(leavesNodes, CryptoJS.SHA256, { sortPairs: true });

// Get the root hash of the tree in hexadecimal format
const rootHash = merkleTree.getRoot().toString("hex");
document.getElementById('root-hash').innerText = rootHash;

document.getElementById('check-button').addEventListener('click', () => {
    const inputAddress = document.getElementById('address-input').value;
    const hashedAddress = CryptoJS.SHA256(inputAddress).toString();

    if (eligibleAddresses.includes(inputAddress)) {
        const proof = merkleTree.getProof(hashedAddress);
        const verification = merkleTree.verify(proof, hashedAddress, rootHash);

        if (verification)
            document.getElementById('result').innerText = "Address is eligible!"
    } else {
        document.getElementById('result').innerText = "Address is rather not in the eligible list or the input is empty!";
    }
});