# SeedUp Platform 🚀

A web platform connecting entrepreneurs with investors, built with React and Firebase. This platform allows business people to post their project ideas and enables investors to browse these projects and post their own investment proposals.

**Live Site URL:** **[https://seedup-ec0fd.web.app](https://seedup-ec0fd.web.app)**

---

## ✨ Features

-   **User Authentication:** Secure user registration and login for different user roles.
-   **Role-Based Views:** A tailored user experience for 'Business People' and 'Investors'.
-   **Project Submissions:** Business People can post, update, and delete their project ideas.
-   **Investor Proposals:** Investors can post their areas of interest and investment range.
-   **Dynamic Realtime Database:** All projects and proposals are stored and retrieved from Cloud Firestore.
-   **Live Deployment:** Fully deployed and accessible online via Firebase Hosting.

---

## 🛠️ Technologies Used

-   **Frontend:** React.js
-   **Backend & Database:** Firebase (Authentication, Cloud Firestore, Hosting)
-   **Routing:** React Router
-   **Styling:** CSS3, React Icons

---

## ⚙️ Getting Started

Instructions on how to set up and run a local copy of this project.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Kshitij264/SeedUp.git](https://github.com/Kshitij264/SeedUp.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd SeedUp/client
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up Firebase:**
    - Create a new project at [https://firebase.google.com/](https://firebase.google.com/).
    - Create a `firebase.js` file in the `src` folder.
    - Copy your Firebase project configuration object into `firebase.js`.

5.  **Run the application:**
    ```sh
    npm start
    ```

The application will be running on `http://localhost:3000`.