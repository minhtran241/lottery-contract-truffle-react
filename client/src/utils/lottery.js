import contractData from '../contracts/Lottery.json';

const contract = [...contractData][0];

const getContractInstance = async (web3) => {
	// get the deployed address of the contract
	const contractAddress =
		'0xDDb2acDeAfDdA6063ADF6D1D19ECe28F9c9A278D';

	// create the instance
	const instance = new web3.eth.Contract(
		contract.abi,
		contractAddress
	);
	return instance;
};

export default getContractInstance;
