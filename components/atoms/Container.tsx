const Container = ({ children }: any) => {
  return (
    <section className="mt-10 mb-10">
      <div className="container flex flex-col items-center content-center justify-center mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Container;
