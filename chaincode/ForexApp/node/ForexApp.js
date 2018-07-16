/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {
 
  async Init(stub) {
    return shim.success();
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async initLedger(stub, args) {
    let users = [];
    users.push({
      uid: 'user1',
      name: 'user1',
      pwd: 'user1'
    });
    users.push({
      uid: 'user2',
      name: 'user2',
      pwd: 'user2'
    });
    users.push({
      uid: 'user3',
      name: 'user3',
      pwd: 'user3'
    });
    let credits = [];
    credits.push({
      currencytype: 'HKD',
      data: '[ {"User": "USER1","Amount": "10000"}, {"User": "USER2","Amount": "20000"}]'
    });
    credits.push({
      currencytype: 'JPY',
      data: '[ {"User": "USER1","Amount": "10000"}, {"User": "USER2","Amount": "20000"}]'
    });
    credits.push({
      currencytype: 'STR',
      data: '[ {"User": "USER1","Amount": "10000"}, {"User": "USER2","Amount": "20000"}]'
    });

    let trans = [];
    trans.push({
      transid: 'trans1',
      from: 'user1',
      to: 'user2',
      fromCurrency: 'HKD',
      toCurrency: 'JPY',
      amount: '5000',
      rate: '8',
      status: 'makeorder',
      QRdata: 'QRdata1'
    });
    trans.push({
      transid: 'trans2',
      from: 'user1',
      to: 'user2',
      fromCurrency: 'HKD',
      toCurrency: 'JPY',
      amount: '5000',
      rate: '9',
      status: 'makeorder',
      QRdata: 'QRdata2'
    });
    trans.push({
      transid: 'trans3',
      from: 'user1',
      to: 'user2',
      fromCurrency: 'HKD',
      toCurrency: 'JPY',
      amount: '5000',
      rate: '8',
      status: 'makeorder',
      QRdata: 'QRdata3'
    });
   
    for (let i = 0; i < users.length; i++) {
      users[i].docType = 'user';
      await stub.putState('USER' + i, Buffer.from(JSON.stringify(users[i])));
      console.info('Added <--> ', users[i]);
    }
    for (let i = 0; i < credits.length; i++) {
      credits[i].docType = 'credits';
      await stub.putState('CREDIT' + i, Buffer.from(JSON.stringify(credits[i])));
      console.info('Added <--> ', credits[i]);
    }
    for (let i = 0; i < trans.length; i++) {
      trans[i].docType = 'trans';
      await stub.putState('TRANS' + i, Buffer.from(JSON.stringify(trans[i])));
      console.info('Added <--> ', trans[i]);
    }
  }

  async createTrans(stub, args) {
    console.info('============= START : Create Transactions ===========');
    if (args.length != 10) {
      throw new Error('Incorrect number of arguments. Expecting 10');
    }

    var tran = {
      docType: 'trans',
      transid: args[1],
      from: args[2],
      to: args[3],
      fromCurrency: args[4],
      toCurrency: args[5],
      amount: args[6],
      rate: args[7],
      status: args[8],
      QRdata: args[9]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(tran)));
    console.info('============= END : Create Transactions ===========');
  }
  async completeTrans(stub, args) {
    console.info('============= START : Complete Transactions ===========');
    if (args.length != 10) {
      // ['TRANS3','transid','from','to','fromCurrency','toCurrency','amount','rate','status','QRdata']
      throw new Error('Incorrect number of arguments. Expecting 10');
    }

    var tran = {
      docType: 'trans',
      transid: args[1],
      from: args[2],
      to: args[3],
      fromCurrency: args[4],
      toCurrency: args[5],
      amount: args[6],
      rate: args[7],
      status: 'completeOrder',
      QRdata: args[9]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(tran)));
    console.info('============= END : Complete Transactions ===========');
  }

  async acceptTrans(stub, args) {
    console.info('============= START : Accept Transactions ===========');
    if (args.length != 10) {
      // ['TRANS3','transid','from','to','fromCurrency','toCurrency','amount','rate','status','QRdata']
      throw new Error('Incorrect number of arguments. Expecting 10');
    }

    var tran = {
      docType: 'trans',
      transid: args[1],
      from: args[2],
      to: args[3],
      fromCurrency: args[4],
      toCurrency: args[5],
      amount: args[6],
      rate: args[7],
      status: 'acceptOrder',
      QRdata: args[9]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(tran)));
    console.info('============= END : Accept Transactions ===========');
  }

  async makeTrans(stub, args) {
    console.info('============= START : Make Transactions ===========');
    if (args.length != 10) {
      // ['TRANS3','transid','from','to','fromCurrency','toCurrency','amount','rate','status','QRdata']
      throw new Error('Incorrect number of arguments. Expecting 10');
    }

    var tran = {
      docType: 'trans',
      transid: args[1],
      from: args[2],
      to: args[3],
      fromCurrency: args[4],
      toCurrency: args[5],
      amount: args[6],
      rate: args[7],
      status: 'makeOrder',
      QRdata: args[9]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(tran)));
    console.info('============= END : Make Transactions ===========');
  }

  async createUser(stub, args) {
    console.info('============= START : Create User ===========');
    if (args.length != 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
    }

    var user = {
      docType: 'user',
      uid: args[1],
      name: args[2],
      pwd: args[3]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(user)));
    console.info('============= END : Create User ===========');
  }
   
  async queryAllTrans(stub, args) {

    let startKey = 'TRANS0';
    let endKey = 'TRANS999';

    let iterator = await stub.getStateByRange(startKey, endKey);

    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return Buffer.from(JSON.stringify(allResults));
      }
    }
  }

  async queryTran(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting Transaction ID ex: TRANS1');
    }
    let trans = args[0];

    let transAsBytes = await stub.getState(trans); 
    if (!transAsBytes || transAsBytes.toString().length <= 0) {
      throw new Error(trans + ' does not exist: ');
    }
    console.log(transAsBytes.toString());
    return transAsBytes;
  }

  async changeCarOwner(stub, args) {
    console.info('============= START : changeCarOwner ===========');
    if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
    }

    let carAsBytes = await stub.getState(args[0]);
    let car = JSON.parse(carAsBytes);
    car.owner = args[1];

    await stub.putState(args[0], Buffer.from(JSON.stringify(car)));
    console.info('============= END : changeCarOwner ===========');
  }
};

shim.start(new Chaincode());
