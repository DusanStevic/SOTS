import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from 'src/app/shared/models/request/login';
import { ToastrService } from 'ngx-toastr';
import { DagService } from '../core/services/dag.service';
import { Node} from '../shared/models/node';
import { Link} from '../shared/models/link';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  view = [933, 400];
  nodes: Node[] = [];
  links: Link[] = [];
  users: User[];
  deletedNode: Node;
  sourceNode: Node;
  targetNode: Node;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private dagService: DagService) { }

  ngOnInit() {
    this.loadDag();
    this.loadUsers();
  }
  loadUsers(): void {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      this.toastr.error(error);
    });
  }

  loadDag(): void {
    this.dagService.readDag(1).subscribe(data => {
      for (const node of data.nodes) {
        this.nodes.push({
          id: node.id.toString(),
          label: node.label
        });
      }
/*       Link id explanation:
      But querySelector method uses CSS3 selectors for querying the DOM and CSS3 doesn't support ID selectors
      that start with a digit: In CSS, identifiers (including element names, classes, and IDs in selectors) can contain
      only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and
      the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit. */
      for (const link of data.links) {
        this.links.push({
          // Link id can't start with a digit it has to start with a character.
          id: 'link' + link.id.toString(),
          label: link.label,
          source: link.source.toString(),
          target: link.target.toString()
        });
      }

    }, error => {
      this.toastr.error('There was an error while getting the data about knowledge space.');
    });
  }

/*   Since the component is being rendered before data are available
  we need to check if data arrived from the backend. Delaying the rendering
  of the ngx-graph only when data are available. */

  get ready(): boolean {
    return this.nodes.length !== 0;
  }

  deleteNode() {
    this.removeByAttr(this.nodes, 'id', this.deletedNode.id );
    this.removeByAttr(this.links, 'source', this.deletedNode.id);
    this.removeByAttr(this.links, 'target', this.deletedNode.id);
    this.update$.next(true);
    this.zoomToFit$.next(true);
    this.center$.next(true);

  }
  removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 && arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  addLink() {
    if (this.sourceNode.id === this.targetNode.id) {
      this.toastr.error('Cycle detected in DAG.');
    } else {
      this.links.push({
        id: 'link' + this.sourceNode.id.toString() + this.targetNode.id.toString(),
        label: 'prerequisite',
        source: this.sourceNode.id.toString(),
        target: this.targetNode.id.toString()
      });
      this.update$.next(true);
      this.zoomToFit$.next(true);
      this.center$.next(true);
    }
  }

}
