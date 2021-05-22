module.exports = {
  contractName: 'ChainToken',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'Paused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        }
      ],
      name: 'RoleGranted',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        }
      ],
      name: 'RoleRevoked',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'Unpaused',
      type: 'event'
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'PAUSER_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        }
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'burnFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'subtractedValue',
          type: 'uint256'
        }
      ],
      name: 'decreaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        }
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256'
        }
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        }
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'addedValue',
          type: 'uint256'
        }
      ],
      name: 'increaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string'
        },
        {
          internalType: 'string',
          name: 'symbol',
          type: 'string'
        },
        {
          internalType: 'uint8',
          name: 'decimals',
          type: 'uint8'
        },
        {
          internalType: 'uint256',
          name: 'totalSupply',
          type: 'uint256'
        }
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'tokenContract',
          type: 'address'
        }
      ],
      name: 'withdrawTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'version',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'pure',
      type: 'function'
    }
  ],
  metadata:
    '{"compiler":{"version":"0.6.2+commit.bacdbe57"},"language":"Solidity","output":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenContract","type":"address"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"details":"{ERC20} token, including: *  - ability for holders to burn (destroy) their tokens - a pauser role that allows to stop all token transfers * This contract uses {AccessControl} to lock permissioned functions using the different roles - head to its documentation for details. * The account that deploys the contract will be granted the minter and pauser roles, as well as the default admin role, which will let it grant both minter and pauser roles to aother accounts","methods":{"allowance(address,address)":{"details":"See {IERC20-allowance}."},"approve(address,uint256)":{"details":"See {IERC20-approve}.     * Requirements:     * - `spender` cannot be the zero address."},"balanceOf(address)":{"details":"See {IERC20-balanceOf}."},"burn(uint256)":{"details":"Destroys `amount` tokens from the caller.     * See {ERC20-_burn}."},"burnFrom(address,uint256)":{"details":"Destroys `amount` tokens from `account`, deducting from the caller\'s allowance.     * See {ERC20-_burn} and {ERC20-allowance}.     * Requirements:     * - the caller must have allowance for ``accounts``\'s tokens of at least `amount`."},"decimals()":{"details":"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`).     * Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is called.     * NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."},"decreaseAllowance(address,uint256)":{"details":"Atomically decreases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`."},"getRoleAdmin(bytes32)":{"details":"Returns the admin role that controls `role`. See {grantRole} and {revokeRole}.     * To change a role\'s admin, use {_setRoleAdmin}."},"getRoleMember(bytes32,uint256)":{"details":"Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive.     * Role bearers are not sorted in any particular way, and their ordering may change at any point.     * WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information."},"getRoleMemberCount(bytes32)":{"details":"Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role."},"grantRole(bytes32,address)":{"details":"Grants `role` to `account`.     * If `account` had not been already granted `role`, emits a {RoleGranted} event.     * Requirements:     * - the caller must have ``role``\'s admin role."},"hasRole(bytes32,address)":{"details":"Returns `true` if `account` has been granted `role`."},"increaseAllowance(address,uint256)":{"details":"Atomically increases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address."},"initialize(string,string,uint8,uint256)":{"details":"Grants `DEFAULT_ADMIN_ROLE` and `PAUSER_ROLE` to the account that deploys the contract.     * See {ERC20-constructor}."},"name()":{"details":"Returns the name of the token."},"pause()":{"details":"Pauses all token transfers.     * See {ERC20Pausable} and {Pausable-_pause}.     * Requirements:     * - the caller must have the `PAUSER_ROLE`."},"paused()":{"details":"Returns true if the contract is paused, and false otherwise."},"renounceRole(bytes32,address)":{"details":"Revokes `role` from the calling account.     * Roles are often managed via {grantRole} and {revokeRole}: this function\'s purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced).     * If the calling account had been granted `role`, emits a {RoleRevoked} event.     * Requirements:     * - the caller must be `account`."},"revokeRole(bytes32,address)":{"details":"Revokes `role` from `account`.     * If `account` had been granted `role`, emits a {RoleRevoked} event.     * Requirements:     * - the caller must have ``role``\'s admin role."},"symbol()":{"details":"Returns the symbol of the token, usually a shorter version of the name."},"totalSupply()":{"details":"See {IERC20-totalSupply}."},"transfer(address,uint256)":{"details":"See {IERC20-transfer}.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`."},"transferFrom(address,address,uint256)":{"details":"See {IERC20-transferFrom}.     * Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20};     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `amount`. - the caller must have allowance for ``sender``\'s tokens of at least `amount`."},"unpause()":{"details":"Unpauses all token transfers.     * See {ERC20Pausable} and {Pausable-_unpause}.     * Requirements:     * - the caller must have the `PAUSER_ROLE`."}}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"/home/sandip/projects/ChainGames/chaintokencontracts/contracts/ChainToken.sol":"ChainToken"},"evmVersion":"istanbul","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[]},"sources":{"/home/sandip/projects/ChainGames/chaintokencontracts/contracts/ChainToken.sol":{"keccak256":"0xabf6aed105183f625751099b66e134709b2ff95c605a9f7a0078106644a21a24","urls":["bzz-raw://7de2602bd03e8d232fe86393c245274cb102602154f599c8f7b1a0551a789579","dweb:/ipfs/QmTgVU8XHd7LYw9Jnfa9Vi79Zqj9dvXfqArdu8w9Sk64UL"]},"@openzeppelin/contracts-ethereum-package/contracts/GSN/Context.sol":{"keccak256":"0xe81686511d62f18b2d9c693c2c94c0a789c690de63aa90e15451ebf65c5bfd3e","urls":["bzz-raw://1332ee1d2b096456bf2e5795b5871d0fed47be6a31c9a2f2cef9206a299565ea","dweb:/ipfs/Qmdu1847Y4UL3gTjbLUManMGfxYEoyGPSodM3Br89SKzwx"]},"@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol":{"keccak256":"0x9bfec92e36234ecc99b5d37230acb6cd1f99560233753162204104a4897e8721","urls":["bzz-raw://5cf7c208583d4d046d75bd99f5507412ab01cce9dd9f802ce9768a416d93ea2f","dweb:/ipfs/QmcQS1BBMPpVEkXP3qzwSjxHNrqDek8YeR7xbVWDC9ApC7"]},"@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol":{"keccak256":"0x3954a5ee18b9297616912390eac7b0fe698e6ffea5a50dc3ccb0980cae210e86","urls":["bzz-raw://944779923ae00addaad98671de2303268765d53f1b0d66076280585edd084862","dweb:/ipfs/QmRtRFCkvsWD3c6WBpAh3wgMZKXBaFfRAvB76TsVFiUdEw"]},"@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol":{"keccak256":"0x04d34b3cd5677bea25f8dfceb6dec0eaa071d4d4b789a43f13fe0c415ba4c296","urls":["bzz-raw://e7e8b526a6839e5ba14f0d23a830387fec47f7043ce01d42c9f285b709a9d080","dweb:/ipfs/QmXmhhFmX5gcAvVzNiDPAGA35iHMPNaYtQkACswRHBVTNw"]},"@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol":{"keccak256":"0x9c2d859bc9de93ced0875d226598e56067fe4d6b2dde0e1fd53ca60fa9603db0","urls":["bzz-raw://5df1baba4ea42a94d0e0aed4a87271369ef2cd54d86e89cab7ef1428ff387210","dweb:/ipfs/QmV5ErriAFQWqEPAfWhJ6DxmujH6vBPB3F5Breaq9vUWGu"]},"@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol":{"keccak256":"0x97bd82ddbbfc8c29ac8f6088cfdebd81d2c4ae3630d6b9d43d5c5ccbd0ff1e90","urls":["bzz-raw://5631ae85e90961e255d990b0dd2dcaf0a900e3aa22a58e641a5e84684ec965b8","dweb:/ipfs/QmZsPiKYq68FJJMHfD5R2ndjaMYGq3xYzeuTPAwPfQ5pZN"]},"@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol":{"keccak256":"0x9268f57dedb013b67499bc6280d728dc953f6b0d75d7558fed9fc5733332a31d","urls":["bzz-raw://4db6d8575b134b28d9aadf1f7c176a2f9c9bf9d949b444e113480ddae1a8744e","dweb:/ipfs/QmVdg4FEwG6DVi3P3LYhkodFkZeEq4b2k7yr7VkKppeiyB"]},"@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol":{"keccak256":"0x6cc1cb934a3ac2137a7dcaed018af9e235392236ceecfd3687259702b9c767ad","urls":["bzz-raw://0055fa88138cd1c3c6440370f8580f85857f8fe9dec41c99af9eafbeb8d9c3ce","dweb:/ipfs/QmX1xDh8vwGLLCH8ti45eXjQ7Wcxv1FEGTR3jkFnd5Nv6F"]},"@openzeppelin/contracts-ethereum-package/contracts/utils/Address.sol":{"keccak256":"0x5f7da58ee3d9faa9b8999a93d49c8ff978f1afc88ae9bcfc6f9cbb44da011c2b","urls":["bzz-raw://4f089d954b3ecaa26949412fe63e9a184b056562c6c13dd4a0529a5d9a2e685a","dweb:/ipfs/QmVK5iCNAMcEJQxT59bsC5E53JQASDQPU6khHox3d5ZXCn"]},"@openzeppelin/contracts-ethereum-package/contracts/utils/EnumerableSet.sol":{"keccak256":"0x7f6401708b61f575b497aa7c8118ca9d70348643c83c26e70d9b643edf1a95c1","urls":["bzz-raw://b020d65f592c1715bc3d5799ad835cd975ef7d314f340f27603fb99ad86a0427","dweb:/ipfs/QmQoGZmzE5aDTMGJM4BW77eraerfTSV9Rs8wykpQ42i1in"]},"@openzeppelin/contracts-ethereum-package/contracts/utils/Pausable.sol":{"keccak256":"0x2ad5473fe88d9ab30c6cd495ab8895daae8c4a48cf8231282a2d339387b35006","urls":["bzz-raw://a737c60474c063efc28e5922b6a1d073588c010eb67f883273d3ec29d8e52d6b","dweb:/ipfs/QmWCeqeZhR45S1mcjPRYEMy1DCHMy9sXDfwYLPycFRh2Nk"]}},"version":1}',
  bytecode:
    '0x608060405234801561001057600080fd5b506120bf806100206000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80635c975abb116100f9578063a217fddf11610097578063ca15c87311610071578063ca15c87314610654578063d547741f14610671578063dd62ed3e1461069d578063e63ab1e9146106cb576101c4565b8063a217fddf146105f4578063a457c2d7146105fc578063a9059cbb14610628576101c4565b80638456cb59116100d35780638456cb59146105795780639010d07c1461058157806391d14854146105c057806395d89b41146105ec576101c4565b80635c975abb1461051f57806370a082311461052757806379cc67901461054d576101c4565b8063313ce567116101665780633f4ba83a116101405780633f4ba83a146104cc57806342966c68146104d457806349df728c146104f157806354fd4d5014610517576101c4565b8063313ce5671461045657806336568abe1461047457806339509351146104a0576101c4565b806323b872dd116101a257806323b872dd146102a0578063248a9ca3146102d6578063253279ad146102f35780632f2ff15d1461042a576101c4565b806306fdde03146101c9578063095ea7b31461024657806318160ddd14610286575b600080fd5b6101d16106d3565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561020b5781810151838201526020016101f3565b50505050905090810190601f1680156102385780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102726004803603604081101561025c57600080fd5b506001600160a01b03813516906020013561076a565b604080519115158252519081900360200190f35b61028e610788565b60408051918252519081900360200190f35b610272600480360360608110156102b657600080fd5b506001600160a01b0381358116916020810135909116906040013561078e565b61028e600480360360208110156102ec57600080fd5b503561081b565b6104286004803603608081101561030957600080fd5b81019060208101813564010000000081111561032457600080fd5b82018360208201111561033657600080fd5b8035906020019184600183028401116401000000008311171561035857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156103ab57600080fd5b8201836020820111156103bd57600080fd5b803590602001918460018302840111640100000000831117156103df57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505060ff8335169350505060200135610830565b005b6104286004803603604081101561044057600080fd5b50803590602001356001600160a01b0316610842565b61045e6108ae565b6040805160ff9092168252519081900360200190f35b6104286004803603604081101561048a57600080fd5b50803590602001356001600160a01b03166108b7565b610272600480360360408110156104b657600080fd5b506001600160a01b038135169060200135610918565b61042861096c565b610428600480360360208110156104ea57600080fd5b50356109dd565b6104286004803603602081101561050757600080fd5b50356001600160a01b03166109f1565b6101d1610b79565b610272610b95565b61028e6004803603602081101561053d57600080fd5b50356001600160a01b0316610b9e565b6104286004803603604081101561056357600080fd5b506001600160a01b038135169060200135610bb9565b610428610c19565b6105a46004803603604081101561059757600080fd5b5080359060200135610c88565b604080516001600160a01b039092168252519081900360200190f35b610272600480360360408110156105d657600080fd5b50803590602001356001600160a01b0316610cad565b6101d1610ccb565b61028e610d2c565b6102726004803603604081101561061257600080fd5b506001600160a01b038135169060200135610d31565b6102726004803603604081101561063e57600080fd5b506001600160a01b038135169060200135610d9f565b61028e6004803603602081101561066a57600080fd5b5035610db3565b6104286004803603604081101561068757600080fd5b50803590602001356001600160a01b0316610dca565b61028e600480360360408110156106b357600080fd5b506001600160a01b0381358116916020013516610e23565b61028e610e4e565b609a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561075f5780601f106107345761010080835404028352916020019161075f565b820191906000526020600020905b81548152906001019060200180831161074257829003601f168201915b505050505090505b90565b600061077e610777610e71565b8484610e75565b5060015b92915050565b60995490565b600061079b848484610f61565b610811846107a7610e71565b61080c85604051806060016040528060288152602001611e73602891396001600160a01b038a166000908152609860205260408120906107e5610e71565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6110ca16565b610e75565b5060019392505050565b60009081526065602052604090206002015490565b61083c84848484611161565b50505050565b60008281526065602052604090206002015461086590610860610e71565b610cad565b6108a05760405162461bcd60e51b815260040180806020018281038252602f815260200180611d54602f913960400191505060405180910390fd5b6108aa828261125a565b5050565b609c5460ff1690565b6108bf610e71565b6001600160a01b0316816001600160a01b03161461090e5760405162461bcd60e51b815260040180806020018281038252602f815260200180612031602f913960400191505060405180910390fd5b6108aa82826112c9565b600061077e610925610e71565b8461080c8560986000610936610e71565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61133816565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902061099890610860610e71565b6109d35760405162461bcd60e51b815260040180806020018281038252602c815260200180611d83602c913960400191505060405180910390fd5b6109db611392565b565b6109ee6109e8610e71565b82611430565b50565b6109fe6000610860610e71565b610a395760405162461bcd60e51b815260040180806020018281038252603d815260200180611f0e603d913960400191505060405180910390fd5b806001600160a01b03811663a9059cbb610a51610e71565b604080516370a0823160e01b815230600482015290516001600160a01b038616916370a08231916024808301926020929190829003018186803b158015610a9757600080fd5b505afa158015610aab573d6000803e3d6000fd5b505050506040513d6020811015610ac157600080fd5b5051604080516001600160e01b031960e086901b1681526001600160a01b03909316600484015260248301919091525160448083019260209291908290030181600087803b158015610b1257600080fd5b505af1158015610b26573d6000803e3d6000fd5b505050506040513d6020811015610b3c57600080fd5b50516108aa5760405162461bcd60e51b8152600401808060200182810382526043815260200180611fc96043913960600191505060405180910390fd5b604080518082019091526002815261763160f01b602082015290565b60fb5460ff1690565b6001600160a01b031660009081526097602052604090205490565b6000610bf682604051806060016040528060248152602001611ec960249139610be986610be4610e71565b610e23565b919063ffffffff6110ca16565b9050610c0a83610c04610e71565b83610e75565b610c148383611430565b505050565b604080516a5041555345525f524f4c4560a81b8152905190819003600b019020610c4590610860610e71565b610c805760405162461bcd60e51b815260040180806020018281038252602a815260200180611e49602a913960400191505060405180910390fd5b6109db611538565b6000828152606560205260408120610ca6908363ffffffff6115b916565b9392505050565b6000828152606560205260408120610ca6908363ffffffff6115c516565b609b8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561075f5780601f106107345761010080835404028352916020019161075f565b600081565b600061077e610d3e610e71565b8461080c8560405180606001604052806025815260200161200c6025913960986000610d68610e71565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6110ca16565b600061077e610dac610e71565b8484610f61565b6000818152606560205260408120610782906115da565b600082815260656020526040902060020154610de890610860610e71565b61090e5760405162461bcd60e51b8152600401808060200182810382526030815260200180611e196030913960400191505060405180910390fd5b6001600160a01b03918216600090815260986020908152604080832093909416825291909152205490565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902081565b3390565b6001600160a01b038316610eba5760405162461bcd60e51b8152600401808060200182810382526024815260200180611fa56024913960400191505060405180910390fd5b6001600160a01b038216610eff5760405162461bcd60e51b8152600401808060200182810382526022815260200180611dd16022913960400191505060405180910390fd5b6001600160a01b03808416600081815260986020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610fa65760405162461bcd60e51b8152600401808060200182810382526025815260200180611f806025913960400191505060405180910390fd5b6001600160a01b038216610feb5760405162461bcd60e51b8152600401808060200182810382526023815260200180611d316023913960400191505060405180910390fd5b610ff68383836115e5565b61103981604051806060016040528060268152602001611df3602691396001600160a01b038616600090815260976020526040902054919063ffffffff6110ca16565b6001600160a01b03808516600090815260976020526040808220939093559084168152205461106e908263ffffffff61133816565b6001600160a01b0380841660008181526097602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156111595760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561111e578181015183820152602001611106565b50505050905090810190601f16801561114b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600054610100900460ff168061117a575061117a611638565b80611188575060005460ff16155b6111c35760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156111ee576000805460ff1961ff0019909116610100171660011790555b6111f661163e565b6111fe61163e565b61120885856116df565b61121061163e565b6112186117b7565b61122061163e565b611228611862565b611241611233610e71565b8460ff16600a0a840261192d565b8015611253576000805461ff00191690555b5050505050565b6000828152606560205260409020611278908263ffffffff611a2b16565b156108aa57611285610e71565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526065602052604090206112e7908263ffffffff611a4016565b156108aa576112f4610e71565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015610ca6576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60fb5460ff166113e0576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b60fb805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611413610e71565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b0382166114755760405162461bcd60e51b8152600401808060200182810382526021815260200180611eed6021913960400191505060405180910390fd5b611481826000836115e5565b6114c481604051806060016040528060228152602001611daf602291396001600160a01b038516600090815260976020526040902054919063ffffffff6110ca16565b6001600160a01b0383166000908152609760205260409020556099546114f0908263ffffffff611a5516565b6099556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60fb5460ff1615611583576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b60fb805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611413610e71565b6000610ca68383611a97565b6000610ca6836001600160a01b038416611afb565b600061078282611b13565b6001600160a01b03821630141561162d5760405162461bcd60e51b8152600401808060200182810382526035815260200180611f4b6035913960400191505060405180910390fd5b610c14838383611b17565b303b1590565b600054610100900460ff16806116575750611657611638565b80611665575060005460ff16155b6116a05760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156116cb576000805460ff1961ff0019909116610100171660011790555b80156109ee576000805461ff001916905550565b600054610100900460ff16806116f857506116f8611638565b80611706575060005460ff16155b6117415760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff1615801561176c576000805460ff1961ff0019909116610100171660011790555b825161177f90609a906020860190611c76565b50815161179390609b906020850190611c76565b50609c805460ff191660121790558015610c14576000805461ff0019169055505050565b600054610100900460ff16806117d057506117d0611638565b806117de575060005460ff16155b6118195760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff16158015611844576000805460ff1961ff0019909116610100171660011790555b60fb805460ff1916905580156109ee576000805461ff001916905550565b600054610100900460ff168061187b575061187b611638565b80611889575060005460ff16155b6118c45760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156118ef576000805460ff1961ff0019909116610100171660011790555b61190160006118fc610e71565b6108a0565b604080516a5041555345525f524f4c4560a81b8152905190819003600b0190206116cb906118fc610e71565b6001600160a01b038216611988576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611994600083836115e5565b6099546119a7908263ffffffff61133816565b6099556001600160a01b0382166000908152609760205260409020546119d3908263ffffffff61133816565b6001600160a01b03831660008181526097602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000610ca6836001600160a01b038416611b66565b6000610ca6836001600160a01b038416611bb0565b6000610ca683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506110ca565b81546000908210611ad95760405162461bcd60e51b8152600401808060200182810382526022815260200180611d0f6022913960400191505060405180910390fd5b826000018281548110611ae857fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b611b22838383610c14565b611b2a610b95565b15610c145760405162461bcd60e51b815260040180806020018281038252602a815260200180612060602a913960400191505060405180910390fd5b6000611b728383611afb565b611ba857508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610782565b506000610782565b60008181526001830160205260408120548015611c6c5783546000198083019190810190600090879083908110611be357fe5b9060005260206000200154905080876000018481548110611c0057fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611c3057fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610782565b6000915050610782565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611cb757805160ff1916838001178555611ce4565b82800160010185558215611ce4579182015b82811115611ce4578251825591602001919060010190611cc9565b50611cf0929150611cf4565b5090565b61076791905b80821115611cf05760008155600101611cfa56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f2061646472657373416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20756e706175736545524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20706175736545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a656445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f2061646472657373436861696e546f6b656e205b7769746864726177546f6b656e735d3a206d75737420686176652061646d696e20726f6c6520746f207769746864726177436861696e546f6b656e3a2063616e2774207472616e7366657220746f20636f6e7472616374206164647265737320697473656c6645524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373436861696e546f6b656e205b7769746864726177546f6b656e735d20536f6d657468696e672077656e742077726f6e67207768696c65207472616e7366657272696e6745524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a2646970667358221220aeaf0f8ecccf5ee64495e272e823402c3edef645a156892a166199a09054143b64736f6c63430006020033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106101c45760003560e01c80635c975abb116100f9578063a217fddf11610097578063ca15c87311610071578063ca15c87314610654578063d547741f14610671578063dd62ed3e1461069d578063e63ab1e9146106cb576101c4565b8063a217fddf146105f4578063a457c2d7146105fc578063a9059cbb14610628576101c4565b80638456cb59116100d35780638456cb59146105795780639010d07c1461058157806391d14854146105c057806395d89b41146105ec576101c4565b80635c975abb1461051f57806370a082311461052757806379cc67901461054d576101c4565b8063313ce567116101665780633f4ba83a116101405780633f4ba83a146104cc57806342966c68146104d457806349df728c146104f157806354fd4d5014610517576101c4565b8063313ce5671461045657806336568abe1461047457806339509351146104a0576101c4565b806323b872dd116101a257806323b872dd146102a0578063248a9ca3146102d6578063253279ad146102f35780632f2ff15d1461042a576101c4565b806306fdde03146101c9578063095ea7b31461024657806318160ddd14610286575b600080fd5b6101d16106d3565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561020b5781810151838201526020016101f3565b50505050905090810190601f1680156102385780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102726004803603604081101561025c57600080fd5b506001600160a01b03813516906020013561076a565b604080519115158252519081900360200190f35b61028e610788565b60408051918252519081900360200190f35b610272600480360360608110156102b657600080fd5b506001600160a01b0381358116916020810135909116906040013561078e565b61028e600480360360208110156102ec57600080fd5b503561081b565b6104286004803603608081101561030957600080fd5b81019060208101813564010000000081111561032457600080fd5b82018360208201111561033657600080fd5b8035906020019184600183028401116401000000008311171561035857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156103ab57600080fd5b8201836020820111156103bd57600080fd5b803590602001918460018302840111640100000000831117156103df57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505060ff8335169350505060200135610830565b005b6104286004803603604081101561044057600080fd5b50803590602001356001600160a01b0316610842565b61045e6108ae565b6040805160ff9092168252519081900360200190f35b6104286004803603604081101561048a57600080fd5b50803590602001356001600160a01b03166108b7565b610272600480360360408110156104b657600080fd5b506001600160a01b038135169060200135610918565b61042861096c565b610428600480360360208110156104ea57600080fd5b50356109dd565b6104286004803603602081101561050757600080fd5b50356001600160a01b03166109f1565b6101d1610b79565b610272610b95565b61028e6004803603602081101561053d57600080fd5b50356001600160a01b0316610b9e565b6104286004803603604081101561056357600080fd5b506001600160a01b038135169060200135610bb9565b610428610c19565b6105a46004803603604081101561059757600080fd5b5080359060200135610c88565b604080516001600160a01b039092168252519081900360200190f35b610272600480360360408110156105d657600080fd5b50803590602001356001600160a01b0316610cad565b6101d1610ccb565b61028e610d2c565b6102726004803603604081101561061257600080fd5b506001600160a01b038135169060200135610d31565b6102726004803603604081101561063e57600080fd5b506001600160a01b038135169060200135610d9f565b61028e6004803603602081101561066a57600080fd5b5035610db3565b6104286004803603604081101561068757600080fd5b50803590602001356001600160a01b0316610dca565b61028e600480360360408110156106b357600080fd5b506001600160a01b0381358116916020013516610e23565b61028e610e4e565b609a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561075f5780601f106107345761010080835404028352916020019161075f565b820191906000526020600020905b81548152906001019060200180831161074257829003601f168201915b505050505090505b90565b600061077e610777610e71565b8484610e75565b5060015b92915050565b60995490565b600061079b848484610f61565b610811846107a7610e71565b61080c85604051806060016040528060288152602001611e73602891396001600160a01b038a166000908152609860205260408120906107e5610e71565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6110ca16565b610e75565b5060019392505050565b60009081526065602052604090206002015490565b61083c84848484611161565b50505050565b60008281526065602052604090206002015461086590610860610e71565b610cad565b6108a05760405162461bcd60e51b815260040180806020018281038252602f815260200180611d54602f913960400191505060405180910390fd5b6108aa828261125a565b5050565b609c5460ff1690565b6108bf610e71565b6001600160a01b0316816001600160a01b03161461090e5760405162461bcd60e51b815260040180806020018281038252602f815260200180612031602f913960400191505060405180910390fd5b6108aa82826112c9565b600061077e610925610e71565b8461080c8560986000610936610e71565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61133816565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902061099890610860610e71565b6109d35760405162461bcd60e51b815260040180806020018281038252602c815260200180611d83602c913960400191505060405180910390fd5b6109db611392565b565b6109ee6109e8610e71565b82611430565b50565b6109fe6000610860610e71565b610a395760405162461bcd60e51b815260040180806020018281038252603d815260200180611f0e603d913960400191505060405180910390fd5b806001600160a01b03811663a9059cbb610a51610e71565b604080516370a0823160e01b815230600482015290516001600160a01b038616916370a08231916024808301926020929190829003018186803b158015610a9757600080fd5b505afa158015610aab573d6000803e3d6000fd5b505050506040513d6020811015610ac157600080fd5b5051604080516001600160e01b031960e086901b1681526001600160a01b03909316600484015260248301919091525160448083019260209291908290030181600087803b158015610b1257600080fd5b505af1158015610b26573d6000803e3d6000fd5b505050506040513d6020811015610b3c57600080fd5b50516108aa5760405162461bcd60e51b8152600401808060200182810382526043815260200180611fc96043913960600191505060405180910390fd5b604080518082019091526002815261763160f01b602082015290565b60fb5460ff1690565b6001600160a01b031660009081526097602052604090205490565b6000610bf682604051806060016040528060248152602001611ec960249139610be986610be4610e71565b610e23565b919063ffffffff6110ca16565b9050610c0a83610c04610e71565b83610e75565b610c148383611430565b505050565b604080516a5041555345525f524f4c4560a81b8152905190819003600b019020610c4590610860610e71565b610c805760405162461bcd60e51b815260040180806020018281038252602a815260200180611e49602a913960400191505060405180910390fd5b6109db611538565b6000828152606560205260408120610ca6908363ffffffff6115b916565b9392505050565b6000828152606560205260408120610ca6908363ffffffff6115c516565b609b8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561075f5780601f106107345761010080835404028352916020019161075f565b600081565b600061077e610d3e610e71565b8461080c8560405180606001604052806025815260200161200c6025913960986000610d68610e71565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6110ca16565b600061077e610dac610e71565b8484610f61565b6000818152606560205260408120610782906115da565b600082815260656020526040902060020154610de890610860610e71565b61090e5760405162461bcd60e51b8152600401808060200182810382526030815260200180611e196030913960400191505060405180910390fd5b6001600160a01b03918216600090815260986020908152604080832093909416825291909152205490565b604080516a5041555345525f524f4c4560a81b8152905190819003600b01902081565b3390565b6001600160a01b038316610eba5760405162461bcd60e51b8152600401808060200182810382526024815260200180611fa56024913960400191505060405180910390fd5b6001600160a01b038216610eff5760405162461bcd60e51b8152600401808060200182810382526022815260200180611dd16022913960400191505060405180910390fd5b6001600160a01b03808416600081815260986020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610fa65760405162461bcd60e51b8152600401808060200182810382526025815260200180611f806025913960400191505060405180910390fd5b6001600160a01b038216610feb5760405162461bcd60e51b8152600401808060200182810382526023815260200180611d316023913960400191505060405180910390fd5b610ff68383836115e5565b61103981604051806060016040528060268152602001611df3602691396001600160a01b038616600090815260976020526040902054919063ffffffff6110ca16565b6001600160a01b03808516600090815260976020526040808220939093559084168152205461106e908263ffffffff61133816565b6001600160a01b0380841660008181526097602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156111595760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561111e578181015183820152602001611106565b50505050905090810190601f16801561114b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600054610100900460ff168061117a575061117a611638565b80611188575060005460ff16155b6111c35760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156111ee576000805460ff1961ff0019909116610100171660011790555b6111f661163e565b6111fe61163e565b61120885856116df565b61121061163e565b6112186117b7565b61122061163e565b611228611862565b611241611233610e71565b8460ff16600a0a840261192d565b8015611253576000805461ff00191690555b5050505050565b6000828152606560205260409020611278908263ffffffff611a2b16565b156108aa57611285610e71565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526065602052604090206112e7908263ffffffff611a4016565b156108aa576112f4610e71565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015610ca6576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60fb5460ff166113e0576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b60fb805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611413610e71565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b0382166114755760405162461bcd60e51b8152600401808060200182810382526021815260200180611eed6021913960400191505060405180910390fd5b611481826000836115e5565b6114c481604051806060016040528060228152602001611daf602291396001600160a01b038516600090815260976020526040902054919063ffffffff6110ca16565b6001600160a01b0383166000908152609760205260409020556099546114f0908263ffffffff611a5516565b6099556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60fb5460ff1615611583576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b60fb805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611413610e71565b6000610ca68383611a97565b6000610ca6836001600160a01b038416611afb565b600061078282611b13565b6001600160a01b03821630141561162d5760405162461bcd60e51b8152600401808060200182810382526035815260200180611f4b6035913960400191505060405180910390fd5b610c14838383611b17565b303b1590565b600054610100900460ff16806116575750611657611638565b80611665575060005460ff16155b6116a05760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156116cb576000805460ff1961ff0019909116610100171660011790555b80156109ee576000805461ff001916905550565b600054610100900460ff16806116f857506116f8611638565b80611706575060005460ff16155b6117415760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff1615801561176c576000805460ff1961ff0019909116610100171660011790555b825161177f90609a906020860190611c76565b50815161179390609b906020850190611c76565b50609c805460ff191660121790558015610c14576000805461ff0019169055505050565b600054610100900460ff16806117d057506117d0611638565b806117de575060005460ff16155b6118195760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff16158015611844576000805460ff1961ff0019909116610100171660011790555b60fb805460ff1916905580156109ee576000805461ff001916905550565b600054610100900460ff168061187b575061187b611638565b80611889575060005460ff16155b6118c45760405162461bcd60e51b815260040180806020018281038252602e815260200180611e9b602e913960400191505060405180910390fd5b600054610100900460ff161580156118ef576000805460ff1961ff0019909116610100171660011790555b61190160006118fc610e71565b6108a0565b604080516a5041555345525f524f4c4560a81b8152905190819003600b0190206116cb906118fc610e71565b6001600160a01b038216611988576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611994600083836115e5565b6099546119a7908263ffffffff61133816565b6099556001600160a01b0382166000908152609760205260409020546119d3908263ffffffff61133816565b6001600160a01b03831660008181526097602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000610ca6836001600160a01b038416611b66565b6000610ca6836001600160a01b038416611bb0565b6000610ca683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506110ca565b81546000908210611ad95760405162461bcd60e51b8152600401808060200182810382526022815260200180611d0f6022913960400191505060405180910390fd5b826000018281548110611ae857fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b611b22838383610c14565b611b2a610b95565b15610c145760405162461bcd60e51b815260040180806020018281038252602a815260200180612060602a913960400191505060405180910390fd5b6000611b728383611afb565b611ba857508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610782565b506000610782565b60008181526001830160205260408120548015611c6c5783546000198083019190810190600090879083908110611be357fe5b9060005260206000200154905080876000018481548110611c0057fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611c3057fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610782565b6000915050610782565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611cb757805160ff1916838001178555611ce4565b82800160010185558215611ce4579182015b82811115611ce4578251825591602001919060010190611cc9565b50611cf0929150611cf4565b5090565b61076791905b80821115611cf05760008155600101611cfa56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f2061646472657373416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20756e706175736545524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20706175736545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a656445524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f2061646472657373436861696e546f6b656e205b7769746864726177546f6b656e735d3a206d75737420686176652061646d696e20726f6c6520746f207769746864726177436861696e546f6b656e3a2063616e2774207472616e7366657220746f20636f6e7472616374206164647265737320697473656c6645524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373436861696e546f6b656e205b7769746864726177546f6b656e735d20536f6d657468696e672077656e742077726f6e67207768696c65207472616e7366657272696e6745524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a2646970667358221220aeaf0f8ecccf5ee64495e272e823402c3edef645a156892a166199a09054143b64736f6c63430006020033',
  sourceMap:
    '800:2698:3:-:0;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:2698:3;;;;;;;',
  deployedSourceMap:
    '800:2698:3:-:0;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;800:2698:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2469:81:9;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2469:81:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4505:166;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;4505:166:9;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;3512:98;;;:::i;:::-;;;;;;;;;;;;;;;;5131:317;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;5131:317:9;;;;;;;;;;;;;;;;;:::i;3920:112:6:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3920:112:6;;:::i;1173:177:3:-;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;1173:177:3;;;;;;;;21:11:-1;5:28;;2:2;;;46:1;43;36:12;2:2;1173:177:3;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1173:177:3;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1173:177:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;1173:177:3;;;;;;;;-1:-1:-1;1173:177:3;;-1:-1:-1;;21:11;5:28;;2:2;;;46:1;43;36:12;2:2;1173:177:3;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1173:177:3;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1173:177:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;81:16;;74:27;;;;-1:-1;1173:177:3;;-1:-1:-1;;1173:177:3;;;;;-1:-1:-1;;;1173:177:3;;;;:::i;:::-;;4282:223:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;4282:223:6;;;;;;-1:-1:-1;;;;;4282:223:6;;:::i;3371:81:9:-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;5456:205:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;5456:205:6;;;;;;-1:-1:-1;;;;;5456:205:6;;:::i;5843:215:9:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;5843:215:9;;;;;;;;:::i;2576:154:3:-;;;:::i;752:89:10:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;752:89:10;;:::i;3032:375:3:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3032:375:3;-1:-1:-1;;;;;3032:375:3;;:::i;3413:83::-;;;:::i;1248:76:16:-;;;:::i;3668:117:9:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3668:117:9;-1:-1:-1;;;;;3668:117:9;;:::i;1147:290:10:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1147:290:10;;;;;;;;:::i;2221:148:3:-;;;:::i;3603:136:6:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3603:136:6;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;3603:136:6;;;;;;;;;;;;;;2588:137;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2588:137:6;;;;;;-1:-1:-1;;;;;2588:137:6;;:::i;2663:85:9:-;;;:::i;1778:49:6:-;;;:::i;6545:266:9:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;6545:266:9;;;;;;;;:::i;3988:172::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;3988:172:9;;;;;;;;:::i;2893:125:6:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2893:125:6;;:::i;4739:226::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;4739:226:6;;;;;;-1:-1:-1;;;;;4739:226:6;;:::i;4218:149:9:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;4218:149:9;;;;;;;;;;:::i;941:62:3:-;;;:::i;2469:81:9:-;2538:5;2531:12;;;;;;;;-1:-1:-1;;2531:12:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2506:13;;2531:12;;2538:5;;2531:12;;2538:5;2531:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2469:81;;:::o;4505:166::-;4588:4;4604:39;4613:12;:10;:12::i;:::-;4627:7;4636:6;4604:8;:39::i;:::-;-1:-1:-1;4660:4:9;4505:166;;;;;:::o;3512:98::-;3591:12;;3512:98;:::o;5131:317::-;5237:4;5253:36;5263:6;5271:9;5282:6;5253:9;:36::i;:::-;5299:121;5308:6;5316:12;:10;:12::i;:::-;5330:89;5368:6;5330:89;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5330:19:9;;;;;;:11;:19;;;;;;5350:12;:10;:12::i;:::-;-1:-1:-1;;;;;5330:33:9;;;;;;;;;;;;-1:-1:-1;5330:33:9;;;:89;;:37;:89;:::i;:::-;5299:8;:121::i;:::-;-1:-1:-1;5437:4:9;5131:317;;;;;:::o;3920:112:6:-;3977:7;4003:12;;;:6;:12;;;;;:22;;;;3920:112::o;1173:177:3:-;1289:54;1307:4;1313:6;1321:8;1331:11;1289:17;:54::i;:::-;1173:177;;;;:::o;4282:223:6:-;4373:12;;;;:6;:12;;;;;:22;;;4365:45;;4397:12;:10;:12::i;:::-;4365:7;:45::i;:::-;4357:105;;;;-1:-1:-1;;;4357:105:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4473:25;4484:4;4490:7;4473:10;:25::i;:::-;4282:223;;:::o;3371:81:9:-;3436:9;;;;3371:81;:::o;5456:205:6:-;5553:12;:10;:12::i;:::-;-1:-1:-1;;;;;5542:23:6;:7;-1:-1:-1;;;;;5542:23:6;;5534:83;;;;-1:-1:-1;;;5534:83:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5628:26;5640:4;5646:7;5628:11;:26::i;5843:215:9:-;5931:4;5947:83;5956:12;:10;:12::i;:::-;5970:7;5979:50;6018:10;5979:11;:25;5991:12;:10;:12::i;:::-;-1:-1:-1;;;;;5979:25:9;;;;;;;;;;;;;;;;;-1:-1:-1;5979:25:9;;;:34;;;;;;;;;;;:50;:38;:50;:::i;2576:154:3:-;979:24;;;-1:-1:-1;;;979:24:3;;;;;;;;;;;;2620:34;;2641:12;:10;:12::i;2620:34::-;2612:91;;;;-1:-1:-1;;;2612:91:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2713:10;:8;:10::i;:::-;2576:154::o;752:89:10:-;807:27;813:12;:10;:12::i;:::-;827:6;807:5;:27::i;:::-;752:89;:::o;3032:375:3:-;3106:41;1823:4:6;3134:12:3;:10;:12::i;3106:41::-;3098:115;;;;-1:-1:-1;;;3098:115:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3242:13;-1:-1:-1;;;;;3274:11:3;;;3286:12;:10;:12::i;:::-;3300:27;;;-1:-1:-1;;;3300:27:3;;3321:4;3300:27;;;;;;-1:-1:-1;;;;;3300:12:3;;;;;:27;;;;;;;;;;;;;;:12;:27;;;5:2:-1;;;;30:1;27;20:12;5:2;3300:27:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3300:27:3;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3300:27:3;3274:54;;;-1:-1:-1;;;;;;3274:54:3;;;;;;;-1:-1:-1;;;;;3274:54:3;;;;;;;;;;;;;;;;;;;;3300:27;;3274:54;;;;;;;-1:-1:-1;3274:54:3;;;;5:2:-1;;;;30:1;27;20:12;5:2;3274:54:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3274:54:3;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3274:54:3;3266:134;;;;-1:-1:-1;;;3266:134:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3413:83;3478:11;;;;;;;;;;;;-1:-1:-1;;;3478:11:3;;;;3413:83;:::o;1248:76:16:-;1310:7;;;;1248:76;:::o;3668:117:9:-;-1:-1:-1;;;;;3760:18:9;3734:7;3760:18;;;:9;:18;;;;;;;3668:117::o;1147:290:10:-;1223:26;1252:84;1289:6;1252:84;;;;;;;;;;;;;;;;;:32;1262:7;1271:12;:10;:12::i;:::-;1252:9;:32::i;:::-;:36;:84;;:36;:84;:::i;:::-;1223:113;;1347:51;1356:7;1365:12;:10;:12::i;:::-;1379:18;1347:8;:51::i;:::-;1408:22;1414:7;1423:6;1408:5;:22::i;:::-;1147:290;;;:::o;2221:148:3:-;979:24;;;-1:-1:-1;;;979:24:3;;;;;;;;;;;;2263:34;;2284:12;:10;:12::i;2263:34::-;2255:89;;;;-1:-1:-1;;;2255:89:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2354:8;:6;:8::i;3603:136:6:-;3676:7;3702:12;;;:6;:12;;;;;:30;;3726:5;3702:30;:23;:30;:::i;:::-;3695:37;3603:136;-1:-1:-1;;;3603:136:6:o;2588:137::-;2657:4;2680:12;;;:6;:12;;;;;:38;;2710:7;2680:38;:29;:38;:::i;2663:85:9:-;2734:7;2727:14;;;;;;;;-1:-1:-1;;2727:14:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2702:13;;2727:14;;2734:7;;2727:14;;2734:7;2727:14;;;;;;;;;;;;;;;;;;;;;;;;1778:49:6;1823:4;1778:49;:::o;6545:266:9:-;6638:4;6654:129;6663:12;:10;:12::i;:::-;6677:7;6686:96;6725:15;6686:96;;;;;;;;;;;;;;;;;:11;:25;6698:12;:10;:12::i;:::-;-1:-1:-1;;;;;6686:25:9;;;;;;;;;;;;;;;;;-1:-1:-1;6686:25:9;;;:34;;;;;;;;;;;:96;;:38;:96;:::i;3988:172::-;4074:4;4090:42;4100:12;:10;:12::i;:::-;4114:9;4125:6;4090:9;:42::i;2893:125:6:-;2956:7;2982:12;;;:6;:12;;;;;:29;;:27;:29::i;4739:226::-;4831:12;;;;:6;:12;;;;;:22;;;4823:45;;4855:12;:10;:12::i;4823:45::-;4815:106;;;;-1:-1:-1;;;4815:106:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4218:149:9;-1:-1:-1;;;;;4333:18:9;;;4307:7;4333:18;;;:11;:18;;;;;;;;:27;;;;;;;;;;;;;4218:149::o;941:62:3:-;979:24;;;-1:-1:-1;;;979:24:3;;;;;;;;;;;;941:62;:::o;931:104:4:-;1018:10;931:104;:::o;9609:340:9:-;-1:-1:-1;;;;;9710:19:9;;9702:68;;;;-1:-1:-1;;;9702:68:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;9788:21:9;;9780:68;;;;-1:-1:-1;;;9780:68:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;9859:18:9;;;;;;;:11;:18;;;;;;;;:27;;;;;;;;;;;;;:36;;;9910:32;;;;;;;;;;;;;;;;;9609:340;;;:::o;7285:530::-;-1:-1:-1;;;;;7390:20:9;;7382:70;;;;-1:-1:-1;;;7382:70:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;7470:23:9;;7462:71;;;;-1:-1:-1;;;7462:71:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7544:47;7565:6;7573:9;7584:6;7544:20;:47::i;:::-;7622:71;7644:6;7622:71;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;7622:17:9;;;;;;:9;:17;;;;;;;:71;;:21;:71;:::i;:::-;-1:-1:-1;;;;;7602:17:9;;;;;;;:9;:17;;;;;;:91;;;;7726:20;;;;;;;:32;;7751:6;7726:32;:24;:32;:::i;:::-;-1:-1:-1;;;;;7703:20:9;;;;;;;:9;:20;;;;;;;;;:55;;;;7773:35;;;;;;;7703:20;;7773:35;;;;;;;;;;;;;7285:530;;;:::o;1692:187:8:-;1778:7;1813:12;1805:6;;;;1797:29;;;;-1:-1:-1;;;1797:29:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1797:29:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;1848:5:8;;;1692:187::o;1356:488:3:-;1024:12:5;;;;;;;;:31;;;1040:15;:13;:15::i;:::-;1024:47;;;-1:-1:-1;1060:11:5;;;;1059:12;1024:47;1016:106;;;;-1:-1:-1;;;1016:106:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1129:19;1152:12;;;;;;1151:13;1170:80;;;;1198:12;:19;;-1:-1:-1;;;;1198:19:5;;;;;1225:18;1213:4;1225:18;;;1170:80;1493:26:3::1;:24;:26::i;:::-;1529:32;:30;:32::i;:::-;1571:36;1594:4;1600:6;1571:22;:36::i;:::-;1617:32;:30;:32::i;:::-;1659:27;:25;:27::i;:::-;1696:32;:30;:32::i;:::-;1738:29;:27;:29::i;:::-;1777:60;1783:12;:10;:12::i;:::-;1826:8;1818:17;;1812:2;:23;1797:11;:39;1777:5;:60::i;:::-;1268:14:5::0;1264:55;;;1307:5;1292:20;;-1:-1:-1;;1292:20:5;;;1264:55;1356:488:3;;;;;:::o;6543:184:6:-;6616:12;;;;:6;:12;;;;;:33;;6641:7;6616:33;:24;:33;:::i;:::-;6612:109;;;6697:12;:10;:12::i;:::-;-1:-1:-1;;;;;6670:40:6;6688:7;-1:-1:-1;;;;;6670:40:6;6682:4;6670:40;;;;;;;;;;6543:184;;:::o;6733:188::-;6807:12;;;;:6;:12;;;;;:36;;6835:7;6807:36;:27;:36;:::i;:::-;6803:112;;;6891:12;:10;:12::i;:::-;-1:-1:-1;;;;;6864:40:6;6882:7;-1:-1:-1;;;;;6864:40:6;6876:4;6864:40;;;;;;;;;;6733:188;;:::o;834:176:8:-;892:7;923:5;;;946:6;;;;938:46;;;;;-1:-1:-1;;;938:46:8;;;;;;;;;;;;;;;;;;;;;;;;;;;1950:117:16;1668:7;;;;1660:40;;;;;-1:-1:-1;;;1660:40:16;;;;;;;;;;;;-1:-1:-1;;;1660:40:16;;;;;;;;;;;;;;;2008:7:::1;:15:::0;;-1:-1:-1;;2008:15:16::1;::::0;;2038:22:::1;2047:12;:10;:12::i;:::-;2038:22;::::0;;-1:-1:-1;;;;;2038:22:16;;::::1;::::0;;;;;;;::::1;::::0;;::::1;1950:117::o:0;8774:410:9:-;-1:-1:-1;;;;;8857:21:9;;8849:67;;;;-1:-1:-1;;;8849:67:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8927:49;8948:7;8965:1;8969:6;8927:20;:49::i;:::-;9008:68;9031:6;9008:68;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;9008:18:9;;;;;;:9;:18;;;;;;;:68;;:22;:68;:::i;:::-;-1:-1:-1;;;;;8987:18:9;;;;;;:9;:18;;;;;:89;9101:12;;:24;;9118:6;9101:24;:16;:24;:::i;:::-;9086:12;:39;9140:37;;;;;;;;9166:1;;-1:-1:-1;;;;;9140:37:9;;;;;;;;;;;;8774:410;;:::o;1776:115:16:-;1477:7;;;;1476:8;1468:37;;;;;-1:-1:-1;;;1468:37:16;;;;;;;;;;;;-1:-1:-1;;;1468:37:16;;;;;;;;;;;;;;;1835:7:::1;:14:::0;;-1:-1:-1;;1835:14:16::1;1845:4;1835:14;::::0;;1864:20:::1;1871:12;:10;:12::i;6052:147:15:-:0;6126:7;6168:22;6172:3;6184:5;6168:3;:22::i;5368:156::-;5448:4;5471:46;5481:3;-1:-1:-1;;;;;5501:14:15;;5471:9;:46::i;5605:115::-;5668:7;5694:19;5702:3;5694:7;:19::i;2736:290:3:-;-1:-1:-1;;;;;2888:19:3;;2902:4;2888:19;;2880:85;;;;-1:-1:-1;;;2880:85:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2975:44;3002:4;3008:2;3012:6;2975:26;:44::i;1409:498:5:-;1820:4;1864:17;1895:7;1409:498;:::o;858:66:4:-;1024:12:5;;;;;;;;:31;;;1040:15;:13;:15::i;:::-;1024:47;;;-1:-1:-1;1060:11:5;;;;1059:12;1024:47;1016:106;;;;-1:-1:-1;;;1016:106:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1129:19;1152:12;;;;;;1151:13;1170:80;;;;1198:12;:19;;-1:-1:-1;;;;1198:19:5;;;;;1225:18;1213:4;1225:18;;;1170:80;1268:14;1264:55;;;1307:5;1292:20;;-1:-1:-1;;1292:20:5;;;858:66:4;:::o;2226:177:9:-;1024:12:5;;;;;;;;:31;;;1040:15;:13;:15::i;:::-;1024:47;;;-1:-1:-1;1060:11:5;;;;1059:12;1024:47;1016:106;;;;-1:-1:-1;;;1016:106:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1129:19;1152:12;;;;;;1151:13;1170:80;;;;1198:12;:19;;-1:-1:-1;;;;1198:19:5;;;;;1225:18;1213:4;1225:18;;;1170:80;2333:12:9;;::::1;::::0;:5:::1;::::0;:12:::1;::::0;::::1;::::0;::::1;:::i;:::-;-1:-1:-1::0;2355:16:9;;::::1;::::0;:7:::1;::::0;:16:::1;::::0;::::1;::::0;::::1;:::i;:::-;-1:-1:-1::0;2381:9:9::1;:14:::0;;-1:-1:-1;;2381:14:9::1;2393:2;2381:14;::::0;;1264:55:5;;;;1307:5;1292:20;;-1:-1:-1;;1292:20:5;;;2226:177:9;;;:::o;1059:93:16:-;1024:12:5;;;;;;;;:31;;;1040:15;:13;:15::i;:::-;1024:47;;;-1:-1:-1;1060:11:5;;;;1059:12;1024:47;1016:106;;;;-1:-1:-1;;;1016:106:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1129:19;1152:12;;;;;;1151:13;1170:80;;;;1198:12;:19;;-1:-1:-1;;;;1198:19:5;;;;;1225:18;1213:4;1225:18;;;1170:80;1129:7:16::1;:15:::0;;-1:-1:-1;;1129:15:16::1;::::0;;1264:55:5;;;;1307:5;1292:20;;-1:-1:-1;;1292:20:5;;;1059:93:16;:::o;1850:168:3:-;1024:12:5;;;;;;;;:31;;;1040:15;:13;:15::i;:::-;1024:47;;;-1:-1:-1;1060:11:5;;;;1059:12;1024:47;1016:106;;;;-1:-1:-1;;;1016:106:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1129:19;1152:12;;;;;;1151:13;1170:80;;;;1198:12;:19;;-1:-1:-1;;;;1198:19:5;;;;;1225:18;1213:4;1225:18;;;1170:80;1920:44:3::1;1823:4:6;1951:12:3;:10;:12::i;:::-;1920:10;:44::i;:::-;979:24;::::0;;-1:-1:-1;;;979:24:3;;;;;;;;::::1;::::0;;;1974:37:::1;::::0;1998:12:::1;:10;:12::i;8085:370:9:-:0;-1:-1:-1;;;;;8168:21:9;;8160:65;;;;;-1:-1:-1;;;8160:65:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;8236:49;8265:1;8269:7;8278:6;8236:20;:49::i;:::-;8311:12;;:24;;8328:6;8311:24;:16;:24;:::i;:::-;8296:12;:39;-1:-1:-1;;;;;8366:18:9;;;;;;:9;:18;;;;;;:30;;8389:6;8366:30;:22;:30;:::i;:::-;-1:-1:-1;;;;;8345:18:9;;;;;;:9;:18;;;;;;;;:51;;;;8411:37;;;;;;;8345:18;;;;8411:37;;;;;;;;;;8085:370;;:::o;4831:141:15:-;4901:4;4924:41;4929:3;-1:-1:-1;;;;;4949:14:15;;4924:4;:41::i;5140:147::-;5213:4;5236:44;5244:3;-1:-1:-1;;;;;5264:14:15;;5236:7;:44::i;1274:134:8:-;1332:7;1358:43;1362:1;1365;1358:43;;;;;;;;;;;;;;;;;:3;:43::i;4390:201:15:-;4484:18;;4457:7;;4484:26;-1:-1:-1;4476:73:15;;;;-1:-1:-1;;;4476:73:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4566:3;:11;;4578:5;4566:18;;;;;;;;;;;;;;;;4559:25;;4390:201;;;;:::o;3743:127::-;3816:4;3839:19;;;:12;;;;;:19;;;;;;:24;;;3743:127::o;3951:107::-;4033:18;;3951:107::o;890:234:11:-;998:44;1025:4;1031:2;1035:6;998:26;:44::i;:::-;1062:8;:6;:8::i;:::-;1061:9;1053:64;;;;-1:-1:-1;;;1053:64:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1578:404:15;1641:4;1662:21;1672:3;1677:5;1662:9;:21::i;:::-;1657:319;;-1:-1:-1;27:10;;39:1;23:18;;;45:23;;1699:11:15;:23;;;;;;;;;;;;;1879:18;;1857:19;;;:12;;;:19;;;;;;:40;;;;1911:11;;1657:319;-1:-1:-1;1960:5:15;1953:12;;2150:1512;2216:4;2353:19;;;:12;;;:19;;;;;;2387:15;;2383:1273;;2816:18;;-1:-1:-1;;2768:14:15;;;;2816:22;;;;2744:21;;2816:3;;:22;;3098;;;;;;;;;;;;;;3078:42;;3241:9;3212:3;:11;;3224:13;3212:26;;;;;;;;;;;;;;;;;;;:38;;;;3316:23;;;3358:1;3316:12;;;:23;;;;;;3342:17;;;3316:43;;3465:17;;3316:3;;3465:17;;;;;;;;;;;;;;;;;;;;;;3557:3;:12;;:19;3570:5;3557:19;;;;;;;;;;;3550:26;;;3598:4;3591:11;;;;;;;;2383:1273;3640:5;3633:12;;;;;800:2698:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;800:2698:3;;;-1:-1:-1;800:2698:3;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;',
  source:
    'pragma solidity ^0.6.0;\n\nimport "@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol";\nimport "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol";\nimport "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";\n\n/**\n * @dev {ERC20} token, including:\n *\n *  - ability for holders to burn (destroy) their tokens\n *  - a pauser role that allows to stop all token transfers\n *\n * This contract uses {AccessControl} to lock permissioned functions using the\n * different roles - head to its documentation for details.\n *\n * The account that deploys the contract will be granted the minter and pauser\n * roles, as well as the default admin role, which will let it grant both minter\n * and pauser roles to aother accounts\n */\ncontract ChainToken is Initializable, ContextUpgradeSafe, AccessControlUpgradeSafe, ERC20BurnableUpgradeSafe, ERC20PausableUpgradeSafe {\n    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");\n\n    /**\n     * @dev Grants `DEFAULT_ADMIN_ROLE` and `PAUSER_ROLE` to the\n     * account that deploys the contract.\n     *\n     * See {ERC20-constructor}.\n     */\n\n    function initialize(string memory name, string memory symbol, uint8 decimals, uint256 totalSupply) public {\n        __ChainToken_init(name, symbol, decimals, totalSupply);\n    }\n\n    function __ChainToken_init(string memory name, string memory symbol, uint8 decimals, uint256 totalSupply) internal initializer {\n        __Context_init_unchained();\n        __AccessControl_init_unchained();\n        __ERC20_init_unchained(name, symbol);\n        __ERC20Burnable_init_unchained();\n        __Pausable_init_unchained();\n        __ERC20Pausable_init_unchained();\n        __ChainToken_init_unchained();\n        _mint(_msgSender(), totalSupply * (10 ** uint256(decimals)));\n    }\n\n    function __ChainToken_init_unchained() internal initializer {\n        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());\n        _setupRole(PAUSER_ROLE, _msgSender());\n    }\n\n    /**\n     * @dev Pauses all token transfers.\n     *\n     * See {ERC20Pausable} and {Pausable-_pause}.\n     *\n     * Requirements:\n     *\n     * - the caller must have the `PAUSER_ROLE`.\n     */\n    function pause() public {\n        require(hasRole(PAUSER_ROLE, _msgSender()), "ChainToken: must have pauser role to pause");\n        _pause();\n    }\n\n    /**\n     * @dev Unpauses all token transfers.\n     *\n     * See {ERC20Pausable} and {Pausable-_unpause}.\n     *\n     * Requirements:\n     *\n     * - the caller must have the `PAUSER_ROLE`.\n     */\n    function unpause() public {\n        require(hasRole(PAUSER_ROLE, _msgSender()), "ChainToken: must have pauser role to unpause");\n        _unpause();\n    }\n\n    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC20UpgradeSafe, ERC20PausableUpgradeSafe) {\n        require(to != address(this), "ChainToken: can\'t transfer to contract address itself");\n        super._beforeTokenTransfer(from, to, amount);\n    }\n\n    function withdrawTokens(address tokenContract) external {\n        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ChainToken [withdrawTokens]: must have admin role to withdraw");\n        IERC20 tc = IERC20(tokenContract);\n        require(tc.transfer(_msgSender(), tc.balanceOf(address(this))), "ChainToken [withdrawTokens] Something went wrong while transferring");\n    }\n\n    function version() public pure returns (string memory) {\n        return "v1";\n    }\n}\n',
  sourcePath:
    '/home/sandip/projects/ChainGames/chaintokencontracts/contracts/ChainToken.sol',
  ast: {
    absolutePath:
      '/home/sandip/projects/ChainGames/chaintokencontracts/contracts/ChainToken.sol',
    exportedSymbols: {
      ChainToken: [2311]
    },
    id: 2312,
    nodeType: 'SourceUnit',
    nodes: [
      {
        id: 2096,
        literals: ['solidity', '^', '0.6', '.0'],
        nodeType: 'PragmaDirective',
        src: '0:23:3'
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol',
        id: 2097,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 2705,
        src: '25:85:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol',
        id: 2098,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 3617,
        src: '111:90:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol',
        id: 2099,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 3554,
        src: '202:90:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        abstract: false,
        baseContracts: [
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2100,
              name: 'Initializable',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2426,
              src: '823:13:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_Initializable_$2426',
                typeString: 'contract Initializable'
              }
            },
            id: 2101,
            nodeType: 'InheritanceSpecifier',
            src: '823:13:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2102,
              name: 'ContextUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2356,
              src: '838:18:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ContextUpgradeSafe_$2356',
                typeString: 'contract ContextUpgradeSafe'
              }
            },
            id: 2103,
            nodeType: 'InheritanceSpecifier',
            src: '838:18:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2104,
              name: 'AccessControlUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2704,
              src: '858:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_AccessControlUpgradeSafe_$2704',
                typeString: 'contract AccessControlUpgradeSafe'
              }
            },
            id: 2105,
            nodeType: 'InheritanceSpecifier',
            src: '858:24:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2106,
              name: 'ERC20BurnableUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 3553,
              src: '884:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ERC20BurnableUpgradeSafe_$3553',
                typeString: 'contract ERC20BurnableUpgradeSafe'
              }
            },
            id: 2107,
            nodeType: 'InheritanceSpecifier',
            src: '884:24:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2108,
              name: 'ERC20PausableUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 3616,
              src: '910:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ERC20PausableUpgradeSafe_$3616',
                typeString: 'contract ERC20PausableUpgradeSafe'
              }
            },
            id: 2109,
            nodeType: 'InheritanceSpecifier',
            src: '910:24:3'
          }
        ],
        contractDependencies: [2356, 2426, 2704, 3475, 3553, 3616, 3685, 4310],
        contractKind: 'contract',
        documentation:
          '@dev {ERC20} token, including:\n *  - ability for holders to burn (destroy) their tokens\n - a pauser role that allows to stop all token transfers\n * This contract uses {AccessControl} to lock permissioned functions using the\ndifferent roles - head to its documentation for details.\n * The account that deploys the contract will be granted the minter and pauser\nroles, as well as the default admin role, which will let it grant both minter\nand pauser roles to aother accounts',
        fullyImplemented: true,
        id: 2311,
        linearizedBaseContracts: [
          2311, 3616, 4310, 3553, 3475, 3685, 2704, 2356, 2426
        ],
        name: 'ChainToken',
        nodeType: 'ContractDefinition',
        nodes: [
          {
            constant: true,
            functionSelector: 'e63ab1e9',
            id: 2114,
            name: 'PAUSER_ROLE',
            nodeType: 'VariableDeclaration',
            overrides: null,
            scope: 2311,
            src: '941:62:3',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_bytes32',
              typeString: 'bytes32'
            },
            typeName: {
              id: 2110,
              name: 'bytes32',
              nodeType: 'ElementaryTypeName',
              src: '941:7:3',
              typeDescriptions: {
                typeIdentifier: 't_bytes32',
                typeString: 'bytes32'
              }
            },
            value: {
              argumentTypes: null,
              arguments: [
                {
                  argumentTypes: null,
                  hexValue: '5041555345525f524f4c45',
                  id: 2112,
                  isConstant: false,
                  isLValue: false,
                  isPure: true,
                  kind: 'string',
                  lValueRequested: false,
                  nodeType: 'Literal',
                  src: '989:13:3',
                  subdenomination: null,
                  typeDescriptions: {
                    typeIdentifier:
                      't_stringliteral_65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a',
                    typeString: 'literal_string "PAUSER_ROLE"'
                  },
                  value: 'PAUSER_ROLE'
                }
              ],
              expression: {
                argumentTypes: [
                  {
                    typeIdentifier:
                      't_stringliteral_65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a',
                    typeString: 'literal_string "PAUSER_ROLE"'
                  }
                ],
                id: 2111,
                name: 'keccak256',
                nodeType: 'Identifier',
                overloadedDeclarations: [],
                referencedDeclaration: -8,
                src: '979:9:3',
                typeDescriptions: {
                  typeIdentifier:
                    't_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$',
                  typeString: 'function (bytes memory) pure returns (bytes32)'
                }
              },
              id: 2113,
              isConstant: false,
              isLValue: false,
              isPure: true,
              kind: 'functionCall',
              lValueRequested: false,
              names: [],
              nodeType: 'FunctionCall',
              src: '979:24:3',
              tryCall: false,
              typeDescriptions: {
                typeIdentifier: 't_bytes32',
                typeString: 'bytes32'
              }
            },
            visibility: 'public'
          },
          {
            body: {
              id: 2132,
              nodeType: 'Block',
              src: '1279:71:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2126,
                        name: 'name',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2116,
                        src: '1307:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2127,
                        name: 'symbol',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2118,
                        src: '1313:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2128,
                        name: 'decimals',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2120,
                        src: '1321:8:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint8',
                          typeString: 'uint8'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2129,
                        name: 'totalSupply',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2122,
                        src: '1331:11:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_uint8',
                          typeString: 'uint8'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      id: 2125,
                      name: '__ChainToken_init',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2184,
                      src: '1289:17:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_string_memory_ptr_$_t_string_memory_ptr_$_t_uint8_$_t_uint256_$returns$__$',
                        typeString:
                          'function (string memory,string memory,uint8,uint256)'
                      }
                    },
                    id: 2130,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1289:54:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2131,
                  nodeType: 'ExpressionStatement',
                  src: '1289:54:3'
                }
              ]
            },
            documentation:
              '@dev Grants `DEFAULT_ADMIN_ROLE` and `PAUSER_ROLE` to the\naccount that deploys the contract.\n     * See {ERC20-constructor}.',
            functionSelector: '253279ad',
            id: 2133,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'initialize',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2123,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2116,
                  name: 'name',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1193:18:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2115,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1193:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2118,
                  name: 'symbol',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1213:20:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2117,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1213:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2120,
                  name: 'decimals',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1235:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint8',
                    typeString: 'uint8'
                  },
                  typeName: {
                    id: 2119,
                    name: 'uint8',
                    nodeType: 'ElementaryTypeName',
                    src: '1235:5:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint8',
                      typeString: 'uint8'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2122,
                  name: 'totalSupply',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1251:19:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2121,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1251:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '1192:79:3'
            },
            returnParameters: {
              id: 2124,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1279:0:3'
            },
            scope: 2311,
            src: '1173:177:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            body: {
              id: 2183,
              nodeType: 'Block',
              src: '1483:361:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2146,
                      name: '__Context_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2331,
                      src: '1493:24:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2147,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1493:26:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2148,
                  nodeType: 'ExpressionStatement',
                  src: '1493:26:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2149,
                      name: '__AccessControl_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2454,
                      src: '1529:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2150,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1529:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2151,
                  nodeType: 'ExpressionStatement',
                  src: '1529:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2153,
                        name: 'name',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2135,
                        src: '1594:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2154,
                        name: 'symbol',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2137,
                        src: '1600:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      ],
                      id: 2152,
                      name: '__ERC20_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3037,
                      src: '1571:22:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (string memory,string memory)'
                      }
                    },
                    id: 2155,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1571:36:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2156,
                  nodeType: 'ExpressionStatement',
                  src: '1571:36:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2157,
                      name: '__ERC20Burnable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3504,
                      src: '1617:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2158,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1617:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2159,
                  nodeType: 'ExpressionStatement',
                  src: '1617:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2160,
                      name: '__Pausable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4248,
                      src: '1659:25:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2161,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1659:27:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2162,
                  nodeType: 'ExpressionStatement',
                  src: '1659:27:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2163,
                      name: '__ERC20Pausable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3585,
                      src: '1696:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2164,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1696:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2165,
                  nodeType: 'ExpressionStatement',
                  src: '1696:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2166,
                      name: '__ChainToken_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2202,
                      src: '1738:27:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2167,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1738:29:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2168,
                  nodeType: 'ExpressionStatement',
                  src: '1738:29:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2170,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1783:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2171,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1783:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      },
                      {
                        argumentTypes: null,
                        commonType: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        },
                        id: 2180,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          argumentTypes: null,
                          id: 2172,
                          name: 'totalSupply',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2141,
                          src: '1797:11:3',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256'
                          }
                        },
                        nodeType: 'BinaryOperation',
                        operator: '*',
                        rightExpression: {
                          argumentTypes: null,
                          components: [
                            {
                              argumentTypes: null,
                              commonType: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256'
                              },
                              id: 2178,
                              isConstant: false,
                              isLValue: false,
                              isPure: false,
                              lValueRequested: false,
                              leftExpression: {
                                argumentTypes: null,
                                hexValue: '3130',
                                id: 2173,
                                isConstant: false,
                                isLValue: false,
                                isPure: true,
                                kind: 'number',
                                lValueRequested: false,
                                nodeType: 'Literal',
                                src: '1812:2:3',
                                subdenomination: null,
                                typeDescriptions: {
                                  typeIdentifier: 't_rational_10_by_1',
                                  typeString: 'int_const 10'
                                },
                                value: '10'
                              },
                              nodeType: 'BinaryOperation',
                              operator: '**',
                              rightExpression: {
                                argumentTypes: null,
                                arguments: [
                                  {
                                    argumentTypes: null,
                                    id: 2176,
                                    name: 'decimals',
                                    nodeType: 'Identifier',
                                    overloadedDeclarations: [],
                                    referencedDeclaration: 2139,
                                    src: '1826:8:3',
                                    typeDescriptions: {
                                      typeIdentifier: 't_uint8',
                                      typeString: 'uint8'
                                    }
                                  }
                                ],
                                expression: {
                                  argumentTypes: [
                                    {
                                      typeIdentifier: 't_uint8',
                                      typeString: 'uint8'
                                    }
                                  ],
                                  id: 2175,
                                  isConstant: false,
                                  isLValue: false,
                                  isPure: true,
                                  lValueRequested: false,
                                  nodeType: 'ElementaryTypeNameExpression',
                                  src: '1818:7:3',
                                  typeDescriptions: {
                                    typeIdentifier: 't_type$_t_uint256_$',
                                    typeString: 'type(uint256)'
                                  },
                                  typeName: {
                                    id: 2174,
                                    name: 'uint256',
                                    nodeType: 'ElementaryTypeName',
                                    src: '1818:7:3',
                                    typeDescriptions: {
                                      typeIdentifier: null,
                                      typeString: null
                                    }
                                  }
                                },
                                id: 2177,
                                isConstant: false,
                                isLValue: false,
                                isPure: false,
                                kind: 'typeConversion',
                                lValueRequested: false,
                                names: [],
                                nodeType: 'FunctionCall',
                                src: '1818:17:3',
                                tryCall: false,
                                typeDescriptions: {
                                  typeIdentifier: 't_uint256',
                                  typeString: 'uint256'
                                }
                              },
                              src: '1812:23:3',
                              typeDescriptions: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256'
                              }
                            }
                          ],
                          id: 2179,
                          isConstant: false,
                          isInlineArray: false,
                          isLValue: false,
                          isPure: false,
                          lValueRequested: false,
                          nodeType: 'TupleExpression',
                          src: '1811:25:3',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256'
                          }
                        },
                        src: '1797:39:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      id: 2169,
                      name: '_mint',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3351,
                      src: '1777:5:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,uint256)'
                      }
                    },
                    id: 2181,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1777:60:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2182,
                  nodeType: 'ExpressionStatement',
                  src: '1777:60:3'
                }
              ]
            },
            documentation: null,
            id: 2184,
            implemented: true,
            kind: 'function',
            modifiers: [
              {
                arguments: null,
                id: 2144,
                modifierName: {
                  argumentTypes: null,
                  id: 2143,
                  name: 'initializer',
                  nodeType: 'Identifier',
                  overloadedDeclarations: [],
                  referencedDeclaration: 2400,
                  src: '1471:11:3',
                  typeDescriptions: {
                    typeIdentifier: 't_modifier$__$',
                    typeString: 'modifier ()'
                  }
                },
                nodeType: 'ModifierInvocation',
                src: '1471:11:3'
              }
            ],
            name: '__ChainToken_init',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2142,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2135,
                  name: 'name',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1383:18:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2134,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1383:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2137,
                  name: 'symbol',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1403:20:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2136,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1403:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2139,
                  name: 'decimals',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1425:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint8',
                    typeString: 'uint8'
                  },
                  typeName: {
                    id: 2138,
                    name: 'uint8',
                    nodeType: 'ElementaryTypeName',
                    src: '1425:5:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint8',
                      typeString: 'uint8'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2141,
                  name: 'totalSupply',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1441:19:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2140,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1441:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '1382:79:3'
            },
            returnParameters: {
              id: 2145,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1483:0:3'
            },
            scope: 2311,
            src: '1356:488:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2201,
              nodeType: 'Block',
              src: '1910:108:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2190,
                        name: 'DEFAULT_ADMIN_ROLE',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2472,
                        src: '1931:18:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        }
                      },
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2191,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1951:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2192,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1951:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        },
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      ],
                      id: 2189,
                      name: '_setupRole',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2636,
                      src: '1920:10:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_bytes32_$_t_address_$returns$__$',
                        typeString: 'function (bytes32,address)'
                      }
                    },
                    id: 2193,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1920:44:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2194,
                  nodeType: 'ExpressionStatement',
                  src: '1920:44:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2196,
                        name: 'PAUSER_ROLE',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2114,
                        src: '1985:11:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        }
                      },
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2197,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1998:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2198,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1998:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        },
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      ],
                      id: 2195,
                      name: '_setupRole',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2636,
                      src: '1974:10:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_bytes32_$_t_address_$returns$__$',
                        typeString: 'function (bytes32,address)'
                      }
                    },
                    id: 2199,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1974:37:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2200,
                  nodeType: 'ExpressionStatement',
                  src: '1974:37:3'
                }
              ]
            },
            documentation: null,
            id: 2202,
            implemented: true,
            kind: 'function',
            modifiers: [
              {
                arguments: null,
                id: 2187,
                modifierName: {
                  argumentTypes: null,
                  id: 2186,
                  name: 'initializer',
                  nodeType: 'Identifier',
                  overloadedDeclarations: [],
                  referencedDeclaration: 2400,
                  src: '1898:11:3',
                  typeDescriptions: {
                    typeIdentifier: 't_modifier$__$',
                    typeString: 'modifier ()'
                  }
                },
                nodeType: 'ModifierInvocation',
                src: '1898:11:3'
              }
            ],
            name: '__ChainToken_init_unchained',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2185,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1886:2:3'
            },
            returnParameters: {
              id: 2188,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1910:0:3'
            },
            scope: 2311,
            src: '1850:168:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2217,
              nodeType: 'Block',
              src: '2245:124:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2207,
                            name: 'PAUSER_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2114,
                            src: '2271:11:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2208,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '2284:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2209,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '2284:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2206,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '2263:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2210,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '2263:34:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f207061757365',
                        id: 2211,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2299:44:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_9549f30f5899505ff6db144dba0a3a3e43281d57381b0195ece2bf136d61b7a6',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to pause"'
                        },
                        value: 'ChainToken: must have pauser role to pause'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_9549f30f5899505ff6db144dba0a3a3e43281d57381b0195ece2bf136d61b7a6',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to pause"'
                        }
                      ],
                      id: 2205,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2255:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2212,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2255:89:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2213,
                  nodeType: 'ExpressionStatement',
                  src: '2255:89:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2214,
                      name: '_pause',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4290,
                      src: '2354:6:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2215,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2354:8:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2216,
                  nodeType: 'ExpressionStatement',
                  src: '2354:8:3'
                }
              ]
            },
            documentation:
              '@dev Pauses all token transfers.\n     * See {ERC20Pausable} and {Pausable-_pause}.\n     * Requirements:\n     * - the caller must have the `PAUSER_ROLE`.',
            functionSelector: '8456cb59',
            id: 2218,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'pause',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2203,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2235:2:3'
            },
            returnParameters: {
              id: 2204,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2245:0:3'
            },
            scope: 2311,
            src: '2221:148:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            body: {
              id: 2233,
              nodeType: 'Block',
              src: '2602:128:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2223,
                            name: 'PAUSER_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2114,
                            src: '2628:11:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2224,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '2641:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2225,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '2641:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2222,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '2620:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2226,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '2620:34:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20756e7061757365',
                        id: 2227,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2656:46:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_0d1921ebe39060e641a5bc150b1466fccfa6eeb817b59a23e1b9490b4b0e988b',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to unpause"'
                        },
                        value: 'ChainToken: must have pauser role to unpause'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_0d1921ebe39060e641a5bc150b1466fccfa6eeb817b59a23e1b9490b4b0e988b',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to unpause"'
                        }
                      ],
                      id: 2221,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2612:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2228,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2612:91:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2229,
                  nodeType: 'ExpressionStatement',
                  src: '2612:91:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2230,
                      name: '_unpause',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4305,
                      src: '2713:8:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2231,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2713:10:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2232,
                  nodeType: 'ExpressionStatement',
                  src: '2713:10:3'
                }
              ]
            },
            documentation:
              '@dev Unpauses all token transfers.\n     * See {ERC20Pausable} and {Pausable-_unpause}.\n     * Requirements:\n     * - the caller must have the `PAUSER_ROLE`.',
            functionSelector: '3f4ba83a',
            id: 2234,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'unpause',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2219,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2592:2:3'
            },
            returnParameters: {
              id: 2220,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2602:0:3'
            },
            scope: 2311,
            src: '2576:154:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            baseFunctions: [3470, 3611],
            body: {
              id: 2264,
              nodeType: 'Block',
              src: '2870:156:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        commonType: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        id: 2252,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          argumentTypes: null,
                          id: 2247,
                          name: 'to',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2238,
                          src: '2888:2:3',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address'
                          }
                        },
                        nodeType: 'BinaryOperation',
                        operator: '!=',
                        rightExpression: {
                          argumentTypes: null,
                          arguments: [
                            {
                              argumentTypes: null,
                              id: 2250,
                              name: 'this',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: -28,
                              src: '2902:4:3',
                              typeDescriptions: {
                                typeIdentifier: 't_contract$_ChainToken_$2311',
                                typeString: 'contract ChainToken'
                              }
                            }
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_contract$_ChainToken_$2311',
                                typeString: 'contract ChainToken'
                              }
                            ],
                            id: 2249,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            lValueRequested: false,
                            nodeType: 'ElementaryTypeNameExpression',
                            src: '2894:7:3',
                            typeDescriptions: {
                              typeIdentifier: 't_type$_t_address_$',
                              typeString: 'type(address)'
                            },
                            typeName: {
                              id: 2248,
                              name: 'address',
                              nodeType: 'ElementaryTypeName',
                              src: '2894:7:3',
                              typeDescriptions: {
                                typeIdentifier: null,
                                typeString: null
                              }
                            }
                          },
                          id: 2251,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          kind: 'typeConversion',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '2894:13:3',
                          tryCall: false,
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address'
                          }
                        },
                        src: '2888:19:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a2063616e2774207472616e7366657220746f20636f6e7472616374206164647265737320697473656c66',
                        id: 2253,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2909:55:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_b376989de9a7c1d856198b7df335cb62832a34b46efa10909681b98d524836bd',
                          typeString:
                            'literal_string "ChainToken: can\'t transfer to contract address itself"'
                        },
                        value:
                          "ChainToken: can't transfer to contract address itself"
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_b376989de9a7c1d856198b7df335cb62832a34b46efa10909681b98d524836bd',
                          typeString:
                            'literal_string "ChainToken: can\'t transfer to contract address itself"'
                        }
                      ],
                      id: 2246,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2880:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2254,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2880:85:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2255,
                  nodeType: 'ExpressionStatement',
                  src: '2880:85:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2259,
                        name: 'from',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2236,
                        src: '3002:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2260,
                        name: 'to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2238,
                        src: '3008:2:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2261,
                        name: 'amount',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2240,
                        src: '3012:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      expression: {
                        argumentTypes: null,
                        id: 2256,
                        name: 'super',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: -25,
                        src: '2975:5:3',
                        typeDescriptions: {
                          typeIdentifier: 't_super$_ChainToken_$2311',
                          typeString: 'contract super ChainToken'
                        }
                      },
                      id: 2258,
                      isConstant: false,
                      isLValue: false,
                      isPure: false,
                      lValueRequested: false,
                      memberName: '_beforeTokenTransfer',
                      nodeType: 'MemberAccess',
                      referencedDeclaration: 3611,
                      src: '2975:26:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)'
                      }
                    },
                    id: 2262,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2975:44:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2263,
                  nodeType: 'ExpressionStatement',
                  src: '2975:44:3'
                }
              ]
            },
            documentation: null,
            id: 2265,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: '_beforeTokenTransfer',
            nodeType: 'FunctionDefinition',
            overrides: {
              id: 2244,
              nodeType: 'OverrideSpecifier',
              overrides: [
                {
                  contractScope: null,
                  id: 2242,
                  name: 'ERC20UpgradeSafe',
                  nodeType: 'UserDefinedTypeName',
                  referencedDeclaration: 3475,
                  src: '2826:16:3',
                  typeDescriptions: {
                    typeIdentifier: 't_contract$_ERC20UpgradeSafe_$3475',
                    typeString: 'contract ERC20UpgradeSafe'
                  }
                },
                {
                  contractScope: null,
                  id: 2243,
                  name: 'ERC20PausableUpgradeSafe',
                  nodeType: 'UserDefinedTypeName',
                  referencedDeclaration: 3616,
                  src: '2844:24:3',
                  typeDescriptions: {
                    typeIdentifier:
                      't_contract$_ERC20PausableUpgradeSafe_$3616',
                    typeString: 'contract ERC20PausableUpgradeSafe'
                  }
                }
              ],
              src: '2817:52:3'
            },
            parameters: {
              id: 2241,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2236,
                  name: 'from',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2766:12:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2235,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '2766:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2238,
                  name: 'to',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2780:10:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2237,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '2780:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2240,
                  name: 'amount',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2792:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2239,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '2792:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '2765:42:3'
            },
            returnParameters: {
              id: 2245,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2870:0:3'
            },
            scope: 2311,
            src: '2736:290:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2301,
              nodeType: 'Block',
              src: '3088:319:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2272,
                            name: 'DEFAULT_ADMIN_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2472,
                            src: '3114:18:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2273,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '3134:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2274,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3134:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2271,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '3106:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2275,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '3106:41:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e205b7769746864726177546f6b656e735d3a206d75737420686176652061646d696e20726f6c6520746f207769746864726177',
                        id: 2276,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '3149:63:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_b1a362e86ba968cf6ebc88379218f6c15e417ef2fe848a56a884b4c68c7cb8e0',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens]: must have admin role to withdraw"'
                        },
                        value:
                          'ChainToken [withdrawTokens]: must have admin role to withdraw'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_b1a362e86ba968cf6ebc88379218f6c15e417ef2fe848a56a884b4c68c7cb8e0',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens]: must have admin role to withdraw"'
                        }
                      ],
                      id: 2270,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '3098:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2277,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3098:115:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2278,
                  nodeType: 'ExpressionStatement',
                  src: '3098:115:3'
                },
                {
                  assignments: [2280],
                  declarations: [
                    {
                      constant: false,
                      id: 2280,
                      name: 'tc',
                      nodeType: 'VariableDeclaration',
                      overrides: null,
                      scope: 2301,
                      src: '3223:9:3',
                      stateVariable: false,
                      storageLocation: 'default',
                      typeDescriptions: {
                        typeIdentifier: 't_contract$_IERC20_$3685',
                        typeString: 'contract IERC20'
                      },
                      typeName: {
                        contractScope: null,
                        id: 2279,
                        name: 'IERC20',
                        nodeType: 'UserDefinedTypeName',
                        referencedDeclaration: 3685,
                        src: '3223:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_contract$_IERC20_$3685',
                          typeString: 'contract IERC20'
                        }
                      },
                      value: null,
                      visibility: 'internal'
                    }
                  ],
                  id: 2284,
                  initialValue: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2282,
                        name: 'tokenContract',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2267,
                        src: '3242:13:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      ],
                      id: 2281,
                      name: 'IERC20',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3685,
                      src: '3235:6:3',
                      typeDescriptions: {
                        typeIdentifier: 't_type$_t_contract$_IERC20_$3685_$',
                        typeString: 'type(contract IERC20)'
                      }
                    },
                    id: 2283,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'typeConversion',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3235:21:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_contract$_IERC20_$3685',
                      typeString: 'contract IERC20'
                    }
                  },
                  nodeType: 'VariableDeclarationStatement',
                  src: '3223:33:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2288,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '3286:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2289,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3286:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [
                              {
                                argumentTypes: null,
                                arguments: [
                                  {
                                    argumentTypes: null,
                                    id: 2294,
                                    name: 'this',
                                    nodeType: 'Identifier',
                                    overloadedDeclarations: [],
                                    referencedDeclaration: -28,
                                    src: '3321:4:3',
                                    typeDescriptions: {
                                      typeIdentifier:
                                        't_contract$_ChainToken_$2311',
                                      typeString: 'contract ChainToken'
                                    }
                                  }
                                ],
                                expression: {
                                  argumentTypes: [
                                    {
                                      typeIdentifier:
                                        't_contract$_ChainToken_$2311',
                                      typeString: 'contract ChainToken'
                                    }
                                  ],
                                  id: 2293,
                                  isConstant: false,
                                  isLValue: false,
                                  isPure: true,
                                  lValueRequested: false,
                                  nodeType: 'ElementaryTypeNameExpression',
                                  src: '3313:7:3',
                                  typeDescriptions: {
                                    typeIdentifier: 't_type$_t_address_$',
                                    typeString: 'type(address)'
                                  },
                                  typeName: {
                                    id: 2292,
                                    name: 'address',
                                    nodeType: 'ElementaryTypeName',
                                    src: '3313:7:3',
                                    typeDescriptions: {
                                      typeIdentifier: null,
                                      typeString: null
                                    }
                                  }
                                },
                                id: 2295,
                                isConstant: false,
                                isLValue: false,
                                isPure: false,
                                kind: 'typeConversion',
                                lValueRequested: false,
                                names: [],
                                nodeType: 'FunctionCall',
                                src: '3313:13:3',
                                tryCall: false,
                                typeDescriptions: {
                                  typeIdentifier: 't_address',
                                  typeString: 'address'
                                }
                              }
                            ],
                            expression: {
                              argumentTypes: [
                                {
                                  typeIdentifier: 't_address',
                                  typeString: 'address'
                                }
                              ],
                              expression: {
                                argumentTypes: null,
                                id: 2290,
                                name: 'tc',
                                nodeType: 'Identifier',
                                overloadedDeclarations: [],
                                referencedDeclaration: 2280,
                                src: '3300:2:3',
                                typeDescriptions: {
                                  typeIdentifier: 't_contract$_IERC20_$3685',
                                  typeString: 'contract IERC20'
                                }
                              },
                              id: 2291,
                              isConstant: false,
                              isLValue: false,
                              isPure: false,
                              lValueRequested: false,
                              memberName: 'balanceOf',
                              nodeType: 'MemberAccess',
                              referencedDeclaration: 3630,
                              src: '3300:12:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_external_view$_t_address_$returns$_t_uint256_$',
                                typeString:
                                  'function (address) view external returns (uint256)'
                              }
                            },
                            id: 2296,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3300:27:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            },
                            {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256'
                            }
                          ],
                          expression: {
                            argumentTypes: null,
                            id: 2286,
                            name: 'tc',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2280,
                            src: '3274:2:3',
                            typeDescriptions: {
                              typeIdentifier: 't_contract$_IERC20_$3685',
                              typeString: 'contract IERC20'
                            }
                          },
                          id: 2287,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          lValueRequested: false,
                          memberName: 'transfer',
                          nodeType: 'MemberAccess',
                          referencedDeclaration: 3639,
                          src: '3274:11:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$',
                            typeString:
                              'function (address,uint256) external returns (bool)'
                          }
                        },
                        id: 2297,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '3274:54:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e205b7769746864726177546f6b656e735d20536f6d657468696e672077656e742077726f6e67207768696c65207472616e7366657272696e67',
                        id: 2298,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '3330:69:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_ea96bbab0904ff209030f97d9ee8abe5ad5abdb4afe9238b2945b33066725b53',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens] Something went wrong while transferring"'
                        },
                        value:
                          'ChainToken [withdrawTokens] Something went wrong while transferring'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_ea96bbab0904ff209030f97d9ee8abe5ad5abdb4afe9238b2945b33066725b53',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens] Something went wrong while transferring"'
                        }
                      ],
                      id: 2285,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '3266:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2299,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3266:134:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2300,
                  nodeType: 'ExpressionStatement',
                  src: '3266:134:3'
                }
              ]
            },
            documentation: null,
            functionSelector: '49df728c',
            id: 2302,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'withdrawTokens',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2268,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2267,
                  name: 'tokenContract',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2302,
                  src: '3056:21:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2266,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '3056:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '3055:23:3'
            },
            returnParameters: {
              id: 2269,
              nodeType: 'ParameterList',
              parameters: [],
              src: '3088:0:3'
            },
            scope: 2311,
            src: '3032:375:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'external'
          },
          {
            body: {
              id: 2309,
              nodeType: 'Block',
              src: '3468:28:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    hexValue: '7631',
                    id: 2307,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'string',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '3485:4:3',
                    subdenomination: null,
                    typeDescriptions: {
                      typeIdentifier:
                        't_stringliteral_0984d5efd47d99151ae1be065a709e56c602102f24c1abc4008eb3f815a8d217',
                      typeString: 'literal_string "v1"'
                    },
                    value: 'v1'
                  },
                  functionReturnParameters: 2306,
                  id: 2308,
                  nodeType: 'Return',
                  src: '3478:11:3'
                }
              ]
            },
            documentation: null,
            functionSelector: '54fd4d50',
            id: 2310,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'version',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2303,
              nodeType: 'ParameterList',
              parameters: [],
              src: '3429:2:3'
            },
            returnParameters: {
              id: 2306,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2305,
                  name: '',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2310,
                  src: '3453:13:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2304,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '3453:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '3452:15:3'
            },
            scope: 2311,
            src: '3413:83:3',
            stateMutability: 'pure',
            virtual: false,
            visibility: 'public'
          }
        ],
        scope: 2312,
        src: '800:2698:3'
      }
    ],
    src: '0:3499:3'
  },
  legacyAST: {
    absolutePath:
      '/home/sandip/projects/ChainGames/chaintokencontracts/contracts/ChainToken.sol',
    exportedSymbols: {
      ChainToken: [2311]
    },
    id: 2312,
    nodeType: 'SourceUnit',
    nodes: [
      {
        id: 2096,
        literals: ['solidity', '^', '0.6', '.0'],
        nodeType: 'PragmaDirective',
        src: '0:23:3'
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol',
        id: 2097,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 2705,
        src: '25:85:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol',
        id: 2098,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 3617,
        src: '111:90:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        absolutePath:
          '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol',
        file: '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol',
        id: 2099,
        nodeType: 'ImportDirective',
        scope: 2312,
        sourceUnit: 3554,
        src: '202:90:3',
        symbolAliases: [],
        unitAlias: ''
      },
      {
        abstract: false,
        baseContracts: [
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2100,
              name: 'Initializable',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2426,
              src: '823:13:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_Initializable_$2426',
                typeString: 'contract Initializable'
              }
            },
            id: 2101,
            nodeType: 'InheritanceSpecifier',
            src: '823:13:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2102,
              name: 'ContextUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2356,
              src: '838:18:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ContextUpgradeSafe_$2356',
                typeString: 'contract ContextUpgradeSafe'
              }
            },
            id: 2103,
            nodeType: 'InheritanceSpecifier',
            src: '838:18:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2104,
              name: 'AccessControlUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 2704,
              src: '858:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_AccessControlUpgradeSafe_$2704',
                typeString: 'contract AccessControlUpgradeSafe'
              }
            },
            id: 2105,
            nodeType: 'InheritanceSpecifier',
            src: '858:24:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2106,
              name: 'ERC20BurnableUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 3553,
              src: '884:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ERC20BurnableUpgradeSafe_$3553',
                typeString: 'contract ERC20BurnableUpgradeSafe'
              }
            },
            id: 2107,
            nodeType: 'InheritanceSpecifier',
            src: '884:24:3'
          },
          {
            arguments: null,
            baseName: {
              contractScope: null,
              id: 2108,
              name: 'ERC20PausableUpgradeSafe',
              nodeType: 'UserDefinedTypeName',
              referencedDeclaration: 3616,
              src: '910:24:3',
              typeDescriptions: {
                typeIdentifier: 't_contract$_ERC20PausableUpgradeSafe_$3616',
                typeString: 'contract ERC20PausableUpgradeSafe'
              }
            },
            id: 2109,
            nodeType: 'InheritanceSpecifier',
            src: '910:24:3'
          }
        ],
        contractDependencies: [2356, 2426, 2704, 3475, 3553, 3616, 3685, 4310],
        contractKind: 'contract',
        documentation:
          '@dev {ERC20} token, including:\n *  - ability for holders to burn (destroy) their tokens\n - a pauser role that allows to stop all token transfers\n * This contract uses {AccessControl} to lock permissioned functions using the\ndifferent roles - head to its documentation for details.\n * The account that deploys the contract will be granted the minter and pauser\nroles, as well as the default admin role, which will let it grant both minter\nand pauser roles to aother accounts',
        fullyImplemented: true,
        id: 2311,
        linearizedBaseContracts: [
          2311, 3616, 4310, 3553, 3475, 3685, 2704, 2356, 2426
        ],
        name: 'ChainToken',
        nodeType: 'ContractDefinition',
        nodes: [
          {
            constant: true,
            functionSelector: 'e63ab1e9',
            id: 2114,
            name: 'PAUSER_ROLE',
            nodeType: 'VariableDeclaration',
            overrides: null,
            scope: 2311,
            src: '941:62:3',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_bytes32',
              typeString: 'bytes32'
            },
            typeName: {
              id: 2110,
              name: 'bytes32',
              nodeType: 'ElementaryTypeName',
              src: '941:7:3',
              typeDescriptions: {
                typeIdentifier: 't_bytes32',
                typeString: 'bytes32'
              }
            },
            value: {
              argumentTypes: null,
              arguments: [
                {
                  argumentTypes: null,
                  hexValue: '5041555345525f524f4c45',
                  id: 2112,
                  isConstant: false,
                  isLValue: false,
                  isPure: true,
                  kind: 'string',
                  lValueRequested: false,
                  nodeType: 'Literal',
                  src: '989:13:3',
                  subdenomination: null,
                  typeDescriptions: {
                    typeIdentifier:
                      't_stringliteral_65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a',
                    typeString: 'literal_string "PAUSER_ROLE"'
                  },
                  value: 'PAUSER_ROLE'
                }
              ],
              expression: {
                argumentTypes: [
                  {
                    typeIdentifier:
                      't_stringliteral_65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a',
                    typeString: 'literal_string "PAUSER_ROLE"'
                  }
                ],
                id: 2111,
                name: 'keccak256',
                nodeType: 'Identifier',
                overloadedDeclarations: [],
                referencedDeclaration: -8,
                src: '979:9:3',
                typeDescriptions: {
                  typeIdentifier:
                    't_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$',
                  typeString: 'function (bytes memory) pure returns (bytes32)'
                }
              },
              id: 2113,
              isConstant: false,
              isLValue: false,
              isPure: true,
              kind: 'functionCall',
              lValueRequested: false,
              names: [],
              nodeType: 'FunctionCall',
              src: '979:24:3',
              tryCall: false,
              typeDescriptions: {
                typeIdentifier: 't_bytes32',
                typeString: 'bytes32'
              }
            },
            visibility: 'public'
          },
          {
            body: {
              id: 2132,
              nodeType: 'Block',
              src: '1279:71:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2126,
                        name: 'name',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2116,
                        src: '1307:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2127,
                        name: 'symbol',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2118,
                        src: '1313:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2128,
                        name: 'decimals',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2120,
                        src: '1321:8:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint8',
                          typeString: 'uint8'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2129,
                        name: 'totalSupply',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2122,
                        src: '1331:11:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_uint8',
                          typeString: 'uint8'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      id: 2125,
                      name: '__ChainToken_init',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2184,
                      src: '1289:17:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_string_memory_ptr_$_t_string_memory_ptr_$_t_uint8_$_t_uint256_$returns$__$',
                        typeString:
                          'function (string memory,string memory,uint8,uint256)'
                      }
                    },
                    id: 2130,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1289:54:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2131,
                  nodeType: 'ExpressionStatement',
                  src: '1289:54:3'
                }
              ]
            },
            documentation:
              '@dev Grants `DEFAULT_ADMIN_ROLE` and `PAUSER_ROLE` to the\naccount that deploys the contract.\n     * See {ERC20-constructor}.',
            functionSelector: '253279ad',
            id: 2133,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'initialize',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2123,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2116,
                  name: 'name',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1193:18:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2115,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1193:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2118,
                  name: 'symbol',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1213:20:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2117,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1213:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2120,
                  name: 'decimals',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1235:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint8',
                    typeString: 'uint8'
                  },
                  typeName: {
                    id: 2119,
                    name: 'uint8',
                    nodeType: 'ElementaryTypeName',
                    src: '1235:5:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint8',
                      typeString: 'uint8'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2122,
                  name: 'totalSupply',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2133,
                  src: '1251:19:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2121,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1251:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '1192:79:3'
            },
            returnParameters: {
              id: 2124,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1279:0:3'
            },
            scope: 2311,
            src: '1173:177:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            body: {
              id: 2183,
              nodeType: 'Block',
              src: '1483:361:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2146,
                      name: '__Context_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2331,
                      src: '1493:24:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2147,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1493:26:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2148,
                  nodeType: 'ExpressionStatement',
                  src: '1493:26:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2149,
                      name: '__AccessControl_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2454,
                      src: '1529:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2150,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1529:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2151,
                  nodeType: 'ExpressionStatement',
                  src: '1529:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2153,
                        name: 'name',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2135,
                        src: '1594:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2154,
                        name: 'symbol',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2137,
                        src: '1600:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        },
                        {
                          typeIdentifier: 't_string_memory_ptr',
                          typeString: 'string memory'
                        }
                      ],
                      id: 2152,
                      name: '__ERC20_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3037,
                      src: '1571:22:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (string memory,string memory)'
                      }
                    },
                    id: 2155,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1571:36:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2156,
                  nodeType: 'ExpressionStatement',
                  src: '1571:36:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2157,
                      name: '__ERC20Burnable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3504,
                      src: '1617:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2158,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1617:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2159,
                  nodeType: 'ExpressionStatement',
                  src: '1617:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2160,
                      name: '__Pausable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4248,
                      src: '1659:25:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2161,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1659:27:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2162,
                  nodeType: 'ExpressionStatement',
                  src: '1659:27:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2163,
                      name: '__ERC20Pausable_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3585,
                      src: '1696:30:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2164,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1696:32:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2165,
                  nodeType: 'ExpressionStatement',
                  src: '1696:32:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2166,
                      name: '__ChainToken_init_unchained',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2202,
                      src: '1738:27:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2167,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1738:29:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2168,
                  nodeType: 'ExpressionStatement',
                  src: '1738:29:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2170,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1783:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2171,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1783:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      },
                      {
                        argumentTypes: null,
                        commonType: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        },
                        id: 2180,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          argumentTypes: null,
                          id: 2172,
                          name: 'totalSupply',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2141,
                          src: '1797:11:3',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256'
                          }
                        },
                        nodeType: 'BinaryOperation',
                        operator: '*',
                        rightExpression: {
                          argumentTypes: null,
                          components: [
                            {
                              argumentTypes: null,
                              commonType: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256'
                              },
                              id: 2178,
                              isConstant: false,
                              isLValue: false,
                              isPure: false,
                              lValueRequested: false,
                              leftExpression: {
                                argumentTypes: null,
                                hexValue: '3130',
                                id: 2173,
                                isConstant: false,
                                isLValue: false,
                                isPure: true,
                                kind: 'number',
                                lValueRequested: false,
                                nodeType: 'Literal',
                                src: '1812:2:3',
                                subdenomination: null,
                                typeDescriptions: {
                                  typeIdentifier: 't_rational_10_by_1',
                                  typeString: 'int_const 10'
                                },
                                value: '10'
                              },
                              nodeType: 'BinaryOperation',
                              operator: '**',
                              rightExpression: {
                                argumentTypes: null,
                                arguments: [
                                  {
                                    argumentTypes: null,
                                    id: 2176,
                                    name: 'decimals',
                                    nodeType: 'Identifier',
                                    overloadedDeclarations: [],
                                    referencedDeclaration: 2139,
                                    src: '1826:8:3',
                                    typeDescriptions: {
                                      typeIdentifier: 't_uint8',
                                      typeString: 'uint8'
                                    }
                                  }
                                ],
                                expression: {
                                  argumentTypes: [
                                    {
                                      typeIdentifier: 't_uint8',
                                      typeString: 'uint8'
                                    }
                                  ],
                                  id: 2175,
                                  isConstant: false,
                                  isLValue: false,
                                  isPure: true,
                                  lValueRequested: false,
                                  nodeType: 'ElementaryTypeNameExpression',
                                  src: '1818:7:3',
                                  typeDescriptions: {
                                    typeIdentifier: 't_type$_t_uint256_$',
                                    typeString: 'type(uint256)'
                                  },
                                  typeName: {
                                    id: 2174,
                                    name: 'uint256',
                                    nodeType: 'ElementaryTypeName',
                                    src: '1818:7:3',
                                    typeDescriptions: {
                                      typeIdentifier: null,
                                      typeString: null
                                    }
                                  }
                                },
                                id: 2177,
                                isConstant: false,
                                isLValue: false,
                                isPure: false,
                                kind: 'typeConversion',
                                lValueRequested: false,
                                names: [],
                                nodeType: 'FunctionCall',
                                src: '1818:17:3',
                                tryCall: false,
                                typeDescriptions: {
                                  typeIdentifier: 't_uint256',
                                  typeString: 'uint256'
                                }
                              },
                              src: '1812:23:3',
                              typeDescriptions: {
                                typeIdentifier: 't_uint256',
                                typeString: 'uint256'
                              }
                            }
                          ],
                          id: 2179,
                          isConstant: false,
                          isInlineArray: false,
                          isLValue: false,
                          isPure: false,
                          lValueRequested: false,
                          nodeType: 'TupleExpression',
                          src: '1811:25:3',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256'
                          }
                        },
                        src: '1797:39:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      id: 2169,
                      name: '_mint',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3351,
                      src: '1777:5:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,uint256)'
                      }
                    },
                    id: 2181,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1777:60:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2182,
                  nodeType: 'ExpressionStatement',
                  src: '1777:60:3'
                }
              ]
            },
            documentation: null,
            id: 2184,
            implemented: true,
            kind: 'function',
            modifiers: [
              {
                arguments: null,
                id: 2144,
                modifierName: {
                  argumentTypes: null,
                  id: 2143,
                  name: 'initializer',
                  nodeType: 'Identifier',
                  overloadedDeclarations: [],
                  referencedDeclaration: 2400,
                  src: '1471:11:3',
                  typeDescriptions: {
                    typeIdentifier: 't_modifier$__$',
                    typeString: 'modifier ()'
                  }
                },
                nodeType: 'ModifierInvocation',
                src: '1471:11:3'
              }
            ],
            name: '__ChainToken_init',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2142,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2135,
                  name: 'name',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1383:18:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2134,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1383:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2137,
                  name: 'symbol',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1403:20:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2136,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '1403:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2139,
                  name: 'decimals',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1425:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint8',
                    typeString: 'uint8'
                  },
                  typeName: {
                    id: 2138,
                    name: 'uint8',
                    nodeType: 'ElementaryTypeName',
                    src: '1425:5:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint8',
                      typeString: 'uint8'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2141,
                  name: 'totalSupply',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2184,
                  src: '1441:19:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2140,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1441:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '1382:79:3'
            },
            returnParameters: {
              id: 2145,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1483:0:3'
            },
            scope: 2311,
            src: '1356:488:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2201,
              nodeType: 'Block',
              src: '1910:108:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2190,
                        name: 'DEFAULT_ADMIN_ROLE',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2472,
                        src: '1931:18:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        }
                      },
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2191,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1951:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2192,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1951:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        },
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      ],
                      id: 2189,
                      name: '_setupRole',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2636,
                      src: '1920:10:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_bytes32_$_t_address_$returns$__$',
                        typeString: 'function (bytes32,address)'
                      }
                    },
                    id: 2193,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1920:44:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2194,
                  nodeType: 'ExpressionStatement',
                  src: '1920:44:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2196,
                        name: 'PAUSER_ROLE',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2114,
                        src: '1985:11:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        }
                      },
                      {
                        argumentTypes: null,
                        arguments: [],
                        expression: {
                          argumentTypes: [],
                          id: 2197,
                          name: '_msgSender',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2340,
                          src: '1998:10:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$__$returns$_t_address_payable_$',
                            typeString:
                              'function () view returns (address payable)'
                          }
                        },
                        id: 2198,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '1998:12:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bytes32',
                          typeString: 'bytes32'
                        },
                        {
                          typeIdentifier: 't_address_payable',
                          typeString: 'address payable'
                        }
                      ],
                      id: 2195,
                      name: '_setupRole',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 2636,
                      src: '1974:10:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_bytes32_$_t_address_$returns$__$',
                        typeString: 'function (bytes32,address)'
                      }
                    },
                    id: 2199,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1974:37:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2200,
                  nodeType: 'ExpressionStatement',
                  src: '1974:37:3'
                }
              ]
            },
            documentation: null,
            id: 2202,
            implemented: true,
            kind: 'function',
            modifiers: [
              {
                arguments: null,
                id: 2187,
                modifierName: {
                  argumentTypes: null,
                  id: 2186,
                  name: 'initializer',
                  nodeType: 'Identifier',
                  overloadedDeclarations: [],
                  referencedDeclaration: 2400,
                  src: '1898:11:3',
                  typeDescriptions: {
                    typeIdentifier: 't_modifier$__$',
                    typeString: 'modifier ()'
                  }
                },
                nodeType: 'ModifierInvocation',
                src: '1898:11:3'
              }
            ],
            name: '__ChainToken_init_unchained',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2185,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1886:2:3'
            },
            returnParameters: {
              id: 2188,
              nodeType: 'ParameterList',
              parameters: [],
              src: '1910:0:3'
            },
            scope: 2311,
            src: '1850:168:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2217,
              nodeType: 'Block',
              src: '2245:124:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2207,
                            name: 'PAUSER_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2114,
                            src: '2271:11:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2208,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '2284:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2209,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '2284:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2206,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '2263:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2210,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '2263:34:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f207061757365',
                        id: 2211,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2299:44:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_9549f30f5899505ff6db144dba0a3a3e43281d57381b0195ece2bf136d61b7a6',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to pause"'
                        },
                        value: 'ChainToken: must have pauser role to pause'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_9549f30f5899505ff6db144dba0a3a3e43281d57381b0195ece2bf136d61b7a6',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to pause"'
                        }
                      ],
                      id: 2205,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2255:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2212,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2255:89:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2213,
                  nodeType: 'ExpressionStatement',
                  src: '2255:89:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2214,
                      name: '_pause',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4290,
                      src: '2354:6:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2215,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2354:8:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2216,
                  nodeType: 'ExpressionStatement',
                  src: '2354:8:3'
                }
              ]
            },
            documentation:
              '@dev Pauses all token transfers.\n     * See {ERC20Pausable} and {Pausable-_pause}.\n     * Requirements:\n     * - the caller must have the `PAUSER_ROLE`.',
            functionSelector: '8456cb59',
            id: 2218,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'pause',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2203,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2235:2:3'
            },
            returnParameters: {
              id: 2204,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2245:0:3'
            },
            scope: 2311,
            src: '2221:148:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            body: {
              id: 2233,
              nodeType: 'Block',
              src: '2602:128:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2223,
                            name: 'PAUSER_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2114,
                            src: '2628:11:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2224,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '2641:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2225,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '2641:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2222,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '2620:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2226,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '2620:34:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a206d75737420686176652070617573657220726f6c6520746f20756e7061757365',
                        id: 2227,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2656:46:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_0d1921ebe39060e641a5bc150b1466fccfa6eeb817b59a23e1b9490b4b0e988b',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to unpause"'
                        },
                        value: 'ChainToken: must have pauser role to unpause'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_0d1921ebe39060e641a5bc150b1466fccfa6eeb817b59a23e1b9490b4b0e988b',
                          typeString:
                            'literal_string "ChainToken: must have pauser role to unpause"'
                        }
                      ],
                      id: 2221,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2612:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2228,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2612:91:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2229,
                  nodeType: 'ExpressionStatement',
                  src: '2612:91:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [],
                    expression: {
                      argumentTypes: [],
                      id: 2230,
                      name: '_unpause',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 4305,
                      src: '2713:8:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$__$returns$__$',
                        typeString: 'function ()'
                      }
                    },
                    id: 2231,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2713:10:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2232,
                  nodeType: 'ExpressionStatement',
                  src: '2713:10:3'
                }
              ]
            },
            documentation:
              '@dev Unpauses all token transfers.\n     * See {ERC20Pausable} and {Pausable-_unpause}.\n     * Requirements:\n     * - the caller must have the `PAUSER_ROLE`.',
            functionSelector: '3f4ba83a',
            id: 2234,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'unpause',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2219,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2592:2:3'
            },
            returnParameters: {
              id: 2220,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2602:0:3'
            },
            scope: 2311,
            src: '2576:154:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public'
          },
          {
            baseFunctions: [3470, 3611],
            body: {
              id: 2264,
              nodeType: 'Block',
              src: '2870:156:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        commonType: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        id: 2252,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          argumentTypes: null,
                          id: 2247,
                          name: 'to',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2238,
                          src: '2888:2:3',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address'
                          }
                        },
                        nodeType: 'BinaryOperation',
                        operator: '!=',
                        rightExpression: {
                          argumentTypes: null,
                          arguments: [
                            {
                              argumentTypes: null,
                              id: 2250,
                              name: 'this',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: -28,
                              src: '2902:4:3',
                              typeDescriptions: {
                                typeIdentifier: 't_contract$_ChainToken_$2311',
                                typeString: 'contract ChainToken'
                              }
                            }
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_contract$_ChainToken_$2311',
                                typeString: 'contract ChainToken'
                              }
                            ],
                            id: 2249,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            lValueRequested: false,
                            nodeType: 'ElementaryTypeNameExpression',
                            src: '2894:7:3',
                            typeDescriptions: {
                              typeIdentifier: 't_type$_t_address_$',
                              typeString: 'type(address)'
                            },
                            typeName: {
                              id: 2248,
                              name: 'address',
                              nodeType: 'ElementaryTypeName',
                              src: '2894:7:3',
                              typeDescriptions: {
                                typeIdentifier: null,
                                typeString: null
                              }
                            }
                          },
                          id: 2251,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          kind: 'typeConversion',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '2894:13:3',
                          tryCall: false,
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address'
                          }
                        },
                        src: '2888:19:3',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e3a2063616e2774207472616e7366657220746f20636f6e7472616374206164647265737320697473656c66',
                        id: 2253,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2909:55:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_b376989de9a7c1d856198b7df335cb62832a34b46efa10909681b98d524836bd',
                          typeString:
                            'literal_string "ChainToken: can\'t transfer to contract address itself"'
                        },
                        value:
                          "ChainToken: can't transfer to contract address itself"
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_b376989de9a7c1d856198b7df335cb62832a34b46efa10909681b98d524836bd',
                          typeString:
                            'literal_string "ChainToken: can\'t transfer to contract address itself"'
                        }
                      ],
                      id: 2246,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '2880:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2254,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2880:85:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2255,
                  nodeType: 'ExpressionStatement',
                  src: '2880:85:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2259,
                        name: 'from',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2236,
                        src: '3002:4:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2260,
                        name: 'to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2238,
                        src: '3008:2:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      },
                      {
                        argumentTypes: null,
                        id: 2261,
                        name: 'amount',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2240,
                        src: '3012:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256'
                        }
                      ],
                      expression: {
                        argumentTypes: null,
                        id: 2256,
                        name: 'super',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: -25,
                        src: '2975:5:3',
                        typeDescriptions: {
                          typeIdentifier: 't_super$_ChainToken_$2311',
                          typeString: 'contract super ChainToken'
                        }
                      },
                      id: 2258,
                      isConstant: false,
                      isLValue: false,
                      isPure: false,
                      lValueRequested: false,
                      memberName: '_beforeTokenTransfer',
                      nodeType: 'MemberAccess',
                      referencedDeclaration: 3611,
                      src: '2975:26:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)'
                      }
                    },
                    id: 2262,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2975:44:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2263,
                  nodeType: 'ExpressionStatement',
                  src: '2975:44:3'
                }
              ]
            },
            documentation: null,
            id: 2265,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: '_beforeTokenTransfer',
            nodeType: 'FunctionDefinition',
            overrides: {
              id: 2244,
              nodeType: 'OverrideSpecifier',
              overrides: [
                {
                  contractScope: null,
                  id: 2242,
                  name: 'ERC20UpgradeSafe',
                  nodeType: 'UserDefinedTypeName',
                  referencedDeclaration: 3475,
                  src: '2826:16:3',
                  typeDescriptions: {
                    typeIdentifier: 't_contract$_ERC20UpgradeSafe_$3475',
                    typeString: 'contract ERC20UpgradeSafe'
                  }
                },
                {
                  contractScope: null,
                  id: 2243,
                  name: 'ERC20PausableUpgradeSafe',
                  nodeType: 'UserDefinedTypeName',
                  referencedDeclaration: 3616,
                  src: '2844:24:3',
                  typeDescriptions: {
                    typeIdentifier:
                      't_contract$_ERC20PausableUpgradeSafe_$3616',
                    typeString: 'contract ERC20PausableUpgradeSafe'
                  }
                }
              ],
              src: '2817:52:3'
            },
            parameters: {
              id: 2241,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2236,
                  name: 'from',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2766:12:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2235,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '2766:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2238,
                  name: 'to',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2780:10:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2237,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '2780:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                },
                {
                  constant: false,
                  id: 2240,
                  name: 'amount',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2265,
                  src: '2792:14:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256'
                  },
                  typeName: {
                    id: 2239,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '2792:7:3',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '2765:42:3'
            },
            returnParameters: {
              id: 2245,
              nodeType: 'ParameterList',
              parameters: [],
              src: '2870:0:3'
            },
            scope: 2311,
            src: '2736:290:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'internal'
          },
          {
            body: {
              id: 2301,
              nodeType: 'Block',
              src: '3088:319:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            id: 2272,
                            name: 'DEFAULT_ADMIN_ROLE',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2472,
                            src: '3114:18:3',
                            typeDescriptions: {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2273,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '3134:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2274,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3134:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_bytes32',
                              typeString: 'bytes32'
                            },
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          ],
                          id: 2271,
                          name: 'hasRole',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 2506,
                          src: '3106:7:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_internal_view$_t_bytes32_$_t_address_$returns$_t_bool_$',
                            typeString:
                              'function (bytes32,address) view returns (bool)'
                          }
                        },
                        id: 2275,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '3106:41:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e205b7769746864726177546f6b656e735d3a206d75737420686176652061646d696e20726f6c6520746f207769746864726177',
                        id: 2276,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '3149:63:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_b1a362e86ba968cf6ebc88379218f6c15e417ef2fe848a56a884b4c68c7cb8e0',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens]: must have admin role to withdraw"'
                        },
                        value:
                          'ChainToken [withdrawTokens]: must have admin role to withdraw'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_b1a362e86ba968cf6ebc88379218f6c15e417ef2fe848a56a884b4c68c7cb8e0',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens]: must have admin role to withdraw"'
                        }
                      ],
                      id: 2270,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '3098:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2277,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3098:115:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2278,
                  nodeType: 'ExpressionStatement',
                  src: '3098:115:3'
                },
                {
                  assignments: [2280],
                  declarations: [
                    {
                      constant: false,
                      id: 2280,
                      name: 'tc',
                      nodeType: 'VariableDeclaration',
                      overrides: null,
                      scope: 2301,
                      src: '3223:9:3',
                      stateVariable: false,
                      storageLocation: 'default',
                      typeDescriptions: {
                        typeIdentifier: 't_contract$_IERC20_$3685',
                        typeString: 'contract IERC20'
                      },
                      typeName: {
                        contractScope: null,
                        id: 2279,
                        name: 'IERC20',
                        nodeType: 'UserDefinedTypeName',
                        referencedDeclaration: 3685,
                        src: '3223:6:3',
                        typeDescriptions: {
                          typeIdentifier: 't_contract$_IERC20_$3685',
                          typeString: 'contract IERC20'
                        }
                      },
                      value: null,
                      visibility: 'internal'
                    }
                  ],
                  id: 2284,
                  initialValue: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        id: 2282,
                        name: 'tokenContract',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 2267,
                        src: '3242:13:3',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address'
                        }
                      ],
                      id: 2281,
                      name: 'IERC20',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3685,
                      src: '3235:6:3',
                      typeDescriptions: {
                        typeIdentifier: 't_type$_t_contract$_IERC20_$3685_$',
                        typeString: 'type(contract IERC20)'
                      }
                    },
                    id: 2283,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'typeConversion',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3235:21:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_contract$_IERC20_$3685',
                      typeString: 'contract IERC20'
                    }
                  },
                  nodeType: 'VariableDeclarationStatement',
                  src: '3223:33:3'
                },
                {
                  expression: {
                    argumentTypes: null,
                    arguments: [
                      {
                        argumentTypes: null,
                        arguments: [
                          {
                            argumentTypes: null,
                            arguments: [],
                            expression: {
                              argumentTypes: [],
                              id: 2288,
                              name: '_msgSender',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 2340,
                              src: '3286:10:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_internal_view$__$returns$_t_address_payable_$',
                                typeString:
                                  'function () view returns (address payable)'
                              }
                            },
                            id: 2289,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3286:12:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            }
                          },
                          {
                            argumentTypes: null,
                            arguments: [
                              {
                                argumentTypes: null,
                                arguments: [
                                  {
                                    argumentTypes: null,
                                    id: 2294,
                                    name: 'this',
                                    nodeType: 'Identifier',
                                    overloadedDeclarations: [],
                                    referencedDeclaration: -28,
                                    src: '3321:4:3',
                                    typeDescriptions: {
                                      typeIdentifier:
                                        't_contract$_ChainToken_$2311',
                                      typeString: 'contract ChainToken'
                                    }
                                  }
                                ],
                                expression: {
                                  argumentTypes: [
                                    {
                                      typeIdentifier:
                                        't_contract$_ChainToken_$2311',
                                      typeString: 'contract ChainToken'
                                    }
                                  ],
                                  id: 2293,
                                  isConstant: false,
                                  isLValue: false,
                                  isPure: true,
                                  lValueRequested: false,
                                  nodeType: 'ElementaryTypeNameExpression',
                                  src: '3313:7:3',
                                  typeDescriptions: {
                                    typeIdentifier: 't_type$_t_address_$',
                                    typeString: 'type(address)'
                                  },
                                  typeName: {
                                    id: 2292,
                                    name: 'address',
                                    nodeType: 'ElementaryTypeName',
                                    src: '3313:7:3',
                                    typeDescriptions: {
                                      typeIdentifier: null,
                                      typeString: null
                                    }
                                  }
                                },
                                id: 2295,
                                isConstant: false,
                                isLValue: false,
                                isPure: false,
                                kind: 'typeConversion',
                                lValueRequested: false,
                                names: [],
                                nodeType: 'FunctionCall',
                                src: '3313:13:3',
                                tryCall: false,
                                typeDescriptions: {
                                  typeIdentifier: 't_address',
                                  typeString: 'address'
                                }
                              }
                            ],
                            expression: {
                              argumentTypes: [
                                {
                                  typeIdentifier: 't_address',
                                  typeString: 'address'
                                }
                              ],
                              expression: {
                                argumentTypes: null,
                                id: 2290,
                                name: 'tc',
                                nodeType: 'Identifier',
                                overloadedDeclarations: [],
                                referencedDeclaration: 2280,
                                src: '3300:2:3',
                                typeDescriptions: {
                                  typeIdentifier: 't_contract$_IERC20_$3685',
                                  typeString: 'contract IERC20'
                                }
                              },
                              id: 2291,
                              isConstant: false,
                              isLValue: false,
                              isPure: false,
                              lValueRequested: false,
                              memberName: 'balanceOf',
                              nodeType: 'MemberAccess',
                              referencedDeclaration: 3630,
                              src: '3300:12:3',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_function_external_view$_t_address_$returns$_t_uint256_$',
                                typeString:
                                  'function (address) view external returns (uint256)'
                              }
                            },
                            id: 2296,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            kind: 'functionCall',
                            lValueRequested: false,
                            names: [],
                            nodeType: 'FunctionCall',
                            src: '3300:27:3',
                            tryCall: false,
                            typeDescriptions: {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256'
                            }
                          }
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_address_payable',
                              typeString: 'address payable'
                            },
                            {
                              typeIdentifier: 't_uint256',
                              typeString: 'uint256'
                            }
                          ],
                          expression: {
                            argumentTypes: null,
                            id: 2286,
                            name: 'tc',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 2280,
                            src: '3274:2:3',
                            typeDescriptions: {
                              typeIdentifier: 't_contract$_IERC20_$3685',
                              typeString: 'contract IERC20'
                            }
                          },
                          id: 2287,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          lValueRequested: false,
                          memberName: 'transfer',
                          nodeType: 'MemberAccess',
                          referencedDeclaration: 3639,
                          src: '3274:11:3',
                          typeDescriptions: {
                            typeIdentifier:
                              't_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$',
                            typeString:
                              'function (address,uint256) external returns (bool)'
                          }
                        },
                        id: 2297,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        kind: 'functionCall',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '3274:54:3',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        }
                      },
                      {
                        argumentTypes: null,
                        hexValue:
                          '436861696e546f6b656e205b7769746864726177546f6b656e735d20536f6d657468696e672077656e742077726f6e67207768696c65207472616e7366657272696e67',
                        id: 2298,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '3330:69:3',
                        subdenomination: null,
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_ea96bbab0904ff209030f97d9ee8abe5ad5abdb4afe9238b2945b33066725b53',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens] Something went wrong while transferring"'
                        },
                        value:
                          'ChainToken [withdrawTokens] Something went wrong while transferring'
                      }
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool'
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_ea96bbab0904ff209030f97d9ee8abe5ad5abdb4afe9238b2945b33066725b53',
                          typeString:
                            'literal_string "ChainToken [withdrawTokens] Something went wrong while transferring"'
                        }
                      ],
                      id: 2285,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [-18, -18],
                      referencedDeclaration: -18,
                      src: '3266:7:3',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure'
                      }
                    },
                    id: 2299,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '3266:134:3',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()'
                    }
                  },
                  id: 2300,
                  nodeType: 'ExpressionStatement',
                  src: '3266:134:3'
                }
              ]
            },
            documentation: null,
            functionSelector: '49df728c',
            id: 2302,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'withdrawTokens',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2268,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2267,
                  name: 'tokenContract',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2302,
                  src: '3056:21:3',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address'
                  },
                  typeName: {
                    id: 2266,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '3056:7:3',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '3055:23:3'
            },
            returnParameters: {
              id: 2269,
              nodeType: 'ParameterList',
              parameters: [],
              src: '3088:0:3'
            },
            scope: 2311,
            src: '3032:375:3',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'external'
          },
          {
            body: {
              id: 2309,
              nodeType: 'Block',
              src: '3468:28:3',
              statements: [
                {
                  expression: {
                    argumentTypes: null,
                    hexValue: '7631',
                    id: 2307,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'string',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '3485:4:3',
                    subdenomination: null,
                    typeDescriptions: {
                      typeIdentifier:
                        't_stringliteral_0984d5efd47d99151ae1be065a709e56c602102f24c1abc4008eb3f815a8d217',
                      typeString: 'literal_string "v1"'
                    },
                    value: 'v1'
                  },
                  functionReturnParameters: 2306,
                  id: 2308,
                  nodeType: 'Return',
                  src: '3478:11:3'
                }
              ]
            },
            documentation: null,
            functionSelector: '54fd4d50',
            id: 2310,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'version',
            nodeType: 'FunctionDefinition',
            overrides: null,
            parameters: {
              id: 2303,
              nodeType: 'ParameterList',
              parameters: [],
              src: '3429:2:3'
            },
            returnParameters: {
              id: 2306,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 2305,
                  name: '',
                  nodeType: 'VariableDeclaration',
                  overrides: null,
                  scope: 2310,
                  src: '3453:13:3',
                  stateVariable: false,
                  storageLocation: 'memory',
                  typeDescriptions: {
                    typeIdentifier: 't_string_memory_ptr',
                    typeString: 'string'
                  },
                  typeName: {
                    id: 2304,
                    name: 'string',
                    nodeType: 'ElementaryTypeName',
                    src: '3453:6:3',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage_ptr',
                      typeString: 'string'
                    }
                  },
                  value: null,
                  visibility: 'internal'
                }
              ],
              src: '3452:15:3'
            },
            scope: 2311,
            src: '3413:83:3',
            stateMutability: 'pure',
            virtual: false,
            visibility: 'public'
          }
        ],
        scope: 2312,
        src: '800:2698:3'
      }
    ],
    src: '0:3499:3'
  },
  compiler: {
    name: 'solc',
    version: '0.6.2+commit.bacdbe57.Emscripten.clang'
  },
  networks: {
    1: {
      links: {},
      events: {},
      address: '0xC4C2614E694cF534D407Ee49F8E44D125E4681c4',
      updated_at: 1597748333515
    },
    3: {
      links: {},
      events: {},
      address: '0xAbE6da305B53683D4e7904AF7912558770fBE212',
      updated_at: 1597746013954
    },
    42: {
      links: {},
      events: {},
      address: '0xcc986742BA5c88bD5c5551378dB1096b431286b9',
      updated_at: 1598876206865
    }
  },
  schemaVersion: '3.2.2',
  updatedAt: '2020-09-02T05:01:29.693Z',
  devdoc: {
    details:
      '{ERC20} token, including: *  - ability for holders to burn (destroy) their tokens - a pauser role that allows to stop all token transfers * This contract uses {AccessControl} to lock permissioned functions using the different roles - head to its documentation for details. * The account that deploys the contract will be granted the minter and pauser roles, as well as the default admin role, which will let it grant both minter and pauser roles to aother accounts',
    methods: {
      'allowance(address,address)': {
        details: 'See {IERC20-allowance}.'
      },
      'approve(address,uint256)': {
        details:
          'See {IERC20-approve}.     * Requirements:     * - `spender` cannot be the zero address.'
      },
      'balanceOf(address)': {
        details: 'See {IERC20-balanceOf}.'
      },
      'burn(uint256)': {
        details:
          'Destroys `amount` tokens from the caller.     * See {ERC20-_burn}.'
      },
      'burnFrom(address,uint256)': {
        details:
          "Destroys `amount` tokens from `account`, deducting from the caller's allowance.     * See {ERC20-_burn} and {ERC20-allowance}.     * Requirements:     * - the caller must have allowance for ``accounts``'s tokens of at least `amount`."
      },
      'decimals()': {
        details:
          'Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`).     * Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is called.     * NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.'
      },
      'decreaseAllowance(address,uint256)': {
        details:
          'Atomically decreases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.'
      },
      'getRoleAdmin(bytes32)': {
        details:
          "Returns the admin role that controls `role`. See {grantRole} and {revokeRole}.     * To change a role's admin, use {_setRoleAdmin}."
      },
      'getRoleMember(bytes32,uint256)': {
        details:
          'Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive.     * Role bearers are not sorted in any particular way, and their ordering may change at any point.     * WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.'
      },
      'getRoleMemberCount(bytes32)': {
        details:
          'Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.'
      },
      'grantRole(bytes32,address)': {
        details:
          "Grants `role` to `account`.     * If `account` had not been already granted `role`, emits a {RoleGranted} event.     * Requirements:     * - the caller must have ``role``'s admin role."
      },
      'hasRole(bytes32,address)': {
        details: 'Returns `true` if `account` has been granted `role`.'
      },
      'increaseAllowance(address,uint256)': {
        details:
          'Atomically increases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address.'
      },
      'initialize(string,string,uint8,uint256)': {
        details:
          'Grants `DEFAULT_ADMIN_ROLE` and `PAUSER_ROLE` to the account that deploys the contract.     * See {ERC20-constructor}.'
      },
      'name()': {
        details: 'Returns the name of the token.'
      },
      'pause()': {
        details:
          'Pauses all token transfers.     * See {ERC20Pausable} and {Pausable-_pause}.     * Requirements:     * - the caller must have the `PAUSER_ROLE`.'
      },
      'paused()': {
        details: 'Returns true if the contract is paused, and false otherwise.'
      },
      'renounceRole(bytes32,address)': {
        details:
          "Revokes `role` from the calling account.     * Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced).     * If the calling account had been granted `role`, emits a {RoleRevoked} event.     * Requirements:     * - the caller must be `account`."
      },
      'revokeRole(bytes32,address)': {
        details:
          "Revokes `role` from `account`.     * If `account` had been granted `role`, emits a {RoleRevoked} event.     * Requirements:     * - the caller must have ``role``'s admin role."
      },
      'symbol()': {
        details:
          'Returns the symbol of the token, usually a shorter version of the name.'
      },
      'totalSupply()': {
        details: 'See {IERC20-totalSupply}.'
      },
      'transfer(address,uint256)': {
        details:
          'See {IERC20-transfer}.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.'
      },
      'transferFrom(address,address,uint256)': {
        details:
          "See {IERC20-transferFrom}.     * Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20};     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `amount`. - the caller must have allowance for ``sender``'s tokens of at least `amount`."
      },
      'unpause()': {
        details:
          'Unpauses all token transfers.     * See {ERC20Pausable} and {Pausable-_unpause}.     * Requirements:     * - the caller must have the `PAUSER_ROLE`.'
      }
    }
  },
  userdoc: {
    methods: {}
  }
};
