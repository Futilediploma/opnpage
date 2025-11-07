import React, { useState } from 'react';

export default function MetricWidgetPopup({ open, onClose, metric, data, onSave, showOnWidget, setShowOnWidget }) {
  // For each metric, allow user to enter up to 5 notes or highlights
  const [notes, setNotes] = useState(data?.notes || Array(5).fill(''));
  const [customLink, setCustomLink] = useState(data?.customLink || '');

  const handleNoteChange = (idx, value) => {
    const updated = [...notes];
    updated[idx] = value;
    setNotes(updated);
  };

  const handleSave = () => {
    onSave({ notes, customLink });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-brand-navy">{metric} Widget Details</h3>
        <div className="mb-6">
          <label className="block font-medium mb-2">Highlights / Notes:</label>
          {notes.map((note, idx) => (
            <input
              key={idx}
              type="text"
              className="mb-2 w-full px-3 py-2 border rounded"
              placeholder={`Note ${idx + 1}`}
              value={note}
              onChange={e => handleNoteChange(idx, e.target.value)}
            />
          ))}
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">Account Link:</label>
          <button
            type="button"
            className="w-full px-3 py-2 rounded bg-brand-gray/20 text-brand-navy/50 opacity-60 cursor-not-allowed border border-brand-gray"
            disabled
          >
            Link Account (Under Development)
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
