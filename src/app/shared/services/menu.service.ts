import { Injectable } from '@angular/core';
import { MENU_ITEM } from '../../pages/menu';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Injectable()

export class menuService {

  constructor(public globalService: GlobalService, private router: Router) {
    this.getNodePath(MENU_ITEM);
  }

  private parentNode = null;
  private node = null;
  private pathItem = [];

  
  protected queryParentNode(json: any, nodeId: any) {

    for (let i = 0; i < json.length; i++) {
      if (this.node) {
        break;
      }
      const object = json[i];
      if (!object || !object.path) {
        continue;
      }
      if (object.path === nodeId) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parentNode = object;
          this.queryParentNode(object.children, nodeId);
        } else {
          continue;
        }
      }
    }
    if (!this.node) {
      this.parentNode = null;
    }
    return {
      parent_node : this.parentNode,
      node: this.node
    };
  }


  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parentNode = null;
    const menuObj = this.queryParentNode(MENU_ITEM, nodeId);
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.pathItem.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.pathItem;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      if (index.children) {
        // delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = 'init';
      } else {
        this.pathItem = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        index.routerLink.unshift('/', 'dairy');
      }
    });
  }

  public putSidebarJson() {
    return MENU_ITEM;
  }

  public selectItem(item) {
    item.forEach(element => {
      if (element.routerLink) {
        element.isActive = this.router.isActive(this.router.createUrlTree(element.routerLink), true);
        if (element.isActive) {
          // this._globalService._isActived(element);
          this.globalService.dataBusChanged('isActived', element);
        }
      } else if (element.children) {
        this.selectItem(element.children);
             }
    });
  }

}
