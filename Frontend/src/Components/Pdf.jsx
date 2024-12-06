import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported for API requests

function Pdf() {

  const [selectedfile, setselectedfile] = useState(null);
  const [Convert, setconvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  console.log(selectedfile);

  const handlefilechange = (e) => {
    console.log(e.target.files[0]);
    setselectedfile(e.target.files[0]);
  }

  const handlesubmit = async (e) => {
    e.preventDefault(); // Fix event usage
    if (!selectedfile) {
      setconvert("Please select a file");
      return;
    }

    const formData = new FormData(); // Fix capitalization
    formData.append('file', selectedfile);

    try {
      const response = await axios.post("http://localhost:1234/convertor", formData, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data])); // Fix capitalization
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute("download", selectedfile.name.replace(/\.[^/.]+$/, "") + ".pdf");
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setselectedfile(null); // Fix reset value
      setDownloadError("");
      setconvert("File Converted Successfully");
    } catch (error) {
      console.error(error); // Log errors for debugging
      setDownloadError("File conversion failed. Please try again.");
    }
  }

  return (
    <>
      <div>
        <div className='border bg-sky-950 border-dashed mx-auto items-center justify-center text-center mt-32 w-[90%] sm:w-[60%]'>
          <h1 className='font-bold text-3xl'>Convert Word To Pdf Online</h1>
          <h2 className='mt-3 text-xl font-semibold'>
            Easily Convert Word Document to PDF format Online, Without having to install any Software
          </h2>

          {/* Choose File Input */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white rounded-lg py-2 px-6 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-6 w-full max-w-[700px] mx-auto flex items-center justify-center text-center"
          >
            {selectedfile ? selectedfile.name : "Choose a file"}
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handlefilechange}
          />

          <br />
          <br />

          <button onClick={handlesubmit}
            disabled={!selectedfile}
            className='p-2 bg-zinc-400 text-white disabled:bg-gray-400 disabled:pointer-events-none text-2xl font-bold rounded-md w-full max-w-[700px] mx-auto'
          >
            Convert File
          </button>
          {Convert && (
                <div className="text-green-500 text-center">{Convert}</div>
              )}
              {downloadError && (
                <div className="text-red-500 text-center">{downloadError}</div>
              )}
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Pdf;
