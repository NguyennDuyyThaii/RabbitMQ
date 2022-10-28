const amqplib = require("amqplib");

const amqp_url_cloud =
  "amqps://dhtiitdn:qysTsYbirGh1OUrSbDDCFqJVf94S7klj@armadillo.rmq.cloudamqp.com/dhtiitdn";
  const amqp_url_docker = 'amqp://localhost:5672'
const receiveQueue = async () => {
  try {
    // 1. create connect
    const conn = await amqplib.connect(amqp_url_docker);
    // 2. create chanel
    const channel = await conn.createChannel();
    // 3. create name queue
    const nameQueue = "q1";
    // 4. create queue
    await channel.assertQueue(nameQueue, {
      durable: true, // producer true, thi ben nay cung phai true
    });
    // 5. send to queue, using buffer to encode
    await channel.consume(
      nameQueue,
      (msg) => {
        console.log(`Msg::::`, msg.content.toString());
      },
      {
        noAck: true, // confirm message is receive, else process continue
      }
    );
    // 6. close conn and channel
  } catch (error) {
    console.log("Error::", error.message);
  }
};

receiveQueue();
