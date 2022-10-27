const amqplib = require("amqplib");

const amqp_url_cloud =
  "amqps://dhtiitdn:qysTsYbirGh1OUrSbDDCFqJVf94S7klj@armadillo.rmq.cloudamqp.com/dhtiitdn";

const postVideo = async ({ msg }) => {
  try {
    // 1. create connect
    const conn = await amqplib.connect(amqp_url_cloud);
    // 2. create chanel
    const channel = await conn.createChannel();
    // 3. create exchange
    // rabbitMQ has 4 exchange
    // exchange is where share mess to consumer from producer, do not change direactory producer->consumer
    const nameExchange = "video";

    await channel.assertExchange(nameExchange, "fanout", {
      durable: true,
    });

    // 4. Publish video
    await channel.publish(nameExchange, "", Buffer.from(msg));

    console.log(`Send ok :::${msg}`);

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log(error.message);
  }
};

const msg = process.argv.slice(2).join(" ") || "Video1";

postVideo({ msg });
