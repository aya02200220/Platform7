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
      <div className="pt-6 md:pt-3 w-full max-w-[500px]">
        <div className="border border-black w-full p-3">
          <div className="flex justify-center mt-2 ">
            <div className="w-2/5">
              <div className="flex mb-2">
                <p className="w-[55px]">Cash</p>
                {/* Cashの金額を入力するフィールド */}
                $
                <input
                  className="ml-1 pl-2 w-[80px]"
                  type="number"
                  step="0.01" // 小数点第2位まで入力可能に
                  value={cashAmount === 0 ? "" : cashAmount} // 入力が0の場合は空文字を表示
                  onChange={(e) => setCashAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="flex">
                <p className="text-[15px] w-[55px]">Online</p>
                {/* Onlineの金額を入力するフィールド */}
                $
                <input
                  className="ml-1 pl-2 w-[80px]"
                  type="number"
                  step="0.10" // 小数点第2位まで入力可能に
                  value={onlineAmount === 0 ? "" : onlineAmount} // 入力が0の場合は空文字を表示
                  onChange={(e) => setOnlineAmount(parseFloat(e.target.value))}
                />
              </div>
            </div>
            {/* 合計金額を表示 */}
            <div className="flex items-center w-3/5">
              <p className=" ml-4 text-lg leading-5">Tip total:</p>
              <p className="ml-2 text-2xl border border-b-8 border-b-red-300">
                $ {calculateTotalAmount()}
              </p>
            </div>
          </div>

          <Staff tipTotal={calculateTotalAmount()} />
        </div>
      </div>
    </>
  );
};

export default Tips;

export const Staff = ({ tipTotal }) => {
  // スタッフ情報の初期値を設定
  const initialStaffData = [
    { name: "OPEN 1", time: 5.5, break: 0 },
    { name: "OPEN 2", time: 5.5, break: 0 },
    { name: "1 SWING", time: 6, break: 0 },
    { name: "2 SWING", time: 6, break: 0 },
    { name: "CLOSE 1", time: 7, break: 0 },
    { name: "CLOSE 2", time: 7, break: 0 },
    { name: "KITCHEN", time: 7, break: 0 },
    { name: "OTHER 1", time: 0, break: 0 },
  ];

  // スタッフのデータを管理するState
  const [staffData, setStaffData] = useState(initialStaffData);

  // 労働時間を計算する関数
  // const calculateWorkingHour = (staff) => {
  //   const workingHour = staff.time - staff.break / 60; // breakを時間に変換して労働時間から引く
  //   return workingHour.toFixed(2); // 労働時間を小数点第2位まで表示
  // };

  // 労働時間を計算する関数
  // const calculateWorkingHour = (staff) => {
  //   const BK = staff.break > 0 ? staff.break : 0;

  //   const workingHourAfterBK = staff.time - BK; // breakを時間に変換して労働時間から引く
  //   const workingHours = Math.floor(workingHourAfterBK); // 整数部分（時間）を取得
  //   let minutes = Math.round((workingHourAfterBK - workingHours) * 60); // 小数部分（分）を取得

  //   if (workingHours === 0 && minutes === 0) {
  //     return "-";
  //   } else {
  //     if (minutes < 10) {
  //       minutes = `0${minutes}`;
  //     }
  //     return `${workingHours}:${minutes}`; // 時間と分を連結して返す
  //   }
  // };
  // 労働時間を計算する関数
  const calculateWorkingHour = (staff) => {
    const BK = staff.break > 0 ? staff.break : 0;

    // const workingHourAfterBK = staff.time - staff.break / 60; // breakを時間に変換して労働時間から引く
    const workingHourAfterBK = staff.time - BK / 60; // breakを時間に変換して労働時間から引く
    const workingHours = Math.floor(workingHourAfterBK); // 整数部分（時間）を取得
    let minutes = Math.round((workingHourAfterBK - workingHours) * 60); // 小数部分（分）を取得

    if (workingHours === 0 && minutes === 0) {
      return "-";
    } else {
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${workingHours}:${minutes}`; // 時間と分を連結して返す
    }
  };

  // 労働時間を計算する関数
  const calculateWorkingHour2 = (staff) => {
    const workingHour = staff.time - staff.break / 60; // breakを時間に変換して労働時間から引く
    return workingHour.toFixed(2); // 労働時間を小数点第2位まで表示
  };

  // 合計労働時間を計算する関数
  const calculateTotalWorkingHour = () => {
    let totalWorkingHour = 0;
    staffData.forEach((staff) => {
      const BK = staff.break > 0 ? staff.break : 0;

      totalWorkingHour += staff.time - BK / 60;
    });
    return totalWorkingHour.toFixed(2); // 合計労働時間を小数点第2位まで表示
  };

  // 合計チップを合計労働時間で割って１時間あたりのチップを計算する関数
  const calculateTipsPerHour = () => {
    const tipTotalNumeric = parseFloat(tipTotal);
    const totalWorkingHourNumeric = parseFloat(calculateTotalWorkingHour());

    if (totalWorkingHourNumeric === 0) {
      return 0;
    }

    return (tipTotalNumeric / totalWorkingHourNumeric).toFixed(3);
  };

  // 小数点第2位を5区切りで丸める関数
  const roundToNearest5Cents = (value) => {
    return Math.ceil(value * 20) / 20;
  };

  return (
    <>
      <div className="mt-6">
        <div className="flex items-center mb-1">
          <p className="text-[15px] md:text-[16px] w-[80px] ml-[55px] md:ml-[60px] leading-3 text-center break-words">
            Hour{" "}
            <span className="text-[11px] leading-[5px]">
              <br />
              (30min →0.5)
            </span>
          </p>
          <p className="text-[15px] md:text-[16px] w-[45px] ml-[4px] md:ml-[20px] leading-3 break-words flex flex-col items-center">
            Break
            <span className="text-[11px] leading-[5px]">
              <br />
              (mins)
            </span>
          </p>
          <p className="text-[14px] md:text-[16px] w-[70px] ml-[6px] md:ml-[37px] leading-3 text-center break-words ">
            Working Hour
          </p>
          <p className="text-[15px] md:text-[16px] w-[50px] ml-[20px] md:ml-[50px] ">
            Tips
          </p>
        </div>
        {staffData.map((staff, index) => (
          <div key={index}>
            <div className="flex items-center mb-2 ">
              <p className="pr-1 md:pr-3 w-[70px] text-[12px]">{staff.name}</p>
              <input
                className="w-[60px] pl-2"
                type="number"
                step="0.25"
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
              <input
                className="w-[50px] pl-3 ml-2 md:ml-7"
                type="number"
                step="10"
                value={staff.break}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  setStaffData((prevData) => {
                    const newData = [...prevData];
                    newData[index].break = newValue;
                    return newData;
                  });
                }}
              />
              <div className="text-[14px] md:text-[16px] pl-5 md:pl-8 w-[50px] md:w-[110px] leading-[16px] flex flex-col md:flex-row justify-center items-center">
                <p>{calculateWorkingHour(staff)}</p>
                <p className="md:ml-2">({calculateWorkingHour2(staff)})</p>
              </div>

              {/* <p className="pl-3 w-[70px]">Tips: </p> */}
              {/* ////////////////////////////////////////////// */}
              <p className="ml-7 pl-2 md:pl-3 w-[80px] border border-black">
                $ {""}
                {/* {(
                  calculateTipsPerHour() *
                  (staff.time - staff.break / 60)
                ).toFixed(2)} */}
                {(
                  calculateTipsPerHour() *
                  (staff.time - (staff.break > 0 ? staff.break : 0) / 60)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        <div className="flex items-center mt-5 md:mt-8 h-[60px] md:h-[40px] pl-2 md:pl-14 border border-black">
          <p className="text-[16px] leading-3">
            Total Hour:
            <span className="text-lg font-bold pl-4 pr-1 underline">
              {calculateTotalWorkingHour()} h
            </span>
          </p>
          <p className="pl-4 text-[16px] leading-3">
            Tips/h:
            <span className="text-lg font-bold pl-4 pr-1 underline">
              $ {calculateTipsPerHour()}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
