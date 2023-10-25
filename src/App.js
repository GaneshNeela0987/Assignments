import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [Text, setText] = useState('');
  const [data, setData] = useState([])
  let text = "";
  useEffect(() => {
    // Define a function to make the POST request
    const postData = async () => {
      try {
        const apiUrl = `https://api.textgears.com/grammar?text=${Text}&language=en-GB&whitelist=&dictionary_id=&ai=1&key=id3jxqcKPRKAyEcA`; // Replace with your API URL
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Text),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Data Posted successfully:', result.response.errors);
        result.response.errors.map((d) => {
          console.log(d.better)
          d.better.map((value) => {
            console.log(value)
            setData(value)
          })
        })
        
      } catch (error) {
        console.error('Error Posting Data:', error);
      }
    };
    if (Text) {
      postData();
    }
  }, [Text]);

  // const handleInputChange = (e) => {
  //   const { text, index } = e.target;
  //   setText({ ...Text, [text] : index });
  // };

  return (
    <>
    <div className="App">
      <h1>{data}</h1>
    
      <h1>Enter Your Text Here To check your GRAMMAR</h1>
      <textarea style={{ width: '400px', height: '400px', display: "block" }} onChange={(e) => text = (e.target.value)} />
      
     
      <button onClick={() => setText(text) }>Check Text</button>
    </div>
    <div>
     
    </div>
    </>
  );
}

export default App;
