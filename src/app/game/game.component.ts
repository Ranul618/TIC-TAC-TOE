import { Component } from '@angular/core';

import{Gamelogic} from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers:[Gamelogic],
})
export class GameComponent {

  constructor(public game: Gamelogic){}


  startGame() :void{

    this.game.gameStart();
    const currentPlayer='Current turn: Player ' + this.game.currentTurn;
    const information:any=document.querySelector('.current-status');
    information.innerHTML=currentPlayer;

  }

 async clickSubfield(subfield:any): Promise<void>{

  if(this.game.gameStatus===1){
    const position=subfield.currentTarget.getAttribute('position');
    console.log(position);
    this.game.setField(position, this.game.currentTurn);
    const color=this.game.getPlayerColorClass();
    subfield.currentTarget.classList.add(color);

   //await this.game.checkGameEndWinner();

   await this.game.checkGameEndWinner().then((end:boolean)=>{if(this.game.gameStatus===0 && end){
    const information:any=document.querySelector('.current-status');
    information.innerHTML='The Winner Is Player No. ' + this.game.currentTurn + '!!!!!!';
   }});


   await this.game.checkGameEndFull().then((end:boolean)=>{if(this.game.gameStatus===0 && end){
    const information:any=document.querySelector('.current-status');
    information.innerHTML='No Winner, Game Is Draw!'
   }});



    this.game.changePlayer();

    if(this.game.gameStatus===1){
      const currentPlayer='Current turn: Player ' + this.game.currentTurn;
      const information:any=document.querySelector('.current-status');
      information.innerHTML=currentPlayer;
      
      
  
    }
  }

 
    
  }

}
