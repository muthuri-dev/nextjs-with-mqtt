import { useState, useEffect } from 'react';
import { MqttClient } from 'mqtt';
import { connectToMQTT } from '../lib/mqtt-client';

interface MQTTHook {
  client: MqttClient | null;
  publishMessage: (topic: string, message: string) => void;
}

export function useMQTT(): MQTTHook {
  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = connectToMQTT();
    if (mqttClient) {
      setClient(mqttClient);
    }

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  const publishMessage = (topic: string, message: string) => {
    if (client) {
      client.publish(topic, message);
    } else {
      console.error('MQTT client is not connected');
    }
  };

  return { client, publishMessage };
}
