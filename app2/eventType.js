import avro from "avsc";

export default avro.Type.forSchema({
  type: "record",
  fields: [
    { name: "id", type: "string" },
    { name: "type", type: "string" },
    { name: "timestamp", type: "string" },
    { name: "data", type: "string" },
  ],
});
