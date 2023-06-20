import React, { useState, useEffect } from 'react';
import Message from './Message';
import CreateMessage from './CreateMessage';

const App = () => {
  type MessageProps = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    likes: number;
    dislikes: number;
  };

  const [messages, setMessages] = useState<MessageProps[]>([]);

  const sendGetRequest = (url: string) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error('Patch request failed.');
        }
      })
      .then((data) => {
        setMessages(data); // Set the data in the messages state
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    // Call the API when the component mounts
    sendGetRequest('http://localhost:8080/messages');
  }, []);

  return (
    <div style={{ margin: 'auto' }}>
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          title={message.title}
          content={message.content}
          published={message.published}
          likes={message.likes}
          dislikes={message.dislikes}
        />
      ))}
      <CreateMessage />
    </div>
  );
};

export default App;
