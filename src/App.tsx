import Mjs3Editor from './mjs3-editor';

function App() {
  return (
    <div className="flex h-screen flex-col items-center bg-slate-300">
      <h1 className="text-3xl">marker.js 3 Work-in-Progress Demo</h1>
      <div className="w-full flex-grow p-2">
        <Mjs3Editor></Mjs3Editor>
      </div>
    </div>
  );
}

export default App;
