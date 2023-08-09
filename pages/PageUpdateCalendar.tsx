import SimpleContent from "@/components/SimpleCon";
import {
  Card,
  MenuProps,
  InputNumber,
  Input,
  Dropdown,
  Space,
  Button,
  Divider,
} from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function CalendarNoteUpdatePage() {
  const [monthName, setMonthName] = useState("");
  const [tableNo, setTableNo] = useState("1");
  const [yearCount, setYearCount] = useState<number>(27);
  const [dayNumber, setDayNumber] = useState(0);
  const [textInputText, setTextInputText] = useState<string>("");

  const handleMonthClick: MenuProps["onClick"] = (e) => {
    setMonthName(e.key);
  };

  const handleTableClick: MenuProps["onClick"] = (e) => {
    setTableNo(e.key);
  };

  const handleYearClick = (value: number) => {
    setYearCount(value);
  };

  const handleDayClick = (value: number) => {
    setDayNumber(value);
  };

  const handleNextClick = async () => {
    if (tableNo && monthName && dayNumber >= 1 && dayNumber <= 48) {
      try {
        const response = await fetch(
          "https://teothe.pythonanywhere.com/getSessionNotes?table=" +
            tableNo +
            "&year=" +
            yearCount +
            "&month=" +
            monthName
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const responseData = await response.json();
  
        if (responseData === "N") {
          setTextInputText("");
        } else {
          const selectedData = responseData[dayNumber];
          setTextInputText(selectedData || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTextInputText("Error fetching data");
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Buibus",
      key: "Buibus",
    },
    {
      label: "Ukeus",
      key: "Ukeus",
    },
    {
      label: "Verus",
      key: "Verus",
    },
    {
      label: "Vihus",
      key: "Vihus",
    },
    {
      label: "Fexyius",
      key: "Fexyius",
    },
    {
      label: "Vesius",
      key: "Vesius",
    },
    {
      label: "Cyaxus",
      key: "Cyaxus",
    },
    {
      label: "Radus",
      key: "Radus",
    },
  ];
  const monthProps = {
    items,
    onClick: handleMonthClick,
  };

  const tableItems: MenuProps["items"] = [
    {
      label: "1",
      key: "1",
    },
    {
      label: "2",
      key: "2",
    },
  ];
  const tableProps = {
    items: tableItems,
    onClick: handleTableClick,
  };

  return (
    <Card>
      <SimpleContent
        contentProps={{
          title: "Change Calendar Data",
          text: ["Select Table, Year, Month and Day to start typing"],
        }}
      />
      <Space className="mb-4">
        Table:{" "}
        <Dropdown menu={tableProps}>
          <Button>
            <Space>
              {tableNo}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Divider type="vertical" style={{ borderColor: "white" }} />
        Year:{" "}
        <InputNumber
          min={27}
          defaultValue={27}
          onChange={(x) => {
            if (x != null) {
              handleYearClick(x);
            }
          }}
        />
        <Divider type="vertical" style={{ borderColor: "white" }} />
        Month:{" "}
        <Dropdown menu={monthProps}>
          <Button>
            <Space>
              {monthName}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Divider type="vertical" style={{ borderColor: "white" }} />
        Day:{" "}
        <InputNumber
          min={1}
          max={48}
          onChange={(x) => {
            if (x != null) {
              handleDayClick(x);
            }
          }}
        />
        <Divider type="vertical" style={{ borderColor: "white" }} />
        <Button type="primary" onClick={handleNextClick}>
          Next
        </Button>
      </Space>
      <Divider />
      <TextArea
        rows={4}
        maxLength={1000}
        showCount={true}
        value={textInputText}
        onChange={(e) => setTextInputText(e.target.value)}
      />
      <Divider />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Card>
  );
}
