import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ActionType } from '../../enums/action-type.enum';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ActionItem } from '../../models/action-items.iterface';
import { ActionListItemsComponent } from '../action-list-items/action-list-items.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-action-list',
  standalone: true,
  imports: [
    CdkAccordionModule,
    CdkDrag,
    CdkDropList,
    ActionListItemsComponent,
    ProgressBarComponent,
    CommonModule,
  ],
  templateUrl: './action-list.component.html',
  styleUrl: './action-list.component.scss'
})
export class ActionListComponent implements OnInit {
  actionItems: ActionItem[] = [
    {
      type: ActionType.INPROGRESS,
      items: []
    },
        {
      type: ActionType.DOLATER,
      items: []
    },
        {
      type: ActionType.COMPLETED,
      items: []
    },
  ]

  actionTypes = {
    inProgress: ActionType.INPROGRESS,
    doLater: ActionType.DOLATER,
    completed: ActionType.COMPLETED,
  }

  get dragListNames(): string[] {
    return Array.from({length: this.actionItems.length}, (_, i) => 'list' + (i + 1));
  }

  get itemsInActions(): number[] {
    return [this.actionItems[2].items.length, this.actionItems[1].items.length, this.actionItems[0].items.length]
  }

  ngOnInit(): void {
    const actionItems = localStorage.getItem('actionItems');
    if (actionItems === null) {
      this.updateLocalStorage();
    } else {
      this.actionItems = JSON.parse(actionItems);
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('actionItems', JSON.stringify(this.actionItems));
  }

  addItemByActionType(item: string, type: ActionType): void {
    this.resetFilter();
    if (type !== ActionType.INPROGRESS) {
      this.deleteItemFromList(item, type);
    }
    this.actionItems.find(x => x.type === type)?.items.unshift(item);
    this.updateLocalStorage();
  }

  resetProgress(): void {
    this.resetFilter();
    const completedItems = this.actionItems.find(x => x.type === ActionType.COMPLETED)!.items;
    this.actionItems.find(x => x.type === ActionType.INPROGRESS)?.items.push(...completedItems);
    this.actionItems.find(x => x.type === ActionType.COMPLETED)!.items = [];
    this.updateLocalStorage();
  }

  deleteItemFromList(item: string, type: ActionType): void {
    this.resetFilter();
    const items = this.actionItems.find(x => x.type === type)!.items;
    const index = items.findIndex(x => x === item);
    if (index > -1) {
      items.splice(index, 1);
    }
    this.updateLocalStorage();
  }

  resetFilter(): void {
    this.filterItems();
  }

  filterItems(filterValue?: string): void {
    const actionItems = localStorage.getItem('actionItems');
    if (actionItems === null) {
      return
    } 
    else {
      if (filterValue) {
        (<ActionItem[]>JSON.parse(actionItems)).forEach(x => {
        const filteredItems = x.items.filter(y => y.toLowerCase().includes(filterValue.toLowerCase()));
        this.actionItems.find(z => z.type === x.type)!.items = filteredItems;
        });
      } else {
        this.actionItems = (<ActionItem[]>JSON.parse(actionItems));
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.updateLocalStorage();
  }
}
