const assert = require('assert');
const Lottery = artifacts.require('Lottery');

contract('Lottery', (accounts) => {
	const admin = accounts[0];
	const VALID_VALUE_TO_SEND = web3.utils.toWei('0.02', 'ether');
	let lottery;

	beforeEach(async () => {
		lottery = await Lottery.new({
			from: admin,
			gas: 1000000,
		});
	});

	describe('Lottery Contract', () => {
		it('deploys a contract', () => {
			assert.ok(lottery.address);
		});

		it('allows one account (admin) to enter', async () => {
			await lottery.enter({
				from: admin,
				value: VALID_VALUE_TO_SEND,
			});
			const players = await lottery.getPlayers();
			assert.equal(admin, players[0]);
			assert.equal(1, players.length);
		});

		it('allows multiple accounts to enter', async () => {
			for (i = 0; i < accounts.length; i++) {
				await lottery.enter({
					from: accounts[i],
					value: VALID_VALUE_TO_SEND,
				});
			}
			const players = await lottery.getPlayers();
			assert.equal(accounts.length, players.length);
			for (i = 0; i < accounts.length; i++) {
				assert.equal(accounts[i], players[i]);
			}
		});

		it('requires a minimum amount of deposited ether to enter', async () => {
			try {
				await lottery.enter({
					from: admin,
					value: 0,
				});
				assert(false);
			} catch (e) {
				assert(e);
			}
		});

		it('only admin can do the lottery draw', async () => {
			try {
				await lottery.draw({
					from: accounts[1],
				});
				assert(false);
			} catch (e) {
				assert(e);
			}
		});

		it('sends money to the winner and resets the players array', async () => {
			await lottery.enter({
				from: admin,
				value: VALID_VALUE_TO_SEND,
			});
			const initialBalance = await web3.eth.getBalance(
				lottery.address
			);
			const playerInitialBalance = await web3.eth.getBalance(
				admin
			);
			await lottery.draw({ from: admin });
			const finalBalance = await web3.eth.getBalance(
				lottery.address
			);
			const playerFinalBalance = await web3.eth.getBalance(
				admin
			);
			const difference = initialBalance - finalBalance;
			const playerDifference =
				playerFinalBalance - playerInitialBalance;
			assert.equal(difference, VALID_VALUE_TO_SEND);
			assert(
				playerDifference > web3.utils.toWei('0.018', 'ether')
			);
		});
	});
});
