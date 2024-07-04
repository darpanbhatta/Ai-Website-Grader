import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import './App.css';

function App() {
  const [essayText, setEssayText] = useState('');
  const [rubricText, setRubricText] = useState('');
  const [gradedEssay, setGradedEssay] = useState('');
  const [essayFile, setEssayFile] = useState(null);
  const [rubricFile, setRubricFile] = useState(null);
  const [essayFileName, setEssayFileName] = useState('');
  const [rubricFileName, setRubricFileName] = useState('');

  const handleFileChange = async (e, setText, setFile, setFileName) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      if (file.type === 'application/pdf') {
        extractText(file, setText);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setText(reader.result);
        };
        reader.readAsText(file);
      }
    }
  };

  const extractText = (file, setText) => {
    pdfToText(file)
      .then(text => {
        setText(text);
      })
      .catch(error => {
        console.error("Failed to extract text from PDF:", error);
        setText('');
      });
  };

  const gradeEssay = () => {
    handleFileUpload();
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    if (essayFile) {
      formData.append('essayFile', essayFile);
    }
    if (rubricFile) {
      formData.append('rubricFile', rubricFile);
    }
    formData.append('essayText', essayText);
    formData.append('rubricText', rubricText);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      setGradedEssay('');

      const processStream = async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setGradedEssay((prev) => prev + chunk);
        }
      };

      processStream();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const renderGradedEssay = (essay) => {
    if (Array.isArray(essay)) {
      return essay.map((item, index) => (
        <div key={index} className="graded-item">
          {Object.keys(item).map((key) => (
            key !== 'type' && key !== 'text' && (
              <p key={key}><strong>{key}:</strong> {item[key]}</p>
            )
          ))}
          {item.text && <pre className="graded-text">{item.text}</pre>}
        </div>
      ));
    } else if (typeof essay === 'object' && essay !== null) {
      return (
        <div className="graded-item">
          {Object.keys(essay).map((key) => (
            key !== 'type' && key !== 'text' && (
              <p key={key}><strong>{key}:</strong> {essay[key]}</p>
            )
          ))}
          {essay.text && <pre className="graded-text">{essay.text}</pre>}
        </div>
      );
    } else {
      return <pre className="graded-text">{essay}</pre>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Essay Grader</h1>
      </header>
      <div className="content">
        <div className="input-section-container">
          <div className="input-section">
            <h2>Upload or Paste Essay</h2>
            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              rows="10"
              cols="50"
              placeholder="Paste your essay here..."
              className="text-area"
            />
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={(e) => handleFileChange(e, setEssayText, setEssayFile, setEssayFileName)}
              className="file-input"
            />
            <div className="file-name">{essayFileName}</div>
          </div>
          <div className="input-section">
            <h2>Upload or Paste Rubric</h2>
            <textarea
              value={rubricText}
              onChange={(e) => setRubricText(e.target.value)}
              rows="10"
              cols="50"
              placeholder="Paste your rubric here..."
              className="text-area"
            />
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={(e) => handleFileChange(e, setRubricText, setRubricFile, setRubricFileName)}
              className="file-input"
            />
            <div className="file-name">{rubricFileName}</div>
          </div>
        </div>
        <button onClick={gradeEssay} className="grade-button">
          Grade Essay
        </button>

        {gradedEssay && (
          <div className="output-section">
            <h2>Graded Essay:</h2>
            {renderGradedEssay(gradedEssay)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
