import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculadora',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  numero_corrente = '0'; // variável para receber o valor e ser atribuído tanto para o primeiro operando quanto para o segundo
  primeiro_operando = null; // recebe o primeiro valor da operação aritimética
  operador = null; // irá guardar qual tipo de operação aritimética que irá ser realizada
  espera_segundo = false; // variável que ajuda a indicar ao sistema se um valor clicado pelo usuário pela primeira vez ou não e se preenche o primeiro operando ou o 
  // segundo operando

  constructor() { }

  ngOnInit() {
  } 

  public getNumero(v: string){
    console.log(v);
    if(this.espera_segundo)//se o espera_segundo estiver positivo, significa que o um numero já foi atribuído para o numero_corrente e para tela
    {
      this.numero_corrente = v;
      this.espera_segundo = false;// troca a variável para false(o que indica que um número já foi clicado atribuído para numero corrente e para tela)
    }else{// levando o próximo número clicado para a condição abaixo
      this.numero_corrente === '0'? this.numero_corrente = v: this.numero_corrente += v;
      // caso o numero corrente for == 0, isto é, caso em que não foi apertado nenhum numero na calculador, a calculador irá receber o valor digitado
      // o segundo caso do operador unário é, caso já tenha um valor no numero corrente antes que não seja 0 o numero irá ser acrescentado
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
      return this.primeiro_operando += secondOp; // o segundo OP recebe o numero corrente e realiza a operação
      case '-': // caso receba o segundo ele vai realizar a operação do primeiro operador e o segundo
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

    if(this.primeiro_operando === null){ // caso o usuário clique no botão num dos operando e a variável primeiro operando esteja vazia (null) 
      this.primeiro_operando = Number(this.numero_corrente); // o  primeiro operando recebe o número corrente que nesse caso será zero

    }else if(this.operador){// caso o usuário tenha apertado no operador 
      const result = this.doCalculation(this.operador , Number(this.numero_corrente)) // realiza a operação com o numero corrente
      this.numero_corrente = String(result); // atualiza o valor do numero corrente com o resultado tanto na tela quanto no primeiro operando
      this.primeiro_operando = result; // caso o usuário queira continuar realizando operações o primeiro operando ficará setado 
    }
    this.operador = op; //preenche a variável do operador para a próxima operação cair sempre na segunda condição acima
    this.espera_segundo = true; // espera segundo converte para true o que indica que o primeiro numero do segundo operador pode começar a ser formado

    console.log(this.primeiro_operando);
 
  }

  public clear(){ // função resete da calculadora
    this.numero_corrente = '0';
    this.primeiro_operando = null;
    this.operador = null;
    this.espera_segundo = false;
  }
}
