import React, { useState, useContext, useEffect } from "react";
import { FaRegTrashAlt, FaGripLines } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SpaRating from "./SpaRating";
import CustomModal from "../common/CustomModal";
import EditRecordForm from "./EditRecordForm";

export default function Record({
  record,
  onUpdateRecord = (f) => f,
  onDeleteRecord = (f) => f,
  onRate = (f) => f,
}) {
  // モーダル処理
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  // 並び替え処理
  const {
    isDragging,
    // 並び替えのつまみ部分に設定するプロパティ
    setActivatorNodeRef,
    attributes,
    listeners,
    // DOM全体に対して設定するプロパティ
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: record.id });

  // 並び替えハンドル
  const SortHandle = () => {
    return (
      <div
        ref={setActivatorNodeRef}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        {...attributes}
        {...listeners}
      >
        <FaGripLines />
      </div>
    );
  };

  // 画像
  const SpaImage = () => {
    return (
      <div
        onClick={modalShow}
        className="w-100 d-flex justify-content-center align-items-center border-bottom border-top border-solid border-color-gray-300 bg-hover"
        style={{ height: 250 }}
      >
        {record.img ? (
          <img
            src={record.img}
            alt={record.title}
            className="w-100 object-fit-cover"
            style={{ height: 250 }}
          />
        ) : (
          <span style={{ fontSize: 35 }}>+</span>
        )}
      </div>
    );
  };

  // タイトル
  const SpaTitle = () => {
    return (
      <div className="d-flex align-items-center border-top border-top-1 border-solid border-color-gray-300 py-1 bg-hover">
        {/* タイトル名 */}
        <div onClick={modalShow} style={{ flex: "1 1 0", fontWeight: "bold", overflow: "hidden" }}>
          {record.title ? record.title : "無名"}
        </div>
        {/* 削除ボタン */}
        <button
          onClick={() => onDeleteRecord(record.id)}
          style={{
            display: "flex",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}>
      <div className="border rounded m-2 bg-white" style={{ width: 300, cursor: "default" }}>
        {/* 並び替えハンドル */}
        <SortHandle />

        {/* 画像 */}
        <SpaImage />

        {/* 評価 */}
        <SpaRating record={record} onRate={onRate} />

        {/* タイトル */}
        <SpaTitle />

        {/* 編集モーダル */}
        <CustomModal show={show} onModalClose={modalClose} onModalShow={modalShow}>
          <EditRecordForm record={record} onUpdateRecord={onUpdateRecord} onRate={onRate} />
        </CustomModal>
      </div>
    </div>
  );
}
