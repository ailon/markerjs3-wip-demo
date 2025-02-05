import { AnnotationState, Renderer } from '@markerjs/markerjs3';
import { useEffect, useRef, useState } from 'react';
import { TriangleMarker } from './custom_markers/TriangleMarker';

type Props = {
  annotation?: AnnotationState;
};

const Mjs3Renderer = ({ annotation }: Props) => {
  const renderedImage = useRef<HTMLImageElement | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (annotation) {
      const targetImg = document.createElement('img');
      targetImg.src = './images/landscape_sm.jpg';

      const renderer = new Renderer();

      // Register the custom marker type
      renderer.registerMarkerType(TriangleMarker);

      renderer.targetImage = targetImg;

      renderer.rasterize(annotation).then((image) => {
        if (renderedImage.current) {
          renderedImage.current.src = image;
          setRendered(true);
        }
      });
    }
  }, [annotation]);

  return (
    <div className="m-2 flex h-[600px] min-h-[500px] flex-col overflow-hidden rounded-md bg-white ">
      <h2 className="m-2 text-xl">Rendered Image</h2>
      <div className="m-2 flex grow items-center justify-center rounded-md bg-slate-100">
        <img
          ref={renderedImage}
          alt="Rendered Image"
          style={{ display: rendered ? '' : 'none' }}
        />
        {!rendered && <div>Nothing to see here</div>}
      </div>
    </div>
  );
};

export default Mjs3Renderer;
