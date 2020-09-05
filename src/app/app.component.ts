import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dr-game';
  private ipc: IpcRenderer

  constructor(){
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }

    } else {
      console.warn('App not running inside Electron!');
    }
  }
  
  openModal() {
    this.ipc.send("openModal");
  }

  changeVideo(name: string) {
    this.ipc.send("changeVideo", name)
  }
}
