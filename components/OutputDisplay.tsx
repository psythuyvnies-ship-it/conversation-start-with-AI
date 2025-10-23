
import React, { useState } from 'react';
import type { GeneratedContent } from '../types';

interface OutputDisplayProps {
  content: GeneratedContent | null;
  isLoading: boolean;
  error: string | null;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2H17V4H20C20.5523 4 21 4.44772 21 5V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V5C3 4.44772 3.44772 4 4 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 2H15V4H9V2Z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"></path>
    </svg>
);


const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isLoading, error }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (isLoading) {
        return (
            <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 min-h-[400px]">
                <svg className="animate-spin h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-xl font-semibold text-gray-300">Crafting the perfect words...</p>
                <p className="text-gray-400">The AI is thinking.</p>
            </div>
        );
    }

    if (error) {
        return (
             <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6 bg-red-900/20 border border-red-500 rounded-2xl min-h-[400px]">
                <h3 className="text-xl font-bold text-red-400 mb-2">An Error Occurred</h3>
                <p className="text-red-300 text-center">{error}</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-2xl border border-dashed border-gray-600 min-h-[400px]">
                <h3 className="text-xl font-bold text-gray-400 mb-2">Your suggestions will appear here</h3>
                <p className="text-gray-500 text-center max-w-sm">Fill out the form on the left and let our AI assistant generate personalized conversation starters for you.</p>
            </div>
        );
    }
    
    return (
        <div className="w-full lg:w-2/3 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
            <style>{`@keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
            
            <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Icebreakers & Starters</h3>
                <div className="space-y-3">
                    {content.starters.map((starter, index) => (
                        <div key={index} className="group flex justify-between items-center bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                            <p className="text-gray-200">"{starter}"</p>
                            <button onClick={() => handleCopy(starter, index)} className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-cyan-600 transition-all duration-200 opacity-50 group-hover:opacity-100">
                                {copiedIndex === index ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Analysis</h3>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">{content.analysis}</p>
                </div>
            </div>
            
            <div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Potential Misinterpretations</h3>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/50">
                    <p className="text-yellow-200 leading-relaxed">{content.warnings}</p>
                </div>
            </div>
        </div>
    );
};

export default OutputDisplay;
