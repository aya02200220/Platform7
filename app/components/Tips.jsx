"use client";
import React, { useState } from "react";

const Tips = () => {
  // Stateを設定してCashとOnlineの金額を管理する
  const [cashAmount, setCashAmount] = useState(0);
  const [onlineAmount, setOnlineAmount] = useState(0);

  // 合計金額を計算する関数
  const calculateTotalAmount = () => {
    return (cashAmount + onlineAmount).toFixed(2); // 小数点第2位まで取得
  };

  return (
    <>
      <div className="text-xl">tips</div>
      <div className="border border-black h-[200px] w-full p-3 ">
        <div className="flex justify-center mt-2 ">
          <div className="w-1/2">
            <div className="flex mb-2">
              <p className="w-[55px]">Cash</p>
              {/* Cashの金額を入力するフィールド */}
              <input
                type="number"
                step="0.01" // 小数点第2位まで入力可能に
                value={cashAmount === 0 ? "" : cashAmount} // 入力が0の場合は空文字を表示
                onChange={(e) => setCashAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex">
              <p className="w-[55px]">Online</p>
              {/* Onlineの金額を入力するフィールド */}
              <input
                type="number"
                step="0.01" // 小数点第2位まで入力可能に
                value={onlineAmount === 0 ? "" : onlineAmount} // 入力が0の場合は空文字を表示
                onChange={(e) => setOnlineAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>
          {/* 合計金額を表示 */}
          <div className="flex items-center w-1/2">
            <p className=" ml-5 text-lg">Total Amount:</p>
            <p className="ml-3 text-2xl">{calculateTotalAmount()}</p>
          </div>
        </div>

        <Staff />
      </div>
    </>
  );
};

export default Tips;

export const Staff = () => {
  const [increment, setIncrement] = useState(0.25); // 増減する時間数

  // スタッフ情報の初期値を設定
  const initialStaffData = [
    { name: "Staff 1", time: 6 },
    { name: "Staff 2", time: 6 },
    { name: "Staff 3", time: 6 },
    { name: "Staff 4", time: 6 },
    { name: "Staff 5", time: 6 },
    { name: "Staff 6", time: 6 },
    { name: "Staff 7", time: 6 },
    { name: "Staff 8", time: 0 },
  ];

  // スタッフの時間を増やす関数
  const increaseTime = (index) => {
    setStaffData((prevData) => {
      const newData = [...prevData];
      newData[index].time += increment;
      return newData;
    });
  };

  // スタッフの時間を減らす関数
  const decreaseTime = (index) => {
    setStaffData((prevData) => {
      const newData = [...prevData];
      if (newData[index].time - increment >= 0) {
        newData[index].time -= increment;
      }
      return newData;
    });
  };

  // スタッフのデータを管理するState
  const [staffData, setStaffData] = useState(initialStaffData);

  return (
    <>
      <div className="mt-6">
        {staffData.map((staff, index) => (
          <div key={index}>
            <div className="flex items-center">
              <p className="pr-3 w-[70px] mb-2">{staff.name}</p>
              <input
                className="w-[70px]"
                type="number"
                step="0.01"
                value={staff.time}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  setStaffData((prevData) => {
                    const newData = [...prevData];
                    newData[index].time = newValue;
                    return newData;
                  });
                }}
              />
              <div className="ml-3 flex gap-4">
                {/* 時間数を増減させるボタン */}

                <button onClick={() => increaseTime(index, 0.5)}>+0.5</button>
                <button onClick={() => decreaseTime(index, 0.5)}>-0.5</button>
                <button onClick={() => increaseTime(index, 0.25)}>+0.25</button>
                <button onClick={() => decreaseTime(index, 0.25)}>-0.25</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// export const Staff = () => {
//   const [staff1, setStaff1] = useState(6);
//   const [staff2, setStaff2] = useState(0);
//   const [staff3, setStaff3] = useState(0);
//   const [staff4, setStaff4] = useState(0);
//   const [staff5, setStaff5] = useState(0);
//   const [staff6, setStaff6] = useState(0);
//   const [staff7, setStaff7] = useState(0);
//   const [staff8, setStaff8] = useState(0);

//   const [increment, setIncrement] = useState(0.25); // 増減する時間数

//   // 働いた時間数を増やす関数
//   const increaseTime = () => {
//     setStaff1((prevTime) => prevTime + increment);
//   };

//   // 働いた時間数を減らす関数
//   const decreaseTime = () => {
//     if (staff1 - increment >= 0) {
//       setStaff1((prevTime) => prevTime - increment);
//     }
//   };
//   return (
//     <>
//       <div className="mt-6">
//         <div>
//           <div className="flex">
//             <p className="pr-3">Staff 1</p>
//             <input
//               className="w-[70px]"
//               type="number"
//               step="0.01" // 小数点第2位まで入力可能に
//               value={staff1 === 0 ? "" : staff1} // 入力が0の場合は空文字を表示
//               onChange={(e) => setStaff1(parseFloat(e.target.value))}
//             />
//             <div className="ml-3">
//               {/* 時間数を増減させるボタン */}

//               <button onClick={() => setStaff1((prevTime) => prevTime + 0.5)}>
//                 +0.5
//               </button>
//               <button onClick={() => setStaff1((prevTime) => prevTime - 0.5)}>
//                 -0.5
//               </button>
//               <button onClick={() => setStaff1((prevTime) => prevTime + 0.25)}>
//                 +0.25
//               </button>
//               <button onClick={() => setStaff1((prevTime) => prevTime - 0.25)}>
//                 -0.25
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
