import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import Modal from "react-modal";
import axios from 'axios'
import './App.css';

function App() {
  const [username, setUsername] = useState(null);
  const [fullname, setFullname] = useState("")
  const [highlightArray, setHighlightArray] = useState([]);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [highlight, setHighlight] = useState("");

  const handleSubmit = (event) => {

    const urlRegex = /^https:\/\/github.com\/.*\/pull\/.*$/;
    if (!urlRegex.test(url)) {
      alert('Please enter a valid pull request');
      return;
    }

    event.preventDefault();
    const data = {
      url: url,
      title: title,
      highlight: highlight
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjc5OTkxNTM5LCJzdWIiOiI0MGEyMTZmMy05NmIwLTRjMjEtYTZhYy0yNDFmYzBiYmIzMTYiLCJlbWFpbCI6ImRldm11cmFyaWhhcnNoYWwyMDAyQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ2l0aHViIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzkyNzc4Njg2P3Y9NCIsImVtYWlsIjoiZGV2bXVyYXJpaGFyc2hhbDIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkhhcnNoYWwgRGV2bXVyYXJpIiwiaXNzIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSIsIm5hbWUiOiJIYXJzaGFsIERldm11cmFyaSIsInByZWZlcnJlZF91c2VybmFtZSI6IkhhcnNoYWwyNTAyIiwicHJvdmlkZXJfaWQiOiI5Mjc3ODY4NiIsInN1YiI6IjkyNzc4Njg2IiwidXNlcl9uYW1lIjoiSGFyc2hhbDI1MDIifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY3OTk4NDMzOX1dLCJzZXNzaW9uX2lkIjoiYzNkOTFiMzAtNDFlZC00MmYyLWFlMjUtNWUwYTI1MTBkNWE3In0.WwiP2V6EbvsnP2XED06r1hzHMMka2_RNzHM-SjmP7n0";

    axios.post('https://api.opensauced.pizza/v1/user/highlights', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.status == 201 && alert("Highlight added successfully"))
      .catch(error => alert(error));

  };

  useEffect(() => {
    chrome.storage.sync.get(['username', 'fullname'], ({ username, fullname }) => {
      setUsername(username);
      setFullname(fullname);
    });
  }, []);

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)

      .then((response) => {
        if (!response.ok) {
          throw new Error('GitHub API returned an error.');
        }
        return response.json();
      })

      .then((data) => {
        const avatarUrl = data.avatar_url;
        setAvatar(avatarUrl);
      })

      .catch((error) => {
        console.log(error);
      });

  }, [username]);

  const memoizedFetchHighlights = useMemo(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch(
          `https://api.opensauced.pizza/v1/users/${username}/highlights`
        );
        if (!response.ok) {
          throw new Error('OpenSauced API returned an error');
        }
        const res = await response.json();
        setHighlightArray(res.data.slice(0, 3));
        setIsLoading(false);
      }

      catch (e) {
        console.error(e);
      }
    };
    return fetchHighlights;
  }, [username]);

  useEffect(() => {
    if (username) {
      memoizedFetchHighlights()
    }
  }, [username])

  return (
    <div className='popup-container'>
      <div className='innerDiv'>

        {username !== "not found" ?

          <>
            <h1 className='title'>
              🍕 {username}'s Top Highlights🍕
            </h1>

            <img src={avatar} style={{ width: '30%' }} className='avatar' alt='Author avatar' />

            <p style={{ margin: "3px 0 0 0", textAlign: "center", color: "#6c757d" }}>
              {fullname}
            </p>

            {isLoading && <span style={{ marginTop: "10%" }} className="loader"></span>}
            {!isLoading && highlightArray.length > 0 && (

              <Table highlightArray={highlightArray} />

            )}

            {!isLoading && highlightArray.length === 0 &&
              <>
                <h1 style={{ textAlign: 'center', margin: '15% auto 0' }}>
                  <span role='img' aria-label='Eyes'>
                    👀
                  </span>{' '}
                  there isn't much to see here yet
                </h1>

                <p style={{ textAlign: 'center', marginTop: 0 }}>
                  No highlights found for this user
                </p>
              </>}

          </> :

          <>
            <img
              style={{ width: '50%', borderRadius: 0, left: '25%' }}
              src='https://cdn-icons-png.flaticon.com/512/3273/3273666.png'
              alt='Not found'
            />

            <h1
              className='title'
              style={{
                color: '#6c757d',
                fontSize: '22px',
                fontWeight: '400',
              }}
            >
              Uh Oh! The user does not seem to have an OpenSauced account
            </h1>
          </>
        }

        <div>
          <button className='modalButton' onClick={() => setModalOpen(true)}>Add your Highlights!</button>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={{
            content: {
              inset: "29px"
            }
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2>Add Highlight to OpenSauced</h2>
            <label htmlFor="url">URL:</label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="highlight">Highlight:</label>
            <textarea
              id="highlight"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              required
            ></textarea>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>

      </div>
    </div>
  );
}

export default App;
