import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { getAllUser } from "services/user";

const UserContainer = () => {
  const [listUser, setListUser] = useState<any[]>([]);
  const getAllUserApi = async (query: any) => {
    const res = await getAllUser(query);
    if (res.status === 200) {
      setListUser(res?.data?.data);
    }
  };

  useEffect(() => {
    getAllUserApi(
      queryString.stringify({
        page: 1,
        items_per_page: 10,
      })
    );
  }, []);

  interface DataType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: ["first_name", "last_name"],
      render: (_, row) => <>{row["last_name"] + " " + row["first_name"]}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={listUser} bordered />
    </div>
  );
};

export default UserContainer;
