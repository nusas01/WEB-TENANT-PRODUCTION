import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"

export const CountDownRemoveData = ({ expiry, transactionId, remove }) => {
  const dispatch = useDispatch();

  const calculateTimeLeft = () => {
    const now = new Date();
    const expTime = new Date(expiry);
    const diff = expTime - now;

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours} jam ${minutes} menit ${seconds} detik`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      if (time === null) {
        clearInterval(timer);
        dispatch(remove(transactionId));
        setTimeLeft("Waktu habis");
      } else {
        setTimeLeft(time);
      }
    }, 1000);

    return () => clearInterval(timer); // bersihkan interval saat unmount
  }, [expiry, dispatch, transactionId]);

  return <p>{timeLeft}</p>;
};

export const TimeLeft = ({ expiry }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const expTime = new Date(expiry);
    const diff = expTime - now;

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours} jam ${minutes} menit ${seconds} detik`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      if (time === null) {
        clearInterval(timer);
        setTimeLeft("Waktu habis");
      } else {
        setTimeLeft(time);
      }
    }, 1000);

    return () => clearInterval(timer); // bersihkan interval saat unmount
  }, [expiry]);

  return <p>{timeLeft}</p>;
};
