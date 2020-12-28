import { Link, LinkDB } from './link';
import { Node, NodeDB } from './node';

export interface KnowledgeSpace {
    id: number;
    nodes: Node[];
    links: Link[];
}




