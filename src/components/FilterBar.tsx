import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedType, onTypeChange }) => {
  const types = ['Tous', 'Pharmaceutique', 'Parapharmaceutique', 'Cosmétique'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Pharmaceutique':
        return 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200';
      case 'Parapharmaceutique':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200';
      case 'Cosmétique':
        return 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border-pink-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <div className="flex items-center gap-2 text-green-600 font-medium">
        <Filter className="h-4 w-4 text-green-500" />
        <span className="text-sm font-medium">Filtrer par type:</span>
      </div>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border shadow-sm hover:shadow-md ${
            selectedType === type
              ? getTypeColor(type) + ' ring-2 ring-offset-2 ring-green-400 shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-200'
          }`}
        >
          {type === 'Parapharmaceutique' ? 'Parapharma' : type}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;