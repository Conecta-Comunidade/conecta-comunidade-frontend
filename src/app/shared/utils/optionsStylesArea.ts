import { Area } from '../../features/model/area';

export function optionsStylesArea(area: Area) {
  switch (area) {
    case Area.EDUCATION:
      return { bg: 'bg-blue-100', 'text-color': 'text-blue-600', icon: 'pi pi-book' };
    case Area.HEALTH:
      return { bg: 'bg-emerald-100', 'text-color': 'text-emerald-600', icon: 'pi pi-heart' };
    case Area.BEAUTY:
      return { bg: 'bg-pink-100', 'text-color': 'text-pink-600', icon: 'pi pi-star' };
    case Area.LEISURE:
      return { bg: 'bg-amber-100', 'text-color': 'text-amber-600', icon: 'pi pi-headphones' };
    case Area.SPORTS:
      return { bg: 'bg-violet-100', 'text-color': 'text-violet-600', icon: 'pi pi-globe' };
    case Area.OTHER:
      return { bg: 'bg-slate-100', 'text-color': 'text-slate-600', icon: 'pi pi-question-circle' };
    default:
      return { bg: 'bg-slate-100', 'text-color': 'text-slate-600', icon: 'pi pi-question-circle' };
  }
}
