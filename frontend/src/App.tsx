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

  const handleClick = async () => {
    setIsButtonPressed(true);
    try {
      const response = await fetch(`http://139.59.27.213:5000/whois?query=${inputValue}`);
      const data: WhoisDetails = await response.json();
      setApiResponse(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Renamed handler to onKeyDown for consistency
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const renderObject = (obj: any, indent: number = 0) => {
    return Object.entries(obj).map(([key, value]) => (
      <div key={key} style={{ marginLeft: indent * 20 }} className="mx-12 mb-2">
        <strong className="mr-2">{key}:</strong>
        {typeof value === 'object' && value !== null ? (
          <div>{renderObject(value, indent + 1)}</div>
        ) : (
          <span className="ml-2">{String(value)}</span>
        )}
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
        {/* Render API response */}
        {apiResponse && (
          <div className="mt-8 max-h-[38rem] overflow-y-scroll w-1/2 mx-auto">
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
              onKeyDown={(e) => handleKeyDown(e)}  // Pass the renamed handler here
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
