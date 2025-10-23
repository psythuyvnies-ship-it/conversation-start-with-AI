
import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { generateConversationStarters } from './services/geminiService';
import type { UserInput, GeneratedContent } from './types';

function App() {
  const [userInput, setUserInput] = useState<UserInput>({
    aboutMe: '',
    context: '',
    audience: ''
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.aboutMe || !userInput.context || !userInput.audience) {
      setError("Please fill in all fields to get the best suggestions.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateConversationStarters(userInput);
      setGeneratedContent(content);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Conversation Starter AI
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Break the ice with confidence. Get AI-powered conversation starters tailored to any situation.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          <InputForm 
            userInput={userInput}
            setUserInput={setUserInput}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputDisplay
            content={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini API. Designed for better connections.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
