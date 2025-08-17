// MQTT options
const options = {
  username: "Lokesh",
  password: "Loki@123",
};

// Connect to HiveMQ Cloud
const client = mqtt.connect("wss://7eb78a0c340740b18625b22eca764a18.s1.eu.hivemq.cloud:8884/mqtt", options);

client.on("connect", () => {
  document.getElementById("status").innerText = "Connected ✅";
  console.log("Connected to MQTT broker");

  // Subscribe to sensor updates
  client.subscribe("home/livingroom/sensor");
});

client.on("message", (topic, message) => {
  if (topic === "home/livingroom/sensor") {
    document.getElementById("sensor").innerText = message.toString();
  }
});

client.on("error", (err) => {
  document.getElementById("status").innerText = "Error ❌";
  console.error("MQTT Error:", err);
});

// Function to publish MQTT messages
function publish(topic, msg) {
  client.publish(topic, msg);
  console.log("Sent:", topic, msg);
}
