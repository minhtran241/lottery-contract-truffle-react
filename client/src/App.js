import React, { Component } from 'react';
import getWeb3 from './utils/web3';
import getContractInstance from './utils/lottery';
import web3 from 'web3';

import './App.css';

class App extends Component {
	state = {
		web3: null,
		admin: null,
		players: null,
		balance: null,
		value: '',
		message: null,
		contract: null,
	};

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use window.ethereum to get the user's accounts.
			// const accounts = await window.ethereum.request({
			// 	method: 'eth_accounts',
			// });

			// Get the contract instance by passing in web3 and the contract definition.
			const contract = await getContractInstance(web3);
			const admin = await contract.methods.admin().call();
			const players = await contract.methods
				.getPlayers()
				.call();
			const balance = await web3.eth.getBalance(
				contract.options.address
			);
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({
				web3,
				admin,
				players,
				balance,
				contract,
			});
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, admin, players, balance, or contract. Check console for details.`
			);
			console.log(error);
		}
	};

	onSubmit = async (event) => {
		event.preventDefault();

		// Use window.ethereum to get the user's accounts.
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});

		try {
			this.setState({
				message: 'Waiting on transaction to success...',
			});

			await this.state.contract.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(this.state.value, 'ether'),
			});
			// Handle the result
			this.setState({
				message: 'You have been entered!',
			});
		} catch (error) {
			this.setState({
				message:
					'Invalid amount of ether, please make a deposit of at least .01 ether to enter',
			});
			console.error(error);
		}
	};

	onClick = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});

		try {
			this.setState({
				message: 'Waiting on transaction success...',
			});

			await this.state.contract.methods.draw().send({
				from: accounts[0],
			});

			this.setState({ message: 'A winner has been picked!' });
		} catch (error) {
			this.setState({
				message: 'Permission denied',
			});
			console.error(error);
		}
	};

	render() {
		if (!this.state.web3) {
			return (
				<div>
					Loading Web3, admin, players, balance and
					contract...
				</div>
			);
		}
		return (
			<div className="App">
				<h2>Lottery Contract</h2>
				<p>This contract is managed by {this.state.admin}.</p>
				<p>
					There are currently {this.state.players.length}{' '}
					people entered competing to win{' '}
					{web3.utils.fromWei(this.state.balance, 'ether')}{' '}
					ether!
				</p>
				<hr />
				<form onSubmit={this.onSubmit}>
					<h4>Want to try your luck?</h4>
					<div>
						<label>Deposit {}</label>
						<input
							value={this.state.value}
							onChange={(event) =>
								this.setState({
									value: event.target.value,
								})
							}
						/>
						<label>{} ether</label>
					</div>
					<button>Enter</button>
				</form>
				<hr />
				<h4>Ready to pick a winner?</h4>
				<button onClick={this.onClick}>Draw</button>
				<hr />
				<p>{this.state.message}</p>
			</div>
		);
	}
}

export default App;
