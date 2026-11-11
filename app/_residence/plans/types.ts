export type WallTuple = [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness: number
];

export interface WallOpening {
  /** Index of the wall in the `walls` array */
  wallIndex: number;
  /** "door" leaves the floor open from sillHeight=0; "window" leaves a sill wall below */
  type: "door" | "window";
  /** Distance in metres from (x1, y1) along the wall to the start of the opening */
  offset: number;
  /** Width of the opening in metres */
  width: number;
  /** Bottom elevation in metres (0 for doors/sliding glass, ~0.9 for standard windows) */
  sillHeight: number;
  /** Opening height in metres (e.g. 2.1 for doors, 1.3 for windows) */
  height: number;
}

export interface FloorPlanRoom {
  id: string;
  name: string;
  /** Area in square metres as shown on the architectural plan */
  area: number;
  /** Formatted area string */
  areaLabel: string;
  /** "interior" or "exterior" (terrace, porch, garden) */
  kind: "interior" | "exterior";
  /** 2D polygon vertices [x, y] in metres */
  polygon: Array<[number, number]>;
  /** Optional custom 2D label anchor [x, y] in metres */
  labelPosition?: [number, number];
}

export interface FloorPlanData {
  slug: string;
  title: string;
  wallHeight: number;
  walkthroughStart: {
    position: [number, number, number];
    yaw: number;
  };
  walls: WallTuple[];
  openings: WallOpening[];
  rooms: FloorPlanRoom[];
}
