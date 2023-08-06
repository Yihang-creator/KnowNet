import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByTag, setSearchByTag] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchByTag,
        setSearchByTag,
        localSearchTerm,
        setLocalSearchTerm,
        checked,
        setChecked,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
