// You must have the same names for fields in models on the backend and frontend app.
// node for front rendering
export interface Node {
    db_id: number;
    id: string;
    label: string;
}

// node for backend storing mora da ima ista polja kao na backend modelu
// ista polja kao u modelu na backu
export interface NodeDB {
    knowledge_space: number;
    node_id: string;
    node_label: string;
}




