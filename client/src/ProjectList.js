import { useEffect, useState, useCallback } from 'react';
import { db, auth } from './firebase';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

export const ProjectList = () => {
    const [projectList, setProjectList] = useState([]);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    // --- NEW --- State to hold the search term
    const [searchTerm, setSearchTerm] = useState("");

    const projectsCollectionRef = collection(db, "projects");

    const getProjectList = useCallback(async () => {
        try {
            const data = await getDocs(projectsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProjectList(filteredData);
        } catch (err)
        {
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
            getProjectList();
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
            setEditingProjectId(null);
            getProjectList();
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (project) => {
        setEditingProjectId(project.id);
        setUpdatedTitle(project.title);
        setUpdatedDescription(project.description);
    };

    // --- NEW --- Filter the project list based on the search term before rendering
    const filteredProjects = projectList.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>All Projects</h2>
            
            {/* --- NEW --- Search Input Field */}
            <input
                type="text"
                placeholder="Search projects by title..."
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />

            {/* We now map over the NEW filteredProjects array */}
            {filteredProjects.map((project) => (
                <div key={project.id} className="card">
                    {editingProjectId === project.id ? (
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