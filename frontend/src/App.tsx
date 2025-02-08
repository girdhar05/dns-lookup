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
      <div key={key} style={{ marginLeft: indent * 20 }} className={`mx-12 mb-2 p-2 ${backgroundColor} flex`}>
        <div className="w-1/2">
          <strong className="mr-2">{toTitleCase(key)}:</strong>
        </div>
        <div className="w-1/2 border-l-2 border-gray-300 pl-2">
          {typeof value === 'object' && value !== null ? (
            <div>{renderObject(value, indent + 1)}</div>
          ) : (
            <span className="ml-2">{String(value)}</span>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo on top, centered horizontally */}
      <div className="mt-4">
        <img src={cyderes} alt="cyderes" className="mx-auto" />
      </div>

      {/* Main content area */}
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
          <div className="mt-8 max-h-[38rem] overflow-y-scroll w-1/2 mx-auto custom-scrollbar">
            <div className="bg-white p-4 border border-gray-400">
              {renderObject(apiResponse)}
            </div>
          </div>
        )}
        <div className="flex justify-center w-full">
          <div
            className={
              isButtonPressed
                ? "absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex space-x-4 w-full max-w-xs sm:max-w-md"
                : "flex items-center justify-center h-full w-full max-w-xs sm:max-w-md mt-4"
            }
          >
            <InputBox
              className="w-full mx-2"
              placeholder="Enter IP or hostname"
              value={inputValue}
              onKeyDown={(e) => handleKeyDown(e)}
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
