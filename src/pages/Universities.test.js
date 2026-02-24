import { render, screen } from '@testing-library/react';
import Universities from './Universities';
import { BrowserRouter } from 'react-router-dom';
import { SavedProvider } from '../context/SavedContext';

test('renders universities list and filter sidebar', () => {
    render(
        <SavedProvider>
            <BrowserRouter>
                <Universities />
            </BrowserRouter>
        </SavedProvider>
    );

    // After redesign, the header says "Filters" and we have a results count 
    const filtersHeading = screen.getByText(/Filters/i);
    expect(filtersHeading).toBeInTheDocument();

    const resultsText = screen.getByText(/Showing 1-/i);
    expect(resultsText).toBeInTheDocument();

    // Check for a few specific universities from the JSON
    expect(screen.getByText(/Indian Institute of Technology Bombay/i)).toBeInTheDocument();
    expect(screen.getByText(/University of Delhi/i)).toBeInTheDocument();
});
