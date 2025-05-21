import React, { useState } from "react";

export default function BlinkESP() {
  const [connected, setConnected] = useState(false);
  const [characteristic, setCharacteristic] = useState(null);

  const connectToESP32 = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32-Blinker" }],
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
      const char = await service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e");

      setCharacteristic(char);
      setConnected(true);
      console.log("Connected to ESP32");
    } catch (err) {
      console.error("Connection failed", err);
    }
  };

  const sendCommand = async (command) => {
    if (!characteristic) return;
    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(command));
  };

  return (
    <div className="p-4">
      <button onClick={connectToESP32} disabled={connected} className="bg-blue-500 text-white px-4 py-2 rounded">
        {connected ? "Connected" : "Connect to ESP32"}
      </button>

      <div className="mt-4 space-x-2">
        <button onClick={() => sendCommand("BLINK")} disabled={!connected} className="bg-green-500 text-white px-4 py-2 rounded">
          Start Blinking
        </button>
        <button onClick={() => sendCommand("STOP")} disabled={!connected} className="bg-red-500 text-white px-4 py-2 rounded">
          Stop Blinking
        </button>
      </div>
    </div>
  );
}
