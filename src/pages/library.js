import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React, { useState } from 'react';

// Sample data - This now represents books a student has checked out
const myBooksData = [
    {
        id: 1,
        title: 'The Lean Startup',
        takenOn: '2025-09-15',
        dueOn: '2025-10-15',
    },
    {
        id: 2,
        title: 'Zero to One',
        takenOn: '2025-09-10',
        dueOn: '2025-10-10',
    },
    {
        id: 3,
        title: 'The Hard Thing About Hard Things',
        takenOn: '2025-09-01',
        dueOn: '2025-10-01',
    },
    {
        id: 4,
        title: 'Rich Dad Poor Dad',
        takenOn: '2025-08-28',
        dueOn: '2025-09-28',
    },
];

const LibraryPage = () => {
    const [books, setBooks] = useState(myBooksData);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter books based on the search term
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">My Library Books</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search for a book..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Book List */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div key={book.id} className="border-b border-gray-200 py-4 last:border-b-0">
                                <h2 className="text-xl font-semibold text-purple-700">{book.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Taken On:</span> {book.takenOn}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Due By:</span> {book.dueOn}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">No books found matching your search.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LibraryPage;