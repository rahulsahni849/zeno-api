"use strict";
// const { MongoClient } = require("mongodb");
// import dotenv from 'dotenv';
// import path = require('path');
// dotenv.config({ path:path.resolve(__dirname+'/../../.env')})
// const connectionString = process.env["ISDEVELOPMENT"]?process.env["PROD_DB_URL"]:process.env["PROD_DB_URL"];
// console.log(connectionString)
// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
// });
// let dbConnection: any;
// // let db_url:any = process.env["ISDEVELOPMENT"]?process.env["V_DB_URL"]:process.env["PROD_DB_URL"]
// // console.log(db_url)
// // mongoose.set('strictQuery', false);
// // mongoose.connect(db_url,
// //       {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true
// //       } as ConnectOptions
// //       ,(err)=>{
// //         try{
// //           if(err)
// //             throw err
// //           console.log("db got connected!")
// //         }catch(e){
// //           console.log("error",e)
// //     }}
// // );
//   export function connectToServer () {
//     // console.log(client)
//     client.connect(function (err:any, db:any) {
//       if (err || !db) {
//         console.log("No able to connect!")
//         return;
//       }
//       dbConnection = db.db("zeno-database");
//       console.log("Successfully connected to MongoDB.");
//     });
//   }
//   export function getDb() {
//     return dbConnection;
//   }
