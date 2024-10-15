function Page({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="w-full h-full min-h-screen md:max-w-3xl mx-auto px-4 flex flex-col justify-center items-center gap-6">
      {children}
    </div>
  );
}

export { Page };
