const express = require("express");
const router = express.Router();
const User = require("../../model/userModel");
const Enrollment = require("../../model/enrollmentModel");
const Course = require("../../model/courseModel")
const Session = require("../../model/sessionModel");

router.get("/students", async (req, res) => {
    try {
        const students = await User.find({role: "student"});
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/enrolledStudents/:courseId", async (req, res) => {
    try {
        const {courseId} = req.params;

        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }

        const enrollments = await Enrollment.find({course: course._id}).populate(
            "user"
        );



        const enrolledStudents = enrollments.map((enrollment) => {
            const student = enrollment.user;
            console.log(student);
            return {
                name: student.name,
                dept: student.department,
                regNo: student.regNo,
                uid: student.uid,
                progress: {
                    courseId: course.courseId,
                    section: enrollment.section,
                },
            };
        });

        return res.status(200).json(enrolledStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", error});
    }
});

router.get('/certificates-obtained/:courseId', async (req, res) => {
    try {
        const {courseId} = req.params
        const enrollments = await Enrollment.find({
            "section": {
                $elemMatch: {
                    isFinal: true,
                    isCompleted: true
                }
            }
        }).populate('user course');
        const result = await Promise.all(
            enrollments.map(async (enrollment) => {
                const finalSession = await Session.findOne({
                    userId: enrollment.user._id,
                    courseId: enrollment.course.courseId,
                    isFinal: true,
                });

                return {
                    name: enrollment.user.name,
                    dept: enrollment.user.department,
                    regNo: enrollment.user.regNo,
                    score: finalSession ? finalSession.result.scorePercentage : null,
                };
            })
        );


        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.get("/attempt-requests/:courseId", async (req, res) => {
    try {
        const {courseId} = req.params
        const enrollments = await Enrollment.find({
            section: {$elemMatch: {isFinal: true}},
        })
            .populate("user", "-password")
            .populate("course", "courseName");

        const response = enrollments.flatMap((enrollment) => {
            return enrollment.section
                .filter(
                    (section) =>
                        section.isFinal &&
                        section.noOfAttempts >= enrollment.finalQuizAllowReattemptCount * 2
                )
                .map((section) => ({
                    noOfAttempts: section.noOfAttempts,
                    tabSwitchCount: enrollment.tabSwitchCount,
                    failureReason: enrollment.failureReason,
                    user: enrollment.user.name,
                    dept: enrollment.user.department,
                    regNo: enrollment.user.regNo,
                    score: enrollment.finalQuizScore,
                    courseName: enrollment.course.courseName,
                }));
        });

        return res.json(response);
    } catch (error) {
        console.error("Error fetching attempt requests:", error);
        res.status(500).json({message: "Server error fetching attempt requests"});
    }
});

router.post("/allow-reattempt", async (req, res) => {
    const {courseId} = req.body;
    const userId = "671598ea1aa659de63af9c64";
    try {
        const course = await Course.findOne({courseId});
        const enrollment = await Enrollment.findOne({user: userId, course: course._id});

        if (!enrollment) {
            return res.status(404).json({message: "Enrollment not found"});
        }

        enrollment.finalQuizAllowReattemptCount += 1

        await enrollment.save();

        return res.json({message: "Reattempt allowed successfully", enrollment});
    } catch (error) {
        console.error("Error allowing reattempt:", error);
        res.status(500).json({message: "Server error allowing reattempt"});
    }
});

router.post("/restart-course", async (req, res) => {
    const {courseId} = req.body;
    const userId = "671598ea1aa659de63af9c64";
    try {
        const course = await Course.findOne({courseId});
        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }

        const enrollment = await Enrollment.findOne({
            user: userId,
            course: course._id,
        });
        if (!enrollment) {
            return res.status(404).json({message: "Enrollment not found"});
        }

        enrollment.section = enrollment.section.map((section) => {
            const quizDefaults = course.quiz.find(
                (quiz) => quiz.sectionNo === section.sectionNo
            );

            return {
                sectionNo: section.sectionNo,
                isCompleted: false,
                noOfAttempts: quizDefaults ? 0 : undefined,
                reattemptIn: quizDefaults ? null : undefined,
                timeTaken: quizDefaults ? null : undefined,
                isFinal: section.isFinal || false,
            };
        });

        enrollment.finalQuizAllowReattemptCount = 1;

        await enrollment.save();

        return res.json({
            message: "Course restarted successfully",
            enrollment,
        });
    } catch (error) {
        console.error("Error restarting course:", error);
        return res.status(500).json({message: "Server error restarting course"});
    }
});

router.get("/sessions/:courseId", async (req, res) => {
    try {
        const {courseId} = req.params;
        const userId = "671598ea1aa659de63af9c64";
        const sessions = await Session.find({
            userId: userId,
            courseId: courseId,
        }).lean()
        console.log(sessions)
        const result = sessions.map(session => {
            console.log()
            return {
                sessionId: session.sessionId,
                sectionNo: session.sectionNo,
                tabSwitchCount: session.tabSwitchCount,
                totalQuestion: session.result.totalQuestions,
                hasPassed: session.result.hasPassed,
                correctAnswers: session.result.correctAnswers,
                score: session.result.scorePercentage,
                startsAt: session.startTime,
                endsAt: session.expiryTime,
            }
        })
        res.json(result);
    } catch (e) {
        console.log(e)
    }
});

router.get("/session/:sessionId", async (req, res) => {
    try {
        const sessionId = req.params.sessionId;

        const session = await Session.findOne({sessionId})
            .select("result questions")
            .populate(
                "questions.question",
                "question options answer userAnswwer timeTaken"
            ).lean();

        if (!session) {
            return res.status(404).json({message: "Session not found"});
        }

        res.status(200).json(session);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Internal Server error"});
    }
});

module.exports = router;
