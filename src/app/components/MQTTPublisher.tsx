import React from 'react';
import { useMQTT } from '../hooks/useMqtt';

export default function MQTTPublisher() {
  const [topic, setTopic] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const { publishMessage } = useMQTT();

  const handlePublish = () => {
    if (topic && message) {
      publishMessage(topic, message);
      console.log(`Published message "${message}" to topic "${topic}"`);
    }
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Topic'
        value={topic}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTopic(e.target.value)
        }
      />
      <input
        type='text'
        placeholder='Message'
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
}
