import React from "react";
import { motion } from "framer-motion";

const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    })
  };

  return (
    <div className="dashboard">
      <motion.div
        className="stat-card"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h4>Total Tasks</h4>
        <p>{total}</p>
      </motion.div>

      <motion.div
        className="stat-card"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h4>Completed</h4>
        <p>{completed}</p>
      </motion.div>

      <motion.div
        className="stat-card"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h4>Pending</h4>
        <p>{pending}</p>
      </motion.div>

      <div className="progress-wrapper">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6 }}
        >
          {percentage}%
        </motion.div>
      </div>
    </div>
  );
};

export default TodoStats;