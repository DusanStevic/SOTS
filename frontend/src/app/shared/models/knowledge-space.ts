import { Link } from './link';
import { Node } from './node';

export interface KnowledgeSpace {
    id: number;
    nodes: Node[];
    links: Link[];
}


