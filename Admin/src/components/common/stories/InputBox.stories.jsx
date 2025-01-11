import InputBox from "../InputBox"
import React from 'react';
import { storiesOf } from '@storybook/react';


export default {
  title: "InputBox",
  components: InputBox,
  tags: ["autodocs"],

  argTypes: {
    width: { control: 'text' },
    height: {control: 'text'}    
  },

};



const Template = (args) => <InputBox {...args} />;

export const InputType = Template.bind({});
InputType.args = {
  type: "email",
  login: true,
  searches: true,
};

// export const SearchInput = Template.bind({});
// SearchInput.args = {
//   type: "text",
//   placeholder: "Search",
//   search: true,

// };
