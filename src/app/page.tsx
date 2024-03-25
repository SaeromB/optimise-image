'use client';
import React, { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConvertToJPG = () => {
    console.log(selectedFile);
    // TODO: Convert image to JPG
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 1);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'output.jpg';
          link.click();
        }
      };
      img.src = result as string;
    };
    reader.readAsDataURL(selectedFile);
  }

  return (
    <main>
      <label htmlFor="fileUpload">Upload file</label>
      <input onChange={handleFileChange} className="bg-blue-500 rounded-lg p-4"type="file" id="fileUpload" accept=".png" />

      <button onClick={handleClick} className="bg-blue-500 rounded-lg p-4">Convert to JPG</button>
    </main>
  );
}
