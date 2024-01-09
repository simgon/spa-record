import React, { useState, useEffect, useRef, createContext } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 } from "uuid";
import SpaList from "../components/SpaList/SpaList";

export const RecordContext = createContext();

export default function SpaListPage() {
  const [records, setRecords] = useState([]);

  // 初期表示時
  useEffect(() => {
    // レコード情報を読込
    setRecords(readRecords() ?? []);
  }, []);

  // レコード情報を読込
  const readRecords = () => {
    const data = localStorage.getItem("records");
    if (data) {
      return JSON.parse(data);
    }
  };

  // レコード情報を保存
  const writeRecords = (records) => {
    localStorage.setItem("records", JSON.stringify(records));
  };

  // レコード情報を作成
  const createRecord = (title, content) => {
    const newRecords = [
      ...records,
      {
        id: v4(),
        title,
        content,
        rating: {
          spa: 0,
          bath: 0,
          sauna: 0,
          coldPlunge: 0,
          freshAir: 0,
        },
        img: "",
        canvas: [],
      },
    ];
    setRecords(newRecords);
    writeRecords(newRecords);
  };

  // レコード情報を更新
  const updateRecord = (updatedData) => {
    const newRecords = records.map((record) =>
      record.id === updatedData.id
        ? {
            ...record,
            title: updatedData.title,
            img: updatedData.img,
            content: updatedData.content,
            canvas: updatedData.canvas,
          }
        : record
    );
    setRecords(newRecords);
    writeRecords(newRecords);
  };

  // レコード情報を更新（評価）
  const updateRateRecord = (id, ratings) => {
    const newRecords = records.map((record) =>
      record.id === id ? { ...record, rating: { ...record.rating, ...ratings } } : record
    );
    setRecords(newRecords);
    writeRecords(newRecords);
  };

  // レコード情報を削除
  const deleteRecord = (id) => {
    const newRecords = records.filter((record, i) => record.id !== id);
    setRecords(newRecords);
    writeRecords(newRecords);
  };

  // 並び替え処理
  const sortRecord = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = records.findIndex((v) => v.id === active.id);
      const newIndex = records.findIndex((v) => v.id === over.id);
      const newRecords = arrayMove(records, oldIndex, newIndex);
      setRecords(newRecords);
      writeRecords(newRecords);
    }
  };

  return (
    <RecordContext.Provider
      value={{
        records,
        setRecords,
        updateRecord,
        deleteRecord,
        updateRateRecord,
        createRecord,
        sortRecord,
      }}
    >
      <SpaList />
    </RecordContext.Provider>
  );
}
