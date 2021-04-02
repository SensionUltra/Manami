const redis = require('redis')
const { redisString } = require('@root/token.json')
module.exports = async () => {
  return await new Promise((resolve, reject) => {
    const client = redis.createClient({
      url: redisString,
    })

    client.on('error', (err) => {
      console.error('Redis error:', err)
      client.quit()
      reject(err)
    })

    client.on('ready', () => {
      resolve(client)
    })
  })
}

module.exports.expire = (callback) => {
  const expired = () => {
    const sub = redis.createClient({ url: redisString })
    sub.subscribe('__keyevent@0__:expired', () => {
      sub.on('message', (channel, message) => {
        callback(message)
      })
    })
  }

  const pub = redis.createClient({ url: redisString })
  pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
}