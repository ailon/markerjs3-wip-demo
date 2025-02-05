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
      <div className="flex flex-row justify-between items-center p-4 w-full">
        <h1 className="text-3xl w-full">marker.js 3 Work-in-Progress Demo</h1>
        <div className="flex flex-row items-center space-x-3">
          <a href="https://stackblitz.com/~/github.com/ailon/markerjs3-wip-demo" aria-label="Live demo on StackBlitz" className="flex h-6">
            <svg viewBox="0 0 56 78" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4273 48.2853C23.7931 47.5845 23.0614 46.8837 22.3298 46.8837H1.11228C0.0148224 46.8837 -0.350997 45.8326 0.380642 45.1318L40.9866 0.282084C41.7182 -0.418693 43.1815 0.282084 42.8157 1.33325L32.9386 30.0651C32.5727 30.7659 32.9386 31.4666 33.6702 31.4666H54.8877C55.9852 31.4666 56.351 32.5178 55.6194 33.2186L15.0134 77.7179C14.2818 78.4187 12.8185 77.7179 13.1843 76.6667L23.4273 48.2853Z" fill="#1389FD"/></svg>
          </a>
          <a href="https://github.com/ailon/markerjs3-wip-demo" aria-label="GitHub Repository" className="flex h-6">
            <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>
          </a>
        </div>
      </div>
      <div className="w-full grow p-0 lg:p-2">
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
