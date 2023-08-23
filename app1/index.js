// @ts-check

import express from "express";
import Kafka from "node-rdkafka";

const app = express();

const kafka = new Kafka.KafkaConsumer(
  {
    "client.id": "my-app-1",
    "group.id": "test-group",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

const listenKafka = async () => {
  kafka.connect();
  kafka
    .on("ready", () => {
      kafka.subscribe(["topic_51"]);
      kafka.consume();
      console.log("Listening Kafka");
    })
    .on("data", (data) => {
      console.log("Message from Kafka", data.value.toString());
    })
    .on("event.error", (err) => {
      console.error("Error from Kafka", err);
    })
    .on("event.log", (log) => {
      console.log("Log from Kafka", log);
    });
};

app.get("/", async (req, res) => {
  const data = {
    message: "Hello World App1",
  };

  const producer = Kafka.Producer.createWriteStream(
    {
      "metadata.broker.list": "localhost:9092",
    },
    {},
    {
      topic: "topic_52",
    }
  );

  const responseStream = producer.write(JSON.stringify(data));

  if (responseStream) {
    console.log("Message sent to Kafka");
  } else {
    console.error("Error sending message to Kafka");
  }

  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  listenKafka().catch((err) => {
    console.error("Error listening Kafka", err);
  });
});
