


import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import URL_401_QRmodal from './URL_401_QRmodal.js';
import SERVER_URL from './URL';



function URL_401_UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [qrImage, setQrImage] = useState('');


 


  const generateShortUrl = () => {
    const hash = nanoid(7);
    return hash;
  };

  const handleKeydown = async (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(shortenedUrl);
      setCopiedMessage('Copied!');
    } catch {
      alert('Please provide a URL to shorten');
    }
  };

  useEffect(() => {
    if (copiedMessage) {
      const timer = setTimeout(() => {
        setCopiedMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedMessage]);

  const handleQR = () => {
    if (originalUrl.trim() !== '' && shortenedUrl.trim() !== '') {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const saveUrlPair = async (originalUrl, shortenedUrl) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/URL_0901_save-urls`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl, shortenedUrl, imageUrl: qrImage }),
      });
      if (response.ok) {
        console.log('URL pair saved to DB');
      } else {
        console.error('Failed to save URL pair to DB');
      }
    } catch (error) {
      console.error('Error while saving URL pair:', error);
    }
  };

  const checkLongUrl = async (url) => {
    try {
      const parsedUrl = new URL(url);
      return true;
    } catch (error) {
      alert('Error. Invalid URL. Please provide a valid URL');
      return false;
    }
  };

  const handleSubmit = async () => {
    const originalUrlInput = document.getElementById('longUrl');
    const originalUrlValue = originalUrlInput.value;

    try {
      const isValidUrl = await checkLongUrl(originalUrlValue);
      if (isValidUrl) {
        const shortUrl = generateShortUrl();
        const fullShortUrl = `http://localhost:3000/${shortUrl}`;
        setShortenedUrl(fullShortUrl);
        setOriginalUrl(originalUrlValue);  
        navigator.clipboard.writeText(fullShortUrl);
        setCopiedMessage('Copied!');
        saveUrlPair(originalUrlValue, shortUrl);
      }
    } catch (error) {
      console.error('Error validating the URL', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let qrName = shortenedUrl.slice(-7);

  return (
    <div className="url-shortener-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Shorten a URL with 4N"
          value={originalUrl}
          id="longUrl"
          onChange={(e) => setOriginalUrl(e.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>
      <div className="output-container">
        <input id="name" type="text" value={shortenedUrl} readOnly />
        <div className="icons">
          <img
            className="qr-icon"
            src="/images/QR.png"
            alt=""
            onClick={handleQR}
          />


           <URL_401_QRmodal
            isOpen={showModal}
            onClose={handleCloseModal}
            url={shortenedUrl}
            hash={qrName}
            image={qrImage}
          /> 



          <img
            className="copy-icon"
            src="/images/copy.png"
            alt=""
            onClick={handleCopy}
          />
        </div>
      </div>
      <div className="file-button">
        <button className="shorten-button" onClick={handleSubmit}>
          Shorten
        </button>
{/* 
        <input type="file" id="file" onChange={handleImageUpload} />
         */}

         
        {copiedMessage && <p>{copiedMessage}</p>}
      </div>
    </div>
  );
}

export default URL_401_UrlShortener;

