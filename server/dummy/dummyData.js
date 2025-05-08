import mongoose from "mongoose";
import All from "../models/All.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/educational-platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

async function insertDummyTest() {
  try {
    const dummyTest = new All({
      name: "Basic Modal Verbs Test",
      description: "An introductory test on modal verbs with simple questions.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bce"),
      mcqs: [
      {
        question: "Which modal verb is used for ability in the present? 'I ___ swim well.'",
        options: ["can", "must", "should", "might"],
        correctAnswer: 0,
        reason: "'Can' is used to express present ability."
      },
      {
        question: "Which modal verb is used for permission? '___ I use your phone?'",
        options: ["Can", "Must", "Should", "Might"],
        correctAnswer: 0,
        reason: "'Can' is commonly used to ask for permission."
      },
      {
        question: "Which modal verb expresses necessity? 'You ___ wear a helmet while riding.'",
        options: ["must", "can", "might", "should"],
        correctAnswer: 0,
        reason: "'Must' is used to express necessity or obligation."
      },
      {
        question: "Which modal verb is used for advice? 'You ___ drink more water.'",
        options: ["should", "must", "can", "might"],
        correctAnswer: 0,
        reason: "'Should' is used to give advice."
      },
      {
        question: "Which modal verb expresses possibility? 'It ___ rain later today.'",
        options: ["might", "must", "can", "should"],
        correctAnswer: 0,
        reason: "'Might' is used to express possibility."
      },
      {
        question: "Which modal verb is used for prohibition? 'You ___ not park here.'",
        options: ["must", "can", "should", "might"],
        correctAnswer: 0,
        reason: "'Must not' is used to express prohibition."
      },
      {
        question: "Which modal verb is used for a polite request? '___ you help me with this?'",
        options: ["Could", "Can", "Must", "Might"],
        correctAnswer: 0,
        reason: "'Could' is used for polite requests."
      },
      {
        question: "Which modal verb expresses lack of necessity? 'You ___ finish it now.'",
        options: ["need not", "must", "can", "should"],
        correctAnswer: 0,
        reason: "'Need not' is used to express lack of necessity."
      },
      {
        question: "Which modal verb is used for a strong recommendation? 'You ___ try this dish.'",
        options: ["should", "must", "might", "can"],
        correctAnswer: 0,
        reason: "'Should' is used for strong recommendations."
      },
      {
        question: "Which modal verb expresses certainty? 'He ___ be the one who called.'",
        options: ["must", "might", "can", "should"],
        correctAnswer: 0,
        reason: "'Must' is used to express certainty."
      },
      {
        question: "Which modal verb is used to express a future possibility? 'It ___ snow tomorrow.'",
        options: ["might", "must", "can", "should"],
        correctAnswer: 0,
        reason: "'Might' is used to express future possibility."
      },
      {
        question: "Which modal verb is used to express a suggestion? 'You ___ visit the museum.'",
        options: ["should", "must", "can", "might"],
        correctAnswer: 0,
        reason: "'Should' is used to express suggestions."
      },
      {
        question: "Which modal verb is used to express a promise? 'I ___ help you with your homework.'",
        options: ["will", "can", "might", "should"],
        correctAnswer: 0,
        reason: "'Will' is used to express promises."
      },
      {
        question: "Which modal verb is used to express a deduction? 'He ___ be at work now.'",
        options: ["must", "might", "can", "should"],
        correctAnswer: 0,
        reason: "'Must' is used to express deductions."
      },
      {
        question: "Which modal verb is used to express an offer? 'I ___ carry your bag for you.'",
        options: ["can", "must", "might", "should"],
        correctAnswer: 0,
        reason: "'Can' is used to express offers."
      },
      {
        question: "Which modal verb is used to express a conditional possibility? 'If you study hard, you ___ pass the exam.'",
        options: ["might", "must", "can", "should"],
        correctAnswer: 2,
        reason: "'Can' is used to express conditional possibilities."
      },
      {
        question: "Which modal verb is used to express a strong obligation? 'You ___ report this to the authorities.'",
        options: ["must", "can", "might", "should"],
        correctAnswer: 0,
        reason: "'Must' is used to express strong obligations."
      },
      {
        question: "Which modal verb is used to express a polite suggestion? 'You ___ try the new restaurant downtown.'",
        options: ["might", "must", "can", "should"],
        correctAnswer: 3,
        reason: "'Should' is used to express polite suggestions."
      },
      {
        question: "Which modal verb is used to express impossibility? 'He ___ be the thief; he was with me.'",
        options: ["can't", "must", "might", "should"],
        correctAnswer: 0,
        reason: "'Can't' is used to express impossibility."
      },
      {
        question: "Which modal verb is used to express a habitual action in the past? 'He ___ go fishing every weekend.'",
        options: ["would", "can", "might", "should"],
        correctAnswer: 0,
        reason: "'Would' is used to express habitual actions in the past."
      }
      ],
      numberOfMcqs: 20,
      duration: 30, // minutes
      difficulty: "Easy",
      averageScore: 0,
      userProgress: []
    });

    await dummyTest.save();
    console.log("Dummy test inserted successfully!");
  } catch (error) {
    console.error("Error inserting dummy test:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertDummyTest();
