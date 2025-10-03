import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import LocationSelector from './components/LocationSelector';
import GeneratedImage from './components/GeneratedImage';
import { generateTravelImage } from './services/geminiService';
import { CameraIcon } from './components/icons';
import type { GeneratedImageData } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImagePreview(URL.createObjectURL(file));
    setGeneratedImages(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !country || !destination) {
      setError('Please upload an image and select a country and destination.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const result = await generateTravelImage(originalImage, country, destination);
      setGeneratedImages(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, country, destination]);

  const isGenerateButtonDisabled = !originalImage || !country || !destination || isLoading;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-2">
            AI Time Traveler
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload your photo, pick a destination, and journey through time and space.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-700 pb-3">1. Your Portrait</h2>
            <ImageUploader onImageUpload={handleImageUpload} />

            <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-700 pb-3 pt-4">2. Your Destination</h2>
            <LocationSelector
              onCountryChange={setCountry}
              onDestinationChange={setDestination}
            />

            <div className="pt-4">
              <button
                onClick={handleGenerateClick}
                disabled={isGenerateButtonDisabled}
                className={`w-full flex items-center justify-center text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out
                  ${isGenerateButtonDisabled
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5'
                  }`}
              >
                <CameraIcon className="w-6 h-6 mr-3" />
                {isLoading ? 'Generating your masterpiece...' : 'Generate Images'}
              </button>
            </div>
            {error && <p className="text-red-400 text-center pt-2">{error}</p>}
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
             <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-6">3. The Result</h2>
            <GeneratedImage
              generatedImages={generatedImages}
              isLoading={isLoading}
            />
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500">
            <p>Powered by Gemini. Create your own visual stories.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;