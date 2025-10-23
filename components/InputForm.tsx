
import React from 'react';
import type { UserInput } from '../types';

interface InputFormProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.5 9.00001C13.8824 9.00001 13.3444 8.70626 13 8.23601L12 6.00001L11 8.23601C10.6556 8.70626 10.1176 9.00001 9.5 9.00001C8.88239 9.00001 8.34441 8.70626 8 8.23601L7 6.00001L6 8.23601C5.65559 8.70626 5.11761 9.00001 4.5 9.00001C3.67157 9.00001 3 8.32844 3 7.50001C3 6.67158 3.67157 6.00001 4.5 6.00001C4.65651 6.00001 4.80937 6.0245 4.95423 6.07106L6.5 3.00001L8.04577 6.07106C8.19063 6.0245 8.34349 6.00001 8.5 6.00001C8.65651 6.00001 8.80937 6.0245 8.95423 6.07106L10.5 3.00001L12.0458 6.07106C12.1906 6.0245 12.3435 6.00001 12.5 6.00001C13.3284 6.00001 14 6.67158 14 7.50001C14 8.32844 13.3284 9.00001 12.5 9.00001C12.3435 9.00001 12.1906 8.97551 12.0458 8.92895L10.5 12L12.0458 15.0711C12.1906 15.0245 12.3435 15 12.5 15C13.3284 15 14 15.6716 14 16.5C14 17.3284 13.3284 18 12.5 18C11.6716 18 11 17.3284 11 16.5C11 16.3435 11.0245 16.1906 11.0711 16.0458L9.5 13L7.95423 16.0458C7.80937 16.0245 7.65651 16 7.5 16C6.67157 16 6 16.6716 6 17.5C6 18.3284 6.67157 19 7.5 19C8.32843 19 9 18.3284 9 17.5C9 17.3435 8.97551 17.1906 8.92895 17.0458L10.5 14L15.0858 23.1716C15.4763 23.9621 16.4259 24.2427 17.2165 23.8521C18.007 23.4616 18.2876 22.5121 17.8971 21.7216L14.5 15V9.00001Z" />
    </svg>
);

const InputForm: React.FC<InputFormProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
      <h2 className="text-2xl font-bold text-cyan-400">Your Conversation Details</h2>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="aboutMe" className="font-semibold text-gray-300">1. About Me</label>
        <textarea
          id="aboutMe"
          name="aboutMe"
          value={userInput.aboutMe}
          onChange={handleInputChange}
          placeholder="e.g., I'm a software developer who loves hiking and sci-fi movies."
          className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="context" className="font-semibold text-gray-300">2. The Context</label>
        <textarea
          id="context"
          name="context"
          value={userInput.context}
          onChange={handleInputChange}
          placeholder="e.g., At a casual tech meetup, waiting for the main talk to start."
          className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="audience" className="font-semibold text-gray-300">3. My Audience</label>
        <textarea
          id="audience"
          name="audience"
          value={userInput.audience}
          onChange={handleInputChange}
          placeholder="e.g., A designer who seems interested in AI. I noticed they have a cool sticker of a robot on their laptop."
          className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
        />
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 mt-4 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <MagicWandIcon className="h-5 w-5"/>
            Craft Openers
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;
