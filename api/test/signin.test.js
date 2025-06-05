import assert from 'assert';
import { getUserByEmailPassword, handleSignIn } from '../controllers/signin.js';

const mockUser = { id: 1, email: 'test@example.com', name: 'Tester' };
const loginRecord = { hash: 'hashed' };

function createDb(passwordMatch = true) {
  return {
    select() {
      return {
        from: (table) => ({
          where: () => ({
            then: (cb) => Promise.resolve(cb([table === 'login' ? loginRecord : mockUser]))
          })
        })
      };
    },
  };
}

function createBcrypt(passwordMatch = true) {
  return {
    compare: async () => passwordMatch,
  };
}

async function runTests() {
  // Successful retrieval
  const user = await getUserByEmailPassword('test@example.com', 'secret', createDb(true), createBcrypt(true));
  assert.deepStrictEqual(user, mockUser, 'should return user when password is valid');

  // Failed retrieval
  let threw = false;
  try {
    await getUserByEmailPassword('test@example.com', 'bad', createDb(true), createBcrypt(false));
  } catch (err) {
    threw = true;
  }
  assert.ok(threw, 'should throw when password is invalid');

  // handleSignIn success
  const reqSucc = { body: { email: 'test@example.com', password: 'secret' } };
  let jsonResp;
  const resSucc = {
    json: (obj) => { jsonResp = obj; },
    status: () => ({ json: () => {} }),
  };
  const handlerSucc = await handleSignIn(createDb(true), createBcrypt(true));
  await handlerSucc(reqSucc, resSucc);
  assert.deepStrictEqual(jsonResp.user, mockUser, 'handler should send user on success');

  // handleSignIn failure
  const reqFail = { body: { email: 'test@example.com', password: 'bad' } };
  let statusCode;
  let jsonFail;
  const resFail = {
    status: (code) => { statusCode = code; return { json: (obj) => { jsonFail = obj; } }; },
    json: () => {},
  };
  const handlerFail = await handleSignIn(createDb(true), createBcrypt(false));
  await handlerFail(reqFail, resFail);
  assert.strictEqual(statusCode, 400, 'handler should respond with 400 on failure');
  assert.strictEqual(jsonFail.error, 'invalid credentials', 'handler should send error message');

  console.log('All tests passed');
}

runTests();
