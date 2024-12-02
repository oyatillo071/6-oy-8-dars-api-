import React, { useState, useEffect } from "react";
import axios from "axios";
import { books } from "../axios";

function Books() {
  const [bookValue, setBooksValue] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    if (!bookValue) return;

    setLoading(true);
    setNextPageToken(null);

    books
      .get(`${bookValue}`)
      .then((response) => {
        setBooksData(response.data.items || []);
        setNextPageToken(response.data.nextPageToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [bookValue]);

  const loadMoreBooks = () => {
    if (!nextPageToken) return;

    setLoading(true);

    books
      .get(`${bookValue}&pageToken=${nextPageToken}`)
      .then((response) => {
        setBooksData((prevData) => [
          ...prevData,
          ...(response.data.items || []),
        ]);
        setNextPageToken(response.data.nextPageToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching more books:", error);
        setLoading(false);
      });
  };

  return (
    <div
      style={{ backgroundAttachment: "fixed", backgroundSize: "cover" }}
      className="bg-zinc-700 h-[100vh] py-6 flex items-center gap-4 flex-col">
      <h2 className="text-white font-medium text-xl">Kitob qidirish uchun</h2>

      <form
        className="flex flex-col items-center gap-4 container mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <div className="flex flex-col items-center gap-3">
          <label
            htmlFor="bookInput"
            className="text-white font-medium text-base">
            Kitob nomini kiriting:
          </label>
          <input
            type="text"
            id="bookInput"
            value={bookValue}
            onChange={(e) => setBooksValue(e.target.value)}
            className="bg-white px-5 py-2 rounded-lg outline-none"
            placeholder="Kitob nomini kiriting:"
          />
        </div>

        {loading && <p className="text-white">Loading...</p>}
      </form>

      {booksData.length > 0 && (
        <div className="flex flex-wrap items-center gap-5">
          {booksData.map((book) => (
            <div
              key={book.id}
              className="bg-white flex gap-3 p-4 rounded-lg w-[30%] shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-[50%] h-40 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mt-3">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && bookValue != "" && booksData.length == 0 ? (
        <p className="text-red-500">No books found!</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Books;
