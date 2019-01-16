const request = require("request");

const HEADERS = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer {w6Ybsrc3xC9jWI8BCn8KlaxMGFsPMm64uEUaf63X5ZdycnD+7R49H3TEgItKTc5a2nVkHe/ouGabn76JzsAZug5T2HpsAanIzyGfnf+YUJvJQ/INhO12eOg5ULNaXWydXCJwoSDuYCFA3dn8eK3RfQdB04t89/1O/w1cDnyilFU=}"
};

function push(msg) {
  let body = JSON.stringify({
    // push body
    to: "U84499a6b6a18dddd28dc255e44a9b669",
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  });
  // curl
  curl("push", body);
}

function msgContain(msg) {
  if (Object.keys(dialog).includes(msg)) {
    msg = dialog[msg];
  }
  return msg;
}

function reply(reply_token, msg) {
  msg = msgContain(msg);
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  });
  curl("reply", body);
}

function curl(method, body) {
  console.log("method:" + method);
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/" + method,
      headers: HEADERS,
      body: body
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
      console.log(err);
    }
  );
}

module.exports = {
  push,
  reply
};
