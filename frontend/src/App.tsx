import './App.css';
import Button from './component/Button';
import InputBox from './component/InputBox';
import cyderes from '../src/assets/cyderes.svg';
import { useState } from 'react';
import { WhoisDetails } from './types/data';

function App() {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<WhoisDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsButtonPressed(true);
    setIsLoading(true);
    try {
      const response = await fetch(`http://139.59.27.213:5000/whois?query=${inputValue}`);
      const data: WhoisDetails = await response.json();
      setApiResponse(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Renamed handler to onKeyDown for consistency
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  const renderObject = (obj: any, indent: number = 0) => {
    const backgroundColor = indent % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
    return Object.entries(obj).map(([key, value]) => (
      <div
        key={key}
        style={{ marginLeft: indent * 20 }}
        className={`mx-4 md:mx-12 mb-2 p-2 ${backgroundColor} flex flex-wrap`}
      >
        {/* Key Container */}
        <div className="w-full sm:w-1/3">
          <strong className="mr-2">{toTitleCase(key)}:</strong>
        </div>
        {/* Value Container */}
        <div className="w-full sm:w-2/3 border-l-0 sm:border-l-2 border-gray-300 pl-0 sm:pl-2 break-words">
          {typeof value === 'object' && value !== null ? (
            Array.isArray(value) ? (
              // Render array elements
              <div>
                {value.map((item, index) => (
                  <div key={index} className="ml-2">
                    {typeof item === 'object' && item !== null
                      ? renderObject(item, indent + 1)
                      : String(item)}
                  </div>
                ))}
              </div>
            ) : (
              // Recursively render nested object
              renderObject(value, indent + 1)
            )
          ) : (
            <span className="ml-2">{String(value)}</span>
          )}
        </div>
      </div>
    ));
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo on top */}
      <div className="mt-4 px-4">
        <img src={cyderes} alt="cyderes" className="mx-auto w-40 sm:w-48 md:w-56" />
      </div>

      {/* Main content area wrapped in a responsive container */}
      <div className="flex-grow relative">
        {/* Loader Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              <span>Loading...</span>
            </div>
          </div>
        )}

        {/* Render API response */}
        {apiResponse && (
          <div className="mt-8 max-h-[38rem] overflow-y-auto w-full max-w-3xl mx-auto custom-scrollbar">
            <div className="bg-white p-4 border border-gray-400 rounded shadow">
              {renderObject(apiResponse)}
            </div>
          </div>
        )}

        {/* Input and Button */}
        <div className="flex justify-center w-full">
          <div
            className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full max-w-md px-4 bg-gray-300 p-4 rounded-lg shadow-lg ${
              isButtonPressed
                ? "mt-4 sm:fixed sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2"
                : "mt-4"
            }`}
          >
            <InputBox
              className="w-full outline-none"
              placeholder="Enter IP or hostname"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleClick}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
