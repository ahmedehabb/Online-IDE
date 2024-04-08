import { User } from './user';

export interface Project {
  id: string;
  name: string;
  userIds: string[];
  isEditable?: boolean;
  hasErrors?: boolean;
}
