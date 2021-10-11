import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import TopContent from "./artifacts/contracts/TopContent.sol/TopContent.json";
import Form from "./components/Form";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

const contractAddress = "0xBCfb7616259229aCA7420E41eB701d9D540a2aFc";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "api/v0",
});

function App() {
  const [myAcc, setMyAcc] = useState("");
  const [contract, setContract] = useState("");
  const [fileDesc, setFileDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [buffer, setBuffer] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setMyAcc(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadBlockchainData = async () => {
    const { ethereum } = window;
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          TopContent.abi,
          signer
        );
        setContract(contract);
        const filesCount = await contract.fileCount();

        let files = [];
        for (var i = 0; i <= filesCount; i++) {
          const file = await contract.files(i);
          files.push(file);
        }
        setFiles(files.sort((a, b) => b.tipAmount - a.tipAmount));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    loadBlockchainData();
  }, []);

  const captureFile = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // add file to ipfs
    const result = await ipfs.add(buffer);

    let transaction = await contract.uploadContent(result.path, fileDesc);
    await transaction.wait();

    setFileDesc("");
    loadBlockchainData();
  };

  const tipCreator = async (contentId, tipAmount) => {
    let transaction = await contract.tipCreator(contentId, {
      value: tipAmount,
    });
    await transaction.wait();
    loadBlockchainData();
  };

  return (
    <div>
      <Navbar myAcc={myAcc} />
      <Form
        handleUpload={handleUpload}
        fileDesc={fileDesc}
        setFileDesc={setFileDesc}
        captureFile={captureFile}
      />
      <div className="content_container">
        {files.map((file) => {
          if (file.hash) {
            return (
              <Content file={file} key={file.hash} tipCreator={tipCreator} />
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
