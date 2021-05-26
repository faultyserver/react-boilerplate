export type Map = {
  name: string;
  layers: Layer[];
  width: number;
  height: number;
};

export type Layer = {
  name: string;
  visible: boolean;
  objects: MapObject[];
};

export enum MapObjectType {
  IMAGE = "image",
  PATH = "path",
}

export type MapPosition = [number, number];

export type MapObject = {
  type: MapObjectType.IMAGE;
  src: string;
  positions: MapPosition[];
  width: number;
  height: number;
  annotation?: string;
  details?: string;
};
