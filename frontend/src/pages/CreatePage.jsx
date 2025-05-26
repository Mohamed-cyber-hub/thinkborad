import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const CreatePage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !content.trim()) {
            toast.error('Please fill in all fields')
            return; 
        }

        setIsLoading(true)

        try {
            await api.post('/notes', {
                title,
                content
            })
            toast.success('Note created successfully')

            navigate("/")

        } catch (error) {
            console.log("Error creating note", error)
            if (error.response.status === 429) {
                toast.error('You are being rate limited. Please try again later.', {
                    duration: 4000,
                    icon: '🚫',
                })
            } else {
                toast.error('Failed to create note', error) 
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-10'>
                <div className='max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow-lg'>
                    <Link to='/' className='btn btn-ghost text-primary'>
                        <ArrowLeft className='size-5' />
                        Back
                    </Link>
                    <div className='card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4 font-bold text-primary'>
                                Create a new note
                            </h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Title</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Enter note title'
                                        className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Content</span>
                                    </label>
                                    <textarea
                                        placeholder='Enter note content'
                                        className='textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? "Creating..." : "Create Note"}
                                    </button>
                                    
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
