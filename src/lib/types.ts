export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  image: string;
}

export interface VasePosition {
  x: number; // percentage value (e.g., 12.5 for 12.5%)
  y: number; // percentage value (e.g., 27.8 for 27.8%)
  width: number; // percentage value (e.g., 7.3 for 7.3%)
  height: number; // percentage value (e.g., 18.5 for 18.5%)
}

export interface VaseData {
  id: string;
  image: string;
  position: VasePosition;
  project: ProjectData;
}