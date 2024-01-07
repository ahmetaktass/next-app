"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { decrement, increment } from "../lib/features/counterSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter);
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="h-[90vh]">
      <p>Counter: {counter}</p>
      <button onClick={handleIncrement}>Arttır</button>
      <button onClick={handleDecrement}>Azalt</button>
    </div>
  );
}
