require("es6-promise").polyfill();
require("isomorphic-fetch");
var RTM = require("satori-rtm-sdk");
//
// fetch("//offline-news-api.herokuapp.com/stories")
//   .then(function(response) {
//     if (response.status >= 400) {
//       throw new Error("Bad response from server");
//     }
//     return response.json();
//   })
//   .then(function(stories) {
//     console.log(stories);
//   });

// create an RTM client instance
var client = new RTM(
  "wss://ywf1mnw0.api.satori.com",
  "ACefAD440eE8EdeF52cf9eeACA0d5A1e"
);

function showText(text) {
  console.info(text);
}
// Hook up to client connectivity state transitions
client.on("enter-connected", function() {
  showText("Connected to Satori RTM!");
});
client.on("leave-connected", function() {
  showText("Disconnected from Satori RTM");
});
client.on("error", function(error) {
  var reason;
  if (error.body) {
    reason = error.body.error + " - " + error.body.reason;
  } else {
    reason = "unknown reason";
  }
  showText("RTM client failed: " + reason);
});

const channelName = "riders";
var channel = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);

channel.on("enter-subscribed", () => {
  showText("Subscribed to:" + channel.subscriptionId);
});

channel.on("leave-subscribed", function() {
  console.log("Unsubscribed from: " + channel.subscriptionId);
});

/* set callback for PDU with specific action */
channel.on("rtm/subscription/data", function(pdu) {
  /* Expected request:
    Typeof body is object. Matches:
    {
    requestUrl: google
  }
   */
  console.log(pdu.body);
});

channel.on("rtm/subscribe/error", function(pdu) {
  console.log(
    "Failed to subscribe. RTM replied with the error " +
      pdu.body.error +
      ": " +
      pdu.body.reason
  );
});

channel.on("rtm/subscription/error", function(pdu) {
  console.log(
    "Subscription failed. RTM sent the unsolicited error " +
      pdu.body.error +
      ": " +
      pdu.body.reason
  );
});

client.start();

setInterval(() => {
  const channelName = "riders";

  const message = {
    name: "Charlie",
    id: 6,
    pickup: "spot1",
    dropoff: "spot2"
  };
  client.publish(channelName, message);
}, 750);
