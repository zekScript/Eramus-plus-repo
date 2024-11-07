"use client";
import { motion } from "framer-motion";
import AnimText from "./AnimText";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function A4Animation() {
  return (
    <motion.div className="flex w-full select-none items-center justify-center ">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className="flex aspect-[1.3/1.41] w-96 h-[200px]  flex-col rounded-2xl bg-white p-2"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-2"
        >
          
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          
        </motion.div>
        <motion.span
          variants={itemVariants}
          className="inline w-full text-lg text-slate-900"
        >
          <AnimText delay={1} />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
