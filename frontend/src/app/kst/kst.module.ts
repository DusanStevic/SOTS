import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeSpacesComponent } from './knowledge-spaces/knowledge-spaces.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { KnowledgeSpaceDetailsComponent } from './knowledge-space-details/knowledge-space-details.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KnowledgeSpacesComparisonComponent } from './knowledge-spaces-comparison/knowledge-spaces-comparison.component';
import { KnowledgeSpaceDetailsRealComponent } from './knowledge-space-details-real/knowledge-space-details-real.component';
import { GedDialogComponent } from './ged-dialog/ged-dialog.component';



@NgModule({
  declarations: [
    KnowledgeSpacesComponent,
    KnowledgeSpaceDetailsComponent,
    KnowledgeSpacesComparisonComponent,
    KnowledgeSpaceDetailsRealComponent,
    GedDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxGraphModule,
    NgxChartsModule,
  ],
  // This is very important for angular material dialog
  entryComponents: [
    GedDialogComponent
  ],
  exports: [
    KnowledgeSpacesComponent,
    KnowledgeSpaceDetailsComponent,
    KnowledgeSpacesComparisonComponent,
    KnowledgeSpaceDetailsRealComponent,
    GedDialogComponent
  ]
})
export class KstModule { }
