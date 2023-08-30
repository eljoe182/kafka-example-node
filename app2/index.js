// @ts-check

import express from "express";
import Kafka from "node-rdkafka";
import eventType from "./eventType.js";

const app = express();

const kafka = new Kafka.KafkaConsumer(
  {
    "client.id": "my-app-2",
    "group.id": "test-app",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

const listenKafka = async () => {
  kafka.connect();
  kafka
    .on("ready", () => {
      kafka.subscribe(["topic_52"]);
      kafka.consume();
      console.log("Listening Kafka");
    })
    .on("data", (data) => {
      console.log("Message from Kafka", eventType.fromBuffer(data.value));
    }).on("event.error", (err) => {
      console.error("Error from Kafka", err);
    }).on("event.log", (log) => {
      console.log("Log from Kafka", log);
    })
};

app.get("/", async (req, res) => {
  const data = {
    id: "1",
    type: "test",
    timestamp: new Date().toISOString(),
    data: "test data app2",
  };

  const producer = Kafka.Producer.createWriteStream(
    {
      "metadata.broker.list": "localhost:9092",
    },
    {},
    {
      topic: "topic_51",
    }
  );

  const responseStream = producer.write(eventType.toBuffer(data));

  if (responseStream) {
    console.log("Message sent to Kafka");
  } else {
    console.error("Error sending message to Kafka");
  }

  res.send(data);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
  listenKafka().catch((err) => {
    console.error("Error listening Kafka", err);
  });
});
