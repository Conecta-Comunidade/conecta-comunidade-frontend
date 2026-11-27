import { Area } from '../../../features/model/area';

export interface CreateCommunityServiceRequest {
  name: string;
  area: Area;
  date: string;
  horarioInicio: string;
  local: string;
  vagas: number;
  description: string;
}
