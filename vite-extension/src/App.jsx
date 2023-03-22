import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import './App.css';

function App() {
  const [username, setUsername] = useState(null);
  const [fullname, setFullname] = useState("")
  const [highlightArray, setHighlightArray] = useState([]);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        setHighlightArray(res.data.slice(0, 5));
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
    } }, [username])  

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

            {isLoading && <span style={{ marginTop: "10%" }} class="loader"></span>}
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

      </div>
    </div>
  );
}

export default App;
