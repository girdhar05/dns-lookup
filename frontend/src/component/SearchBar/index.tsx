import { memo } from "react";
import InputBox from "../InputBox";
import Button from "../Button";
type Props = {
  isButtonPressed: Boolean
  inputValue: string
  setInputValue: (value: string) => void
  handleClick: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
export const SearchBar = memo(({
    isButtonPressed,
    inputValue, 
    setInputValue, 
    handleClick, 
    handleKeyDown
  }: Props) => (

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
))