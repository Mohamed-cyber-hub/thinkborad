import Note from "../models/Note.js";

export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); //show latest notes first
        res.status(200).json({
            success: true,
            notes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        console.error( 'error in getting all notes', error);
    }
}

export async function getNoteById(req, res) { 
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        } else {
            res.status(200).json({
                success: true,
                note,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        console.error('error in getting note by id', error);
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content,
        })
        const savedNote = await newNote.save();
        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: savedNote,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        console.error('error in creating note', error);
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        console.error('error in updating note', error);
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
        console.error('error in deleting note', error);
    }
}