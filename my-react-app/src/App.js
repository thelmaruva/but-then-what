import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionProvider} from "./SessionContext.js";
// import { useEffect } from "react";

// Student Pages
import StudentLanding from "./pages/student/Landing.js";
import StudentQuestionPage from "./pages/student/QuestionPage.js";
import StudentEnd from "./pages/student/End.js";

// Lecturer Pages
import LecturerLanding from "./pages/lecturer/Landing.js";
import LecturerInfo from "./pages/lecturer/Info.js";
import LecturerQuestionSetup from "./pages/lecturer/QuestionSetup.js";
import LecturerQuestionReview from "./pages/lecturer/QuestionReview.js";
import LecturerEnd from "./pages/lecturer/End.js";

// const SessionInitializer = () => {
//   const { createSession } = useSession();

//   useEffect(() => {
//       const initializeSession = async () => {
//           try {
//               const sessionData = {
//                   lecturerName: "",
//                   questionSetName: "",
//                   questions: [],
//                   keywords: [],
//               };
//               await createSession(sessionData);
//               console.log("Session created automatically!");
//           } catch (error) {
//               console.error("Failed to create session:", error);
//           }
//       };

//       initializeSession();
//   }, [createSession]);

//   return null; // This component doesn't render anything
// };

const App = () => {

  const location = window.location.pathname; // Get current path
  // Determine userType based on URL
  const userType = location.includes("/student") ? "student" : "lecturer";

    return (
      <SessionProvider>
        {/* <SessionInitializer /> */}
          <Router>
            <div>
              {/* Render routes based on userType */}
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