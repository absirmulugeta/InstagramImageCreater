import React, { useState } from 'react';
import Spinner from './Spinner';
import { ImageIcon, DownloadIcon, ClipboardIcon, CheckIcon, DescriptionIcon, AccessibilityIcon } from './icons';
import type { GeneratedImageData } from '../types';

interface GeneratedImageProps {
  generatedImages: GeneratedImageData[] | null;
  isLoading: boolean;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ generatedImages, isLoading }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-time-traveler-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full min-h-[500px] bg-slate-800 rounded-lg flex items-center justify-center p-2 relative overflow-y-auto">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <Spinner />
          <p className="text-slate-300 mt-4 text-center">AI is crafting your images...<br/>This can take a moment.</p>
        </div>
      )}

      {!generatedImages && !isLoading && (
        <div className="text-center text-slate-500">
          <ImageIcon className="w-20 h-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Your generated images will appear here</h3>
          <p className="mt-1">Complete the steps on the left to begin.</p>
        </div>
      )}

      {generatedImages && !isLoading && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full w-full p-2">
            {generatedImages.map((image, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="relative group w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
                      <img src={image.imageUrl} alt={image.altText} className="object-cover w-full h-full" />
                      <button
                          onClick={() => handleDownload(image.imageUrl, index)}
                          className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full text-white hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          aria-label={`Download image ${index + 1}`}
                      >
                          <DownloadIcon className="w-5 h-5" />
                      </button>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg text-sm flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                        <DescriptionIcon className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />
                        <p className="flex-1 text-slate-300">{image.description}</p>
                        <button 
                          onClick={() => handleCopy(image.description, index)}
                          className="p-1.5 rounded-md hover:bg-slate-600 transition-colors text-slate-400"
                          aria-label="Copy description"
                        >
                          {copiedIndex === index ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
                        </button>
                    </div>
                     <div className="border-t border-slate-600/70 pt-3 flex items-start gap-3">
                        <AccessibilityIcon className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-slate-400">Alt Text</h4>
                            <p className="text-slate-400 italic text-xs mt-1">{image.altText}</p>
                        </div>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;
