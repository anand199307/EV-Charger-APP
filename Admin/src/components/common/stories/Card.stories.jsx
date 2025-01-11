import React from "react";
import Card from "../Card";
import locationIcon from "../../../assets/Dashboard/Location.svg";
import UserIcon from "../../../assets/Dashboard/3 User.svg";
import HomeIcon from "../../../assets/Dashboard/home.svg";
import GroupIcon from "../../../assets/Dashboard/Group.svg";
import PlugIcon from "../../../assets/Dashboard/plug.svg";
import WalletIcon from "../../../assets/Dashboard/Wallet.svg";
import RecycleBatterIcon from "../../../assets/Dashboard/recycling-battery.svg";
import EmissionIcon from "../../../assets/Dashboard/Emission.svg";

export default {
  title: "Card",
  components: Card,
  tags: ["autodocs"],
  argTypes: {
    pathColor: { control: "text" },
    title: { control: "text" },
    percentageValue :{ control: 'number' },
    icon: { control: '' },
    count: { control: "number" },
  },
};

const Template = (args) => <Card {...args} />;

export const CardProgress = Template.bind({});
CardProgress.args = {
  pathColor: "green",
  title: "rathnesh",
  percentageValue:60,
  icon: GroupIcon,
  count: 3,
};

const CardArg = (args) => <Card {...args} />
export const ProgressBar = CardArg.bind({});
ProgressBar.args = {
  pathColor: "yellow",
  title: "Progress Bar",
  percentageValue:40,
  icon: UserIcon,
  count: 10,
};