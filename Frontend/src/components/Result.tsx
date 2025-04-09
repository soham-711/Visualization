import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Define the type for the backend response
interface FifoResult {
  pageHits: number;
  pageMisses: number;
  hitRatio: number;
  table: { page: number; state: string }[];
}

function Result() {
  const [searchParams] = useSearchParams();
  const referenceString = searchParams.get("referenceString") || "";
  const frameSize = searchParams.get("frameSize") || "";
//   const algorithm = searchParams.get("algorithm") || "FIFO";

  const [result, setResult] = useState<FifoResult | null>(null);

  useEffect(() => {
    axios
      .post<FifoResult>("http://localhost:5000/fifo", { referenceString, frameSize })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => console.error("Error fetching FIFO results:", error));
  }, [referenceString, frameSize]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-500">FIFO Page Replacement Result</h1>
      
      {/* Definition Section */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
        <h2 className="text-xl font-semibold text-gray-700">Definition of FIFO:</h2>
        <p className="text-gray-600">FIFO (First-In-First-Out) is a page replacement algorithm where the oldest page in memory is replaced first.</p>
      </div>

      {/* Working Principle */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
        <h2 className="text-xl font-semibold text-gray-700">Working Principle (Step by Step):</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Pages are placed in a queue.</li>
          <li>The first page in memory is removed when a new page needs space.</li>
          <li>New pages are added to the end of the queue.</li>
        </ul>
      </div>

      {/* Results Section */}
      {result && (
        <>
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
            <h2 className="text-xl font-semibold text-gray-700">Simulation Results:</h2>
            <p>Page Hits: {result.pageHits}</p>
            <p>Page Misses: {result.pageMisses}</p>
            <p>Hit Ratio: {result.hitRatio.toFixed(2)}%</p>
          </div>

          {/* FIFO Table */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mt-4">
            <h2 className="text-xl font-semibold text-gray-700">FIFO Table:</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Step</th>
                  <th className="border p-2">Page</th>
                  <th className="border p-2">Memory State</th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{row.page}</td>
                    <td className="border p-2">{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
