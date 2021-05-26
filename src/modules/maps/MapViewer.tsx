import * as React from "react";

import MapActions from "./MapActions";
import Sidebar from "./MapSidebar";
import {MapObjectType, MapObject, Map} from "./MapTypes";

import styles from "./MapViewer.mod.css";
import MapRenderer from "./MapRenderer";

type MapContextType = {
  renderingContext: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  widthScale: number;
  heightScale: number;
};

const MapContext = React.createContext<MapContextType>({
  renderingContext: null,
  width: 0,
  height: 0,
  widthScale: 0,
  heightScale: 0,
});

export default function MapViewer() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [renderingContext, setRenderingContext] = React.useState<CanvasRenderingContext2D | null>(
    null,
  );
  const [widthScale, setWidthScale] = React.useState(0);
  const [heightScale, setHeightScale] = React.useState(0);
  const [resizeObserver] = React.useState(
    () =>
      new ResizeObserver(() => {
        if (canvasRef.current == null) return;
        setWidthScale(canvasRef.current.clientWidth / width);
        setHeightScale(canvasRef.current.clientHeight / height);
      }),
  );

  const [map, setMap] = React.useState(() => MapActions.createMap());
  const {width, height} = map;

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;

    const context2d = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    setRenderingContext(context2d);
    setWidthScale(canvas.clientWidth / width);
    setHeightScale(canvas.clientHeight / height);

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [mapRenderer] = React.useState(() => new MapRenderer(map));
  React.useLayoutEffect(() => {
    mapRenderer.updateMap(map);
    renderingContext?.drawImage(mapRenderer.getCanvas(), 0, 0);
  }, [map, mapRenderer, renderingContext]);

  function handleCanvasClick(event: React.MouseEvent) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect == null) return;

    setMap(
      MapActions.addGem(
        map,
        (event.clientX - rect.left) / widthScale,
        (event.clientY - rect.top) / heightScale,
      ),
    );
  }

  return (
    <MapContext.Provider value={{renderingContext, width, height, widthScale, heightScale}}>
      <div className={styles.container}>
        <Sidebar map={map} setMap={setMap} />
        <div className={styles.editor}>
          <canvas className={styles.canvas} ref={canvasRef} onClick={handleCanvasClick} />
        </div>
      </div>
    </MapContext.Provider>
  );
}
