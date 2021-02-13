import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSpacesComponent } from './knowledge-spaces/knowledge-spaces.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { KnowledgeSpaceDetailsComponent } from './knowledge-space-details/knowledge-space-details.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [KnowledgeSpacesComponent, KnowledgeSpaceDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxGraphModule,
    NgxChartsModule,
  ],
  exports: [
    KnowledgeSpacesComponent,
    KnowledgeSpaceDetailsComponent
  ]
})
export class KstModule { }
