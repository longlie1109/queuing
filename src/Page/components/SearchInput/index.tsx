import React, { useState } from "react";
import { Input } from "antd";
import Icon from "@ant-design/icons";
import { ReactComponent as searchSvg } from "../../../Assets/search.svg";

interface props {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<props> = ({ className, placeholder, onSearch }) => {
  const [value, setValue] = useState<string>("");

  return (
    <Input
      type="text"
      value={value}
      style={{ height: "44px", fontSize: "16px" }}
      onChange={(e) => setValue(e.target.value)}
      onPressEnter={(e) => onSearch && onSearch(value)}
      suffix={
        <Icon
          component={searchSvg}
          style={{ fontSize: "20px", color: "#FF7506" }}
        />
      }
      className={className}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
