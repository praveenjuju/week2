import React, { useState, useRef } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const dropRef = useRef();

  const isImage = (file) => file && file.type.startsWith('image/');

  const handleFile = (selected) => {
    if (!selected || !isImage(selected)) {
      alert('Please select a valid image file');
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setProgress(0);
    setDropped(true);
    setTimeout(() => setDropped(false), 2000);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    handleFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove('drag-over');
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add('drag-over');
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove('drag-over');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setProgress(100);
      setUploading(false);
      setUploadedUrl(data.url);
      setPreview(data.url);
    } catch (err) {
      alert('Upload failed');
      setUploading(false);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setUploadedUrl(null);
  };

  return (
    <div className="upload-container">
      <h2>📤 Drag & Drop Image Upload</h2>

      <div
        className={`drop-zone ${dropped ? 'dropped' : ''}`}
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>{dropped ? '✅ Image dropped!' : 'Drag & drop an image here, or click to select'}</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {file && !uploading && (
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      )}

      {uploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </div>
      )}

      {preview && progress === 100 && (
        <div className="preview-box">
          <h4>✅ Uploaded Image Preview:</h4>
          <img src={preview} alt="Uploaded preview" />
          <div style={{ marginTop: '15px' }}>
            <a
              href={uploadedUrl}
              download
              className="action-btn"
              style={{ background: '#28a745', marginRight: '10px' }}
            >
              ⬇️ Download
            </a>
            <button onClick={handleDelete} className="action-btn" style={{ background: '#dc3545' }}>
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
