import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentBook, setCurrentBook] = useState({
    title: "Piranesi",
    author: "Susanna Clarke",
    cover: "/PiranesiCover.jpg",
  });
  const [totalPages, setTotalPages] = useState(1);
  const percent = Math.min(Math.round((pages / totalPages) * 100), 100);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const initialBooks = [
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

  const [bookArray, setBookArray] = useState(initialBooks);

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
      setSearchError("");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchError("");
    setSearchResults([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5&fields=title,author_name,cover_i`,
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        setSearchError("No books found.");
        return;
      }

      const results = data.docs.map((item) => ({
        title: item.title || "Unknown Title",
        author: item.author_name?.[0] || "Unknown Author",
        cover: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
          : null,
      }));

      setSearchResults(results);
    } catch (err) {
      setSearchError("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const addBook = (book) => {
    setBookArray((prev) => [...prev, book]);
    setSearchResults([]);
    setQuery("");
  };

  
  const removeBook = (book) => {
    setBookArray((prev) => prev.filter((b) => b.title !== book.title));
  };

  const removeCurrent = () => {
    setCurrentBook(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* current book half */}
      <div className="w-1/4 flex flex-col items-center justify-center gap-8">
        {/* name's library */}
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-6 text-center w-[80%]">
          <h1 className="text-3xl font-medium mb-4">Bobby's Library</h1>
        </div>

        {/* currently reading */}
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-6 text-center w-[80%]">
          <h1 className="text-3xl font-medium mb-4">Currently Reading</h1>
          <div className="flex flex-col justify-center mb-4">
            <img
              src={currentBook?.cover || ""}
              alt={currentBook?.title || ""}
              className="w-24 h-36 object-cover rounded-lg shadow mx-auto mb-2"
            />
            <p className="text-xl">{currentBook?.title || "Title"}</p>
            <p>{currentBook?.author || "Author"}</p>
            <button
              className="px-2 py-2 bg-red-400 rounded-full border border-2xl border-black text-sm font-medium hover:bg-red-300 transition-colors mt-2 w-fit mx-auto"
              onClick={() => removeCurrent()}
            >
              Remove
            </button>
          </div>
        </div>

        {/* progress */}
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-6 text-center w-[80%]">
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
            <span className="text-sm">of</span>
            <input
              type="number"
              min="0"
              value={totalPages === 0 ? "" : totalPages}
              onChange={(e) => setTotalPages(Number(e.target.value) || 0)}
              onFocus={(e) => e.target.select()}
              className="w-20 px-3 py-2 rounded-lg bg-gray-300 text-center text-sm focus:outline-none"
              placeholder="0"
            />
            <span className="text-sm">pages</span>
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
          <h1 className="text-3xl font-medium mb-4">Bookshelf</h1>
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
                  <div className="flex items-center">
                    <div className="w-20 h-30 bg-gray-300 rounded-lg flex items-center justify-center">
                      {book && (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {book && (
                      <div className="flex flex-col ml-2">
                        <button
                          className="px-2 py-2 bg-red-400 rounded-full border border-2xl border-black text-sm font-medium hover:bg-red-300 transition-colors mb-4"
                          onClick={() => removeBook(book)}
                        >
                          Del
                        </button>
                        <button
                          className="px-2 py-2 bg-blue-400 rounded-full border border-2xl border-black text-sm font-medium hover:bg-blue-300 transition-colors mb-4"
                          onClick={() => setCurrentBook(book)}
                        >
                          Cur
                        </button>
                      </div>
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

      {/* book search */}
      <div className="min-h-screen w-1/5 ml-20">
        <div className="bg-gray-400 rounded-2xl shadow-sm border border-2xl p-8 text-center mt-100 w-[80%]">
          <h1 className="text-3xl font-medium mb-4">Add Book</h1>
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for book..."
                className="flex-1 border bg-gray-300 rounded-xl p-2 text-sm"
              />
            </div>
          </form>
        </div>

        {searchError && (
          <p className="text-sm text-red-700 mt-2">{searchError}</p>
        )}

        {/* results dropdown */}
        {searchResults.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 w-[80%]">
            {searchResults.map((book, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-300 rounded-xl p-2 ml-[10%] mr-[10%] hover:bg-gray-500 transition-colors cursor-pointer text-left"
                onClick={() => addBook(book)}
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-8 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-8 h-12 bg-gray-400 rounded flex items-center justify-center text-xs text-gray-600">
                    ?
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs font-medium truncate">{book.title}</p>
                  <p className="text-xs text-gray-600 truncate">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
