// You must have the same names for fields in models on the backend and frontend app.
export interface Link {
    db_id: number;
    id: string;
    label: string;
    source: string;
    target: string;
}
// You must have the same names for fields in models on the backend and frontend app.
export interface LinkDB {
    knowledge_space: number;
    link_id: string;
    link_label: string;
    source: number;
    target: number;


}
