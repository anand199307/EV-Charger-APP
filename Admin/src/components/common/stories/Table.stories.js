import { columns, data, datas } from "../../../pages/admin/host/Host";
import Table from "../Table";

export default {
  title: "table",
  component: Table,
  argTypes: {
    data: { control: "object" },
  },
};

const Template = (args) => <Table {...args} />;

export const TableData = Template.bind({});
TableData.args = {
  data: [
    {
      id: 1,
      name: "Sanderling Traders",
      Properties: 2,
      num: "6e9d42dc-1a2f-11ee",
      img: "profile.jpg",
    },
  ],
};
// export const TableData = () => (
//   <Table data={data} columns={columns} datas={datas} />
// );
