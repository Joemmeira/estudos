import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  List,
  Space,
  Input,
  Popconfirm,
  Progress,
  Typography,
} from "antd";
import { DeleteFilled, PlusCircleTwoTone } from "@ant-design/icons";
import jiraIssueService from "./jira-issue-service.sim";
const { TextArea } = Input;

const isChecked = (tarefa) => tarefa.checked === "S";

const MyCheckBox = () => {
  const [disable, setDisable] = useState(false);
  const pkey = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const inputRef = useRef(null);

  const listarTodo = async () => {
    setCarregando(true);
    try {
      const resposta = await jiraIssueService.obterListaTarefas(pkey);
      setTodo(resposta.tarefas);
      setDisable(resposta.editavel !== "S");
    } finally {
      setCarregando(false);
    }
  };

  const salvar = async (tarefa) => {
    if (tarefa.value.trim().length === 0) return;
    setCarregando(true);
    try {
      await jiraIssueService.salvarTarefa(pkey, tarefa);
      await listarTodo();
    } finally {
      setCarregando(false);
    }
  };

  const remover = async (key) => {
    setCarregando(true);
    try {
      await jiraIssueService.removerTarefa(key);
      await listarTodo();
    } finally {
      setCarregando(false);
    }
  };

  const marcar = async (key) => {
    setCarregando(true);
    try {
      const resposta = await jiraIssueService.marcarTarefa(key);
      setDisable(resposta.editavel !== "S");
      setTodo((todoOld) => {
        return todoOld.map((item) => {
          return item.key === key
            ? { ...item, checked: resposta.checked }
            : item;
        });
      });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    listarTodo();
    // eslint-disable-next-line
  }, []);
  //ok>
  const [carregando, setCarregando] = useState(true);
  const [todos, setTodo] = useState([]);
  const [todo, setTodoInput] = useState("");
  const onChangeInput = (e) => {
    setTodoInput(e.target.value.replace("\n", " "));
  };

  const onAdd = async () => {
    setCarregando(true);
    try {
      const lista = todo
        .split("\n")
        .filter((t) => t !== undefined && t.trim().length > 0);

      setTodoInput("");

      for (const value of lista) {
        await jiraIssueService.salvarTarefa(pkey, { value });
      }
      await listarTodo();
    } finally {
      setTodoInput("");
      setCarregando(false);
      inputRef.current.focus({
        cursor: "start",
      });
    }
  };

  const size = todos.length;

  const marked = useMemo(() => {
    const contMarked = todos.reduce((prev, curr) => {
      return isChecked(curr) ? prev + 1 : prev;
    }, 0);
    return contMarked;
  }, [todos]);

  const percent = useMemo(() => {
    return (marked / size) * 100;
  }, [marked, size]);

  return (
    <>
      <List
        loading={carregando}
        size="small"
        header={
          todos.length === 0 ? (
            ""
          ) : (
            <Progress
              percent={percent}
              status={marked === todos.length ? "success" : "default"}
              format={() => `${marked}/${todos.length}`}
            />
          )
        }
        footer={
          disable ? (
            ""
          ) : (
            <Space.Compact style={{ width: "100%" }}>
              <TextArea
                autoSize
                placeholder="Informe as ações e pressione ENTER"
                value={todo}
                disabled={carregando}
                onChange={onChangeInput}
                onPressEnter={onAdd}
                ref={inputRef}
              />
              <Button
                onClick={onAdd}
                disabled={carregando || todo === "" ? true : false}
                icon={<PlusCircleTwoTone />}
              />
            </Space.Compact>
          )
        }
        bordered //borda
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={
              !isChecked(item) && !disable
                ? [
                    <Popconfirm
                      title="Apagar tarefa."
                      onConfirm={() => {
                        remover(item.key);
                      }}
                      description={`Deseja apagar a tarefa: ${item.value}?`}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Button
                        danger
                        size="small"
                        icon={<DeleteFilled />}
                        type="link"
                      />
                    </Popconfirm>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  disabled={disable}
                  style={{ marginRight: "10px" }}
                  checked={isChecked(item)}
                  onChange={() => marcar(item.key)}
                />
              }
              description={
                <Typography.Paragraph
                  style={{ margin: 0 }}
                  delete={isChecked(item)}
                  editable={
                    disable
                      ? false
                      : {
                          onChange: (value) => {
                            salvar({ ...item, value });
                          },
                          tooltip: "Clique para editar",
                          triggerType: ["text", "icon"],
                          maxLength: 1000,
                          autoSize: false,
                        }
                  }
                >
                  {item.value}
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default MyCheckBox;