import React, { useState } from "react";
import FeedbackOptions from "../feedBack/FeedbackOptions";
import Notification from "../notification/Notification";
import Section from "../section/Section";
import Statistics from "../statistics/Statistics";
import styles from "./Main.module.css";

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const Main = () => {
  const [feedback, setFeedback] = useState(initialState);

  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const increment = (e) => {
    const name = e.target.name;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,

      [name]: prevFeedback[name] + 1,
    }));
  };

  // const increment = (e) => {
  //   const name = e.target.name;
  //   console.log(name);

  //   switch (name) {
  //     case "good":
  //       setGood((prev) => prev + 1);
  //       break;
  //     case "neutral":
  //       setNeutral((prev) => prev + 1);
  //       break;
  //     case "bad":
  //       setBad((prev) => prev + 1);
  //       break;

  //     default:
  //       return;
  //   }
  // };

  const countTotalFeedback = () => {
    const res = Object.values(feedback).reduce((acc, item) => (acc += item), 0);
    return res;
    // return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const valueFeedback = countTotalFeedback();
    const goodPercentage = valueFeedback
      ? (feedback.good / valueFeedback) * 100
      : 0;
    return Number(goodPercentage).toFixed(0);
  };

  return (
    <>
      <div className={styles.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={increment}
            options={Object.keys(feedback)}
            // options={["good", "neutral", "bad"]}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() ? (
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification massege="No feedback given" />
          )}
        </Section>
      </div>
    </>
  );
};

export default Main;

// class Main extends Component {
//   state = { good: 0, neutral: 0, bad: 0 };

//   increment = (e) => {
//     const name = e.target.name;
//     this.setState((prevStats) => ({
//       [name]: prevStats[name] + 1,
//     }));
//   };

//   countTotalFeedback = () =>
//     Object.values(this.state).reduce((acc, item) => (acc += item), 0);

//   countPositiveFeedbackPercentage = () => {
//     const valueFeedback = this.countTotalFeedback();
//     const goodPercentage = valueFeedback
//       ? (this.state.good / valueFeedback) * 100
//       : 0;
//     return Number(goodPercentage).toFixed(0);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const totalfeedback = this.countTotalFeedback;
//     const percentage = this.countPositiveFeedbackPercentage;
//     const addIncrement = this.increment;

//     return (
//       <>
//         <div className={styles.container}>
//           <Section title="Please leave feedback">
//             <FeedbackOptions
//               onLeaveFeedback={addIncrement}
//               options={Object.keys(this.state)}
//             />
//           </Section>

//           <Section title="Statistics">
//             {totalfeedback() ? (
//               <Statistics
//                 good={good}
//                 neutral={neutral}
//                 bad={bad}
//                 total={totalfeedback()}
//                 positivePercentage={percentage()}
//               />
//             ) : (
//               <Notification massege="No feedback given" />
//             )}
//           </Section>
//         </div>
//       </>
//     );
//   }
// }

// export default Main;
