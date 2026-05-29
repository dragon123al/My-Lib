import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [bookImage, setBookImage] = useState("/PiranesiCover.jpg");
  const [bookName, setBookName] = useState("Piranesi");
  const [bookAuthor, setBookAuthor] = useState("Susanna Clarke");
  const totalPages = 300;
  const percent = Math.min(Math.round((pages / totalPages) * 100), 100);
  
  const bookArray = [
    {
      title: "The Song of Achilles",
      author: "Madeline Miller",
      cover:
        "https://madelinemiller.com/wp-content/uploads/2026/01/AchillesDeluxe-front.jpg",
    },
    {
      title: "Circe",
      author: "Madeline Miller",
      cover:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg",
    },
    {
      title: "Martyr",
      author: "Kaveh Akbar",
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1683818219l/139400713.jpg",
    },
    {
      title: "Crying in H Mart",
      author: "Michelle Zauner",
      cover:
        "https://www.jacksonville.com/gcdn/presto/2021/08/10/NFTU/35662059-4725-4752-a9dd-75f0fa06626a-81-zGtxNJS.jpg?crop=1687,2250,x0,y0",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* current book half */}
      <div className="w-1/4 flex flex-col items-center justify-center gap-8 mr-20">
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
            <p className="text-xl">{bookName}</p>
            <p>{bookAuthor}</p>
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
            className="px-6 py-2.5 bg-gray-300 rounded-lg border border-2xl border-black text-sm font-medium hover:bg-gray-500 transition-colors mb-4"
          >
            Book Count is {bookArray.length}
          </button>

          {/* bookshelf grid */}
          <div className="grid grid-cols-5 gap-2 p-2">
            {Array.from({ length: 20 }).map((_, i) => {
              const book = bookArray[i];
              return (
                <div
                  key={i}
                  className="bg-gray-400 rounded-xl flex flex-col items-center gap-2 p-2 hover:bg-gray-500 transition-colors"
                >
                  <div className="w-20 h-30 bg-gray-300 rounded-lg flex items-end justify-center pb-1">
                    {book && (
                      <span className="text-xs text-center text-gray-600 leading-tight px-1">
                        <img src={book.cover} alt={book.title} />
                      </span>
                    )}
                  </div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded flex items-center justify-center">
                    {book && (
                      <span className="text-xs text-gray-600 truncate px-1">
                        {book.title}
                      </span>
                    )}
                  </div>
                  <div className="h-3 w-3/5 bg-gray-300 rounded flex items-center justify-center">
                    {book && (
                      <span className="text-xs text-gray-600 truncate px-1">
                        {book.author}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
