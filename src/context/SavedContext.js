import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedContext = createContext();

export const useSaved = () => {
    return useContext(SavedContext);
};

export const SavedProvider = ({ children }) => {
    // Initialize state from local storage, or empty array if none exists
    const [savedUniversities, setSavedUniversities] = useState(() => {
        const localData = localStorage.getItem('savedUniversities');
        return localData ? JSON.parse(localData) : [];
    });

    // Whenever the saved list changes, update local storage
    useEffect(() => {
        localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities));
    }, [savedUniversities]);

    // Toggle university save state (add if doesn't exist, remove if it does)
    const toggleSave = (universityId) => {
        setSavedUniversities(prev => {
            if (prev.includes(universityId)) {
                return prev.filter(id => id !== universityId);
            } else {
                return [...prev, universityId];
            }
        });
    };

    const isSaved = (universityId) => {
        return savedUniversities.includes(universityId);
    };

    return (
        <SavedContext.Provider value={{ savedUniversities, toggleSave, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
};
