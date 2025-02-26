import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./SessionContext";

// Student Pages
import StudentLanding from "./pages/student/Landing";
import StudentQuestionPage from "./pages/student/QuestionPage";
import StudentEnd from "./pages/student/End";

// Lecturer Pages
import LecturerLanding from "./pages/lecturer/Landing";
import LecturerInfo from "./pages/lecturer/Info";
import LecturerQuestionSetup from "./pages/lecturer/QuestionSetup";
import LecturerQuestionReview from "./pages/lecturer/QuestionReview";
import LecturerEnd from "./pages/lecturer/End";

const App = () => {
  const location = window.location.pathname; // Get current path

  // Determine userType based on URL
  const userType = location.includes("/student") ? "student" : "lecturer";

    return (
      <SessionProvider>
        <Router>
          <div>
            {/* Render routes based on userType */}
            {userType === "student" ? (
              <Routes>
                <Route path="/student/:sessionId"  element={<StudentLanding />} />
                <Route path="/questions" element={<StudentQuestionPage />} />
                <Route path="/end" element={<StudentEnd />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<LecturerLanding />} />
                <Route path="/info" element={<LecturerInfo />} />
                <Route path="/setup" element={<LecturerQuestionSetup />} />
                <Route path="/review" element={<LecturerQuestionReview />} />
                <Route path="/end" element={<LecturerEnd />} />
              </Routes>
            )}
          </div>
        </Router>
      </SessionProvider>
    );
};

export default App;