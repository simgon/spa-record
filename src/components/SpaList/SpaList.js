import React, { useContext } from "react";
import { RecordContext } from "../../pages/SpaListPage";
import SortableRecords from "./SortableRecords";
import Record from "./Record";

export default function SpaList() {
  const {
    records,
    setRecords,
    updateRecord,
    deleteRecord,
    updateRateRecord,
    createRecord,
    sortRecord,
  } = useContext(RecordContext);

  // 新規作成
  const newRecord = (e) => {
    e.preventDefault();
    createRecord();
  };

  // 新規作成ボタン
  const NewRecordButton = () => {
    return (
      <button
        className="card align-items-center justify-content-center m-2 new-record-button bg-hover"
        onClick={newRecord}
      >
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="card-text">+ 新規</div>
        </div>
      </button>
    );
  };

  return (
    <SortableRecords records={records} handleDragEnd={sortRecord}>
      <div className="d-flex flex-wrap justify-content-evenly m-4 mx-md-5">
        {/* レコード一覧 */}
        {records.map((record, i) => (
          <Record
            key={record.id}
            record={record}
            onUpdateRecord={updateRecord}
            onDeleteRecord={deleteRecord}
            onRate={updateRateRecord}
          />
        ))}
        {/* 新規作成ボタン */}
        <NewRecordButton />
      </div>
    </SortableRecords>
  );
}
