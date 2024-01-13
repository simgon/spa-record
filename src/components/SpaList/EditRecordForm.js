import React from "react";
import SpaRating from "./SpaRating";
import GoogleMap from "./GoogleMap";
import SpaCanvas from "../SpaCanvas/SpaCanvas";

// 子コンポーネント（Title）を親コンポーネント（EditRecordForm）内で定義していると、
// 親コンポーネントが再描画される度にinputのフォーカスが外れてしまうので、外で定義する（または別ファイルで定義する）
// タイトル
const Title = ({ record, onUpdateRecord = (f) => f }) => {
  return (
    <input
      value={record.title ?? ""}
      onChange={(e) => onUpdateRecord({ ...record, title: e.target.value })}
      type="text"
      placeholder="タイトル..."
      className="form-control"
    />
  );
};

// 内容
const Content = ({ record, onUpdateRecord = (f) => f }) => {
  return (
    <textarea
      value={record.content}
      onChange={(e) => onUpdateRecord({ ...record, content: e.target.value })}
      placeholder="内容..."
      className="form-control"
      rows={10}
      cols={50}
    />
  );
};

// レコード編集フォーム
export default function EditRecordForm({ record, onUpdateRecord = (f) => f, onRate = (f) => f }) {
  // 画像
  const SpaImage = () => {
    return (
      <>
        <input
          value={record.img ?? ""}
          onChange={(e) => onUpdateRecord({ ...record, img: e.target.value })}
          type="text"
          placeholder="画像URL..."
          className="form-control"
        />
        <div
          className="w-100 d-flex justify-content-center align-items-center border rounded"
          style={{ height: 300 }}
        >
          {record.img ? (
            <img
              src={record.img}
              alt={record.title}
              className="w-100 h-100 object-fit-cover rounded"
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="d-flex flex-column gap-2">
      {/* タイトル */}
      <Title record={record} onUpdateRecord={onUpdateRecord} />

      {/* 評価 */}
      <SpaRating record={record} onRate={onRate} edit={true} />

      {/* 画像 */}
      <SpaImage />

      {/* 内容 */}
      <Content record={record} onUpdateRecord={onUpdateRecord} />

      {/* 地図 */}
      <GoogleMap spaName={record.title} />

      {/* 浴室内図 */}
      <SpaCanvas record={record} onUpdateRecord={onUpdateRecord} />
    </div>
  );
}
