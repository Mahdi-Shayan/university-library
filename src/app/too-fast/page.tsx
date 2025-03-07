function TooFast() {
  return (
    <>
      <main className="root-container flex items-center justify-center h-screen p-5 text-center">
        <h1 className="text-6xl font-bebas-neue max-md:text-5xl">
          whoa, slow down there, speedy
          <span className="text-primary">!</span>
        </h1>
        <p className="mt-3 max-w-xl text-center text-light-400">
          Looks like you&apos;ve been a little too eager. We&apos;ve put a
          temporary pause on your excitement. 🚦 Chill for a bit, and try
          again shortly
        </p>
      </main>
    </>
  );
}

export default TooFast;
