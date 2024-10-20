import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// Meta: コンポーネントに関する情報を定義
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "success", "error", "warning", "info", "default"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
};

export default meta;

// StoryObjを使ってストーリーを定義
type Story = StoryObj<typeof Button>;

// 各ストーリー
export const PrimaryButton: Story = {
  args: {
    children: "Primary Button",
    color: "primary",
    size: "medium",
  },
};

export const SuccessButton: Story = {
  args: {
    children: "Success Button",
    color: "success",
    size: "medium",
  },
};

export const SmallErrorButton: Story = {
  args: {
    children: "Small Error Button",
    color: "error",
    size: "small",
  },
};

export const LargeWarningButton: Story = {
  args: {
    children: "Large Warning Button",
    color: "warning",
    size: "large",
  },
};
