//@ts-check

const hashObject = require('object-hash');
const fetch = require('node-fetch');

// CHECK FOR NEW SHOWS
// -------------------
//
// Fetches the current shows from the aboss api and compares it with a hash
// of the previous state. If the object changed the subscribers will be notified.
// Meant to be run in a cron job to trigger a new build when shows are changed/added/removed.

// TYPE DEFINITIONS
// ----------------

/** @typedef {{ name: string; date: Date }} Show */
/** @typedef {{ changed: boolean; currentHash: string }} Context */
/** @typedef {() => Promise<void>} Subscriber */

// SUBSCRIBERS
// -----------

async function triggerBuild() {
  // TODO
  console.log('Build triggered');
}

/** @type {Subscriber[]} */
const subscribers = [triggerBuild];

// UTILITY FUNCTIONS
// -----------------

/** @type {() => Promise<Show[]>} */
async function fetchShows() {
  // TODO
  return [
    {
      name: 'show-1',
      date: new Date('1990-10-22'),
    },
  ];
}

/** @type {() => Promise<string | null>} */
async function getPreviousHash() {
  // TODO
  return null;
}

/** @type {(hash: string) => Promise<void>} */
async function storeHash(hash) {
  // TODO
  return;
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
  }
}

// MAIN FUNCTION
// -------------

async function checkForNewShows() {
  const { changed, currentHash } = await getCurrentContext();

  if (changed)  {
    await Promise.all([
      storeHash(currentHash),
      ...subscribers.map((notify) => notify()),
    ]);
  }
}

checkForNewShows();