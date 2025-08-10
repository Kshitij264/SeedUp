import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // This creates a reference to our "projects" collection in Firestore
  const projectsCollectionRef = collection(db, "projects");

  const onSubmitProject = async () => {
    // A simple check to prevent submitting an empty form
    if (!title || !description) {
      alert("Please enter a title and description.");
      return;
    }
    try {
      // The addDoc function saves the data to the collection
      await addDoc(projectsCollectionRef, {
        title: title,
        description: description,
        // We link the project to the user who is currently logged in
        authorId: auth.currentUser.uid,
      });
      // Clear the form fields after a successful submission
      setTitle("");
      setDescription("");
      alert("Project submitted successfully!");
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("There was an error submitting your project. Please try again.");
    }
  };

  return (
    <div>
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