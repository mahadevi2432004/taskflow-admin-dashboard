import React from "react";
import { motion } from "framer-motion";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <TodoApp />
    </motion.div>
  );
}

export default App;