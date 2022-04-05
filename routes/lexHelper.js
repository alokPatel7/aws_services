var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
// const {
//   LexRuntimeV2Client,
//   StartConversationCommand,
//     DeleteSessionCommand,
//   lexru
// } = require("@aws-sdk/client-lex-runtime-v2");

const {
  LexRuntimeServiceClient,
  PostTextCommand,
} = require("@aws-sdk/client-lex-runtime-service");

// off
// const accessKeyId = "AKIA5I66LT7RZHG7L257";
// const secretAccessKey = "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";

// owner
const accessKeyId = "AKIA5QZU65VU2DLAT7W4";
const secretAccessKey = "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";

// AWS.config.update({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
//   region: "us-east-1",
// });

/* GET home page. */
router.get("/", async function (req, res, next) {
  const lexClient = new LexRuntimeServiceClient({
    region: "us-east-1",
    credentials: new AWS.Credentials({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    }),
  });

  try {
    const data = lexClient.send(
      new PostTextCommand({
        botName: "OrderFlower",
        botAlias: "dev",
        userId: "AlokPatel",
        inputText: "Flower",
      })
    );
    console.log("Success : ", data);
  } catch (error) {
    console.log("Error : ", error);
  }
  //   const client = new LexRuntimeV2Client({
  //     region: "us-east-1",
  //     credentials: new AWS.Credentials({
  //       accessKeyId: accessKeyId,
  //       secretAccessKey: secretAccessKey,
  //     }),
  //   });

  //   const params = {
  //     botName: "OrederFlowers",
  //     botAlias: "TestBotAlias",
  //     userId: "AlokPatel",
  //     botId: "GGSWMSP1KO",
  //     botAliasId: "TSTALIASID",
  //     localeId: "es_US",
  //     sessionId: uuidv4(),
  //   };

  //   let cmd = new StartConversationCommand(params);
  //   try {
  //     const data = await client.send(cmd);
  //     console.log("Success. Response is: ", data.message);
  //   } catch (err) {
  //     console.log("Error responding to message. ", err);
  //   }
  res.send(lexClient);
  //   res.render("index", { title: "Lex Express 1", client });
});

module.exports = router;
