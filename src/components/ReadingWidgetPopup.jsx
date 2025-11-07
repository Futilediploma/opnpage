import React, { useState } from 'react';

export default function ReadingWidgetPopup({ open, onClose, books, onSave, showOnWidget, setShowOnWidget }) {
  const [bookList, setBookList] = useState(books || Array(5).fill(''));
  const [favorites, setFavorites] = useState(Array(3).fill(''));
  const [goodreadsUrl, setGoodreadsUrl] = useState('');

  const handleBookChange = (idx, value) => {
    const updated = [...bookList];
    updated[idx] = value;
    setBookList(updated);
  };

  const handleFavoriteChange = (idx, value) => {
    const updated = [...favorites];
    updated[idx] = value;
    setFavorites(updated);
  };

  const handleSave = () => {
    onSave({ books: bookList, favorites, goodreadsUrl });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-brand-navy">Reading Widget Details</h3>
        <div className="mb-6">
          <label className="block font-medium mb-2">Last 5 Books Read:</label>
          {bookList.map((book, idx) => (
            <input
              key={idx}
              type="text"
              className="mb-2 w-full px-3 py-2 border rounded"
              placeholder={`Book ${idx + 1}`}
              value={book}
              onChange={e => handleBookChange(idx, e.target.value)}
            />
          ))}
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">Top 3 Favorites:</label>
          {favorites.map((fav, idx) => (
            <input
              key={idx}
              type="text"
              className="mb-2 w-full px-3 py-2 border rounded"
              placeholder={`Favorite ${idx + 1}`}
              value={fav}
              onChange={e => handleFavoriteChange(idx, e.target.value)}
            />
          ))}
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">Goodreads Link:</label>
          <button
            type="button"
            className="w-full px-3 py-2 rounded bg-brand-gray/20 text-brand-navy/50 opacity-60 cursor-not-allowed border border-brand-gray"
            disabled
          >
            Link Goodreads (Under Development)
          </button>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="showOnWidget"
            checked={showOnWidget}
            onChange={e => setShowOnWidget(e.target.checked)}
          />
          <label htmlFor="showOnWidget" className="text-sm">Display this information on the dashboard widget</label>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
