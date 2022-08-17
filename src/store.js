import { addRxPlugin, createRxDatabase } from "rxdb";
import { getRxStorageLoki } from "rxdb/plugins/lokijs";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import LokiIncrementalIndexedDBAdapter from "lokijs/src/incremental-indexeddb-adapter";

addRxPlugin(RxDBUpdatePlugin);
let dbPromise = null;

const schema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    data: {
      items: {
        type: "string",
      },
    },
  },
};

const _create = async () => {
  console.log("creating");
  const db = await createRxDatabase({
    name: "bdb",
    storage: getRxStorageLoki({
      adapter: new LokiIncrementalIndexedDBAdapter(),
    }),
  });
  await db.addCollections({
    collection: { schema },
  });
  dbPromise = db;
  return db;
};

export const db = () => (dbPromise ? dbPromise : _create());
