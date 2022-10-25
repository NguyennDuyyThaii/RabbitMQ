const amqplib = require('amqplib')

const amqp_url_cloud = 'amqps://dhtiitdn:qysTsYbirGh1OUrSbDDCFqJVf94S7klj@armadillo.rmq.cloudamqp.com/dhtiitdn'

const amqp_url_docker = ''

const sendQueue = async ({msg}) => {
    try {
        // 1. create connect
        const conn = await amqplib.connect(amqp_url_cloud)
        // 2. create chanel
        const chanel = await conn.createChannel()
        // 3. create name queue
        const nameQueue = 'q1'
        // 4. create queue
        await chanel.assertQueue(nameQueue, {
            durable: false
        })
        // 5. send to queue, using buffer to encode
        await chanel.sendToQueue(nameQueue, Buffer.from(msg))
        // 6. close conn and channel
    } catch (error) {
        console.log('Error::', error.message)
    }
}

const msg = process.argv.slice(2).join('') || 'Hello'

process.argv = [
    // bin.node
    // path
    // messs
    // vd la node x.js hello
]

sendQueue({msg})