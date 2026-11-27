import { Area } from '../../../features/model/area';

export interface CommunityService {
  id: number;
  nome: string;
  area: Area;
  date: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  vagas: number;
  horariosDisponiveis: string[];
  description: string;
  contributorId: number;
  contributorName: string;
}
