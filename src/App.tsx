// import { useState } from 'react'
import { useState } from 'react';
import './App.css'
import Layout from './components/Layout'
const baseClasses =
  "h-16 w-full flex items-center justify-center text-xl font-semibold rounded-lg cursor-pointer transition duration-150 ease-in-out";

// const equalsClasses = 
//             "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800";

// const defaultClasses = 
//             "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 active:bg-gray-100";            




function App() {
  const [input1, setInput1] = useState("");
  const [op, setOp] = useState("");
  const [eq, setEq] = useState(false);
  const [input2, setInput2] = useState("");
  const [ans, setAns] = useState(0);
  
const calculate = () => {
  const n1 = parseFloat(input1);
  const n2 = parseFloat(input2);
  let result = n1;

  if (op === "+") result = n1 + n2;
  else if (op === "−") result = n1 - n2;
  else if (op === "×") result = n1 * n2;
  else if (op === "÷") result = n1 / n2;

  return result;
};

  const signList = [
    '%', 'CE', 'C', '⌫', // ⌫ 代表退格/刪除鍵 (Backspace)
    '1/x', 'x²', '²√x', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '−', // 這裡使用數學上的減號 U+2212 '−'
    '1', '2', '3', '+',
    '±', '0', '.', '=',
  ];

  const isNum = (sign: string) => {
    return !isNaN(parseFloat(sign))
  };

  const handleCalc = (sign: string)=> {
    
    if (sign === "%") {
      if (op && input1 && input2) {
        const n1 = parseFloat(input1);
        const n2 = parseFloat(input2);
        const percentValue = (n1 * n2) / 100; 
        setInput2(percentValue.toString());
      } else if (!op && input1) {
        const n1 = parseFloat(input1) / 100;
        setInput1(n1.toString());
      }
      return;
    }

    if (sign === "C") {
      setInput1("");
      setInput2("");
      setOp("");
      setAns(0);
      setEq(false);
      return;
    }

    if (sign === "CE") {
      if (op) {
        setInput2("");
      } else {
        setInput1("");
      }
      return;
    }

    if (sign === "⌫") {
      if (op) {
        setInput2(input2.slice(0, -1));
      } else {
        setInput1(input1.slice(0, -1));
      }
      return;
    }

    if (sign === "1/x" || sign === "x²" || sign === "²√x") {
      const currentStr = op ? input2 : input1;
      const num = parseFloat(currentStr || "0");
      let result = 0;

      if (sign === "1/x") result = num !== 0 ? 1 / num : 0;
      else if (sign === "x²") result = num * num;
      else if (sign === "²√x") result = Math.sqrt(num);

      if (op) setInput2(result.toString());
      else setInput1(result.toString());
      return;
    }

    if (isNum(sign)) {
      if (eq) {
        setInput1(sign);
        setEq(false);
      }else if(op) {
        setInput2(input2 + sign);
      } else {
        setInput1(input1 + sign);
      }
      return;
    }

    if("+" === sign || "−" === sign || sign === "×" || sign === "÷"){
      
      if (input1 && op && input2) {
        const result = calculate();
        setInput1(result.toString());
        setInput2("");
      }
      setOp(sign);
      setEq(false);
      return;
    }

    if (sign === ".") {
      const get = op ? input2 : input1;
      if (get.includes(".")) return;

      const val = get || "0";
      op ? setInput2(val + ".") : setInput1(val + ".");
      return;
    }

    if (sign === "±") {
      const setInput = op ? setInput2 : setInput1;
      const current = op ? input2 : input1;
      if (current && current !== "0") {
        setInput((parseFloat(current) * -1).toString());
      }
      return;
    }

    if("=" === sign){
      if("+" === op){
        setAns(parseFloat(input1) + parseFloat(input2) );
        setEq(true);
      }else if ("−" === op) {
        setAns(parseFloat(input1) - parseFloat(input2));
        setEq(true);  
      }else if ("×" === op) {
        setAns(parseFloat(input1) * parseFloat(input2));
        setEq(true); 
      }else if ("÷" === op) {
        setAns(parseFloat(input1) / parseFloat(input2));
        setEq(true); 
     }
    }
  };

  const getDisplayText = () => {
    if(eq){
      return ans + "";
    }
    if(op){
      return input2;
    }
    return input1;
  };

  return (
    <Layout>
      <input type='text' value={getDisplayText()} className="bg-green-100 p-4 mb-4 rounded-lg shadow-inner" />
      <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-xl shadow-2xl max-w-sm mx-auto">
        {
          signList.map(
            (sign, index) => {

              return (
                <div key={index} className={baseClasses} onClick={()=>{  handleCalc(sign); }} >
                  {sign}
                </div>
              )
            }
          )
        }

      </div>
    </Layout>
  )
}

export default App
