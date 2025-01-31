import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    const [userType, setUserType] = useState("lecturer"); // Change this to "lecturer" to test lecturer pages

  return (
    <Router>
      <div>
        {/* Render routes based on userType */}
        {userType === "student" ? (
          <Routes>
            <Route path="/" element={<StudentLanding />} />
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
  );
};

export default App;