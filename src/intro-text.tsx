import PropertyPanel from './property-panel';

const IntroText = () => {
  return (
    <PropertyPanel title="marker.js 3 Demo">
      <div className="col-span-2 space-y-4">
        <p>
          This is a work-in-progress demo of{' '}
          <a href="https://www.npmjs.com/package/@markerjs/markerjs3">
            marker.js 3
          </a>
          .
        </p>

        <p>
          The top section is the annotation editor. marker.js 3 is the
          "headless" web component in the middle. On the left you have a
          simplistic toolbar and on the right instead of this text you'll see
          marker properties when a marker is selected (both part of this demo
          but not marker.js 3)
        </p>

        <p>
          When you click "save", bottom left shows a dynamic view of the
          annotations using marker.js 3 viewer component and on the right a
          rendered static image created using marker.js renderer.{' '}
        </p>

        <p>
          While this demo is made with React it is purposefully lite on React
          concepts or "best practices" so you don't really need to learn React
          to understand what's going on. Feel free to{' '}
          <a href="https://github.com/ailon/markerjs3">explore the code</a> and
          experiment with the editor.
        </p>
      </div>
    </PropertyPanel>
  );
};

export default IntroText;
