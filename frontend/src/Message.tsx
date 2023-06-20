import React, { useState } from 'react';

type MessageProps = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  likes: number;
  dislikes: number;
};

type patchBody = {
  likes: number;
  dislikes: number;
}

const Message: React.FC<MessageProps> = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    const url = `http://localhost:8080/like/${props.id}`;
    const body = { likes: newLikes, dislikes: dislikes };
    sendPatchRequest(url, body);
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);

    const url = `http://localhost:8080/like/${props.id}`;
    const body = { likes: likes, dislikes: newDislikes };
    sendPatchRequest(url, body);
  };

  const sendPatchRequest = (url: string, body: patchBody) => {
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{
        "likes": ${body.likes},
        "dislikes": ${body.dislikes}
      }`,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Patch request succeeded.');
        } else {
          console.log('Patch request failed.');
          console.log(response)
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{props.title}</h2>
      </div>
      <div style={styles.content}>
        <p>ID: {props.id}</p>
        <p>{props.content}</p>
        <p>Published: {props.published ? 'Yes' : 'No'}</p>
        <div style={{ display: 'flex', gap: '5em', paddingLeft: 15 }}>
          <span>{likes}</span>
          <span>{dislikes}</span>
        </div>
        <div style={styles.actions}>
          <button style={styles.button} onClick={handleLike}>
            <i className="fa fa-thumbs-up"></i> Like
          </button>
          <button style={styles.button} onClick={handleDislike}>
            <i className="fa fa-thumbs-down"></i> Dislike
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  logo: {
    width: '30px',
    height: '30px',
    marginRight: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 'auto',
  },
  content: {
    marginBottom: '16px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: '#1DA1F2',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};

export default Message;
