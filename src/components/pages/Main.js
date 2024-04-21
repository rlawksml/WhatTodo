import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography, useScrollTrigger } from "@mui/material";
import styled from "styled-components";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { local } from "./local";
import ToastMessage from "./ToastMessage";
import { useDispatch, useSelector } from "react-redux";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from "axios";
import Test from "./Test";

// redux recoil 사용
// 날씨 api는 react query
// next js로 옮기는 작업까지 > 3월 18일

// 다음 프로젝트 들어가기 3월 19일부터 //
// 4월전까지 끝내고 4월에는 선거 프로젝트 만들어보기

export default function Main() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [importantNum, setImportantNum] = useState(0);
  const [doneNum, setDoneNum] = useState(0);
  const [ingNum, setIngNum] = useState(0);
  const [congrateState, setCongrateState] = useState(false);
  const dispatch = useDispatch();


  const handleDoneItem = (idx) => {
    setTodoList((prev) => [
      ...prev.map((item) =>
        item.no === idx.no
          ? { ...item, done: !item.done, important: false }
          : { ...item }
      ),
    ]);

    dispatch({type : "done", todo : idx.title})
    local.setLocal(todoList);
  };

  const handleAddList = (e) => {
    e.preventDefault();

    let checkBoolList = todoList?.map((item) =>
      item.title === inputValue ? true : false
    );

    if (!checkBoolList.includes(true) && inputValue.trim("") !== "") {
      setTodoList((prev) => [
        ...prev,
        {
          no: todoList?.length,
          title: inputValue,
          done: false,
          important: false,
        },
      ]);
      dispatch({type : "add", no:todoList?.length, todo:inputValue, done:false, important:false})
      local.setLocal(todoList);
    } else {
      console.log("이미 들어가 잇음");
    }
    setInputValue("");
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim("") !== "") {
        let checkBoolList = todoList?.map((item) =>
          item.title === inputValue ? true : false
        );

        if (!checkBoolList.includes(true)) {
          setTodoList((prev) => [
            ...prev,
            {
              no: todoList?.length,
              title: inputValue,
              done: false,
              important: false,
            },
          ]);
          dispatch({type : "add", no:todoList?.length, todo:inputValue, done:false, important:false})
          local.setLocal(todoList);

        } else {
          console.log("이미 들어가 잇음");
        }
        setInputValue("");
      }
    }
  };

  const handleImportant = (selectedItem) => {
    setTodoList((prev) => [
      ...prev.map((item, index) => {
        console.log("item", index, item);
        console.log("selectedItem", selectedItem);
        return item.no === selectedItem.no
          ? { ...item, important: !item.important }
          : { ...item };
      }),
    ]);
    local.setLocal(todoList);
  };

  const handleDelete = (idx) => {
    setTodoList((prev) => [...prev.filter((item) => item.no !== idx.no)]);
    local.setLocal(todoList);
  };

  const handleClearItems = () => {
    local.clearLocal();
    setTodoList([]);
  };

  useEffect(() => {
    setImportantNum(() => {
      let count = 0;
      for (let i = 0; i < todoList?.length; i++) {
        todoList[i].important === true && count++;
      }
      return count;
    });
    setDoneNum(() => {
      let count = 0;
      for (let i = 0; i < todoList?.length; i++) {
        todoList[i].done === true && count++;
      }
      return count;
    });
    setIngNum(() => {
      let count = 0;
      for (let i = 0; i < todoList?.length; i++) {
        todoList[i].done === false && count++;
      }
      return count;
    });

    setCongrateState(() => {
      let count = 0;
      for (let i = 0; i < todoList?.length; i++) {
        todoList[i].done === true && count++;
      }

      if (count !== 0 && count === todoList.length) {
        return true;
      } else {
        return false;
      }
    });
  }, [todoList]);

  useEffect(() => {
    let initData = local.getLocal();
    initData === null ? setTodoList([]) : setTodoList(local.getLocal());
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography
        sx={{ mb: 3, mt: 3, textAlign: "center" }}
        color="ActiveBorder"
        variant="h4"
      >
        TodaY
      </Typography>
      <Test/>
      <InputStack className="" spacing={1}>
        <Input
          className="inputTag"
          placeholder="ADD TODO LIST"
          required
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyUp={handleInputEnter}
          endDecorator={
            <Button type="submit" onClick={handleAddList}>
              입력
            </Button>
          }
        />
      </InputStack>
      <MyContainer $maxWidth="lg">
        <div className="todoCt yet">
          {todoList.length <= 0 ? (
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              color={"slateblue"}
              className="count impor"
            >
              새로운 할 일을 추가해보세요!
            </Typography>
          ) : (
            todoList?.map((item, index) => {
              return item.done === false ? (
                <div key={index} className="unitTodo">
                  <span className="number">{}</span>
                  <Checkbox
                    className={item.important === true ? "important" : ""}
                    label={item.title}
                    onChange={() => {
                      handleDoneItem(item);
                    }}
                    variant="soft"
                  />
                  <Button
                    className="first btn"
                    size="sm"
                    color="danger"
                    variant="soft"
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    안할래!
                  </Button>
                  <Button
                    className="btn"
                    size="sm"
                    color="primary"
                    variant="soft"
                    onClick={() => {
                      handleImportant(item);
                    }}
                  >
                    중요해!
                  </Button>
                </div>
              ) : (
                <div key={index}></div>
              );
            })
          )}
        </div>
        <div className="todoCt complete">
          {todoList.length <= 0 ? (
            <></>
          ) : (
            todoList?.map((item, index) => {
              return item.done === true ? (
                <div key={index} className="unitTodo">
                  <span className="number">{}</span>
                  <Checkbox
                    className="completeItem"
                    label={item.title}
                    variant="plain"
                    defaultChecked
                    disabled
                  />
                  <Button
                    className="first btn"
                    size="sm"
                    color="primary"
                    variant="soft"
                    onClick={() => {
                      handleImportant();
                    }}
                    disabled
                  >
                    중요해!
                  </Button>
                </div>
              ) : (
                <div key={index}></div>
              );
            })
          )}
        </div>

        <Button
          sx={{ mt: "auto" }}
          onClick={() => {
            handleClearItems();
          }}
        >
          Clear
        </Button>
      </MyContainer>
      <CountCt>
        <Typography
          variant="caption"
          color={"ActiveBorder"}
          className="count impor"
        >
          중요한 Todo {importantNum}
        </Typography>
        <Typography variant="caption" color={"Highlight"} className="count ing">
          진행중인 Todo {ingNum}
        </Typography>
        <Typography
          variant="caption"
          color={"InactiveCaptionText"}
          className="count done"
        >
          해치운 Todo {doneNum}
        </Typography>
      </CountCt>

      {congrateState && (
        <ToastMessage
          congrateState={congrateState}
          setCongrateState={setCongrateState}
        />
      )}
    </Container>
  );
}

const MyContainer = styled.div`
  border: 1px solid #dcdcdc;
  height: 100%;
  min-height: 40vh;
  border-radius: 10px;
  padding: 10px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  & div.todoCt {
    flex: 0 0 50%;
    width: 100%;
    padding: 10px 0;
    .unitTodo {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .number {
        font-size: 12px;
        margin-right: 10px;
        background: #eee993b3;
        padding: 2px 3.5px;
        color: #888;
        border-radius: 10px;
      }
      .first.btn {
        margin-left: auto;
      }
      .btn {
        margin-right: 5px;
      }
      .important {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 120%;
          height: 10px;
          z-index: -1;
          background-color: blanchedalmond;
          left: 0;
          bottom: 0;
        }
      }
      margin-bottom: 10px;
      border-bottom: 1px solid #dcdcdc;
    }
  }
  .yet {
    /* border-bottom: 1px solid #dcdcdc; */
  }
  .complete {
    .completeItem {
      .MuiCheckbox-label {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          background: #888;
          width: 100%;
          height: 2px;
          top: 50%;
        }
      }
    }
  }
`;

const InputStack = styled(Stack)`
  margin: 10px 0;

  .inputTag {
  }
`;

const CountCt = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  margin: 10px 0;
  .count {
  }
`;
