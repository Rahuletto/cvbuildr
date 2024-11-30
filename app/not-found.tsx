export default function Home() {
  return (
    <main className="flex items-center justify-center w-screen h-screen flex-col gap-4">
      <h1 
          style={{ animationDelay: '0.1s' }} 
          className="animate-fadeIn font-bold lg:text-8xl text-6xl opacity-0 text-center">
          404.
        </h1>
        <p 
          style={{ animationDelay: '0.3s' }} 
          className="animate-fadeIn lg:text-2xl text-lg opacity-0 font-semibold text-center">
          Oopsie.. You aren&apos;t supposed to be here
        </p>
    </main>
  );
}
