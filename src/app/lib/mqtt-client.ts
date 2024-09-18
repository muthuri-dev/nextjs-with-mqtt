import mqtt, { MqttClient, IClientOptions } from 'mqtt';

let client: MqttClient | null = null;

export function connectToMQTT(): MqttClient | null {
  if (!client) {
    const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER_URL;

    if (!brokerUrl) {
      console.error('MQTT broker URL is not defined');
      return null;
    }

    const options: IClientOptions = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: Buffer.from('Connection Closed abnormally..!'),
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };

    client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    client.on('error', (error: Error) => {
      console.error('MQTT connection error:', error);
    });
  }

  return client;
}
