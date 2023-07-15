// Choose your own adventure made by Davis

//Changing vars go here
let Dbg = false;
let pageNum ;
let pageName = "";

//Const vars go here
const imgcontainer = document.getElementById("image-container");
const img = document.getElementById("img");
const nextBtn = document.getElementById("next-btn");
const btnField = document.getElementById("button-container");
const btnPage = document.getElementById("pagebtns");
const pagebtns = document.getElementById("pagebtns");
const endText = document.getElementById("end-text");

function SetUp(pageNumHold){
//Debug

pageNum = pageNumHold;

if(Dbg){
    console.log(`-----At SetUp()-----` + '\n' + `pageNum = ${pageNum}`);
}
//End Debug

//Going to page 1
if (pageNum == 118){
    img.src = "none"
    img.style.visibility = "hidden"
    imgcontainer.style.visibility="hidden";
    
    EndGame()
}
else{
    img.src = getPageNum(pageNum);
    findThatPage(pageNum);
}

}

function nextPage(){
    //Debug
if(Dbg){
    console.log(`-----At nextPage()-----` + '\n' + `pageNum = ${pageNum}`);
}
//End Debug

//going to next page
    pageNum = pageNum+1;
    img.src = getPageNum(pageNum)
    findThatPage(pageNum);
}

//Getting the image name
function getPageNum(pageNumHold){

    pageNum = pageNumHold;

    //Debug
if(Dbg){
    console.log(`-----At getPageNum()-----` + '\n' + `pageNum = ${pageNum}` + '\n' + `pageNumHold = ${pageNumHold}`);
}
//End Debug

if(pageNum <=9){
    pageName = `./Book/Journey_Under_The_Sea_Images/Journey Under The Sea-00${pageNum}.jpg`;
    return pageName;
}
else if (pageNum >= 10 && pageNum <= 99){
    pageName = `./Book/Journey_Under_The_Sea_Images/Journey Under The Sea-0${pageNum}.jpg`;
    return pageName;
}
else if (pageNum >= 100 && pageNum != 118){
    pageName = `./Book/Journey_Under_The_Sea_Images/Journey Under The Sea-${pageNum}.jpg`
    return pageName;
}
else {
    alert(`Somthing has goe wrong`);
}

}

function findThatPage (pageNumHold){
    //Debug
    if(Dbg){
        console.log(`-----At findThatPage()-----` + '\n' + `pageNum = ${pageNum}`);
    }
    //End Debug

    pageNum = pageNumHold;

    switch(pageNum){
        case 3:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(6)">Go to 6</button>  <button class="btn" onclick="SetUp(5)">Go to 5</button>`
        break;

        case 5:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(8)">Go to 8</button>  <button class="btn" onclick="SetUp(9)">Go to 9</button>`           
        break;

        case 6:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(10)">Go to 10</button>  <button class="btn" onclick="SetUp(12)">Go to 12</button>`  
        break;

        case 8:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(11)">Go to 11</button>  <button class="btn" onclick="SetUp(15)">Go to 15</button>`  
        break;

        case 9:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(16)">Go to 16</button>  <button class="btn" onclick="SetUp(14)">Go to 14</button>`  
        break;

        case 10:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(17)">Go to 17</button>  <button class="btn" onclick="SetUp(18)">Go to 18</button>`  
        break;

        case 11:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(24)">Go to 24</button>  <button class="btn" onclick="SetUp(22)">Go to 22</button>`  
        break;

        case 12:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(21)">Go to 21</button>  <button class="btn" onclick="SetUp(19)">Go to 19</button>`  
        break;

        case 14:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(26)">Go to 26</button>  <button class="btn" onclick="SetUp(28)">Go to 28</button>`  
        break;

        case 15:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(23)">Go to 23</button>  <button class="btn" onclick="SetUp(27)">Go to 27</button>`  
        break;

        case 16:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(29)">Go to 29</button>  <button class="btn" onclick="SetUp(31)">Go to 31</button>`  
        break;

        case 17:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(32)">Go to 32</button>  <button class="btn" onclick="SetUp(33)">Go to 33</button>`  
        break;    
        
        case 18:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(34)">Go to 34</button>  <button class="btn" onclick="SetUp(37)">Go to 37</button>`  
        break;

        case 19:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`  
        break;

        case 21:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`  
        break;

        case 22:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(38)">Go to 38</button>  <button class="btn" onclick="SetUp(35)">Go to 35</button>` 
        break;

        case 23:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>` 
        break;

        case 24:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(6)">Go to 6</button>`  
        break;

        case 26:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 27:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(39)">Go to 39</button>  <button class="btn" onclick="SetUp(40)">Go to 40</button>`
        break;

        case 28:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(41)">Go to 41</button>  <button class="btn" onclick="SetUp(42)">Go to 42</button>`
        break;

        case 29:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(43)">Go to 43</button>  <button class="btn" onclick="SetUp(44)">Go to 44</button>`
        break;

        case 31:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 32:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>` 
        break;

        case 33:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(45)">Go to 45</button>  <button class="btn" onclick="SetUp(46)">Go to 46</button>`
        break;

        case 34:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(48)">Go to 48</button>  <button class="btn" onclick="SetUp(47)">Go to 47</button>`
        break;

        case 35:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(50)">Go to 50</button>  <button class="btn" onclick="SetUp(53)">Go to 53</button>`
        break;

        case 37:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 38:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(55)">Go to 55</button>  <button class="btn" onclick="SetUp(51)">Go to 51</button>`
        break;

        case 39:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(56)">Go to 56</button>  <button class="btn" onclick="SetUp(57)">Go to 57</button>`
        break;

        case 40:
           nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`  
        break;

        case 41:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(58)">Go to 58</button>  <button class="btn" onclick="SetUp(59)">Go to 59</button>`
        break;

        case 42:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(6)">Go to 6</button>`
        break;

        case 43:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(60)">Go to 60</button>  <button class="btn" onclick="SetUp(61)">Go to 61</button>`
        break;

        case 44:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(64)">Go to 64</button>  <button class="btn" onclick="SetUp(63)">Go to 63</button>`
        break;

        case 45:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(65)">Go to 65</button>  <button class="btn" onclick="SetUp(66)">Go to 66</button>`
        break;

        case 46:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(48)">Go to 48</button>`
        break;

        case 47:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>` 
        break;

        case 48:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(9)">Go to 9</button>`
        break;

        case 50:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(67)">Go to 67</button>  <button class="btn" onclick="SetUp(68)">Go to 68</button>`
        break;

        case 51:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(72)">Go to 72</button>  <button class="btn" onclick="SetUp(74)">Go to 74</button>`
        break;

        case 53:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(69)">Go to 69</button>  <button class="btn" onclick="SetUp(70)">Go to 70</button>`
        break;

        case 55:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(71)">Go to 71</button>  <button class="btn" onclick="SetUp(73)">Go to 73</button>`
        break;

        case 56:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(75)">Go to 75</button>  <button class="btn" onclick="SetUp(76)">Go to 76</button>`
        break;

        case 57:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(77)">Go to 77</button>  <button class="btn" onclick="SetUp(79)">Go to 79</button>`
        break;

        case 58:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 59:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 60:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(80)">Go to 80</button>  <button class="btn" onclick="SetUp(82)">Go to 82</button>`
        break;

        case 61:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(81)">Go to 81</button>  <button class="btn" onclick="SetUp(86)">Go to 86</button>`
        break;

        case 63:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 64:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(63)">Go to 63</button>  <button class="btn" onclick="SetUp(85)">Go to 85</button>  <button class="btn" onclick="SetUp(87)">Go to 87</button>`
        break;

        case 65:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(88)">Go to 88</button>  <button class="btn" onclick="SetUp(89)">Go to 89</button>`
        break;

        case 66:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(32)">Go to 32</button>`
        break;

        case 67:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(6)">Go to 6</button>`
        break;

        case 68:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 69:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(97)">Go to 97</button>  <button class="btn" onclick="SetUp(98)">Go to 98</button>`
        break;

        case 70:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(99)">Go to 99</button>  <button class="btn" onclick="SetUp(100)">Go to 100</button>`
        break;

        case 71:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(90)">Go to 90</button>  <button class="btn" onclick="SetUp(91)">Go to 91</button>`
        break;

        case 72:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(93)">Go to 93</button>  <button class="btn" onclick="SetUp(94)">Go to 94</button>`
        break;

        case 73:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 74:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button> <button class="btn" onclick="SetUp(107)">If you don't like this ending try this!</button>`
        break;

        case 75:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 76:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button> <button class="btn" onclick="SetUp(108)">If you don't like this ending try this!</button>`
        break;

        case 77:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 79:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(50)">Go to 50</button>`
        break;

        case 80:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 81:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(116)">Go to 116</button>  <button class="btn" onclick="SetUp(117)">Go to 117</button>`
        break;

        case 82:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(112)">Go to 112</button>  <button class="btn" onclick="SetUp(114)">Go to 114</button>`
        break;

        case 85:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 86:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>` 
        break;

        case 87:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>` 
        break;

        case 88:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(95)">Go to 95</button>  <button class="btn" onclick="SetUp(96)">Go to 96</button>`
        break;

        case 89:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 90:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(101)">Go to 101</button>  <button class="btn" onclick="SetUp(102)">Go to 102</button>`
        break;

        case 91:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(103)">Go to 103</button>  <button class="btn" onclick="SetUp(104)">Go to 104</button>`
        break;

        case 93:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 94:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(105)">Go to 105</button>  <button class="btn" onclick="SetUp(106)">Go to 106</button>`
        break;

        case 95:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 96:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(110)">Return to Earth life</button> <button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 97:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 98:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 99:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 100:
            nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(55)">Go to 55</button>`
        break;

        case 101:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 102:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 103:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 104:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 105:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 106:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 107:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 109:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 110:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 111:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 112:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 114:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 116:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        case 117:
             nextBtn.style.visibility = "hidden";
            pagebtns.innerHTML = `<button class="btn" onclick="SetUp(118)">END</button>`
        break;

        default:
            pagebtns.innerHTML="";
            nextBtn.visibility = "visible";
        break;
    }

}

function EndGame(){
    //Debug
    if(Dbg){
        console.log(`-----At EndGame()-----` + '\n' + `pageNum = ${pageNum}`);
    }
    //End Debug

    endText.style.visibility = "visible";
    endText.innerHTML = `Thank You for Reading  <br> <h1><u>Journey Under The Sea</u></h1>  <br> by <i>R.A. Montgomery</i>  <br> Choose your own Adventure * 2  <br> <a target="_blank" rel="noopener" href="https://i.4pcdn.org/tg/1424470534689.pdf">Get PDF Link Here</a> <br>  <br> Program Created by  <br> <i>Charles D Whitley JR</i>`
    pagebtns.innerHTML = `<button class="btn" onclick="resetAll()">Start Over</button>`  
}

function resetAll(){
        //Debug
        if(Dbg){
            console.log(`-----At resetAll()-----`);
        }
        //End Debug

    location.reload();
}

function Dbug (){
    if(Dbg){
        console.log(`*****Debug Is ON*****`);
    }
    else{
        console.log(`*****Debug Is OFF*****`);
    }
}

    //Hitting ALT on keyboard
    document.addEventListener('keypress', (event) =>{
        let keyCode = event.key;
      
        if(keyCode == "/"){
          if(Dbg){
            Dbg = false
            console.log(`Dbg is now ${Dbg}`);
          }
          else {
            Dbg = true;
            console.log(`Dbg is now ${Dbg}`);
          }
        }
      });

console.log(`!!!Dbg = ${Dbg} by default.!!!`+ '\n' + `If you wish to change it plase hit "/" on keyboard.`)
endText.style.visibility = "hidden";
SetUp(1);