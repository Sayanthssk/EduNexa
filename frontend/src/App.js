import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js'
import Signup from './components/Signup';
import Logout from './components/Logout.js';
import HomeOffice from './components/Office/HomeOffice.js';
import ViewTeacher from './components/Office/ViewTeacher.js';
import StudentHome from './components/students/Student_Home.js';
import ViewTeacherStu from './components/students/ViewTeacherStu.js';
import ViewStudyMaterial from './components/students/ViewStudyMaterial.js';
import AddTeacher from './components/Office/AddTeacher.js';
import ExamNotification from './components/Office/ExamNotification.js';
import ViewNotification from './components/Office/ViewNotificaton.js'
import AddTimeTable from './components/Office/TimeTable_add.js';
import ViewTimetable from './components/Office/ViewTimetable.js';
import ViewStudents from './components/Office/ViewStudents.js';
import SetFee from './components/Office/setFee.js';
import AllFeeNotification from './components/Office/AllFeeNotification.js';
import HomeTeacher from './components/teacher/HomeTeacher.js';
import ViewStudentTea from './components/teacher/viewStudentTea.js';
import CreateStudyMaterial from './components/teacher/addStudymaterial.js';
import ViewNot from './components/teacher/ViewNotification.js';
import ViewExamTimetable from './components/teacher/ViewExamTimetable.js';
import ViewExamNot from './components/students/ViewExamNot.js';
import ViewStudy from './components/teacher/ViewStudymaterial.js';
import ExamQuestion from './components/teacher/examQuestion.js';
import ViewQuestions from './components/teacher/ViewQuestions.js';
import StuViewQue from './components/students/StuViewQue.js';
import ViewStudNot from './components/students/ViewStudNot.js';
import ViewAllQue from './components/students/ViewAllQue.js';
import ViewTimeTable from './components/students/ViewTimeTable.js'
import AddSyllabus from './components/Office/AddSyllabus.js';
import ViewSyllabus from './components/Office/ViewSyllabus.js';
import ViewSyll from './components/teacher/viewSyllabus.js';
import Update from './components/Office/Update.js';
import UpdateStu from './components/students/UpdateStu.js';
import UpdateTea from './components/teacher/UpdateTea.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/office-home' element={<HomeOffice />} />
          <Route path='/view-teacher' element={<ViewTeacher />} />
          <Route path='/add-teacher' element={<AddTeacher />} />
          <Route path='/notification' element={ <ExamNotification/> }/>
          <Route path='/view-notifications' element={ <ViewNotification /> }/>
          <Route path='/add-timetable' element={ <AddTimeTable /> } />
          <Route path='/view-timetable' element={ <ViewTimetable /> } />
          <Route path='/view-students' element={ <ViewStudents /> } />
          <Route path='/set-fee/:studentId' element={<SetFee />} /> 
          <Route path='/all-fee-notification' element={<AllFeeNotification />} /> 
          <Route path='/add-syllabus' element={<AddSyllabus />} /> 
          <Route path='/view-syllabus' element={<ViewSyllabus />} /> 
          <Route path='/update' element={<Update />} /> 


          {/* routes for the teacher page */}
          <Route path='/home-teacher' element={<HomeTeacher />} /> 
          <Route path='/view-student-tea' element={<ViewStudentTea />} />
          <Route path='/add-study-material' element={<CreateStudyMaterial />}/>
          <Route path= '/notifications' element={ <ViewNot /> }/>
          <Route path='/timetable' element={ <ViewExamTimetable /> }/>
          <Route path='/studymat' element={<ViewStudy />} />
          <Route path='/examque' element={<ExamQuestion />} />
          <Route path='/viewQue' element= { <ViewQuestions /> } />
          <Route path='/viewsyll' element = { <ViewSyll /> }/>
          <Route path='/updatetea' element = { <UpdateTea /> }/>
          

          {/* routes for the student page */}
          <Route path='/student-home' element={<StudentHome />} />
          <Route path='/viewteacher' element={<ViewTeacherStu />} />
          <Route path='/viewstudymaterial' element={<ViewStudyMaterial />} />
          <Route path='/examnot' element={ <ViewExamNot /> } />
          <Route path='/stuviewque' element={ <StuViewQue /> } />
          <Route path='/stuviewnot' element={ <ViewStudNot /> } />
          <Route path='/stuviewque' element={ <ViewAllQue /> } />
          <Route path='/timetable' element={ <ViewTimeTable /> } />
          <Route path='/updatestu' element={ <UpdateStu /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
