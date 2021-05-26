import * as React from "react";

import MapActions from "./MapActions";

import styles from "./MapViewer.mod.css";
import type { Map } from "./MapTypes";

export default function Sidebar(props: { map: Map; setMap: Function }) {
  const { map, setMap } = props;

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.header}>{name}</h1>

      <ul>
        {map.layers.map((layer) => (
          <li key={layer.name}>
            <strong>{layer.name}</strong>
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => setMap(MapActions.toggleLayer(map, layer.name))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
