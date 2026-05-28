import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center">
        <h1 className="text-3xl font-medium mb-2">Library</h1>
        <p className="text-xl mb-8">
          Track your reading collection
        </p>
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2.5 bg-gray-600 text-white rounded-lg border border-2xl border-black text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Book Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
