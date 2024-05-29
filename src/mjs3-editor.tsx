import { AnnotationState, MarkerArea } from '@markerjs/markerjs3';
import { useEffect, useRef } from 'react';
import ToolbarButton from './toolbar-button';

type Props = {
  annotation?: AnnotationState;
  onAnnotationChange?: (annotation: AnnotationState) => void;
};

const Mjs3Editor = ({ annotation, onAnnotationChange }: Props) => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editor = useRef<MarkerArea | null>(null);

  const markerTypes = [
    { name: 'FrameMarker', label: 'Frame' },
    { name: 'LineMarker', label: 'Line' },
    { name: 'PolygonMarker', label: 'Polygon' },
    { name: 'FreehandMarker', label: 'Freehand' },
    { name: 'TextMarker', label: 'Text' },
    { name: 'EllipseMarker', label: 'Ellipse' },
    { name: 'EllipseFrameMarker', label: 'Ellipse frame' },
    { name: 'ArrowMarker', label: 'Arrow' },
    { name: 'MeasurementMarker', label: 'Measurement' },
    { name: 'HighlightMarker', label: 'Highlight' },
    { name: 'CoverMarker', label: 'Cover' },
    { name: 'CalloutMarker', label: 'Callout' },
  ];

  useEffect(() => {
    if (!editor.current && editorContainer.current) {
      const targetImg = document.createElement('img');
      targetImg.src = './images/landscape_sm.jpg';

      editor.current = new MarkerArea();
      editor.current.targetImage = targetImg;

      editorContainer.current.appendChild(editor.current);
    }
    if (annotation !== undefined) {
      editor.current?.restoreState(annotation);
    }
  }, [annotation]);

  const handleMarkerButtonClick = (markerType: string) => {
    editor.current?.createMarker(markerType);
  };

  const handleSaveStateClick = () => {
    if (editor.current && onAnnotationChange) {
      onAnnotationChange(editor.current.getState());
    }
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
        <ToolbarButton
          label="🗑️"
          variant="control"
          onClick={() => {
            editor.current?.deleteSelectedMarkers();
            console.log('delete');
          }}
        />

        <div className="grid grid-cols-2 gap-1 overflow-y-auto py-2">
          {markerTypes.map((markerType) => (
            <ToolbarButton
              key={markerType.name}
              label={markerType.label}
              variant="marker"
              onClick={() => handleMarkerButtonClick(markerType.name)}
            />
          ))}
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
