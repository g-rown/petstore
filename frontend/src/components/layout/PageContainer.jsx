import React from 'react';

const PageContainer = ({ children, fullWidth = false }) => {
  if (fullWidth) {
    return <main className="flex-grow w-full">{children}</main>;
  }
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
      {children}
    </main>
  );
};

export default PageContainer;
