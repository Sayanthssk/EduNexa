import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import ExamTimetable from "../model/examTimetableModel.js";
import Notification from "../model/Notification.js";
import Fee from "../model/Fees.js";
import ExamQuestion from "../model/examQuestionModel.js";
import StudyMaterial from "../model/studyMaterial.js"
import Teacher from "../model/TeacherModel.js";
import Syllabus from "../model/SyllabusModel.js"


export const signup = async (req, res) => {
  try {
    const { name, email, password, address, role, phone, registerNo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists. Please login.", success: false });
    }
    if (role === 'student' && !registerNo) {
      return res.status(400).json({ message: "Register number is required for students.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role,
      phone,
      registerNo: role === 'student' ? registerNo : undefined 
    });

    await user.save();

    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


// Function to view students
export const viewStudent = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ data: students, success: true });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// function for view office
  export const viewOffice = async (req, res) => {
    try {
      const students = await User.find({ role: 'office' });
      res.status(200).json({ data: students, success: true });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  };

  // function for update the profile for every user
  export const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the user first to get the role
        let user = await User.findById(id);
        if (!user) {
            user = await Teacher.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found', success: false });
            }
        }

        const role = user.role; // Get the role from the user document

        const { name, email, address, phone } = req.body;

        if (role === 'teacher') {
            // Update the Teacher model
            const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, email, address, phone }, { new: true });
            res.status(201).json({ message: "Teacher profile updated successfully", success: true, data: updatedTeacher });
        } else {
            // Update the User model (for students and office roles)
            const updatedUser = await User.findByIdAndUpdate(id, { name, email, address, phone }, { new: true });
            res.status(201).json({ message: "User profile updated successfully", success: true, data: updatedUser });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating the profile', success: false });
    }
};


  /* funtion to delete the user using their id */
export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
      }
  
      res.status(200).json({ message: "Deleted successfully", success: true });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ message: 'Error deleting the user', success: false });
    }
};

// Example backend login response
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });   
    if (!user) {
      user = await Teacher.findOne({ email });
    }    
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const role = user instanceof Teacher ? 'teacher' : user.role; 
    res.status(200).json({
      message: 'Login successful',
      name: user.name,
      role: role,
      officeId: role === 'office' ? user._id : undefined,
      teacherId: role === 'teacher' ? user._id : undefined,
      studentId: role === 'student' ? user._id : undefined
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/* function to add time table using ExamTimeTableModel */
export const addTimeTable = async (req, res) => {
  try {
    const { subject, date, startTime, endTime, type } = req.body;

    const existingExamTimeTable = await ExamTimetable.findOne({ subject, type });
    if (existingExamTimeTable) {
      return res.status(400).json({ message: `Exam time table for this subject (${type}) already exists`, success: false });
    }

    const existingExamTimeTableForDate = await ExamTimetable.findOne({ date, type });
    if (existingExamTimeTableForDate) {
      return res.status(400).json({ message: `Exam time table for this date (${type}) already exists`, success: false });
    }

    const examTimeTable = new ExamTimetable({ subject, date, startTime, endTime, type });
    await examTimeTable.save();

    res.status(200).json({ message: "Exam time table added successfully", success: true });
  } catch (error) {
    console.error('Error adding exam time table:', error.message);
    res.status(500).json({ message: "Error adding exam time table", success: false });
  }
};

/* view function for viewing the exam time table */
export const viewExamTimeTable = async (req, res) => {
  try {
      const examData = await ExamTimetable.find();
      if (!examData) {
          return res.status(404).json({ msg: "Exam not found" });
      }
      res.status(200).json(examData);
  } catch (error) {
    console.error('Error viewing exam time table:', error.message);
      res.status(500).json({ error: error });
  }
}

/* function for deleting the time table  */
export const deleteExamTimeTable = async (req, res) => {
  try {
    const id = req.params.id;
    const examTimeTable = await ExamTimetable.findByIdAndDelete(id)
    if (!examTimeTable) {
      return res.status(404).json({ message:"exam timetable not found", success: false })
    }
    res.status(200).json({ message: "Exam time table deleted successfully", success: true })
  } catch (error) {
    console.error('Error deleting exam time table:', error.message)
    res.status(500).json({ message: "error for deleting the exam" })
  }
}

/* function for create the notification */
export const createNotification = async (req, res) => {
  try {
    const { message, type, examType, startDate } = req.body;

    // Validate fields based on notification type
    if (type === 'exam') {
      if (!examType || !startDate) {
        return res.status(400).json({ message: 'examType and startDate are required for exam notifications', success: false });
      }
    } else if (type === 'fee' || type === 'other') {
    } else {
      return res.status(400).json({ message: 'Invalid notification type', success: false });
    }
    const notificationData = { 
      message, 
      type, 
      recipients: ['student', 'teacher'] 
    };

    // Include optional fields for 'exam' type notifications
    if (type === 'exam') {
      notificationData.examType = examType;
      notificationData.startDate = startDate;
    }

    const notification = new Notification(notificationData);
    await notification.save();

    res.status(201).json({ message: 'Notification created', success: true });
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ message: 'Error creating notification', success: false });
  }
};

/* Function for getting all notifications of type 'exam' */
export const getAllNotifications = async (req, res) => {
  try {
    const { type } = req.query;

    // Validate type if needed
    const validTypes = ['fee', 'exam', 'other'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid notification type', success: false });
    }

    // Fetch notifications based on type, sort by timestamp descending
    const query = type ? { type } : {};  // If no type is provided, fetch all notifications
    const notifications = await Notification.find(query).sort({ timestamp: -1 }).exec();

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found', success: false });
    }

    res.status(200).json({ notifications, success: true });
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ message: 'Error fetching notifications', success: false });
  }
};

/* Funtion for deleting the notification */
export const deleteNotification = async (req, res) => {
  try {
    const id  = req.params.id
    const notification = await Notification.findByIdAndDelete(id)
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found', success: false });
    }
    res.status(200).json({ message: 'Notification deleted', success: true})
  } catch (error) {
    console.error('Error deleting notification:',error,message)
    res.status(500).json({ message: 'Error deleting notification', success:false })
  }
}

export const createFeePayment = async (req, res) => {
  try {
    const { userId, amount, lastDate, description } = req.body; 
    
    
    const user = await User.findById(userId);
    if (user) {
      const notification = new Fee ({
        userId,
        amount,
        lastDate,
        description
      });
      await notification.save();
    }
    
    res.status(201).json({ message: 'Fee payment record created and notification sent successfully', success: true });
  } catch (error) {
    console.error('Error creating fee payment record:', error.message);
    res.status(500).json({ message: 'Error creating fee payment record', success: false });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const { studentId } = req.params;

    console.log('Received studentId:', studentId);

    // Validate the student ID format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid user ID format', success: false });
    }

    const objectId = new mongoose.Types.ObjectId(studentId);

    // Fetch the fees associated with this user
    const fees = await Fee.find({ userId: objectId }).sort({ date: -1 }).exec();

    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: 'No fees found for this user', success: false });
    }

    // Return the fees data
    res.status(200).json({ fees, success: true });
  } catch (error) {
    console.error('Error fetching user fees:', error.message);
    res.status(500).json({ message: 'Error fetching user fees', success: false });
  }
};

export const getAllFeeNotifications = async (req, res) => {
  try {
    // Fetch fee records
    const fees = await Fee.find().sort({ createdAt: -1 }).exec();

    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: 'No fee notifications found', success: false });
    }

    // Populate user information in the fee records
    const feesWithUser = await Promise.all(
      fees.map(async (fee) => {
        const user = await User.findById(fee.userId).exec();
        return {
          ...fee._doc,
          userName: user ? user.name : 'Unknown',
          userPhone: user ? user.phone : 'Unknown'
        };
      })
    );

    res.status(200).json({ notifications: feesWithUser, success: true });
  } catch (error) {
    console.error('Error fetching fee notifications:', error.message);
    res.status(500).json({ message: 'Error fetching fee notifications', success: false });
  }
};

export const deleteFeeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting fee notification with ID: ${id}`); 

    const result = await Fee.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Fee notification not found', success: false });
    }

    res.status(200).json({ message: 'Fee notification deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting fee notification:', error.message);
    res.status(500).json({ message: 'Error deleting fee notification', success: false });
  }
};

/* function for creating questions by the examQuestionModel.js in the model wit the same fields  */
export const createExamQuestion = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid Teacher ID format', success: false });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found', success: false });
    }

    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty questions array', success: false });
    }


    const savedQuestions = [];
    const duplicateQuestions = [];

    for (const questionData of questions) {
      const { question, marks } = questionData;

      if (!question || !marks) {
        return res.status(400).json({ message: 'Question and marks are required for each entry', success: false });
      }

      const existingQuestion = await ExamQuestion.findOne({
        question,
        createdBy: teacherId
      });

      if (existingQuestion) {
        duplicateQuestions.push(question);
        continue; 
      }

      const newQuestion = new ExamQuestion({
        question,
        subject: teacher.subject,
        marks,
        createdBy: teacherId,
      });

      const savedQuestion = await newQuestion.save();
      savedQuestions.push(savedQuestion);
    }

    if (duplicateQuestions.length > 0) {
      return res.status(400).json({ 
        message: `The following questions are duplicates and were not saved: ${duplicateQuestions.join(', ')}`, 
        success: false 
      });
    }

    res.status(201).json({ message: 'Questions created successfully', savedQuestions });
  } catch (error) {
    console.error('Error creating exam questions:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/* function for viewing the questions */
export const viewExamQuestions = async (req, res) => {
  try {
      const questionData = await ExamQuestion.find();
      if (!questionData) {
          return res.status(404).json({ msg: "Questions not found" });
      }
      res.status(200).json(questionData);
  } catch (error) {
    console.error('Error viewing exam time table:', error.message);
      res.status(500).json({ error: error });
  }
}

export const viewExamQuestionsTeach = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Validate the teacher ID
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Fetch exam questions created by this teacher
    const questions = await ExamQuestion.find({ createdBy: teacherId });
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No exam questions found for this teacher' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching exam questions:', error.message);
    res.status(500).json({ message: 'Error while fetching exam questions', success: false });
  }
};

/* function for deleting the question */
export const deleteExamQuestion = async (req, res) => {
  try {
    const questionId = req.params.id
    const question = await ExamQuestion.findByIdAndDelete(questionId)
    if (!question) {
      return res.status(404).json({ message: 'Question not found'})
    }
    res.status(200).json({ message: 'question deleted successfully', success: true })
  } catch (error) {
    console.error('Cannot be deleted the question due to: ', error.message)
    res.status(500).json({ message: 'Cant be deleted', success: false })
  }
}

/* function for updating the questions */
export const updateExamQuestion = async (req, res) => {
  try {
    const questionId = req.params.id
    const question = await ExamQuestion.findByIdAndUpdate(questionId, req.body, { new: true })
    if (!question) {
      return res.status(404).json({ message: 'Question not found' })
      }
      res.status(200).json({ message: 'Question updated successfully', success: true })
      } catch (error) {
        console.error('Error updating exam question: ', error.message)
        res.status(500).json({ message: 'Error updating exam question', success: false })
        }
      }

/* functions for 	adding study materials */
export const createStudyMaterial = async (req, res) => {
  try {
    const teacherId = req.params.teacherid;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid Teacher ID format', success: false });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found', success: false });
    }

    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newStudyMaterial = new StudyMaterial({
      title,
      subject: teacher.subject, 
      content,
      tags,
      createdBy: teacherId
    });

    const savedStudyMaterial = await newStudyMaterial.save();

    res.status(201).json(savedStudyMaterial);
  } catch (error) {
    console.error('Error creating study material:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/* function for viewing the study material */
export const viewStudyMaterial = async (req, res) => {
  try {
      const materialData = await StudyMaterial.find();
      if (!materialData) {
          return res.status(404).json({ msg: "Material not found" });
      }
      res.status(200).json(materialData);
  } catch (error) {
    console.error('Error viewing exam time table:', error.message);
      res.status(500).json({ error: error });
  }
}

export const viewStudyMaterialTeach = async (req, res) => {
  try {
    const { teacherId } = req.params;

    console.log('Received teacherId:', teacherId);

    
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    console.log('teacher:', teacher);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Fetch study materials created by this teacher
    const stud = await StudyMaterial.find({ createdBy: teacherId });
    if (stud.length === 0) {
      return res.status(404).json({ message: 'No study materials found for this teacher' });
    }

    res.status(200).json(stud);
  } catch (error) {
    console.error('Error fetching study materials:', error.message);
    res.status(500).json({ message: 'Error while fetching study materials', success: false });
  }
};

/* function for deleting the material */
export const deleteStudyMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await StudyMaterial.findByIdAndDelete(materialId);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
      }
      res.status(200).json({ message: "Material deleted successfully", success: true });
      } catch (error) {
        console.error('Error deleting material:', error.message);
        res.status(500).json({ message: 'Error deleting material', success: false });
      }
    }

/* function for adding the teache and it is adding by the officer in the User table and store to the tacher model */
export const addTeacher = async (req, res) => {
  try {
    const { name, email, password, address, phone, subject } = req.body;
    const officerId = req.params.officerId;

    
    if (!mongoose.Types.ObjectId.isValid(officerId)) {
      return res.status(400).json({ message: 'Invalid Officer ID format', success: false });
    }

    
    const officer = await User.findById(officerId);
    if (!officer || officer.role !== 'office') {
      return res.status(404).json({ message: 'Officer not found or not authorized', success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the teacher with the hashed password
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      subject,
      addedBy: officerId,
    });

    await newTeacher.save();
    res.status(200).json({ message: 'Teacher added successfully', success: true });
  } catch (error) {
    console.error('Error adding teacher:', error.message);
    res.status(500).json({ message: 'Email Id already exists', success: false });
  }
};

/* now view the teacher we created above */
export const viewTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find(); 

    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }

    res.status(200).json({ data: teachers , success: true });
  } catch (error) {
    console.error('Error viewing teachers:', error.message);
    res.status(500).json({ message: "Error while viewing the teachers", success: false });
  }
}

/* deleting the teacher with the id  */
export const deleteTeacher = async (req, res) => {
  try {
    const { id, officeId } = req.params;

    console.log('Received teacherId:', id);
    console.log('Received officerId:', officeId);

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(officeId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const officer = await User.findById(officeId);
    console.log('Officer:', officer);
    if (!officer || officer.role !== 'office') {
      return res.status(403).json({ message: 'Officer not found or not authorized' });
    }

    const teacher = await Teacher.findByIdAndDelete(id);
    console.log('Deleted teacher:', teacher);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting teacher:', error.message);
    res.status(500).json({ message: 'Error while deleting the teacher', success: false });
  }
};

/* code for adding the syllabus like given in the syllabus model */
export const addSyllabus = async (req, res) => {
  try {
    const { subject, module, topics } = req.body;
    if (!subject || !module || !Array.isArray(topics)) {
      return res.status(400).json({ message: 'All fields are required and topics must be an array.' });
    }
    const newSyllabus = new Syllabus({
      subject,
      module,
      topics
    });
    await newSyllabus.save();
    res.status(201).json({ message: 'Syllabus added successfully', syllabus: newSyllabus });
  } catch (error) {
    console.error('Error adding syllabus:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

/* function for viewing the added syllabus */
export const viewSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find(); 

    if (syllabus.length === 0) {
      return res.status(404).json({ message: "No syllabus found" });
    }

    res.status(200).json({ data: syllabus, success: true });
  } catch (error) {
    console.error('Error viewing teachers:', error.message);
    res.status(500).json({ message: "Error while viewing the syllabus", success: false });
  }
}

/* funtion for deleting the syllabus */
export const deleteSyllabus = async (req, res) => {
  try {
    const id = req.params.id;
    const syllabus = await Syllabus.findByIdAndDelete(id)
    if (!syllabus) {
      return res.status(404).json({ message:"cannot found syllabus", success: false })
    }
    res.status(200).json({ message:"deleted successfully", success: true })
  } catch (error) {
    console.log("error while fetching the data",error)
    res.status(500).json({ message:"server error", success: false })
  }
}

export const viewPerson = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ message: 'ID is required.' });
      }

    
      let person = await Teacher.findById(id);

      if (person) {
          return res.status(200).json({ role: 'teacher', data: person });
      }

      person = await User.findById(id);

      if (person) {
          return res.status(200).json({ role: 'user', data: person });
      }
      res.status(404).json({ message: 'Person not found.' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


