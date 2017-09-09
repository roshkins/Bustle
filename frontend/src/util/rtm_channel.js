import RTM from "satori-rtm-sdk";
class RTMChannel {
  constructor(channelName, dataCallback, errorCallback) {
    const appkey = "ACefAD440eE8EdeF52cf9eeACA0d5A1e";
    const endpoint = "wss://ywf1mnw0.api.satori.com";
    this.client = new RTM(endpoint, appkey);

    this.client.on("error", function(error) {
      var reason;
      if (error.body) {
        reason = error.body.error + " - " + error.body.reason;
      } else {
        reason = "unknown reason";
      }
      console.log("RTM client failed: " + reason);
      errorCallback(error.body || "unknown error");
    });

    const channel = this.client.subscribe(
      channelName,
      RTM.SubscriptionMode.SIMPLE
    );

    /* set callback for PDU with specific action */
    channel.on("rtm/subscription/data", function(pdu) {
      dataCallback(pdu.body);
    });
  }
}

export default RTMChannel;
