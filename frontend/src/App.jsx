import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [bookImage, setBookImage] = useState("/PiranesiCover.jpg");
  const [bookName, setBookName] = useState("Piranesi by Susanna Clarke");
  const totalPages = 300;
  const percent = Math.min(Math.round((pages / totalPages) * 100), 100);
  


  return (
    <div className="min-h-screen flex items-center justify-center">
      
      {/* current book half */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-8 mr-20">
        
        {/* name's library */}
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center w-[80%]">
          <h1 className="text-3xl font-medium mb-4">Bobby's Library</h1>
        </div>

        {/* currently reading */}
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center w-[80%]">
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
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 w-[80%]">
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

      {/* bookshelf half */}
      <div className="w-2/4 ml-20">
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-10 text-center">
          <h1 className="text-3xl font-medium mb-4">Bobby's Library</h1>
          <button
            type="button"
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-2.5 bg-gray-300 rounded-lg border border-2xl border-black text-sm font-medium hover:bg-gray-500 transition-colors mb-4"
          >
            Book Count is {count}
          </button>

          {/* bookshelf grid */}
          <div className="grid grid-cols-4 gap-2 p-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-400 rounded-xl flex flex-col items-center gap-3 p-4 hover:bg-gray-500 transition-colors"
              >
                <div className="w-16 h-24 bg-gray-300 rounded-lg" />
                <div className="h-4 w-2/4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
