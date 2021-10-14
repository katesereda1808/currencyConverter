

let base = document.querySelector('.base');
let output = document.querySelector('.output');
const url = 'https://api.exchangerate.host/latest';
let rate1 = document.getElementById('rate1');
let rate2 = document.getElementById('rate2');

let currency_first = 'RUB';
let currency_second = 'USD';
let flag = true;
base.value = 100;

let container1 = document.querySelector('#currencies1');
container1.addEventListener('click', function(e){
    flag = false;
    currency_first = e.target.dataset.type;
    let arr = container1.children;
    for(let i = 0; i<arr.length; i++){
        arr[i].classList.remove("active");
    }
    e.target.classList.add("active");
    getRate(currency_first,currency_second);
})

let container2 = document.querySelector('#currencies2');
container2.addEventListener('click', function(e){
    flag = true;
    currency_second = e.target.dataset.type;
    let arr = container2.children;
    for(let i = 0; i<arr.length; i++){
        arr[i].classList.remove("active");
    }
    e.target.classList.add("active");
    getRate(currency_first,currency_second);
})

function getRate (currency1, currency2){
    
    arr1 = document.getElementsByClassName('first');
    for (let i = 0; i < arr1.length; i++) {
        arr1[i].innerHTML = currency1;
    }
    arr2 = document.getElementsByClassName('second');
    for (let i = 0; i < arr1.length; i++) {
        arr2[i].innerHTML = currency2;
    }

    if(currency1 !== currency2){
        fetch(`https://api.exchangerate.host/latest?base=${currency2}&symbols=${currency1}`)
        .then(res =>  res.json())
        .then(data => {
            if(!data.rates){
                alert("сервер не отвечает")
            }
            if(data.rates){
                if(flag === true){
                    output.value = parseFloat(base.value / data.rates[currency1]).toFixed(2);
    
                }else{
                    base.value = parseFloat(output.value * data.rates[currency1]).toFixed(2);
                }
                rate1.innerHTML = (1/data.rates[currency1]).toFixed(2);
                rate2.innerHTML = data.rates[currency1].toFixed(2);
            }

        })
    }else{
        if(flag === true){
           output.value = base.value;
        }else{
            base.value = output.value;
        }
        
    }

}
getRate(currency_first,currency_second);

function change_input(bool){
    flag = bool;
    getRate(currency_first,currency_second);
}
