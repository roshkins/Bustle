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

client.start();
