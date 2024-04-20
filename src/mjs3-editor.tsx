import { MarkerArea } from '@markerjs/markerjs3';
import { useEffect, useRef } from 'react';
import ToolbarButton from './toolbar-button';

const Mjs3Editor = () => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editor = useRef<MarkerArea | null>(null);

  useEffect(() => {
    if (!editor.current && editorContainer.current) {
      const targetImg = document.createElement('img');
      targetImg.src = './images/landscape_sm.jpg';

      editor.current = new MarkerArea();
      editor.current.targetImage = targetImg;

      editorContainer.current.appendChild(editor.current);
    }
  }, []);

  const handleMarkerButtonClick = (markerType: string) => {
    editor.current?.createMarker(markerType);
  };

  const handleSaveStateClick = () => {
    console.log(editor.current?.getState());
  };

  const handleRestoreStateClick = () => {
    console.log('restore');
  };

  return (
    <div className="m-2 flex h-[600px] min-h-[500px] overflow-hidden rounded-md bg-white ">
      <div className="flex w-48 min-w-48 flex-col space-y-1 p-2">
        <ToolbarButton
          label="🖱️"
          variant="control"
          onClick={() => {
            editor.current?.switchToSelectMode();
            console.log('pointer');
          }}
        />

        <div className="grid grid-cols-2 gap-1 overflow-y-auto py-2">
          <ToolbarButton
            label="Frame"
            variant="marker"
            onClick={() => handleMarkerButtonClick('FrameMarker')}
          />
          <ToolbarButton
            label="Line"
            variant="marker"
            onClick={() => handleMarkerButtonClick('LineMarker')}
          />
          <ToolbarButton
            label="Polygon"
            variant="marker"
            onClick={() => handleMarkerButtonClick('PolygonMarker')}
          />
          <ToolbarButton
            label="Freehand"
            variant="marker"
            onClick={() => handleMarkerButtonClick('FreehandMarker')}
          />
          <ToolbarButton
            label="Text"
            variant="marker"
            onClick={() => handleMarkerButtonClick('TextMarker')}
          />
        </div>

        <div className="grid grid-cols-3 gap-1">
          <ToolbarButton
            label=" - "
            variant="control"
            onClick={() => {
              if (editor.current) {
                editor.current.zoomLevel -= 0.1;
              }
            }}
          />
          <ToolbarButton
            label="🔍"
            variant="control"
            onClick={() => {
              if (editor.current) {
                editor.current.zoomLevel = 1;
              }
            }}
          />
          <ToolbarButton
            label=" + "
            variant="control"
            onClick={() => {
              if (editor.current) {
                editor.current.zoomLevel += 0.1;
              }
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-1">
          <ToolbarButton
            label="undo"
            variant="control"
            onClick={() => {
              editor.current?.undo();
            }}
          />
          <ToolbarButton
            label="redo"
            variant="control"
            onClick={() => {
              editor.current?.redo();
            }}
          />
        </div>

        <ToolbarButton
          label="save"
          variant="control"
          onClick={handleSaveStateClick}
        />
        <ToolbarButton
          label="restore"
          variant="control"
          onClick={handleRestoreStateClick}
        />
      </div>
      <div
        ref={editorContainer}
        className="m-2 flex-grow rounded-md bg-slate-100"
      ></div>
    </div>
  );
};

export default Mjs3Editor;
