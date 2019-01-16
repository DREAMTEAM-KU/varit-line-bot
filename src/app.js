const bodyParser = require("body-parser");
const express = require("express");

const { push, reply } = require("./function/line");

const app = express();
const port = process.env.PORT || 4000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// Push
app.get("/webhook", (req, res) => {
  // push block
  let msg = "สวัสดีผมชื่อวาาาาาาาริท!";
  push(msg);
  res.send(msg);
});

// Reply
app.post("/webhook", (req, res) => {
  // reply block
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;
  if (msg === "uid") {
    reply(reply_token, req.body.events[0].source.userId);
  }
  reply(reply_token, msg);
  res.sendStatus(200);
  console.log(msg);
});

app.post("/sendTo", (req, res) => {
  const toUser = req.body.uid;
  const msg = req.body.msg;
  push(msg, toUser);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}/`);
});
