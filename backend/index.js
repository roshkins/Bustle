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
var rtm = new RTM(
  "wss://ywf1mnw0.api.satori.com",
  "ACefAD440eE8EdeF52cf9eeACA0d5A1e"
);
