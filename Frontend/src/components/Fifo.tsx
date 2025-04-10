import { useEffect, useState } from "react";

interface Step {
  page: number;
  frame: number[];
  status: string; // "Hit" or "Miss"
}

interface FifoResult {
  pageHits: number;
  pageMisses: number;
  hitRatio: number;
  steps: Step[];
}

function Fifo() {
  const [result, setResult] = useState<FifoResult | null>(null);

  // Load data from local storage
  useEffect(() => {
    const storedResult = localStorage.getItem("soham");
    console.log(storedResult);
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        FIFO Page Replacement Result
      </h1>

      {/* Definition Section */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Definition of FIFO:
        </h2>
        <p className="text-gray-600">
          FIFO (First-In-First-Out) is a page replacement algorithm where the
          oldest page in memory is replaced first. It follows the queue
          structure, meaning the first page added is the first to be removed.
        </p>
      </div>

      {/* Working Principle */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Working Principle (Step by Step):
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-3 border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold">
              Initialize the Memory Frames
            </h3>
          </div>
          <p className="text-gray-600 pl-6">
            - Define the number of available page frames (slots in memory).{" "}
            <br />- Use a queue (FIFO structure) to keep track of the order in
            which pages are inserted.
          </p>

          <div className="flex items-start gap-3 border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold">Page Request Handling</h3>
          </div>
          <p className="text-gray-600 pl-6">
            - When a page request arrives, check if it's already in memory.{" "}
            <br />- If the page is present, it's a{" "}
            <span className="text-green-600 font-bold">Hit</span>. <br />- If
            not, it's a <span className="text-red-600 font-bold">Miss</span>,
            and a page must be replaced.
          </p>

          <div className="flex items-start gap-3 border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold">Replace the Oldest Page</h3>
          </div>
          <p className="text-gray-600 pl-6">
            - If there's space, simply add the new page to memory. <br />
            - If memory is full, remove the oldest page (first inserted) and
            insert the new page. <br />- Repeat the process for all requested
            pages.
          </p>
        </div>
      </div>

      {result ? (
        <>
          {/* Page Table */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Page Table:
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Page</th>
                  {Array.from({ length: result.steps[0].frame.length }).map(
                    (_, i) => (
                      <th key={i} className="border p-2">
                        Frame {i + 1}
                      </th>
                    )
                  )}
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((step, index) => (
                  <tr key={index} className="text-center odd:bg-gray-100">
                    <td className="border p-2 font-semibold text-blue-600">
                      {step.page}
                    </td>
                    {step.frame.map((frameVal, i) => (
                      <td key={i} className="border p-2 text-gray-700">
                        {frameVal}
                      </td>
                    ))}
                    <td
                      className={`border p-2 font-bold ${
                        step.status === "Hit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {step.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simulation Results */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Simulation Results:
            </h2>
            <p className="text-gray-700">
              Page Hits:{" "}
              <span className="font-bold text-green-600">
                {result.pageHits}
              </span>
            </p>
            <p className="text-gray-700">
              Page Misses:{" "}
              <span className="font-bold text-red-600">
                {result.pageMisses}
              </span>
            </p>
            <p className="text-gray-700">
              Hit Ratio:{" "}
              <span className="font-bold text-blue-600">
                {result.hitRatio.toFixed(2)}%
              </span>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
            <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-4 mb-2">
              Page Hit:
            </h3>
            <p className="text-gray-600 pl-6">
              When a program needs to access a specific page, the operating
              system first checks if that page is already loaded into RAM. If it
              is, that's a{" "}
              <span className="text-green-600 font-bold">page hit</span>,
              meaning the data is readily available.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-4 mt-4 mb-2">
              Page Miss:
            </h3>
            <p className="text-gray-600 pl-6">
              Conversely, if the page is not in RAM, it's a{" "}
              <span className="text-red-600 font-bold">page miss</span> (or page
              fault), and the operating system needs to retrieve it from
              secondary storage (like a hard drive) and load it into RAM before
              the program can access it.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-4 mt-4 mb-2">
              Hit Ratio:
            </h3>
            <p className="text-gray-600 pl-6">
              The hit ratio is the percentage of page references that result in
              a page hit. It is calculated as{" "}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                Hit Ratio = (Page Hits / Total Requests) × 100%
              </code>
              . A higher hit ratio indicates better memory utilization.
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-4">
          No data found. Please run a simulation.
        </p>
      )}
    </div>
  );
}

export default Fifo;
