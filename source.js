//user inputs
let n; 
let m; 
//arrays
    //sets
let U=[]; 
let A=[];
let B=[];
let C=[];
let D=[];
    //results
let optn1=[];
let optn2=[];
let optn3=[];
let optn4=[];
let optn5=[];

//Declare DOM legos blocks
    //Input DOM
const inputForm = document.getElementById("inputForm");                             //Object to manipulate htlm lines inside de form
const title=document.getElementById("title");                                       //Object label user-instructions
const inputN=document.getElementById("inputN");                                     //Object to input-n value
inputN.placeholder=`2-99`;
const btnN=document.getElementById("btnN");                                         //Object to submit input-n
const inputM=document.getElementById("inputM");                                     //Object to input-m value
inputM.disabled=true;
const btnM=document.getElementById("btnM");                                         //Object to submit input-n
btnM.hidden=true;
    //Output DOM
const outputDiv=document.getElementById("output");                                  //Output container
outputDiv.hidden=true;
const showSet=document.getElementById("sets");                                      //Object to show resulting sets
const showRslt=document.getElementById("results");                                  //Object to show operation results
const setList=document.createElement("ul");                                         //Unordered list for sets
const UItem=document.createElement("li");                                           //List items for each set
const AItem=document.createElement("li");
const BItem=document.createElement("li");
const CItem=document.createElement("li");
const DItem=document.createElement("li");
const rsltList=document.createElement("ul");                                        //Unordered List for operations results
const rslt1=document.createElement("li");                                           //Lis items for each operation
const rslt2=document.createElement("li");
const rslt3=document.createElement("li");
const rslt4=document.createElement("li");
const rslt5=document.createElement("li");


//Main 
    //Input
btnN.onclick = ValueN;                                                              //Button event to obtain input-n value
btnM.onclick = ValueM;                                                              //Button event to obtain input-m value

function ValueN(){
    n = inputN.value;
    n = Math.trunc(n);                                                              //Force a int 
    if (n<2|n>99|n==undefined){                                                     //Verify input-n
        inputN.value="";                                                            //Clear the input field
        inputN.placeholder= "2-99";                                                 //reset the palceholder range example
    }
    else{
        title.textContent=`Introduce another number`                                //Change instructios
        inputN.disabled=true;                                                       //Disable input-n
        btnN.hidden=true;
        inputM.disabled=false;                                                      //Enable input-m
        inputM.placeholder=`1-${n-1}`;                                              //Show the allowed interval
        btnM.hidden=false;                                                          //Show button-m
    }
}
function ValueM(){                                                                  //Same again
    m = inputM.value;
    m = Math.trunc(m);
    if(m<1|m>n|m==undefined){
        inputM.value="";
        inputM.placeholder=`1-${n-1}`;
    }
    else{
        inputForm.hidden=true;                                                      //hide user interface
        outputDiv.hidden=false;                                                     //Show output container
        //sets building
        unvrs(); 
        setA();
        setB();
        setC();
        setD();
        //sets operations
        optn1=union({setAlpha:C,setBeta:D});
        optn2=U;                                                                    //No operation required
        optn3=D;
        optn4=dif({setAlpha:U,setBeta:C});                                          //This is equal to Cc
        let optn5Beta=union({setAlpha:C,setBeta:B});                                //The C and B union for the simetric difference
        optn5=simDif({setAlpha:U,setBeta:optn5Beta});                               //This is equal to (CUB)c
        showOutput();
    }
}
    //Output
function showOutput(){
    //Show sets
    const introPrgf=document.createElement("p");                                    //Paragraph for a explanation text of definition of the sets
    showSet.appendChild(introPrgf);                                                 //Add explanation element to the DOM
    introPrgf.className="explnt";                                                   //Asign class to CSS style
    introPrgf.textContent=`Given n=${n} and m=${m}:`;                               //Explanition txt
    showSet.appendChild(setList);                                                   //Insert set list section
    const unvrsPrgf=document.createElement("p")                                     //Definition of the universal set
    setList.appendChild(unvrsPrgf);
    unvrsPrgf.className="explnt";
    unvrsPrgf.textContent="Let's define the universal set as:";
    setList.appendChild(UItem);
    UItem.textContent=`U={x|0<x≤n}={${U.join(", ")}}.`; 
    const setPrgf=document.createElement("p");                                      //Definition of A, B, C, D sets
    setList.appendChild(setPrgf);
    setPrgf.className="explnt";
    setPrgf.textContent=`Let A, B, C, and D ⊆ U such that:`; 
    setList.appendChild(AItem);
    AItem.textContent=`A={x∈U|x is even}={${A.join(", ")}}`;
    setList.appendChild(BItem);
    BItem.textContent=`B={x∈U|x is odd}={${B.join(", ")}}`;
    setList.appendChild(CItem);
    CItem.textContent=`C={x∈U|(x^2)>m}={${C.join(", ")}}`;
    setList.appendChild(DItem);
    DItem.textContent=`D={x∈U|x<m}={${D.join(", ")}}`;
    //Show results
    const rsltPrgf=document.createElement("p");                                     //Paragraph for a explanation text of set operations
    rsltList.appendChild(rsltPrgf);
    rsltPrgf.className="explnt";
    rsltPrgf.textContent=`Let's perform the following operations:`; 
    showRslt.appendChild(rsltList);
    rsltList.appendChild(rslt1);
    rslt1.textContent=`(AUB)∩(CUD)={${optn1.join(", ")}}`;                          //Each operation results
    rsltList.appendChild(rslt2);
    rslt2.textContent=`(A∩B)cU(C∩D)c={${optn2.join(", ")}}`;
    rsltList.appendChild(rslt3);
    rslt3.textContent=`(AcUBcUCc)∩D={${optn3.join(", ")}}`;
    rsltList.appendChild(rslt4);
    rslt4.textContent=`(AUB)-C={${optn4.join(", ")}}`;
    rsltList.appendChild(rslt5);
    rslt5.textContent=`(AUB)∆(CUB)={${optn5.join(", ")}}`;
}

//Default sets
function unvrs(){
    for(i=1;i<=n;i++){                                                              //i is initialized in 1 to exclude the 0 
        U.push(i);
    }
}
function setA(){
    A=U.filter(even=>even%2===0);
}
function setB(){
    B=U.filter(odd=>odd%2!==0);
}
function setC(){
    C=U.filter(exp=>exp**2>m);
}
function setD(){
    D=U.filter(min=>min<m);
} 

//Set operations
function union({setAlpha, setBeta}){
    let setGamma=setAlpha.concat(setBeta.filter(unn=>!setAlpha.includes(unn)));     //Concatenate Alpha to Beta excluding Beta's elements that are already in Alpha 
    setGamma.sort((a,b)=>a-b);                                                      //Sort the elements accordding their numeric value instead of alphanumeric
    return(setGamma);                                                               //Return the resulting array
}
function intersec({setAlpha, setBeta}){ 
    let setGamma=setAlpha.filter(inter=>setBeta.includes(inter));                   //FIlter Alpha's elements that are also Betas's elements
    setGamma.sort((a,b)=>a-b);
    return(setGamma);
}
function compnt({setAlpha}){
    let setGamma=U.filter(cpmt=>!setAlpha.includes(cpmt));                          //Filters elements of the universe that aren't Beta's elements
    setGamma.sort((a,b)=>a-b);
    return(setGamma);
}
    //Compound operations
function dif({setAlpha, setBeta}){                                                  //The set diference is equal to the intersection of one set to the complement of a second one  
    let setBetaCmpt=compnt({setAlpha:setBeta});                                     //Call complement function 
    let setGamma=intersec({setAlpha:setAlpha, setBeta:setBetaCmpt});                //Call intersection function
    setGamma.sort((a,b)=>a-b);
    return(setGamma);
}
function simDif({setAlpha,setBeta}){                                                //The set simetric diference is equal to the union of the diference of a first set minus a second one with the diference of the second minus the first
    let setDelta=dif({setAlpha:setAlpha, setBeta:setBeta});                         //First diference
    let setEpsilon=dif({setAlpha:setBeta, setBeta:setAlpha});                       //Second diference
    let setGamma=union({setAlpha:setDelta, setBeta:setEpsilon});                    //Union of the diferences
    setGamma.sort((a,b)=>a-b);
    return(setGamma);
}   
