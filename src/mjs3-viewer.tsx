import { AnnotationState, MarkerView } from '@markerjs/markerjs3';
import { useEffect, useRef } from 'react';

type Props = {
  annotation?: AnnotationState;
};

const Mjs3Viewer = ({ annotation }: Props) => {
  const viewerContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<MarkerView | null>(null);

  useEffect(() => {
    if (!viewer.current && viewerContainer.current) {
      const targetImg = document.createElement('img');
      targetImg.src = './images/landscape_sm.jpg';

      viewer.current = new MarkerView();
      viewer.current.targetImage = targetImg;

      viewerContainer.current.appendChild(viewer.current);
    }
    if (annotation !== undefined) {
      viewer.current?.show(annotation);
    }
  }, [annotation]);

  return (
    <div className="m-2 flex h-[600px] min-h-[500px] flex-col overflow-hidden rounded-md bg-white ">
      <h2 className="m-2 text-xl">MarkerView</h2>
      <div
        ref={viewerContainer}
        className="m-2 flex-grow rounded-md bg-slate-100"
      ></div>
    </div>
  );
};

export default Mjs3Viewer;
