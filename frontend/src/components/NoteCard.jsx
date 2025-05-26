import { PenSquareIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom'
import  formateDate  from '../lib/utils.js';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); 
            toast.success('Note deleted successfully');
        } catch (error) {
            toast.error('Error deleting note');
            console.error('Error deleting note:', error);
        }

    }
    return (
        <Link
            to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className='card-body'>
                <h3 className='card-title text-base-content'>
                    {note.title}
                </h3>
                <p className='text-base-content/70 line-clamp-3'>
                    {note.content}
                </p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/70'>
                        {formateDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-5' />
                        <button onClick={(e) => handleDelete(e, note._id)} className='btn btn-ghost btn-sm text-error'>
                            <TrashIcon className='text-error size-5' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteCard
