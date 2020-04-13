import { Selection, Simulation, SimulationNodeDatum } from 'd3';

export type ForceSimulation = Simulation<SimulationNodeDatum, undefined>;
export type ElementSelection = Selection<Element, unknown, null, undefined>;
export type NodeData = { id: number; name: string; channel_id: string };
export type LinkData = {
  id: number;
  source: number;
  source_channel_id: string;
  target: number;
  target_channel_id: string;
  num: number;
};
