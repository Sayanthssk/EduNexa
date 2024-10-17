import express from 'express';
import { signup, viewOffice, viewStudent, updateProfile, deleteUser, login, addTimeTable, viewExamTimeTable, deleteExamTimeTable, createNotification, getAllNotifications, createFeePayment, getUserNotifications, createExamQuestion, viewExamQuestions, deleteExamQuestion, updateExamQuestion, createStudyMaterial, viewStudyMaterial, deleteStudyMaterial, addTeacher, viewTeacher, deleteTeacher, deleteNotification, getAllFeeNotifications, deleteFeeNotification, viewStudyMaterialTeach, viewExamQuestionsTeach, addSyllabus, viewSyllabus, deleteSyllabus, viewPerson } from '../control/userControl.js';

const router = express.Router();


router.post('/signup', signup)
router.get('/viewStudent', viewStudent) 
router.get('/viewteacher', viewTeacher)
router.get('/viewoffice', viewOffice)
 router.put('/updateprofile/:id', updateProfile)
 router.delete('/delete/:id', deleteUser)
 router.post('/login', login)
 router.post('/addtimetable', addTimeTable)
 router.get('/viewexam', viewExamTimeTable)
 router.delete('/deleteexam/:id', deleteExamTimeTable)
 router.post('/createnotification', createNotification)
 router.get('/getNotification/', getAllNotifications)
 router.post('/fee', createFeePayment)
 router.get('/notifications/:studentId', getUserNotifications)
 router.post('/createquestion/:teacherId', createExamQuestion)
 router.get('/viewQuestion', viewExamQuestions)
 router.delete('/deleteQuestion/:id', deleteExamQuestion)
 router.put('/updateQuestion/:id', updateExamQuestion)
 router.post('/addstudymaterial/:teacherid', createStudyMaterial)
 router.get('/viewstudymaterial', viewStudyMaterial)
router.delete('/deletematerial/:id', deleteStudyMaterial)
router.post('/addteacher/:officerId', addTeacher)
router.delete('/deleteteacher/:id/:officeId', deleteTeacher)
router.delete('/deleteNotification/:id',deleteNotification)
router.get('/all-fee-notifications', getAllFeeNotifications);
router.delete('/delete-fee-notification/:id', deleteFeeNotification);
router.get('/view-studymaterial/:teacherId', viewStudyMaterialTeach)
router.get('/viewquestion/:teacherId', viewExamQuestionsTeach)
router.post('/addsyllabus', addSyllabus)
router.get('/view-syllabus', viewSyllabus)
router.delete('/delete-syllabus/:id', deleteSyllabus)
router.get('/viewperson/:id', viewPerson)


export default router;
