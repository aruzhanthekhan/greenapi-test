import { useState } from 'react'
import './App.css'

function App() {

  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
  const [phoneNumberFile, setPhoneNumberFile] = useState('');
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [responseData, setResponseData] = useState('');

  const handleGetSettings = async() => {
    try {
      const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      
      const result = await response.json();
      setResponseData(JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message); }
  }

  const handleGetStateInstance = async() => {
    try {
      const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const result = await response.json();
      setResponseData(JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message); 
    }
  }

  const handleSendMessage = async() => {
    try {
      const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({chatId: phoneNumberMessage + "@c.us", message: message})
      });
      const result = await response.json();
      console.log(JSON.stringify(result, null, 4));
      setResponseData(JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message); 
    }
  }

  const handleSendFile = async() => { 
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length);
    setFileUrl(fileUrl.substring(0, fileUrl.lastIndexOf('/')));
    try {
      const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({chatId: phoneNumberFile + "@c.us", urlFile: fileUrl, fileName: fileName})
      });
      const result = await response.json();
      console.log(JSON.stringify(result, null, 4));
      setResponseData(JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message); 
    }
   }

  return (
    <>
    <div className="mainField">

      <div className="inputFields">

        <div className='instanceInputs'>
          <input type="text" name="idInstance" placeholder="idInstance" 
                  value={idInstance} 
                  onChange={e => setIdInstance(e.target.value)} />
          <input type="text" name="ApiTokenInstance" placeholder="ApiTokenInstance"
                  value={apiTokenInstance} 
                  onChange={e => setApiTokenInstance(e.target.value)} />
        </div>

        <div className='getButtons'>
          <button type="button" onClick={handleGetSettings}>getSettings</button>
          <button type="button" onClick={handleGetStateInstance}>getStateInstance</button>
        </div>

        <div className='sendMessage'>
          <input type="text" name="phoneNumberMessage" placeholder="phone number" 
            value={phoneNumberMessage} 
            onChange={e => setPhoneNumberMessage(e.target.value)}/>

          <input type="text" name="message" placeholder="message"
          value={message} 
          onChange={e => setMessage(e.target.value)}/>

          <button type="button" onClick={handleSendMessage}>sendMessage</button>
        </div>

        <div className='sendFile'>
          <input type="text" name="phoneNumberFile" placeholder="phone number" 
          value={phoneNumberFile} 
          onChange={e => setPhoneNumberFile(e.target.value)}/>

          <input type="text" name="fileUrl" placeholder="file URL" 
          value={fileUrl} 
          onChange={e => setFileUrl(e.target.value)}/>

          <button type="button" onClick={handleSendFile}>sendFileByUrl</button>
        </div>

      </div>

      <div className="responseField">
        <label htmlFor="response">Ответ:</label>
        <textarea id="response" readOnly={true} name="response" 
        value={responseData} rows="30" cols="50"></textarea>
      </div>

    </div>
    </>
  )
}

export default App
