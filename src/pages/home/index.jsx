import React, { useState } from 'react';

import './home.css';
import Input from '../../components/form/input';
import Button from '../../components/form/button';

function Home() {
    //variaveisvão receber os dados informados pelo usuario separadas pela respectiva parede
    const [firstHeight, setFirstHeight] = useState(0)
    const [firstWitdh, setFirstWitdh] = useState(0)
    const [firstWindow, setFirstWindow] = useState(0)
    const [firstDoor, setFirstDoor] = useState(0) 

    const [secondHeight, setSecondHeight] = useState(0)
    const [secondWitdh, setSecondWitdh] = useState(0)
    const [secondWindow, setSecondWindow] = useState(0)
    const [secondDoor, setSecondDoor] = useState(0)

    const [thirdHeight, setThirdHeight] = useState(0)
    const [thirdWitdh, setThirdWitdh] = useState(0)
    const [thirdWindow, setThirdWindow] = useState(0)
    const [thirdDoor, setThirdDoor] = useState(0)

    const [fourthHeight, setFourthHeight] = useState(0)
    const [fourthWitdh, setFourthWitdh] = useState(0)
    const [fourthWindow, setFourthWindow] = useState(0)
    const [fourthDoor, setFourthDoor] = useState(0)

    const [paint0_5Value, setPaint0_5Value] = useState(0);
    const [paint2_5Value, setaint2_5Value] = useState(0);
    const [paint3_6Value, setPaint3_6Value] = useState(0);
    const [paint18Value, setPaint18Value] = useState(0);
    const [paintingArea, setPaintingArea] = useState(0); //Tamanho total da area

    //Função que quando executada mostra ao usuário o quanto de tinta será recomendado ele comprar
    function showResults() {
        const results = document.getElementsByClassName("conversor-results")[0];
        results.style.display = "block";
    }

    //Função executada quando o formulário for enviado pelo usuário
    function handleSubmit(e) {
        e.preventDefault();
        
        const amountWindows = (firstWindow + secondWindow + thirdWindow + fourthWindow) //Quantidade de janelas
        const amountDoors = (firstDoor + secondDoor + thirdDoor + fourthDoor) //Quantidade de portas

        //Dimensões da area do comodo (contando com area das paredes, portas e/ou janelas)
        const dimensions = (((firstHeight * firstWitdh) + (secondHeight * secondWitdh) + (thirdHeight * thirdWitdh) + (fourthHeight * fourthWitdh)) - (amountWindows * 2.40) - (amountDoors * 1.52))

        //Função que irá calcular os dados recebidos pelo usuário para calcular o quanto de tinta será necessário para pintar a parede
        function paintCalc(area) {
      
            let paint0_5 = 0;
            let paint2_5 = 0;
            let paint3_6 = 0;
            let paint18 = 0;

            let requiredPaintAmount = area / 5
            setPaintingArea(area)

            while (requiredPaintAmount > 0) {

                if (requiredPaintAmount >= 18) {
                  paint18++;
                  requiredPaintAmount -= 18;

                    } else if (requiredPaintAmount >= 3.6) {
                        paint3_6++;
                        requiredPaintAmount -= 3.6;

                        } else if (requiredPaintAmount >= 2.5) {
                            paint2_5++;
                            requiredPaintAmount -= 2.5;

                            } else {
                                paint0_5++;
                                requiredPaintAmount -= 0.5;
                }
              }

              console.log(paint0_5 + ' paint0_5'), setPaint0_5Value(paint0_5);
              console.log(paint2_5 + ' paint2_5'), setaint2_5Value(paint2_5);
              console.log(paint3_6 + ' paint3_6'), setPaint3_6Value(paint3_6);
              console.log(paint18 + ' paint18'), setPaint18Value(paint18);
              showResults()//função que mostra os resultados para o usuário
        }

        // Alertas de erro que impede o calculo caso seja quebrada alguma regra durante o envio do formulário
        switch (true) {
            case dimensions < 1 || dimensions > 50:
                alert("Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados!")
                break
            case ((amountWindows * 2.40) + (amountDoors * 1.52)) > (dimensions / 2):
                alert("O total de área das portas e janelas deve ser no máximo 50% da área de parede")
                break
            case (firstDoor >= 1 && (firstHeight < 2.20) || (secondDoor >= 1 && (secondHeight < 2.20)) || thirdDoor >= 1 && (thirdHeight < 2.20) || fourthDoor >= 1 && (fourthHeight < 2.20)):
                alert("A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta!")
                break
            case isNaN(dimensions):
                alert("Aceitamos apenas números como valores!")
                break
            default:
                console.log('Dados Validos!')
                paintCalc(dimensions)
                break
          }
    }

  return (
    <div className='home'>
        <h1>Quais as medidas do cômodo?</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Parede 1</h2>
        <div className='wallValues'>
            <Input placeholder='Altura' calc={(e) => setFirstHeight(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Largura' calc={(e) => setFirstWitdh(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Quantidade de janelas' calc={(e) => setFirstWindow(parseFloat(e.target.value.replace(',', '.')))}/>
            <Input placeholder='Quantidade de portas' calc={(e) => setFirstDoor(parseFloat(e.target.value.replace(',', '.')))}/>
        </div>
        
        <h2>Parede 2</h2>
        <div className='wallValues'>
            <Input placeholder='Altura' calc={(e) => setSecondHeight(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Largura' calc={(e) => setSecondWitdh(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Quantidade de janelas' calc={(e) => setSecondWindow(parseFloat(e.target.value.replace(',', '.')))}/>
            <Input placeholder='Quantidade de portas' calc={(e) => setSecondDoor(parseFloat(e.target.value.replace(',', '.')))}/>
        </div>

        <h2>Parede 3</h2>
        <div className='wallValues'>
            <Input placeholder='Altura' calc={(e) => setThirdHeight(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Largura' calc={(e) => setThirdWitdh(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Quantidade de janelas' calc={(e) => setThirdWindow(parseFloat(e.target.value.replace(',', '.')))}/>
            <Input placeholder='Quantidade de portas' calc={(e) => setThirdDoor(parseFloat(e.target.value.replace(',', '.')))}/>
        </div>

        <h2>Parede 4</h2>
        <div className='wallValues'>
            <Input placeholder='Altura' calc={(e) => setFourthHeight(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Largura' calc={(e) => setFourthWitdh(parseFloat(e.target.value.replace(',', '.')))} required={true}/>
            <Input placeholder='Quantidade de janelas' calc={(e) => setFourthWindow(parseFloat(e.target.value.replace(',', '.')))}/>
            <Input placeholder='Quantidade de portas' calc={(e) => setFourthDoor(parseFloat(e.target.value.replace(',', '.')))}/>
        </div>

        <span>Informe a largura e a altura em metros. Ex: 5,50</span>
        
        <Button type='submit'>Calcular</Button>

        <div className="conversor-results">
            <p className='title-results'>Serão necessários <span>{paintingArea / 5}L</span> de tinta para pintar a área de <span>{paintingArea}m²</span>, portanto recomendamos comprar latas de tinta com essas capacidades:</p>
            <p><span>{paint0_5Value}</span> latas de 0,5 L</p>
            <p><span>{paint2_5Value}</span> latas de 2,5 L</p>
            <p><span>{paint3_6Value}</span> latas de 3,6 L</p>
            <p><span>{paint18Value}</span> latas de 18 L</p>
        </div>
        
        
      </form>
    </div>
  )
}

export default Home
