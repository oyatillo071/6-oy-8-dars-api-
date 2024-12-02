import React, { useState, useEffect } from "react";
import { github } from "../axios";

function Repositories() {
  const [userName, setUserName] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userName !== "") {
      setError(""); 
      github
        .get(`users/${userName}/repos`)
        .then((response) => {
          setRepos(response.data);
        })
        .catch((error) => {
          setRepos([]);
          setError("Foydalanuvchi topilmadi yoki xato yuz berdi");
        });
    }
  }, [userName]);

  return (
    <div className="bg-indigo-400 min-h-[100vh] mb-0 p-3 flex items-center flex-col">
      <h2 className="text-white font-semibold">
        Git hub dagi eng ko'p yuldizga ega repositoriyalarni izlash uchun
      </h2>
      <form
        className="flex items-center flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-3 flex-col">
          <label htmlFor="repo-input" className="text-sky-900 font-medium">
            Username kiriting:
          </label>
          <input
            className="border px-4 py-2 outline-none rounded-xl"
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Username kiriting:"
            id="repo-input"
          />
        </div>
      </form>
      <div>
        <h2>{error && <p className="text-red-600 font-medium">{error}</p>}</h2>
      </div>
      <div className="mt-5">
        {repos.length > 0 && (
          <ul className="bg-white rounded-lg p-4">
            {repos.map((repo) => (
              <li key={repo.id} className="mb-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
                  {repo.name}
                </a>{" "}
                - ⭐ {repo.stargazers_count}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Repositories;
