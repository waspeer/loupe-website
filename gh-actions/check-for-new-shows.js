//@ts-check
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const upstash = require('@upstash/redis');
const { default: fetch } = require('node-fetch');
const hashObject = require('object-hash');

// CHECK FOR NEW SHOWS
// -------------------
//
// Fetches the current shows from the aboss api and compares it with a hash
// of the previous state. If the object changed the subscribers will be notified.
// Meant to be run in a cron job to trigger a new build when shows are changed/added/removed.

const ABOSS_URL = process.env.ABOSS_URL;
const ABOSS_TOKEN = process.env.ABOSS_TOKEN;
const NETLIFY_HOOK = process.env.NETLIFY_HOOK;

const TWO_DAYS = 60 * 60 * 24 * 2;
const REDIS_KEY = 'loupe:aboss-hash'

// TYPE DEFINITIONS
// ----------------

/** @typedef {{ name: string; date: Date }} Show */
/** @typedef {{ changed: boolean; currentHash: string }} Context */
/** @typedef {() => Promise<void>} Subscriber */

// SUBSCRIBERS
// -----------

async function triggerBuild() {
  await fetch(NETLIFY_HOOK, { method: 'POST' });
}

/** @type {Subscriber[]} */
const subscribers = [triggerBuild];

// UTILITY FUNCTIONS
// -----------------

/** @type {() => Promise<Show[]>} */
async function fetchShows() {
  return await fetch(ABOSS_URL, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${ABOSS_TOKEN}`,
    },
  }).then((response) => {
    return /** @type {Promise<Show[]>} */ (response.json());
  });
}

/** @type {() => Promise<string | null>} */
async function getPreviousHash() {
  const { data, error } = await upstash.get(REDIS_KEY);

  if (error) {
    throw new Error(error);
  }

  return data;
}

/** @type {(hash: string) => Promise<void>} */
async function storeHash(hash) {
  const { error } = await upstash.setex(REDIS_KEY, TWO_DAYS, hash);

  if (error) {
    throw new Error(error);
  }
}

/** @type {() => Promise<Context>} */
async function getCurrentContext() {
  const previousHash = await getPreviousHash();
  const shows = await fetchShows();
  const showsHash = hashObject(shows);
  const changed = showsHash !== previousHash;

  return {
    changed,
    currentHash: changed ? showsHash : previousHash,
  };
}

// MAIN FUNCTION
// -------------

async function checkForNewShows() {
  const { changed, currentHash } = await getCurrentContext();

  if (changed) {
    console.log('Change detected, notifying subscribers...');
    await Promise.all([storeHash(currentHash), ...subscribers.map((notify) => notify())]);
  } else {
    console.log('No change detected');
  }
}

checkForNewShows();
