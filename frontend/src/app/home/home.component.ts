// ngx graph angular template
// https://github.com/rat17sri/ngx-graph-angular
// https://github.com/hdoan002/graph-template

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DagService } from '../core/services/dag.service';
import { Node, NodeDB} from '../models/node';
import { Link, LinkDB} from '../models/link';
import { Subject } from 'rxjs';
import { User } from '../models/user';



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
  nodeName: string;
  linkName: string;
  mySubscription: any;
  // stack for nodes to visit
  nodesToVisit: Node[] = [];
  // queue for question order
  questionOrder: Node[] = [];
  tempChildren: Node[] = [];

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private dagService: DagService) {}

  ngOnInit() {
    this.loadDag();
  }
  loadUsers(): void {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      this.toastr.error(error);
    });
  }

  loadDag() {
    this.dagService.readDag(1).subscribe(data => {
      for (const node of data.nodes) {
        this.nodes.push({
          db_id: node.id,
          id: node.node_id,
          label: node.node_label
        });
      }
/*       Link id explanation:
      But querySelector method uses CSS3 selectors for querying the DOM and CSS3 doesn't support ID selectors
      that start with a digit: In CSS, identifiers (including element names, classes, and IDs in selectors) can contain
      only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and
      the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit. */
      for (const link of data.links) {
        const sourceNode = this.getNodeByDbId(link.source);
        const targetNode = this.getNodeByDbId(link.target);
        this.links.push({
          // Link id can't start with a digit it has to start with a character.
          db_id: link.id,
          id: link.link_id,
          label: link.link_label,
          source: sourceNode.label,
          target: targetNode.label
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
    this.dagService.deleteNode(this.deletedNode.db_id).subscribe(data => {
      this.toastr.success('Node has been successfully deleted.');
    }, error => {
      this.toastr.error('There was an error trying to delete node ' + '\'' + this.deletedNode.label + '\'');
    });
    this.removeByAttr(this.nodes, 'id', this.deletedNode.id );
    this.removeByAttr(this.links, 'source', this.deletedNode.id);
    this.removeByAttr(this.links, 'target', this.deletedNode.id);
    this.update$.next(true);
    this.zoomToFit$.next(true);
    this.center$.next(true);

  }
  removeByAttr = function(arr, attr, value) {
    let i = arr.length;
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
    if (!this.isLinkLabelUnique(this.links, this.linkName)) {
      this.toastr.error('Link already exists with label ' + '\'' + this.linkName + '\'');
    } else {
      console.log('sta sam dobio od provere ciklusa', this.isCycleDetected(this.sourceNode, this.targetNode));
      // Just in case nodesToVisit stack reset.
      // Preparing nodesToVisit stack for new add link operation. Poping all nodes from the stack.
      this.nodesToVisit = [];
      if (this.isCycleDetected(this.sourceNode, this.targetNode)) {
      this.toastr.error('Cycle detected in DAG.');
      } else {
        // save new link to DB
        const linkDB: LinkDB = {
          knowledge_space: 1,
          link_id: this.linkName,
          link_label: this.linkName,
          source: this.sourceNode.db_id,
          target: this.targetNode.db_id
        };
        // new link is returned as response from endpoint create-link
        this.dagService.addNewLink(linkDB).subscribe(data => {
          // pushing new link to existing links
          const sourceNode = this.getNodeByDbId(data.source);
          const targetNode = this.getNodeByDbId(data.target);
          this.links.push({
            db_id: data.id,
            id: data.link_id,
            label: data.link_label,
            source: sourceNode.label,
            target: targetNode.label
          });
          // rendering all links
          this.update$.next(true);
          // this.zoomToFit$.next(true);
          // this.center$.next(true);
          this.toastr.success('New link has been successfully added.');
        }, error => {
          this.toastr.warning(error.error.message, 'Warning');
        });

      }
    }
  }
  addNode(): void {
    if (!this.isNodeLabelUnique(this.nodes, this.nodeName)) {
      this.toastr.error('Node already exists with label ' + '\'' + this.nodeName + '\'');

    } else {
      // save new node to DB
      const nodeDB: NodeDB = {
        knowledge_space: 1,
        node_id: this.nodeName,
        node_label: this.nodeName
      };
      // new node is returned as response from endpoint create-node
      this.dagService.addNewNode(nodeDB).subscribe(data => {
        // pushing new node to existing nodes
        this.nodes.push({
          db_id: data.id,
          id: data.node_id,
          label: data.node_label
        });
        // rendering all nodes
        this.update$.next(true);
        // this.zoomToFit$.next(true);
        // this.center$.next(true);
        this.toastr.success('New node has been successfully added.');
      }, error => {
        this.toastr.warning(error.error.message, 'Warning');
      });


    }

  }
  isNodeLabelUnique(nodes: Node[], nodeNam: string) {
    let uniqueFlag = true;
    for (const node of nodes) {
      if (node.label === nodeNam) {
        uniqueFlag = false;
      }
    }
    return uniqueFlag;
  }

  isLinkLabelUnique(links: Link[], linkNam: string) {
    let uniqueFlag = true;
    for (const link of links) {
      if (link.label === linkNam) {
        uniqueFlag = false;
      }
    }
    return uniqueFlag;
  }




  isCycleDetected(sourceNode: Node, targetNode: Node) {
    console.log('cvorove koje treba posetiti', this.nodesToVisit);
    let parents = [];
    if (sourceNode.id === targetNode.id) {
      return true;
    }
    console.log('roditelji cvora:', sourceNode);
    parents = this.getNodeParents(sourceNode);
    console.log(parents);
    // If the number of nodes in parents is greater than 1 you must activate nodesToVisit stack.
    if (parents.length > 1) {
      // Why we use parents.length - 1 because the last node in parents becomes currently visited node
      // so there is no need to push that node in nodesToVisit stack it is already prosecuted(visited).
      for (let i = 0; i < parents.length - 1; i++) {
        this.nodesToVisit.push(parents[i]);
      }
    }

    if (parents.length !== 0) {
      sourceNode = parents.pop();
    } else {
      if (this.nodesToVisit.length !== 0) {
        sourceNode = this.nodesToVisit.pop();
        // Remove currently visited node from nodesToVisit stack.
        this.nodesToVisit.pop();
      } else {
        return false;
      }
    }
    if (this.isTargetNodeInParents(parents, targetNode)) {
      return true;
    } else {
      return this.isCycleDetected(sourceNode, targetNode);
    }
  }


  getNodeParents(node: Node) {
    const parents = [];
    for (const link of this.links) {
      if (node.db_id === this.getNodeByLabel(link.target).db_id) {
        parents.push(this.getNodeByLabel(link.source));
      }
    }
    return parents;
  }

  getNodeChildren(node: Node) {
    const children = [];
    for (const link of this.links) {
      if (node.db_id === this.getNodeByLabel(link.source).db_id) {
        children.push(this.getNodeByLabel(link.target));
      }
    }
    return children;
  }

  isTargetNodeInParents(parents: Node[], targetNode: Node) {
    let inFlag = false;
    for (const parent of parents) {
      if (parent.db_id === targetNode.db_id) {
        inFlag = true;
      }
    }
    return inFlag;
  }


  getNodeByDbId(dbId: number) {
    for (const node of this.nodes) {
      if (node.db_id === dbId) {
        return node;
      }
    }
    return null;

  }
  getNodeByLabel(Id: string) {
    for (const node of this.nodes) {
      if (node.id === Id) {
        return node;
      }
    }
    return null;

  }

  getRootNodes() {
    const roots = [];
    for (const node of this.nodes) {
      if (this.getNodeParents(node).length === 0) {
        roots.push(node);
      }
    }
    return roots;

  }

  questionOrderByExpectedKnowledgeSpace(roots: Node[]): void {
    // Resetting question order for a new session.
    this.questionOrder = [];
    console.log('pozdrav iz redosleda')
    // get root nodes
    this.questionOrder = this.getRootNodes();
    console.log(this.questionOrder)
    this.calculatingOrderByExpectedKnowledgeSpace(this.getRootNodes());
    for (const question of this.questionOrder) {
      console.log(question);
    }

  }

  calculatingOrderByExpectedKnowledgeSpace(roots: Node[]): void {
    let children = [];
    for (const root of roots) {
      for (const child of this.getNodeChildren(root)){
        // Preventing duplicates
        // If a list doesn't contain an element add it.
        if (!(this.questionOrder.includes(child))){
          children.push(child);
          this.questionOrder.push(child);
        }

      }
    }
    this.tempChildren = children;
    console.log('deca za sledeci krug')
    console.log(this.tempChildren)
    console.log('ukupno')
    console.log(this.questionOrder)

    if (this.tempChildren.length === 0) {
      return;

    } else {
      return this.calculatingOrderByExpectedKnowledgeSpace(this.tempChildren);
    }

  }

  questionOrderByRealKnowledgeSpace(): void {
    console.log('Markovljevi lanci');
  }


}
