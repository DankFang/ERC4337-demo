// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./TestAggregatedAccount.sol";

/**
 * Based on SimpleAccountFactory.
 * Cannot be a subclass since both constructor and createAccount depend on the
 * constructor and initializer of the actual account contract.
 */
contract TestAggregatedAccountFactory {
    TestAggregatedAccount public immutable accountImplementation;

    /**
     * 
     * @param anEntryPoint 入门点
     * @param anAggregator 聚合器
     */
    constructor(IEntryPoint anEntryPoint, address anAggregator){
        accountImplementation = new TestAggregatedAccount(anEntryPoint, anAggregator);
    }

    /**
     * create an account, and return its address.
     * returns the address even if the account is already deployed.
     * Note that during UserOperation execution, this method is called only if the account is not deployed.
     * This method returns an existing account address so that entryPoint.getSenderAddress() would work even after account creation
     */
    function createAccount(address owner,uint256 salt) public returns (TestAggregatedAccount ret) {
        address addr = getAddress(owner, salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return TestAggregatedAccount(payable(addr));
        }
        // initialize 调用方法生成ContractWallet。
        ret = TestAggregatedAccount(payable(new ERC1967Proxy{salt : bytes32(salt)}(
                address(accountImplementation),
                abi.encodeCall(TestAggregatedAccount.initialize, (owner))
            )));
    }

    /**
     * calculate the counterfactual address of this account as it would be returned by createAccount()
     */
    function getAddress(address owner,uint256 salt) public view returns (address) {
        return Create2.computeAddress(bytes32(salt), keccak256(abi.encodePacked(
                type(ERC1967Proxy).creationCode,
                abi.encode(
                    address(accountImplementation),
                    abi.encodeCall(TestAggregatedAccount.initialize, (owner))
                )
            )));
    }
}