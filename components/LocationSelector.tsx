
import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../constants/locations';
import type { Destination } from '../types';

interface LocationSelectorProps {
  onCountryChange: (country: string) => void;
  onDestinationChange: (destination: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onCountryChange, onDestinationChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  useEffect(() => {
    onCountryChange(selectedCountry);
    const countryData = COUNTRIES.find(c => c.name === selectedCountry);
    setDestinations(countryData ? countryData.destinations : []);
    setSelectedDestination('');
    onDestinationChange('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);
  
  useEffect(() => {
    onDestinationChange(selectedDestination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDestination]);

  const selectStyles = "w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="country-select" className="block mb-2 text-sm font-medium text-slate-300">
          Country
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={selectStyles}
        >
          <option value="">Select a country</option>
          {COUNTRIES.map((country) => (
            <option key={country.name} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="destination-select" className="block mb-2 text-sm font-medium text-slate-300">
          Tourist Destination
        </label>
        <select
          id="destination-select"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          disabled={!selectedCountry}
          className={`${selectStyles} disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed`}
        >
          <option value="">{selectedCountry ? 'Select a destination' : 'First, select a country'}</option>
          {destinations.map((dest) => (
            <option key={dest.name} value={dest.name}>{dest.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
