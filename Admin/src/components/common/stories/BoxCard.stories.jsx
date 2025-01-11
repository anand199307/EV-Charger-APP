import React from "react";
import BoxCard from "../BoxCard";

export default {
  title: "BoxCard",
  components: BoxCard,
  tags: ["autodocs"],
  argTypes: {
    boxClassnName: { control: 'text' },
    style: { 
      width:{control:'text'}
    }
  },
};

const CusomerCard = (args) => <BoxCard {...args} />;

export const customerBox = CusomerCard.bind({});

customerBox.args = {
  boxClassnName: "w-[719px] h-[262px] rounded-[44px] bg-[#3A57E8]",
};

export const cardCustomer = CusomerCard.bind({});

cardCustomer.args = {
  boxClassnName:
    "h-[208px] w-[450px] rounded-[32px]  border border-gray-500",
  // style: {
  //   width:'100px'
  // }
};