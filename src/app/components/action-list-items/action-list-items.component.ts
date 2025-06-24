import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionType } from '../../enums/action-type.enum';
import { ActionItem } from '../../models/action-items.iterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-list-items',
  standalone: true,
  imports: [    
    CdkDrag,
    CommonModule
  ],
  templateUrl: './action-list-items.component.html',
  styleUrl: './action-list-items.component.scss'
})
export class ActionListItemsComponent {
  @Input() actionItem!: ActionItem;
  @Output() moveItemIntoList = new EventEmitter<{ type: ActionType, item: string}>();
  @Output() deleteItemFromList = new EventEmitter<{ type: ActionType, item: string}>();
  @Output() dragStarted = new EventEmitter<void>();


  deleteItem(item: string): void {
    this.deleteItemFromList.emit({type: this.actionItem.type, item});
  }

  moveToDoLaterList(item: string): void {
    this.moveItemIntoList.emit({ type: ActionType.DOLATER, item });
    this.deleteItem(item);
  }

  moveToFinisheddList(item: string): void {
    this.moveItemIntoList.emit({ type: ActionType.COMPLETED, item });
    this.deleteItem(item);
  }

  get isMoveToDoVisible(): boolean {
    return this.actionItem.type === ActionType.INPROGRESS;
  }

  get isMoveToCompletedVisible(): boolean {
    return this.actionItem.type !== ActionType.COMPLETED;
  }
}
