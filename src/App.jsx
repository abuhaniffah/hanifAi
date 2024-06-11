import { useState } from "react";
import './App.css';
import { requestToGroqAI } from "./uttils/groq";
import { Light as SyntaxHighLight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import newLogo from './assets/oii.jpg'; // Mengganti dengan logo baru

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
    <div id="root" className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <main className='flex flex-col justify-center items-center max-w-xl w-full mx-auto px-4'>
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Abu Groq AI</h1>
        <div className="card mb-6">
          <img src={newLogo} className="w-24 h-24 mx-auto mb-4 rounded-full" alt="New logo" />
        </div>
        <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
          <input 
            className='py-2 px-4 text-md rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Ketik permintaan di sini.....'
            id='content'
            type='text'
            onKeyDown={handleKeyDown}
          />
          <button 
            className='py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            type='submit'
          >
            Kirim
          </button>
        </form>
        <div className="max-w-xl w-full mx-auto mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-6">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            </div>
          ) : data ? (
            <div className="overflow-y-auto max-h-96">
              <SyntaxHighLight language="swift" style={darcula} wrapLongLines={true} className="p-4 rounded-md bg-gray-800">
                {data.toString()}
              </SyntaxHighLight>
            </div>
          ) : null}
        </div>
        <div className="mt-4 text-center">
          <p>Dokumentasi lengkap tersedia di <a href="https://docs.groq.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">docs.groq.ai</a></p>
        </div>
      </main>
    </div>
  );
}

export default App;
