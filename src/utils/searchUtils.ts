// Utility function to normalize text by removing accents
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
};

// Enhanced search function that handles accented characters
export const searchMatch = (searchTerm: string, ...fields: string[]): boolean => {
  const normalizedSearchTerm = normalizeText(searchTerm);
  
  return fields.some(field => 
    normalizeText(field).includes(normalizedSearchTerm)
  );
};