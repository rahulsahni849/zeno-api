# zeno-api

Api service for Zeno-verify.

# API docs

### #1 endpoint: https://<server_address>/api/v1/zkp/contract

```
method: post
```

---

> body :

```json
{
  "chainId": "chain id",
  "contractAddress": "contract address related to this chain"
}
```

> example-body :

```json
{
  "chainId": "1",
  "contractAddress": ["asdfsdfs", "asdfsdf", "rahul", "asdfs", "test"]
}
```

---

> Response-params :

```js
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }
```

> example-response :

```json
{
  "status": 201,
  "data": {
    "chainId": "1",
    "contractAddress": ["asdfsdfs", "asdfsdf", "rahul", "asdfs", "test"],
    "_id": "63ed5f7db76388c86961e547",
    "createdOn": "2023-02-15T22:41:01.177Z",
    "__v": 0
  },
  "message": "Chain Successfully saved"
}
```

---

### #2 endpoint: https://<server_address>/api/v1/zkp/contract/1

```
method: get
params: chainId
```

---

> Response-params :

```js
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }
```

> example-response :

```json
{
  "status": 200,
  "data": {
    "_id": "63ed594535fc6f968f6c4276",
    "chainId": "1",
    "contractAddress": ["test", "asdfsdfs", "asdfsdf", "rahul", "asdfs"],
    "createdOn": "2023-02-15T22:14:29.099Z",
    "__v": 1
  },
  "message": "Chain found"
}
```

---

### #3 endpoint: https://<server_address>/api/v1/zkp/token

```
method: post
```

---

> body :

```json
{
  "walletAddress": "wallet address hash",
  "tokenClaim": "token hash",
  "panCardHash": "pan card hash",
  "aadharCardHash": "aadhar card hash",
  "chains": "Chain ids"
}
```

> example-body :

```json
{
  "walletAddress": "0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6",
  "tokenClaim": "asdfsfd",
  "panCardHash": "asdfsdfs",
  "aadharCardHash": "asdfsdfs",
  "chains": [
    {
      "chainId": 1,
      "port": false,
      "clone": false
    },
    {
      "chainId": 61,
      "port": false,
      "clone": false
    }
  ]
}
```

> Response-params:

```js
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }
```

> example-response:

```json
{
  "status": 201,
  "data": {
    "walletAddress": "0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6",
    "tokenClaim": "asdfsfd",
    "panCardHash": "asdfsdfs",
    "aadharCardHash": "asdfsdfs",
    "_id": "63ed59cd35fc6f968f6c4286",
    "createdOn": "2023-02-15T22:16:45.091Z",
    "expiryDate": "2023-02-15T22:17:05.091Z",
    "chains": [
      {
        "chainId": "1",
        "port": false,
        "clone": false
      },
      {
        "chainId": "61",
        "port": false,
        "clone": false
      }
    ],
    "__v": 0
  },
  "message": "Token Successfully saved"
}
```

---

### #4 endpoint: https://<server_address>/api/v1/zkp/token/0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6

```
method: get
params: walletAddress

```

> Response-params:

```js
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"
    }
```

> example-response:

```json
{
  "status": 200,
  "data": {
    "_id": "63ed59cd35fc6f968f6c4286",
    "walletAddress": "0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6",
    "tokenClaim": "asdfsfd",
    "panCardHash": "asdfsdfs",
    "aadharCardHash": "asdfsdfs",
    "createdOn": "2023-02-15T22:16:45.091Z",
    "expiryDate": "2023-02-15T22:17:05.091Z",
    "chains": [
      {
        "chainId": "1",
        "port": false,
        "clone": false
      },
      {
        "chainId": "61",
        "port": false,
        "clone": false
      }
    ],
    "__v": 0
  },
  "message": "Token found"
}
```

---

# How to run locally

1. Clone the repo

```
git clone
```

2. Install dependencies

```
npm install
```

3. Run the server

```
npm start
```

4. Run the server in dev mode

```
npm run dev
```

---

# Contributing

Contributions are always welcome!

Please ⭐️ this repo and share it with others
