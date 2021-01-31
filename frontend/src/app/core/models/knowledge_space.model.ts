import { DomainEntity } from "./domain.model";

export class KnowledgeSpaceEntity {
    public id: number;
    public domain: DomainEntity;

    constructor(id?: number, domain?: DomainEntity) {
            this.id = id;
            this.domain = domain;
    }
} 