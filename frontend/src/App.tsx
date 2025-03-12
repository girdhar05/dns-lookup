import './App.css';
import cyderes from '../src/assets/cyderes.svg';
import { useWhoisData } from './hooks/useWhoisData';
import { Loader } from './component/Loader';
import { ApiResponseView } from './component/ApiResponse';
import { SearchBar } from './component/SearchBar';

function App() {
  const {
    isButtonPressed, 
    isLoading, 
    apiResponse, 
    inputValue, 
    setInputValue, 
    handleClick, 
    handleKeyDown 
  } = useWhoisData()
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo on top */}
      <div className="mt-4 px-4">
        <img src={cyderes} alt="cyderes" className="mx-auto w-40 sm:w-48 md:w-56" />
      </div>

      {/* Main content area wrapped in a responsive container */}
      <div className="flex-grow relative">
        {/* Loader Overlay */}
        {isLoading && <Loader />}

        {/* Render API response */}
        {apiResponse && <ApiResponseView data={apiResponse}/>}

        {/* Input and Button */}
        <SearchBar 
          isButtonPressed={isButtonPressed}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleClick={handleClick}
          handleKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
}

export default App;
