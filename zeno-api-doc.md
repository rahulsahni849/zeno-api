
# API docs
#### #1 endpoint: https://zeno-zkp-api.onrender.com/api/v1/zkp/contract
```
method: post
```
-----
    body:
    {
        "chainId":"chain id",
        "contractAddress":"contract address related to this chain"
    }

    example-body:
    {
        "chainId":"1",
        "contractAddress":["asdfsdfs","asdfsdf","rahul","asdfs","test"]
    }

-----

    Response-params:
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }

    example-response:
    {
    "status": 201,
    "data": {
        "chainId": "1",
        "contractAddress": [
            "asdfsdfs",
            "asdfsdf",
            "rahul",
            "asdfs",
            "test"
        ],
        "_id": "63ed5f7db76388c86961e547",
        "createdOn": "2023-02-15T22:41:01.177Z",
        "__v": 0
    },
    "message": "Chain Successfully saved"
    }
    
-------

#### #2 endpoint: https://zeno-zkp-api.onrender.com/api/v1/zkp/contract/1
```
method: get
params: chainId
```
-------

    Response-params:
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }

    example-response:
    {
        "status": 200,
        "data": {
            "_id": "63ed594535fc6f968f6c4276",
            "chainId": "1",
            "contractAddress": [
                "test",
                "asdfsdfs",
                "asdfsdf",
                "rahul",
                "asdfs"
            ],
            "createdOn": "2023-02-15T22:14:29.099Z",
            "__v": 1
        },
        "message": "Chain found"
    }
    
------------------------------------------------------------------------------------------------------


#### #3 endpoint: https://zeno-zkp-api.onrender.com/api/v1/zkp/token
```
method: post
```
---------
    body:
    {
        "walletAddress":"wallet address hash",
        "tokenClaim":"token hash",
        "panCardHash":"pan card hash",
        "aadharCardHash":"aadhar card hash",
        "chains":"Chain ids"
    }

    example-body:
    {
        "walletAddress":"0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6",
        "tokenClaim":"asdfsfd",
        "panCardHash":"asdfsdfs",
        "aadharCardHash":"asdfsdfs",
        "chains":[
            {
                "chainId":1,
                "port":false,
                "clone":false
            },
            {
                "chainId":61,
                "port":false,
                "clone":false
            }
        ]
    }

---------

    Response-params:
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"

    }

    example-response:
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
    
--------

#### #4 endpoint: https://zeno-zkp-api.onrender.com/api/v1/zkp/token/0x7D04d2EdC058a1afc761d9C99aE4fc5C85d4c8a6
```
method: get
params: walletAddress
```
    Response-params:
    {
        status:"status code",
        data:"result object",
        message:"any descriptive message"
    }
```
    example-response:
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
