const Container = ({ children }: any) => {
  return (
    <section className="mt-10 mb-10">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-full lg:py-0">
        {children}
      </div>
    </section>
  );
};

export default Container;
