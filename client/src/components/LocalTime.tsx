import React, { useState, useEffect } from "react";

function LocalTime() {
  const [time, setTime] = useState(getFormattedTime());
  const [date, setDate] = useState(getFormattedDate());

  function getFormattedTime() {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  function getFormattedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  }

  function getOrdinalSuffix(day: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantDigits = day % 100;
    const ordinalIndex = (relevantDigits - 20) % 10;
    const suffix = suffixes[ordinalIndex] || suffixes[relevantDigits] || suffixes[0];
    return suffix;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
      setDate(getFormattedDate());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className=" text-5xl ">{time}</div>
      <div className="font-extralight text-xl justify">{date}</div>
      </div>

  );
}

export default LocalTime;
