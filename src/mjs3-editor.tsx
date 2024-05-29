import {
  AnnotationState,
  FreehandMarkerEditor,
  LinearMarkerEditor,
  MarkerArea,
  MarkerBaseEditor,
  ShapeOutlineMarkerEditor,
} from '@markerjs/markerjs3';
import { useEffect, useRef, useState } from 'react';
import ToolbarButton from './toolbar-button';

type Props = {
  annotation?: AnnotationState;
  onAnnotationChange?: (annotation: AnnotationState) => void;
};

const Mjs3Editor = ({ annotation, onAnnotationChange }: Props) => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editor = useRef<MarkerArea | null>(null);

  const [currentMarker, setCurrentMarker] = useState<MarkerBaseEditor | null>(
    null,
  );

  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [strokeColor, setStrokeColor] = useState<string>('#ff0000');
  const [strokeDasharray, setStrokeDasharray] = useState<string>('');

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

      editor.current.addEventListener('markerselect', (e) => {
        const marker = e.detail.markerEditor;
        setStrokeColor(marker.strokeColor);
        setStrokeWidth(marker.strokeWidth);
        setStrokeDasharray(marker.strokeDasharray);
        setCurrentMarker(e.detail.markerEditor);
      });
      editor.current.addEventListener('markerdeselect', () => {
        setCurrentMarker(null);
      });

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
      <div className="flex w-64 min-w-64 flex-col space-y-1 p-2 text-center">
        {currentMarker === null && 'Property panel'}
        {currentMarker !== null &&
          (currentMarker.is(ShapeOutlineMarkerEditor) ||
            currentMarker.is(LinearMarkerEditor) ||
            currentMarker.is(FreehandMarkerEditor)) && (
            <div className="overflow-hidden rounded-md border border-slate-600 bg-slate-100 shadow">
              <h3 className="bg-slate-600 p-1 text-white">Shape outline</h3>
              <div className="m-3 grid grid-cols-2 gap-2 text-left">
                <label htmlFor="strokeColorInput">Color</label>
                <input
                  id="strokeColorInput"
                  type="color"
                  value={strokeColor}
                  onChange={(e) => {
                    setStrokeColor(e.target.value);
                    currentMarker.strokeColor = e.target.value;
                  }}
                />
                <label htmlFor="strokeWidthInput">Width</label>
                <input
                  type="number"
                  id="strokeWidthInput"
                  value={strokeWidth}
                  onChange={(e) => {
                    const newWidth = parseFloat(e.target.value);
                    setStrokeWidth(newWidth);
                    currentMarker.strokeWidth = newWidth;
                  }}
                />
                <div className="col-span-2 flex gap-1.5">
                  <input
                    type="radio"
                    id="solidStrokeInput"
                    name="lineStyle"
                    value=""
                    checked={strokeDasharray === ''}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStrokeDasharray(e.target.value);
                        currentMarker.strokeDasharray = e.target.value;
                      }
                    }}
                  />
                  <label htmlFor="solidStrokeInput">Solid</label>
                  <input
                    type="radio"
                    id="dashedStrokeInput"
                    name="lineStyle"
                    value="10 4"
                    checked={strokeDasharray === '10 4'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStrokeDasharray(e.target.value);
                        currentMarker.strokeDasharray = e.target.value;
                      }
                    }}
                  />
                  <label htmlFor="dashedStrokeInput">Dashed</label>
                  <input
                    type="radio"
                    id="dottedStrokeInput"
                    name="lineStyle"
                    value="2 2"
                    checked={strokeDasharray === '2 2'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStrokeDasharray(e.target.value);
                        currentMarker.strokeDasharray = e.target.value;
                      }
                    }}
                  />
                  <label htmlFor="dottedStrokeInput">Dotted</label>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Mjs3Editor;
