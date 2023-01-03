import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculadora',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  numero_corrente = '0';
  primeiro_operando = null;
  operador = null;
  espera_segundo = false;

  constructor() { }

  ngOnInit() {
  } 

  public getNumero(v: string){
    console.log(v);
    if(this.espera_segundo)
    {
      this.numero_corrente = v;
      this.espera_segundo = false;
    }else{
      this.numero_corrente === '0'? this.numero_corrente = v: this.numero_corrente += v;

    }
  }

  getDecimal(){
    if(!this.numero_corrente.includes('.')){
        this.numero_corrente += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.primeiro_operando += secondOp; 
      case '-': 
      return this.primeiro_operando -= secondOp; 
      case '*': 
      return this.primeiro_operando *= secondOp; 
      case '/': 
      return this.primeiro_operando /= secondOp; 
      case '=':
      return secondOp;
    }
  }
  public getOperacao(op: string){
    console.log(op);

    if(this.primeiro_operando === null){
      this.primeiro_operando = Number(this.numero_corrente);

    }else if(this.operador){
      const result = this.doCalculation(this.operador , Number(this.numero_corrente))
      this.numero_corrente = String(result);
      this.primeiro_operando = result;
    }
    this.operador = op;
    this.espera_segundo = true;

    console.log(this.primeiro_operando);
 
  }

  public clear(){
    this.numero_corrente = '0';
    this.primeiro_operando = null;
    this.operador = null;
    this.espera_segundo = false;
  }
}
