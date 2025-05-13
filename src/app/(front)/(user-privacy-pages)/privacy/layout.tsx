
const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
      return (
      <div className="flex flex-col w-[75%] m-auto">
            <div className="flex flex-col ">
            {children}
            </div>
      </div>
      );
}

export default PrivacyLayout;