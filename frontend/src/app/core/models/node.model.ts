import { KnowledgeSpaceEntity } from "./knowledge_space.model";

export class NodeEntity {
    public id: number;
    public knowledge_space: KnowledgeSpaceEntity;
    public node_id: String;
    public node_label: String;

    constructor(id?: number, knowledge_space?: KnowledgeSpaceEntity, node_id?: String,
        node_label?: String) {
            this.id = id;
            this.knowledge_space = knowledge_space;
            this.node_id = node_id;
            this.node_label = node_label;
    }
} 