import { useEffect, useState, useCallback } from 'react';
import { db, auth } from './firebase';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Import all needed icons

export const ProjectList = () => {
    const [projectList, setProjectList] = useState([]);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    const projectsCollectionRef = collection(db, "projects");

    const getProjectList = useCallback(async () => {
        try {
            const data = await getDocs(projectsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProjectList(filteredData);
        } catch (err) {
            console.error(err);
        }
    }, [projectsCollectionRef]);

    useEffect(() => {
        getProjectList();
    }, [getProjectList]);

    const deleteProject = async (id) => {
        try {
            const projectDoc = doc(db, "projects", id);
            await deleteDoc(projectDoc);
            getProjectList(); // Refresh the list
        } catch (err) {
            console.error(err);
        }
    };

    const updateProject = async (id) => {
        try {
            const projectDoc = doc(db, "projects", id);
            await updateDoc(projectDoc, {
                title: updatedTitle,
                description: updatedDescription,
            });
            setEditingProjectId(null); // Exit editing mode
            getProjectList(); // Refresh the list
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (project) => {
        setEditingProjectId(project.id);
        setUpdatedTitle(project.title);
        setUpdatedDescription(project.description);
    };


    return (
        <div>
            <h2>All Projects</h2>
            {projectList.map((project) => (
                <div key={project.id} className="card">
                    {editingProjectId === project.id ? (
                        // This is the EDITING VIEW
                        <div>
                            <input
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                            <textarea
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                            <div className="card-footer">
                                <button onClick={() => updateProject(project.id)}><FaSave /> Save</button>
                                <button onClick={() => setEditingProjectId(null)}><FaTimes /> Cancel</button>
                            </div>
                        </div>
                    ) : (
                        // This is the NORMAL VIEW
                        <div>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            {auth.currentUser && project.authorId === auth.currentUser.uid && (
                                <div className="card-footer">
                                    <button onClick={() => startEditing(project)}><FaEdit /> Edit</button>
                                    <button onClick={() => deleteProject(project.id)}><FaTrash /> Delete</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};