import {
  AnnotationState,
  ArrowMarkerEditor,
  ArrowType,
  CalloutMarkerEditor,
  FreehandMarkerEditor,
  LinearMarkerEditor,
  MarkerArea,
  MarkerBaseEditor,
  PolygonMarkerEditor,
  ShapeMarkerEditor,
  ShapeOutlineMarkerEditor,
  TextMarkerEditor,
} from '@markerjs/markerjs3';
import { useEffect, useRef, useState } from 'react';
import ToolbarButton from './components/toolbar-button';
import PropertyPanel from './components/property-panel';
import IntroText from './components/intro-text';

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
  const [fillColor, setFillColor] = useState<string>('#ff0000');
  const [arrowType, setArrowType] = useState<ArrowType>('both');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontFamily, setFontFamily] = useState<string>('sans-serif');
  const [fontSize, setFontSize] = useState<number>(1);

  const markerTypes = [
    { name: 'FrameMarker', label: 'Frame' },
    { name: 'CoverMarker', label: 'Cover' },
    { name: 'HighlightMarker', label: 'Highlight' },
    { name: 'LineMarker', label: 'Line' },
    { name: 'ArrowMarker', label: 'Arrow' },
    { name: 'MeasurementMarker', label: 'Measurement' },
    { name: 'EllipseMarker', label: 'Ellipse' },
    { name: 'EllipseFrameMarker', label: 'Ellipse frame' },
    { name: 'PolygonMarker', label: 'Polygon' },
    { name: 'FreehandMarker', label: 'Freehand' },
    { name: 'TextMarker', label: 'Text' },
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
        setFillColor(marker.fillColor);

        if (marker.is(ArrowMarkerEditor)) {
          setArrowType(marker.arrowType);
        }

        if (marker.is(TextMarkerEditor)) {
          // @todo get from the Editor (not marker) (not implemented in markerjs3 yet)
          setFontFamily(marker.marker.fontFamily);
          setFontSize(marker.marker.fontSize.value);
          setTextColor(marker.marker.color);
        }

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
      <div className="flex w-64 min-w-64 flex-col space-y-3 overflow-y-auto p-2 text-center">
        {currentMarker === null && <IntroText />}

        {currentMarker !== null &&
          (currentMarker.is(ShapeOutlineMarkerEditor) ||
            currentMarker.is(LinearMarkerEditor) ||
            currentMarker.is(PolygonMarkerEditor) ||
            currentMarker.is(FreehandMarkerEditor)) && (
            <PropertyPanel title="Shape outline">
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
            </PropertyPanel>
          )}

        {currentMarker !== null &&
          (currentMarker.is(ShapeMarkerEditor) ||
            currentMarker.is(CalloutMarkerEditor)) && (
            <PropertyPanel title="Fill">
              <label htmlFor="fillColorInput">Color</label>
              <input
                id="fillColorInput"
                type="color"
                value={fillColor}
                onChange={(e) => {
                  setFillColor(e.target.value);
                  currentMarker.fillColor = e.target.value;
                }}
              />
            </PropertyPanel>
          )}

        {currentMarker !== null && currentMarker.is(ArrowMarkerEditor) && (
          <PropertyPanel title="Arrow tips">
            <div className="col-span-2 flex gap-1.5">
              <input
                type="radio"
                id="startTipTypeInput"
                name="arrowTipType"
                value="start"
                checked={arrowType === 'start'}
                onChange={(e) => {
                  if (e.target.checked) {
                    const arrowType = e.target.value as ArrowType;
                    setArrowType(arrowType);
                    currentMarker.arrowType = arrowType;
                  }
                }}
              />
              <label htmlFor="startTipTypeInput">⬅️</label>

              <input
                type="radio"
                id="endTipTypeInput"
                name="arrowTipType"
                value="end"
                checked={arrowType === 'end'}
                onChange={(e) => {
                  if (e.target.checked) {
                    const arrowType = e.target.value as ArrowType;
                    setArrowType(arrowType);
                    currentMarker.arrowType = arrowType;
                  }
                }}
              />
              <label htmlFor="endTipTypeInput">➡️</label>

              <input
                type="radio"
                id="bothTipTypeInput"
                name="arrowTipType"
                value="both"
                checked={arrowType === 'both'}
                onChange={(e) => {
                  if (e.target.checked) {
                    const arrowType = e.target.value as ArrowType;
                    setArrowType(arrowType);
                    currentMarker.arrowType = arrowType;
                  }
                }}
              />
              <label htmlFor="bothTipTypeInput">⬅️➡️</label>
            </div>
          </PropertyPanel>
        )}

        {currentMarker !== null && currentMarker.is(TextMarkerEditor) && (
          <PropertyPanel title="Text">
            <label htmlFor="fontSelect">Font</label>
            <select
              id="fontSelect"
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                // @todo set on the Editor (not marker)
                currentMarker.marker.fontFamily = e.target.value;
              }}
            >
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
            <label htmlFor="textColorInput">Color</label>
            <input
              id="textColorInput"
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                // @todo set text color on the Editor (not marker)
                currentMarker.marker.color = e.target.value;
              }}
            />

            <label htmlFor="fontSizeInput">Size</label>
            <div className="flex gap-1.5">
              {[
                { label: 'S', value: 0.8 },
                { label: 'M', value: 1 },
                { label: 'L', value: 2 },
              ].map((fs) => (
                <>
                  <input
                    type="radio"
                    id={`fontSizeInput_${fs.label}`}
                    name="fontSizeInput"
                    value={fs.value}
                    checked={fontSize === fs.value}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFontSize(fs.value);
                        const newSize = currentMarker.marker.fontSize;
                        newSize.value = fs.value;
                        currentMarker.marker.fontSize = newSize;
                      }
                    }}
                  />
                  <label htmlFor={`fontSizeInput_${fs.label}`}>
                    {fs.label}
                  </label>
                </>
              ))}
            </div>
          </PropertyPanel>
        )}
      </div>
    </div>
  );
};

export default Mjs3Editor;
