// import { motion } from 'framer-motion'

// export default function PostModal({
//   item,
//   onClose,
// }: {
//   item: any
//   onClose: () => void
// }) {
//   return (
//     <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
//       <motion.div
//         className='w-96 rounded-lg bg-white p-6 shadow-lg'
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//       >
//         <h2 className='text-xl font-bold'>{item.title}</h2>
//         <img
//           src={item.image}
//           alt={item.title}
//           className='mt-2 h-40 w-full rounded-md object-cover'
//         />
//         <p className='text-lg font-bold text-green-500'>{item.price}</p>
//         <button
//           onClick={onClose}
//           className='mt-4 rounded-md bg-red-500 px-4 py-2 text-white'
//         >
//           Close
//         </button>
//       </motion.div>
//     </div>
//   )
// }
