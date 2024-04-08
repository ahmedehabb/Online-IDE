import { Project } from './project';

export interface File {
  id: string;
  fileName: string;
  code: string;
  project?: Project;
}
