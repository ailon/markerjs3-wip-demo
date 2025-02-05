import { useState } from 'react';
import Mjs3Editor from './mjs3-editor';
import { AnnotationState } from '@markerjs/markerjs3';
import Mjs3Viewer from './mjs3-viewer';
import Mjs3Renderer from './mjs3-renderer';
import targetImageSrc from './assets/images/landscape_sm.jpg';

function App() {
  const [annotation, setAnnotation] = useState<AnnotationState | undefined>(
    undefined,
  );

  const handleAnnotationChange = (annotation: AnnotationState) => {
    setAnnotation(annotation);
  };

  return (
    <div className="flex flex-col items-center bg-slate-300">
      <h1 className="my-3 text-3xl">marker.js 3 Work-in-Progress Demo</h1>
      <div className="w-full grow p-2">
        <Mjs3Editor
          targetImageSrc={targetImageSrc}
          annotation={annotation}
          onAnnotationChange={handleAnnotationChange}
        ></Mjs3Editor>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Mjs3Viewer targetImageSrc={targetImageSrc} annotation={annotation}></Mjs3Viewer>
          <Mjs3Renderer targetImageSrc={targetImageSrc} annotation={annotation}></Mjs3Renderer>
        </div>
      </div>
    </div>
  );
}

export default App;
