import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSpacesComponent } from './knowledge-spaces/knowledge-spaces.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { KnowledgeSpaceDetailsComponent } from './knowledge-space-details/knowledge-space-details.component';



@NgModule({
  declarations: [KnowledgeSpacesComponent, KnowledgeSpaceDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    KnowledgeSpacesComponent,
    KnowledgeSpaceDetailsComponent
  ]
})
export class KstModule { }
