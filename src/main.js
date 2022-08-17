import { db } from "./store";

const getCollection = async () => (await db()).collection;

const getFirstDataItem = async () => {
  const collection = await getCollection();
  return (await collection.findOne().exec())?.data[0];
};

(async () => {
  console.log("before", await getFirstDataItem());
  const collection = await getCollection();
  const doc = await collection.upsert({
    id: "0",
    data: [],
  });
  // doc.data = [1, 2]; // Throws DOC16 as expected
  doc.data[0] = ["Why is this saved?"]; // (Unexpectedly) successfully stored
  console.log("after", await getFirstDataItem());
})();
