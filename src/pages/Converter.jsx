import React, { useEffect, useState } from "react";
import { backend } from "../axios";
import change from "../assets/change.png";

function Home() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("UZS");
  const [result, setResult] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [convertClick, setConvertClick] = useState(0);
  const [error, setError] = useState("");

  function resetForm() {
    setFrom("USD");
    setTo("UZS");
    setInputValue(0);
    setResult(0);
    setError("");
  }

  useEffect(() => {
    async function convert() {
      setError("");
      if (!inputValue || inputValue <= 0) {
        setError("Iltimos, 0 dan katta qiymat kiriting!");
        return;
      }
      if (from === to) {
        setError("'Dan' va 'Ga' bir xil bo'lishi mumkin emas!");
        return;
      }
      try {
        const response = await backend.get(
          `fetch-one?from=${from}&to=${to}&api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (response.status === 200) {
          const conversionRate = response.data.result[to];
          setResult(inputValue * conversionRate);
        }
      } catch (error) {
        console.error(error);
        setError("Valyuta kursini olishda xatolik yuz berdi!");
      }
    }
    convert();
  }, [convertClick]);

  return (
    <>
      <form className="p-5 h-full bg-blue-50 flex flex-col items-center gap-8">
        <h1 className="text-sky-900 text-2xl font-semibold mb-1">
          Bu valute xisoblagich
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="input">
            Qiymat kiriting:
          </label>
          <input
            type="number"
            className="input px-4 py-2 outline-none rounded-xl"
            min={0}
            id="input"
            autoFocus
            value={inputValue == 0 ? "" : inputValue}
            placeholder="Qiymat kiriting:"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="from" className="font-medium text-sky-950">
              Dan
            </label>
            <select
              className="rounded-lg px-2 py-1"
              name=""
              value={from}
              id="from"
              onChange={(e) => {
                e.preventDefault();
                setFrom(e.target.value);
              }}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UZS">UZS</option>
              <option value="RUB">RUB</option>
              <option value="KZT">KZT</option>
              <option value="CNY">CNY</option>
            </select>
          </div>
          <button
            className="btn mt-7 border rounded-[50%] "
            onClick={(e) => {
              e.preventDefault();
              let temp = from;
              setFrom(to);
              setTo(temp);
            }}>
            {" "}
            <img src={change} alt="change" className="w-6 h-6" />{" "}
          </button>
          <div className="flex flex-col  gap-2">
            <label htmlFor="to" className="font-medium text-sky-950">
              Ga
            </label>
            <select
              name=""
              className="rounded-lg px-2 py-1"
              id="to"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}>
              <option value="UZS">UZS</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
              <option value="KZT">KZT</option>
              <option value="CNY">CNY</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <button
            className="btn bg-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              setConvertClick(convertClick + 1);
            }}>
            Davam etish
          </button>

          <button
            className="btn bg-red-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              resetForm();
            }}>
            Reset
          </button>
        </div>

        {!convertClick == 0 && error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}
        <h2>
          {result > 0 && (
            <span className="text-lg text-green-600 font-bold">
              Natija: {inputValue} {from} = {result.toFixed(2)} {to}
            </span>
          )}
        </h2>
      </form>
    </>
  );
}

export default Home;
