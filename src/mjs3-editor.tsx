import {
  AnnotationState,
  ArrowMarkerEditor,
  ArrowType,
  CalloutMarkerEditor,
  CaptionFrameMarkerEditor,
  CustomImageMarker,
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
import { TriangleMarker } from './custom_markers/TriangleMarker';

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
    { name: 'CustomImageMarker', label: '🙂' },
    { name: 'CheckImageMarker', label: 'Checkmark' },
    { name: 'XImageMarker', label: 'X' },
    { name: 'CaptionFrameMarker', label: 'Caption frame' },
    { name: 'TriangleMarker', label: 'Ext: Triangle' },
  ];

  useEffect(() => {
    if (!editor.current && editorContainer.current) {
      const targetImg = document.createElement('img');
      targetImg.src = './images/landscape_sm.jpg';

      editor.current = new MarkerArea();

      // register custom marker type
      editor.current.registerMarkerType(
        TriangleMarker,
        ShapeOutlineMarkerEditor<TriangleMarker>,
      );

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
    const markerEditor = editor.current?.createMarker(markerType);
    if (markerEditor && markerEditor.marker instanceof CustomImageMarker) {
      // emoji from https://icon-sets.iconify.design/fluent-emoji (MIT)
      markerEditor.marker.svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="url(#f2332id0)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id1)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id2)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id3)" fill-opacity="0.6" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id4)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id5)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id6)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><path fill="url(#f2332id7)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999s4.664 13.999 13.999 13.999"/><circle cx="9.017" cy="13.421" r="4.673" fill="url(#f2332id8)"/><circle cx="19.244" cy="13.943" r="4.244" fill="url(#f2332id9)"/><path fill="#fff" d="M10.42 16.224a4.206 4.206 0 1 0 0-8.411a4.206 4.206 0 0 0 0 8.411m11.148.077a4.244 4.244 0 1 0 0-8.489a4.244 4.244 0 0 0 0 8.49"/><path fill="url(#f2332idb)" d="M11 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/><path fill="url(#f2332idc)" d="M21 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/><path fill="url(#f2332ida)" fill-rule="evenodd" d="M10.4 18.2a1 1 0 0 1 1.4.2c.31.413 1.712 1.6 4.2 1.6s3.89-1.187 4.2-1.6a1 1 0 1 1 1.6 1.2c-.69.92-2.688 2.4-5.8 2.4s-5.11-1.48-5.8-2.4a1 1 0 0 1 .2-1.4" clip-rule="evenodd"/><defs><radialGradient id="f2332id0" cx="0" cy="0" r="1" gradientTransform="rotate(132.839 10.786 10.065)scale(37.5033)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff478"/><stop offset=".475" stop-color="#ffb02e"/><stop offset="1" stop-color="#f70a8d"/></radialGradient><radialGradient id="f2332id1" cx="0" cy="0" r="1" gradientTransform="rotate(131.878 10.74 10.193)scale(38.9487)" gradientUnits="userSpaceOnUse"><stop stop-color="#fff478"/><stop offset=".475" stop-color="#ffb02e"/><stop offset="1" stop-color="#f70a8d"/></radialGradient><radialGradient id="f2332id2" cx="0" cy="0" r="1" gradientTransform="rotate(101.31 2.876 12.808)scale(17.8466 22.8581)" gradientUnits="userSpaceOnUse"><stop offset=".788" stop-color="#f59639" stop-opacity="0"/><stop offset=".973" stop-color="#ff7dce"/></radialGradient><radialGradient id="f2332id3" cx="0" cy="0" r="1" gradientTransform="matrix(-29 29 -29 -29 18 14)" gradientUnits="userSpaceOnUse"><stop offset=".315" stop-opacity="0"/><stop offset="1"/></radialGradient><radialGradient id="f2332id4" cx="0" cy="0" r="1" gradientTransform="rotate(77.692 -2.555 18.434)scale(28.1469)" gradientUnits="userSpaceOnUse"><stop offset=".508" stop-color="#7d6133" stop-opacity="0"/><stop offset="1" stop-color="#715b32"/></radialGradient><radialGradient id="f2332id5" cx="0" cy="0" r="1" gradientTransform="matrix(7.5 10.99996 -7.97335 5.4364 16.5 16.5)" gradientUnits="userSpaceOnUse"><stop stop-color="#ffb849"/><stop offset="1" stop-color="#ffb847" stop-opacity="0"/></radialGradient><radialGradient id="f2332id6" cx="0" cy="0" r="1" gradientTransform="matrix(11.49998 2 -2 11.49998 20.5 18)" gradientUnits="userSpaceOnUse"><stop stop-color="#ffa64b"/><stop offset=".9" stop-color="#ffae46" stop-opacity="0"/></radialGradient><radialGradient id="f2332id7" cx="0" cy="0" r="1" gradientTransform="rotate(43.971 -9.827 29.173)scale(59.0529)" gradientUnits="userSpaceOnUse"><stop offset=".185" stop-opacity="0"/><stop offset="1" stop-opacity="0.4"/></radialGradient><radialGradient id="f2332id8" cx="0" cy="0" r="1" gradientTransform="rotate(135 4.3 7.513)scale(9.10579 4.71285)" gradientUnits="userSpaceOnUse"><stop stop-color="#392108"/><stop offset="1" stop-color="#c87928" stop-opacity="0"/></radialGradient><radialGradient id="f2332id9" cx="0" cy="0" r="1" gradientTransform="rotate(135 9.069 9.99)scale(7.66968 4.32966)" gradientUnits="userSpaceOnUse"><stop stop-color="#392108"/><stop offset="1" stop-color="#c87928" stop-opacity="0"/></radialGradient><radialGradient id="f2332ida" cx="0" cy="0" r="1" gradientTransform="matrix(0 5.5 -8.41855 0 16 17)" gradientUnits="userSpaceOnUse"><stop offset=".348" stop-color="#241a1a"/><stop offset=".628" stop-color="#57444a"/><stop offset="1" stop-color="#4e2553"/><stop offset="1" stop-color="#502a56"/></radialGradient><linearGradient id="f2332idb" x1="16.5" x2="15.5" y1="8" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#553b3e"/><stop offset="1" stop-color="#3d2432"/></linearGradient><linearGradient id="f2332idc" x1="16.5" x2="15.5" y1="8" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#553b3e"/><stop offset="1" stop-color="#3d2432"/></linearGradient></defs></g></svg>`;
    }
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

        <div className="grid grid-cols-1 gap-1 overflow-y-auto py-2">
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
            currentMarker.is(FreehandMarkerEditor) ||
            currentMarker.is(CaptionFrameMarkerEditor)) && (
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
            currentMarker.is(CalloutMarkerEditor) ||
            currentMarker.is(CaptionFrameMarkerEditor)) && (
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
