// You must have the same names for fields in models on the backend and frontend app.
import { Node } from './node';
export interface Link {
    id: string;
    label: string;
    source: string;
    target: string;
}

