import { useState } from "react";
import './App.css';
import { requestToGroqAI } from "./uttils/groq";
import { Light as SyntaxHighLight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import reactLogo from './assets/react.svg'; // Assuming you have a logo

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = document.getElementById('content').value;
    if (!content) return;

    setIsLoading(true);

    try {
      const ai = await requestToGroqAI(content);
      setData(ai);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div id="root">
      <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
        <h1 className="text-4xl text-white">Abu Groq AI</h1>
        <div className="card">
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <form className='flex flex-col gap-4 py-4 w-full' onSubmit={handleSubmit}>
          <input 
            className='py-2 px-4 text-md rounded-md'
            placeholder='Ketik permintaan di sini.....'
            id='content'
            type='text'
            onKeyDown={handleKeyDown}
          />
          <button 
            className='bg-sky-500/75 hover:bg-cyan-600 border-solid text-white rounded-md'
            onClick={handleSubmit}
            type='submit'
          >
            Kirim
          </button>
        </form>
        <div className="max-w-xl w-full mx-auto">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : data ? (
            <SyntaxHighLight language="swift" style={darcula} className="syntax-highlighter" wrapLongLines={true}>
              {data.toString()}
            </SyntaxHighLight>
          ) : null}
        </div>
        <div className="read-the-docs">
          <p>Dokumentasi lengkap tersedia di <a href="https://docs.groq.ai" target="_blank" rel="noopener noreferrer">docs.groq.ai</a></p>
        </div>
      </main>
    </div>
  );
}

export default App;
