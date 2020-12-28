// You must have the same names for fields in models on the backend and frontend app.
import { Node } from './node';
export interface Link {
    db_id: number;
    id: string;
    label: string;
    source: string;
    target: string;
}
// ista polja kao u modelu na backu 
export interface LinkDB {
    knowledge_space: number;
    link_id: string;
    link_label: string;
    source: number;
    target: number;


}
