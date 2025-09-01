const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='m-auto flex w-[75%] flex-col'>
      <div className='flex flex-col'>{children}</div>
    </div>
  )
}

export default PrivacyLayout
