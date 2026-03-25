export interface Project {
  id: number;
  name: string;
  description: string | null;
  owner_id: number;
}

export interface ProjectCreate {
  name: string;
  description?: string | null;
}

export interface ProjectUpdate {
  name?: string;
  description?: string | null;
}
