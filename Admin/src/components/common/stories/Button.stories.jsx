import React from "react";
import Button from "../Button"


export default {
  title: "Button",
  components: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "text" },
    content: { control: "text" },
    width: {control: ''},
  },
};
const Template = (args) => <Button {...args} />;

export const Buttons = Template.bind({});
Buttons.args = {
  backgroundColor: "#8CC63F",
  content: "Add me",
  width: "10%",
};

export const ButtonClick = Template.bind({});

ButtonClick.args = {
  backgroundColor: "#8CC63F",
  content: "Sign Up",
  width: "188px"
};

