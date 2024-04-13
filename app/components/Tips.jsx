"use client";
import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { NumericFormat } from "react-number-format";

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
                <NumericFormat
                  decimalScale={2}
                  fixedDecimalScale
                  className="ml-1 pl-2 w-[80px]"
                  valueIsNumericString={true}
                  value={cashAmount === 0 ? "" : cashAmount}
                  onChange={(e) => setCashAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="flex">
                <p className="text-[15px] w-[55px]">Online</p>
                {/* Onlineの金額を入力するフィールド */}
                $
                <NumericFormat
                  decimalScale={2}
                  fixedDecimalScale
                  className="ml-1 pl-2 w-[80px]"
                  valueIsNumericString={true}
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
    { name: "OPEN 1", time: "0630", break: 0 },
    { name: "OPEN 2", time: "0630", break: 0 },
    { name: "1 SWING", time: "0530", break: 0 },
    { name: "2 SWING", time: "0600", break: 0 },
    { name: "CLOSE 1", time: "0700", break: 0 },
    { name: "CLOSE 2", time: "0700", break: 0 },
    { name: "KITCHEN", time: "0700", break: 0 },
    { name: "OTHER 1", time: "", break: 0 },
  ];

  // スタッフのデータを管理するState
  const [staffData, setStaffData] = useState(initialStaffData);

  const calculateWorkingHour = (staff) => {
    // 時間と分を分割
    const hours = Math.floor(staff.time / 100); // 先頭の2桁が時間
    const minutes = staff.time % 100; // 末尾の2桁が分

    const BK = staff.break > 0 ? staff.break : 0;
    const totalMinutes = hours * 60 + minutes - BK; // 全時間を分に変換し、休憩時間を引く

    const workingHours = Math.floor(totalMinutes / 60); // 完全な時間
    let remainingMinutes = totalMinutes % 60; // 残りの分

    if (workingHours === 0 && remainingMinutes === 0) {
      return "-";
    } else {
      if (remainingMinutes < 10) {
        remainingMinutes = `0${remainingMinutes}`;
      }
      return `${workingHours}:${remainingMinutes}`; // 時間と分を連結して返す
    }
  };

  const calculateWorkingHour2 = (staff) => {
    const hours = Math.floor(staff.time / 100);
    const minutes = staff.time % 100;
    const workingHour = hours + minutes / 60 - staff.break / 60; // breakを時間に変換して労働時間から引く
    return workingHour.toFixed(2); // 労働時間を小数点第2位まで表示
  };

  // 合計労働時間を計算する関数
  const calculateTotalWorkingHour = () => {
    let totalWorkingHour = 0;
    staffData.forEach((staff) => {
      const timeStr = staff.time.toString().padStart(4, "0"); // 例: '730' -> '0730'
      const hours = parseInt(timeStr.substring(0, 2), 10); // 時間を取得
      const minutes = parseInt(timeStr.substring(2, 4), 10); // 分を取得
      const totalHours = hours + minutes / 60; // 分を時間に変換

      const BK = staff.break > 0 ? staff.break / 60 : 0; // 休憩時間を時間に変換
      totalWorkingHour += totalHours - BK; // 合計労働時間に加算
    });
    return totalWorkingHour.toFixed(1); // 小数点第1位まで表示
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

              <PatternFormat
                className="w-[60px] pl-2"
                format="##:##"
                valueIsNumericString={true}
                value={staff.time.toString()}
                onChange={(e) => {
                  const inputVal = e.target.value;
                  const hours = parseInt(inputVal.substring(0, 2), 10);
                  const minutes = parseInt(inputVal.substring(3), 10);

                  // 時間と分が正しい範囲内であることを確認
                  if (
                    inputVal.substring(3, 5).toString().trim().length === 2 &&
                    !isNaN(hours) &&
                    !isNaN(minutes) &&
                    hours >= 0 &&
                    hours < 24 &&
                    minutes >= 0 &&
                    minutes < 60
                  ) {
                    console.log("hours1:", hours, minutes);
                    const formattedHours = hours.toString().padStart(2, "0");
                    const formattedMinutes = minutes
                      .toString()
                      .padStart(2, "0");

                    console.log("hours2:", formattedHours, formattedMinutes);
                    const newValue = `${formattedHours}${formattedMinutes}`; // HHmm 形式の文字列

                    setStaffData((prevData) => {
                      const newData = [...prevData];
                      newData[index].time = newValue;
                      return newData;
                    });
                  }
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
              <p className="ml-7 pl-2 md:pl-3 w-[80px] border border-black">
                $ {""}
                {(
                  calculateTipsPerHour() * calculateWorkingHour2(staff)
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
