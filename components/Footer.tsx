export const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  return (
    <>
      <div className="w-full border-t mt-40 bg-neutral-50">
        <div className="flex flex-col max-w-[65.875rem] h-40 xs:px-6 px-8 justify-center items-center mx-auto">
          <div className="flex justify-center items-center gap-2">
            <p className="text-neutral-400 text-sm">
              ©{currentYear} urbanavenue, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
