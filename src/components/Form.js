import React from "react";

const Form = ({ handleUpload, fileDesc, setFileDesc, captureFile }) => {
  return (
    <form onSubmit={handleUpload} className="form">
      <h4>Upload Content</h4>
      <input type="file" onChange={captureFile} />
      <input
        type="text"
        className='text'
        placeholder="enter file description"
        value={fileDesc}
        onChange={(e) => setFileDesc(e.target.value)}
      />
      <button type="submit" className='btn'>Upload</button>
    </form>
  );
};

export default Form;
