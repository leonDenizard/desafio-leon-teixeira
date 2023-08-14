class CaixaDaLanchonete {
  cardapio = {
    cafe: { descricao: "Café", valor: 3.0 },
    chantily: { descricao: "Chantily (extra do Café)", valor: 1.5, itemPrincipal: 'cafe' },
    suco: { descricao: "Suco Natural", valor: 6.2 },
    sanduiche: { descricao: "Sanduíche", valor: 6.5 },
    queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0, itemPrincipal: 'sanduiche' },
    salgado: { descricao: "Salgado", valor: 7.25 },
    combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
    combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
  }

  metodoDePagamento = ["dinheiro", "debito", "credito"]

  calcularValorDaCompra(metodoDePagamento, itens) {

    if (!this.metodoDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!"
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!"
    }

    let total = 0
    
    let cafePedido = false
    let sanduichePedido = false

    //Verifica primeiro nos itens se existe o principal
    for(const itemPrincipal of itens){
      const [codigo] = itemPrincipal.split(",")
      
      if(codigo === 'cafe'){
        cafePedido = true
      }

      if(codigo === 'sanduiche'){
        sanduichePedido = true
      }
    }

    for (const pedido of itens) {
      const [codigo, quantidade] = pedido.split(",")

      // console.log(`codigo: ${codigo} qte: ${quantidade}`)

      if (quantidade <= 0) {
        return "Quantidade inválida!"
      }
      

      if (!this.cardapio[codigo]) {
        return "Item inválido!"
      }
      if((codigo === 'chantily' && !cafePedido) || (codigo === 'queijo' && !sanduichePedido)){
        return "Item extra não pode ser pedido sem o principal"
      }


      const valor = this.cardapio[codigo].valor
      total += valor * quantidade

      //console.log(total)
    }

    // Aplicar descontos ou acréscimos
    if (metodoDePagamento === "dinheiro") {
      const desconto = total * 0.05
      total -= desconto
    } else if (metodoDePagamento === "credito") {
      const acrecimo = total * 0.03
      total += acrecimo
    }

    const totalFormatado = total.toFixed(2).replace('.',',')
    return `R$ ${totalFormatado}`
  }
}

const caixa = new CaixaDaLanchonete()

console.log(caixa.calcularValorDaCompra('credito', ['combo1, 2', 'combo2, 1', 'salgado,1', 'suco, 4']))
export { CaixaDaLanchonete }
