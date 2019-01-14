const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {w6Ybsrc3xC9jWI8BCn8KlaxMGFsPMm64uEUaf63X5ZdycnD+7R49H3TEgItKTc5a2nVkHe/ouGabn76JzsAZug5T2HpsAanIzyGfnf+YUJvJQ/INhO12eOg5ULNaXWydXCJwoSDuYCFA3dn8eK3RfQdB04t89/1O/w1cDnyilFU=}'
}

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Push
app.get('/webhook', (req, res) => {
  // push block
  let msg = 'สวัสดีผมชื่อวาาาาาาาริท!'
  push(msg)
  res.send(msg)
})

// Reply
app.post('/webhook', (req, res) => {
  // reply block
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  reply(reply_token, msg)
  // res.send(msg)
  res.sendStatus(200)
  console.log(msg)
})

function push(msg) {
  let body = JSON.stringify({
    // push body
    to: 'U84499a6b6a18dddd28dc255e44a9b669',
    messages: [{
      type: 'text',
      text: msg
    }]
  })
  // curl
  curl('push', body)
}

function reply(reply_token, msg) {
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'I reply you'
    }]
  })
  curl('reply', body)
}

function curl(method, body) {
  console.log('method:' + method)
  request.post({
    url: 'https://api.line.me/v2/bot/message/' + method,
    headers: HEADERS,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
    console.log(err);

  })
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
