import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider} from "./SessionContext.js";

import StudentLanding from "./pages/student/Landing.js";
import StudentQuestionPage from "./pages/student/QuestionPage.js";
import StudentEnd from "./pages/student/End.js";

import LecturerLanding from "./pages/lecturer/Landing.js";
import LecturerInfo from "./pages/lecturer/Info.js";
import LecturerQuestionSetup from "./pages/lecturer/QuestionSetup.js";
import LecturerQuestionReview from "./pages/lecturer/QuestionReview.js";
import LecturerEnd from "./pages/lecturer/End.js";

const App = () => {

  const location = window.location.pathname;
  const userType = location.includes("/student") ? "student" : "lecturer";

    return (
      <SessionProvider>
          <Router>
            <div>
              {userType === "student" ? (
                <Routes>
                  <Route path="/student/:sessionId" element={<StudentLanding />} />
                  <Route path="/student/questions/:sessionId" element={<StudentQuestionPage />} />
                  <Route path="/student/end/:sessionId" element={<StudentEnd />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/" element={<LecturerLanding />} />
                  <Route path="/info" element={<LecturerInfo />} />
                  <Route path="/setup" element={<LecturerQuestionSetup />} />
                  <Route path="/review" element={<LecturerQuestionReview />} />
                  <Route path="/end/:sessionId" element={<LecturerEnd />} />
                </Routes>
              )}
            </div>
          </Router>
      </SessionProvider>
    );
};

export default App;