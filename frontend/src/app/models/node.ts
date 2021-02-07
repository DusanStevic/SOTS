// You must have the same names for fields in models on the backend and frontend app.
// node for front rendering
export interface Node {
    db_id: number;
    id: string;
    label: string;
}
// You must have the same names for fields in models on the backend and frontend app.
// node for backend storing
export interface NodeDB {
    knowledge_space: number;
    node_id: string;
    node_label: string;
}




