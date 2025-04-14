export default function PostCard({
  item,
  onClick,
}: {
  item: any
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer rounded-lg bg-gray-900 p-4 text-white'
    >
      <img
        src={item.image}
        alt={item.title}
        className='h-32 w-full rounded-md object-cover'
      />
      <h3 className='mt-2 text-lg font-semibold'>{item.title}</h3>
      <p className='font-bold text-green-400'>{item.price}</p>
    </div>
  )
}
