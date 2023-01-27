import { Table } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "consumer_id",
    key: "consumer",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "MeterID",
    dataIndex: "meter_code",
    key: "meter_code",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
interface DataTableProp {
  dataSource: any;
}
const AntDTable = ({ dataSource }: DataTableProp) => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default AntDTable;
