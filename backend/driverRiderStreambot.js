console.info("JavaScript streambot starting up...");

//  The object provided in Advanced -> Custom configuration.
console.info("User configuration: " + config);

var lastRider = null;

any = function(myArray, someCb) {
  var passed = false;
  for (var i = 0; i < myArray.length; i++) {
    if (someCb(myArray[i])) passed = true;
  }
  return passed;
};

// Will be called on each message from any of input channels defined above.
function onMessage(subId, message) {
  // Your code goes here.
  // The example below injects a timestamp into every message and republishes it to a different channel.

  if (subId === "riders") {
    lastRider = message;
    console.log("Rider", message);
  } else if (subId === "drivers") {
    var driver = message;
    console.log("Driver spots ", driver.spots);
    console.log("Driver spots some fn ", driver.spots.some);

    if (
      any(driver.spots, function(spot) {
        console.log("driver compared with rider pickup");
        return spot.id === lastRider.pickup.id;
      }) &&
      any(driver.spots, function(spot) {
        console.log("driver compared with rider dropoff");
        return spot.id === lastRider.dropoff.id;
      })
    ) {
      console.log("Driver Rider match found.");
      var trip = { driver: message, rider: lastRider };
      message.timeInMs = Date.now();
      rtm.publish("trips", trip);
    }
  }
}
