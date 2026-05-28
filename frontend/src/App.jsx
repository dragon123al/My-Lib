import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [bookImage, setBookImage] = useState("/PiranesiCover.jpg");
  const [bookName, setBookName] = useState("Piranesi by Susanna Clarke");
  const totalPages = 300;
  const percent = Math.min(Math.round((pages / totalPages) * 100), 100);
  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      {/* name's library */}
      <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center w-[15%]">
        <h1 className="text-3xl font-medium mb-4">Bobby's Library</h1>
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2.5 bg-gray-300 rounded-lg border border-2xl border-black text-sm font-medium hover:bg-gray-500 transition-colors"
        >
          Book Count is {count}
        </button>
      </div>

      {/* currently reading */}
      <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center w-[15%]">
        <h1 className="text-3xl font-medium mb-4">Currently Reading</h1>
        <div className="flex flex-col justify-center mb-4">
          <img
            src={bookImage}
            alt="Book cover"
            className="w-24 h-36 object-cover rounded-lg shadow mx-auto mb-2"
          />
          <p>{bookName}</p>
        </div>
      </div>

      {/* progress */}
      <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 w-[15%]">
        <h1 className="text-3xl font-medium mb-4">Reading Progress</h1>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="number"
            min="0"
            max={totalPages}
            value={pages === 0 ? "" : pages}
            onChange={(e) => setPages(Number(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
            className="w-20 px-3 py-2 rounded-lg bg-gray-300 text-center text-sm focus:outline-none"
            placeholder="0"
          />
          <span className="text-sm">of {totalPages} pages</span>
          <span className="ml-auto text-sm font-medium">{percent}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-gray-700 h-3 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
