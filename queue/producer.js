const amqplib = require("amqplib");

const amqp_url_cloud =
  "amqps://dhtiitdn:qysTsYbirGh1OUrSbDDCFqJVf94S7klj@armadillo.rmq.cloudamqp.com/dhtiitdn";

const amqp_url_docker = 'amqp://localhost:5672'

const sendQueue = async ({ msg }) => {
  try {
    // 1. create connect
    const conn = await amqplib.connect(amqp_url_cloud);
    // 2. create chanel
    const channel = await conn.createChannel();
    // 3. create name queue
    const nameQueue = "q1";
    // 4. create queue
    await channel.assertQueue(nameQueue, {
      durable: false, // khi start lai thi queue khong mat message
      
    });
    // 5. send to queue, using buffer to encode
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      // durable: true ma không có persistent thì nó cũng không hiện ra để lấy đâu
      persistent: true, // luu cai queue vao cake hoac disk, mac dinh se lay cake ra de su ly
      //expiration: '10000' // TTL
    });
    // 6. close conn and channel
  } catch (error) {
    console.log("Error::", error.message);
  }
};

const msg = process.argv.slice(2).join("") || "Hello";

process.argv = [
  // bin.node
  // path
  // messs
  // vd la node x.js hello
];

sendQueue({ msg });
