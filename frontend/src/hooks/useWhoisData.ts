import {useState} from "react";

import { WhoisDetails } from "../types/data";

export const useWhoisData = () => {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<WhoisDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsButtonPressed(true);
    setIsLoading(true);
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}:5000/whois?query=${inputValue}`);
      const data: WhoisDetails = await response.json();
      setApiResponse(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return {
    isButtonPressed,
    setIsButtonPressed,
    setInputValue,
    inputValue,
    apiResponse,
    isLoading,
    handleClick,
    handleKeyDown
  }
}
