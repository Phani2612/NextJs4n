


import React, { useState, useEffect } from 'react';
import {QRCodeSVG} from 'qrcode.react';
// import './modal.css';

const QrLogo = './4NECOtechLOGO.png';

const URL_401_QRmodal = ({ isOpen, onClose, url, hash, image }) => {
  const [qrCodeSvg, setQrCodeSvg] = useState('');



  

  useEffect(() => {
    if (url) {
      const qrCodeSvgElement = document.getElementById('qr-code-svg');
      if (qrCodeSvgElement) {
        let svgContent = qrCodeSvgElement.outerHTML;

        // Ensure the xlink namespace is included
        svgContent = svgContent.replace(
          /<svg[^>]+>/,
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
        );

        setQrCodeSvg(svgContent);
      }
    }
  }, [url, image]);

  const downloadQR = () => {
    if (qrCodeSvg) {
      const blob = new Blob([qrCodeSvg], { type: 'image/svg+xml;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);


      // link.download = ${hash}.svg;

      link.download = `${hash}.svg`;
      link.click();
      URL.revokeObjectURL(link.href); // Clean up the URL object
    } else {
      console.error('QR Code SVG not found');
    }
  };

  return (

    // <div className={modal ${isOpen ? 'open' : ''}}>

    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          

  <QRCodeSVG

id="qr-code-svg"
value={url}
size={256}
level="H"
includeMargin={true}
renderAs="svg"
imageSettings={{
  src: image || QrLogo,
  x: null,
  y: null,
  height: 50,
  width: 50,
  excavate: true,
}}
 
/>



        </div>
        <div className="download-btn">
          <button onClick={downloadQR}>Download as SVG</button>
        </div>
      </div>
    </div>
  );
};

export default URL_401_QRmodal;

