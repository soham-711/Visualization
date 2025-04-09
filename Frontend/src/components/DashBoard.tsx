import { useState } from "react";

function DashBoard() {
  const [referenceString, setReferenceString] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [algorithm, setAlgorithm] = useState("FIFO"); // Default Algorithm

  // Function to handle button click and log inputs
  const handleSimulation = () => {
    console.log("Reference String:", referenceString);
    console.log("Frame Size:", frameSize);
    console.log("Selected Algorithm:", algorithm);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">
          Page Replacement Algorithm
        </h1>
        <p className="text-gray-600">Visualizing different page replacement algorithms</p>
        <div className="w-1/2 mx-auto mt-4">
          <hr className="border-t-2 border-gray-400" />
        </div>
      </header>

      {/* Input Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter Inputs</h2>
        
        <label className="block text-gray-600">Reference String:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="ex. 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
        />

        <label className="block text-gray-600">Frame Size:</label>
        <input
          type="number"
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="ex. 3"
          value={frameSize}
          onChange={(e) => setFrameSize(e.target.value)}
        />

        <label className="block text-gray-600">Choose Algorithm:</label>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
          <option value="OPTIMAL">OPTIMAL</option>
        </select>

        <button
          onClick={handleSimulation} // Call function on button click
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Simulate Algorithm
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
