import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const listJobs = JSON.parse(localStorage.getItem("jobs"));
    return listJobs ?? [];
  });

  const handleAdd = () => {
    if (job !== "") {
      setJobs((prev) => {
        const newListJob = [...prev, job];
        localStorage.setItem("jobs", JSON.stringify(newListJob));
        return newListJob;
      });
      setJob("");
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    if (index > -1) {
      setJobs(() => {
        const newListJob = jobs.filter((job, i) => i !== index);
        localStorage.setItem("jobs", JSON.stringify(newListJob));
        return newListJob;
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen">
      <div className="max-w-7xl mx-auto py-5 h-screen">
        <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full">
          <h2 className="text-3xl font-bold text-slate-900 uppercase">
            todo list
          </h2>
          <div className="flex my-2 items-end">
            <input
              type="text"
              placeholder="Todo"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              onKeyDown={handleEnter}
              className="rounded border border-gray-300 p-2 focus:outline-none focus:border-sky-500 inline-block mr-3 w-full pl-3"
            />

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 rounded text-center px-5 w-32 py-2.5 h-full"
              onClick={handleAdd}
            >
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Add
            </button>
          </div>

          <div className="list-items mt-5">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="item p-2 bg-white border border-gray-300 text-dark shadow-md rounded w-full h-12 flex items-center mb-4"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <FontAwesomeIcon
                      icon="circle-dot"
                      className="mx-2"
                      color="green"
                    />
                    {job}
                  </div>
                  <button
                    className="bg-red"
                    onClick={() => handleRemove(index)}
                  >
                    <FontAwesomeIcon
                      icon="circle-xmark"
                      className="mr-2 text-red-500"
                      size="lg"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
