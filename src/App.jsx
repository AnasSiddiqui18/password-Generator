import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);

      console.log(char);

      pass += str.charAt(char);
      setPassword(pass);
      // console.log(char);
    }
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const handleCopyfromClipboard = () => {
    window.navigator.clipboard.writeText(password);
    inputRef.current.select();
  };

  return (
    <div className="w-full max-w-md bg-gray-800 mx-auto text-orange-500  drop-shadow-[0_6px_15px_rgba(255,255,255,0.25)] text-center px-4 py-3 my-8">
      <h2 className="text-white my-3">Password Generator</h2>
      <div className="flex items-center rounded-lg mb-4">
        <input
          type="text"
          className="w-full py-1 px-3 outline-none text-black"
          value={password}
          ref={inputRef}
        />
        <button
          className="bg-blue-700 px-3 py-1 text-white"
          onClick={handleCopyfromClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex gap-3 text-sm">
        <div className="flex items-center gap-1">
          <input
            type="range"
            min={6}
            max={20}
            onChange={(e) => setLength(e.target.value)}
            value={length}
            readOnly
          />
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className="gap-2 flex">
          <input
            type="checkbox"
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          <label htmlFor="Numbers">Numbers</label>
          <input
            type="checkbox"
            onChange={() => setcharAllowed(!charAllowed)}
          />
          <label htmlFor="characters">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
