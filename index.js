const bill=document.getElementById('bill')
const btns= document.querySelectorAll('.tip')
const custom =document.getElementById('custom')
const peopleinp =document.getElementById('people')
const err = document.querySelector('.err')
const results = document.querySelectorAll('.result')
const reset = document.querySelector('.reset')
console.log(reset)

btns.forEach(tip=>{
    tip.addEventListener('click',tipSelect)
})
reset.addEventListener('click',resetValues)
bill.addEventListener('input', setBillValue)
custom.addEventListener('input',setCustomValue)
peopleinp.addEventListener('input',setPeopleValue)
let billValue=0.0
let tipValue= 0.15
let peopleValue = 1

function validateFloat(s){
    var regex = /^[0-9]*\.?[0-9]*$/;
    return s.match(regex)
}
function validateCustom(s){
    var regex = /^[0-9]*$/;
    return s.match(regex)
}

function setBillValue(){
    if(bill.value.includes(',')){
        bill.value =bill.value.replace(',','.')
    }
     if(!validateFloat(bill.value)){
         bill.value = bill.value.substring(0,bill.value.length-1)
     }//excludes all characters that are not numbers

    billValue = parseFloat(bill.value)
    calculateTip()
    console.log(billValue)
}

function tipSelect(event){
    btns.forEach(tip=>{
        tip.classList.remove('active')
        if(event.target.innerHTML==tip.innerHTML){
            tip.classList.add('active')
            tipValue = parseFloat(tip.innerHTML)/100;
        }
    })
    custom.value=''
    calculateTip()
}
function setCustomValue(){
    if(!validateCustom(custom.value)){
        custom.value = custom.value.substring(0,custom.value.length-1)
    }//excludes all characters that are not numbers

    tipValue= parseFloat(custom.value/100)
    console.log(tipValue)
        btns.forEach(tip=>{
            tip.classList.remove('active')
        })
        if(custom.value !== ''){
            calculateTip()
        }
   
}
function setPeopleValue(){
    if(!validateCustom(peopleinp.value)){
        peopleinp.value = peopleinp.value.substring(0,peopleinp.value.length-1)
    }//excludes all characters that are not numbers
    peopleValue = parseFloat(peopleinp.value)
    if(peopleinp.value<=0){
        err.classList.add('active')
        setTimeout(() => {
            err.classList.remove('active')
        }, 1000);
    }
    calculateTip()
}

function calculateTip(){
    if(peopleValue>=1){
        let tipAmount = billValue * tipValue /peopleValue;
        let total = billValue * (tipValue+1)/peopleValue
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function resetValues(){
   bill.value= '0.0'
   setBillValue();

   btns[2].click()
   people.value = '1'
   setPeopleValue()
}