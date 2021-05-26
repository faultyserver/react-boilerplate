import {Map as MapType, MapObjectType, MapObject} from "./MapTypes";

export default class MapRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private map: MapType;

  #imageCache = new Map<string, HTMLImageElement>();

  constructor(map: MapType) {
    this.map = map;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.updateMap(map);
  }

  updateMap(map: MapType) {
    this.map = map;
    this.canvas.width = map.width;
    this.canvas.height = map.height;
    this.redraw();
  }

  redraw() {
    const {width, height, layers} = this.map;
    this.context.fillRect(0, 0, width, height);

    for (const layer of layers) {
      if (!layer.visible) continue;

      for (const object of layer.objects) {
        switch (object.type) {
          case MapObjectType.IMAGE:
            this.renderImage(object);
            break;
          default:
            break;
        }
      }
    }
  }

  renderImage(object: MapObject) {
    const image = this.loadImage(object.src, object.width, object.height);
    const context = this.context;
    for (const [x, y] of object.positions) {
      context.drawImage(image, x, y, object.width, object.height);
    }
  }

  loadImage(source: string, width: number, height: number) {
    if (!this.#imageCache.has(source)) {
      const image = new Image(width, height);
      image.src = source;
      this.#imageCache.set(source, image);
    }

    return this.#imageCache.get(source)!;
  }

  /**
   * Returns a data url for a rendered image of the map content.
   */
  getCanvas() {
    return this.canvas;
  }
}
