import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
// --- NEW --- Import toast
import toast from 'react-hot-toast';

export const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const projectsCollectionRef = collection(db, "projects");

  const onSubmitProject = async () => {
    if (!title || !description) {
      toast.error("Please enter a title and description."); // --- NEW ---
      return;
    }
    try {
      await addDoc(projectsCollectionRef, {
        title: title,
        description: description,
        authorId: auth.currentUser.uid,
      });
      setTitle("");
      setDescription("");
      toast.success("Project submitted successfully!"); // --- NEW ---
    } catch (err) {
      console.error("Error submitting project:", err);
      toast.error("There was an error submitting your project."); // --- NEW ---
    }
  };

  return (
    <div className="form-container"> {/* Updated className */}
      <h3>Submit a New Project</h3>
      <input
        placeholder="Project Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Project Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={onSubmitProject}>Submit Project</button>
    </div>
  );
};