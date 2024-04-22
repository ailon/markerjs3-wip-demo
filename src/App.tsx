import { useState } from 'react';
import Mjs3Editor from './mjs3-editor';
import { AnnotationState } from '@markerjs/markerjs3';
import Mjs3Viewer from './mjs3-viewer';

function App() {
  const [annotation, setAnnotation] = useState<AnnotationState | undefined>(
    undefined,
  );

  const handleAnnotationChange = (annotation: AnnotationState) => {
    console.log(annotation);
    setAnnotation(annotation);
  };

  return (
    <div className="flex flex-col items-center bg-slate-300">
      <h1 className="text-3xl">marker.js 3 Work-in-Progress Demo</h1>
      <div className="w-full flex-grow p-2">
        <Mjs3Editor
          annotation={annotation}
          onAnnotationChange={handleAnnotationChange}
        ></Mjs3Editor>

        <Mjs3Viewer annotation={annotation}></Mjs3Viewer>
      </div>
    </div>
  );
}

export default App;
