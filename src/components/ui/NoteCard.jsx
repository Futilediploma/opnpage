import { useState } from 'react';

/**
 * NoteCard
 *
 * Editable text area for daily notes, journal entries, or reflections.
 * Includes auto-save indicator and character count.
 *
 * @param {string} initialValue - Initial note content
 * @param {function} onSave - Callback when note is saved
 * @param {number} maxLength - Maximum character count (default: 500)
 * @param {string} placeholder - Placeholder text
 *
 * Usage:
 *   <NoteCard
 *     initialValue={todayNote}
 *     onSave={(content) => saveToDB(content)}
 *     placeholder="How did today go?"
 *   />
 *
 * Data Integration:
 * - Auto-save after 2s of no typing (debounce)
 * - Sync with /api/notes/{date}
 * - Show save status: "Saving...", "Saved", "Error"
 */
export default function NoteCard({
  initialValue = '',
  onSave,
  maxLength = 500,
  placeholder = 'Write your thoughts here...'
}) {
  const [value, setValue] = useState(initialValue);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      // In production: debounce and call onSave
      setSaveStatus('saving');
      setTimeout(() => {
        setSaveStatus('saved');
        if (onSave) onSave(newValue);
      }, 1000);
    }
  };

  const charCount = value.length;
  const charPercentage = (charCount / maxLength) * 100;

  return (
    <div className="bg-white dark:bg-brand-gray-dark rounded-xl shadow-card dark:shadow-dark-card border border-brand-gray/30 dark:border-brand-gray-dark/30 p-24 card-hover">
      <div className="flex items-center justify-between mb-16">
        <h3 className="text-lg font-semibold text-brand-navy dark:text-brand-text-dark">
          📝 Notes & Reflections
        </h3>
        {saveStatus === 'saving' && (
          <span className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60">
            Saving...
          </span>
        )}
        {saveStatus === 'saved' && (
          <span className="text-sm text-[#0B6B3A]">✓ Saved</span>
        )}
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-32 p-16 rounded-lg border-2 border-brand-gray dark:border-brand-gray-dark bg-brand-beige dark:bg-brand-navy-dark text-brand-navy dark:text-brand-text-dark placeholder:text-brand-navy/40 dark:placeholder:text-brand-text-dark/40 resize-none focus:outline-none focus:border-brand-orange transition-colors"
        aria-label="Daily notes"
      />

      <div className="flex items-center justify-between mt-12">
        <div className="w-full h-6 bg-brand-gray dark:bg-brand-navy-dark rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              charPercentage > 90
                ? 'bg-[#8A1C00]'
                : charPercentage > 70
                ? 'bg-[#F59E0B]'
                : 'bg-brand-orange'
            }`}
            style={{ width: `${charPercentage}%` }}
          />
        </div>
        <span className="text-xs text-brand-navy/60 dark:text-brand-text-dark/60 ml-12">
          {charCount}/{maxLength}
        </span>
      </div>
    </div>
  );
}
