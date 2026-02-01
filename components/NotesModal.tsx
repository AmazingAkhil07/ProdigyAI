import React, { useState } from 'react';
import { Note } from '../types';

interface NotesModalProps {
  moduleId: string;
  moduleName: string;
  notes: Note[];
  onSaveNote: (moduleId: string, content: string, noteId?: string) => void;
  onDeleteNote: (noteId: string) => void;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const NotesModal: React.FC<NotesModalProps> = ({
  moduleId,
  moduleName,
  notes,
  onSaveNote,
  onDeleteNote,
  onClose,
  theme
}) => {
  const [noteContent, setNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const moduleNotes = notes.filter(n => n.moduleId === moduleId);

  const handleSave = () => {
    if (noteContent.trim()) {
      onSaveNote(moduleId, noteContent, editingNoteId || undefined);
      setNoteContent('');
      setEditingNoteId(null);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteContent(note.content);
  };

  const handleCancel = () => {
    setEditingNoteId(null);
    setNoteContent('');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center">
                <i className="fas fa-sticky-note mr-3 text-indigo-500" />
                Notes
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {moduleName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
            >
              <i className="fas fa-times text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)] custom-scrollbar">
          {/* New/Edit Note Input */}
          <div className="mb-6">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your notes, insights, or learnings here..."
              className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-medium"
              rows={4}
            />
            <div className="flex justify-end space-x-2 mt-3">
              {editingNoteId && (
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!noteContent.trim()}
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
              >
                {editingNoteId ? 'Update' : 'Save'} Note
              </button>
            </div>
          </div>

          {/* Existing Notes */}
          {moduleNotes.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Saved Notes ({moduleNotes.length})
              </h3>
              {moduleNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {formatDate(note.updatedAt)}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold uppercase tracking-wider"
                      >
                        <i className="fas fa-edit mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this note?')) {
                            onDeleteNote(note.id);
                          }
                        }}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline font-bold uppercase tracking-wider"
                      >
                        <i className="fas fa-trash mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-medium leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                <i className="fas fa-pen text-2xl" />
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                No notes yet for this module
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Start writing to track your learnings!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
