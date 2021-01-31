import { KnowledgeSpaceEntity } from "./knowledge_space.model";
import { NodeEntity } from "./node.model";

export class LinkEntity {
    public id: number;
    public knowledge_space: KnowledgeSpaceEntity;
    public link_id: String;
    public link_label: String;
    public source: NodeEntity;
    public target: NodeEntity;

    constructor(id?: number, knowledge_space?: KnowledgeSpaceEntity, 
        link_id?: String, link_label?: String, source?: NodeEntity,
        target?: NodeEntity) {
            this.id = id;
            this.knowledge_space = knowledge_space;
            this.link_id = link_id;
            this.link_label = link_label;
            this.source = source;
            this.target = target;
    }
} 