import React, {useState} from 'react';
type MessageProps = {
    title: string;
    content: string;
    published: boolean;
  };

const CreateMessage = () => {
    const [newMessage, setMessage] = useState<MessageProps>()

    const handleCreateMessage = async () => {
        const title  = prompt("what is the title of the message?") as string;
        const content = prompt("type here your message's content") as string;

        const body = {title: title, content: content, published: true}
        await sendPostRequest('http://localhost:8080/message', body)
    }


    const sendPostRequest = (url: string, body: MessageProps) => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: `{
            "title": "${body.title}",
            "content": "${body.content}",
            "published": ${body.published}
          }`,
        })
          .then((response) => {
            if (response.ok) {
                location.reload()
                return response.body
            } else {
              throw new Error('Patch request failed.');
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      };

    return <>
        <button style={{display: 'flex', margin: 'auto', backgroundColor: 'black', color: 'white'}} onClick={handleCreateMessage}>
            CreateMessage
        </button>
    </>
}

export default CreateMessage