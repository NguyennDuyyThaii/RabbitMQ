const amqplib = require("amqplib");

const amqp_url_cloud =
  "amqps://dhtiitdn:qysTsYbirGh1OUrSbDDCFqJVf94S7klj@armadillo.rmq.cloudamqp.com/dhtiitdn";

const Express = async () => {
  try {
    // 1. create connect
    const conn = await amqplib.connect(amqp_url_cloud);
    // 2. create chanel
    const channel = await conn.createChannel();
    // 3. create exchange
    // rabbitMQ has 4 exchange
    // exchange is where share mess to consumer from producer, do not change direactory producer->consumer
    const nameExchange = "nodejs#";

    await channel.assertExchange(nameExchange, "topic", {
      durable: true,
    });

    // 4. Publish video
    const { queue } = await channel.assertQueue("", {
        exclusive: true // nhung th không còn connect đến thì sẽ không đc gửi mes đến để tiêu thụ, nó sẽ tự động xóa, tránh lãng phí
    });

    console.log(`expressQueue:::: ${queue}`);

    // 5. binding: moi quan he giua exchange vs queue goi la binding
    // hieu non na no o giua
    await channel.bindQueue(queue, nameExchange, ""); // tham so thu 3 la dieu kien

    await channel.consume(queue, (msg) => {
      console.log("msg::", msg.content.toString());
    }, {
        noAck: true
    });
  } catch (error) {
    console.log(error.message);
  }
};

Express();
