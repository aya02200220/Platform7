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
      <div className="border border-black h-[500px] w-full p-3 ">
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
                step="0.10" // 小数点第2位まで入力可能に
                value={onlineAmount === 0 ? "" : onlineAmount} // 入力が0の場合は空文字を表示
                onChange={(e) => setOnlineAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>
          {/* 合計金額を表示 */}
          <div className="flex items-center w-1/2">
            <p className=" ml-5 text-lg">Tip total:</p>
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
  // スタッフ情報の初期値を設定
  const initialStaffData = [
    { name: "Staff 1", time: 6, break: 0 },
    { name: "Staff 2", time: 6, break: 0 },
    { name: "Staff 3", time: 6, break: 0 },
    { name: "Staff 4", time: 6, break: 0 },
    { name: "Staff 5", time: 6, break: 0 },
    { name: "Staff 6", time: 6, break: 0 },
    { name: "Staff 7", time: 6, break: 0 },
    { name: "Staff 8", time: 0, break: 0 },
  ];

  // スタッフのデータを管理するState
  const [staffData, setStaffData] = useState(initialStaffData);

  // 労働時間を計算する関数
  const calculateWorkingHour = (staff) => {
    const workingHour = staff.time - staff.break / 60; // breakを時間に変換して労働時間から引く
    return workingHour.toFixed(2); // 労働時間を小数点第2位まで表示
  };

  // 合計労働時間を計算する関数
  const calculateTotalWorkingHour = () => {
    let totalWorkingHour = 0;
    staffData.forEach((staff) => {
      totalWorkingHour += staff.time - staff.break / 60;
    });
    return totalWorkingHour.toFixed(2); // 合計労働時間を小数点第2位まで表示
  };

  return (
    <>
      <div className="mt-6">
        <div className="flex items-center mb-1">
          <p className=" w-[64px] ml-[70px] text-center border border-black">
            Hour
          </p>
          <p className=" w-[70px] ml-[18px] leading-4 text-center break-words  border border-black">
            Break (mins)
          </p>
          <p className=" w-[70px] ml-[20px] leading-4 text-center break-words border border-black">
            Working Hour
          </p>
          <p className=" w-[70px] ml-[50px] border border-black">Tips</p>
          <p></p>
        </div>
        {staffData.map((staff, index) => (
          <div key={index}>
            <div className="flex items-center mb-2">
              <p className="pr-3 w-[70px]">{staff.name}</p>
              <input
                className="w-[65px] pl-2"
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
                className="w-[65px] pl-3 ml-5"
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
              <p className="pl-8 w-[100px]">{calculateWorkingHour(staff)}</p>
              <p className="pl-3 w-[70px]">Tips:</p>
            </div>
          </div>
        ))}
        <div className="flex items-center h-[40px] pl-14 border border-black">
          <p className="text-[18px]">
            Total Hour:
            <span className="text-lg font-bold pl-4 pr-1 underline">
              {calculateTotalWorkingHour()}
            </span>
          </p>
          <p className="pl-8 text-[18px]">
            Tips:
            <span className="text-lg font-bold pl-4 pr-1 underline">$</span>
          </p>
        </div>
      </div>
    </>
  );
};
