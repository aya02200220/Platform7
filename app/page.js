import CurrentDate from "./components/currentDate";
import Tips from "./components/Tips";
import { Note } from "./components/Note";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2 pt-12 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 md:pb-6 pt-6 md:pt-8 backdrop-blur-2xl  lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 ">
          <CurrentDate />
        </div>
      </div>

      <Tips />
      <Note />
      <p className="fixed bottom-0 right-0 mb-4 mr-4 text-[10px] md:text-[20px]">
        ♡ Created by Aya ♡
      </p>
    </main>
  );
}
