import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { DesignationService } from '../designation.service';

import { DesignationMaster } from '../designation.model';
@Component({
  selector: 'app-designationlist',
  templateUrl: './designationlist.component.html',
  styleUrls: ['./designationlist.component.scss']
})
export class DesignationlistComponent implements OnInit {

  @ViewChild("designationNav") sidenav: MatSidenav;
  pageTitle: string = "Designation List"

  designationList: Array<any>;
  designationTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  designationMaster: DesignationMaster = null;

  constructor(private designationService: DesignationService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.designationMaster = Object.assign({}, $event.rowData);
        this.sidenav.open();
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.reset();
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {

      }
    }

  }


  saveDesignation(designationMaster: DesignationMaster) {
    if (designationMaster) {
      if (designationMaster.DesignationId < 1) {
        this.designationMaster.DesignationId = this.designationList.length + 1;
      }
      this.designationService.Save(designationMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset() {


    this.designationMaster = this.designationService.NewDesignation();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.designationService.GetAll().subscribe(result => {
      this.designationList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];
  
      this.designationTableSchema =
        [
          { ColumnField: "DesignationName", ColumnHeader: "Designation Name", Type: "text" },
          { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
        ];
  }
}
