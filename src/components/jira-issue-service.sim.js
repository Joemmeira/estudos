export default (() => {
  let tarefas = [
    {
      key: 0,
      value: "Executar permissção no banco",
      checked: "S",
    },
    {
      key: 1,
      value: "criar tabelas na base de dados",
      checked: "S",
    },
    {
      key: 2,
      value: "Alterar tela",
      checked: "N",
    },
    {
      key: 3,
      value: "Publicar tela no cliente",
      checked: "N",
    },
  ];

  return {
    obterListaTarefas: (pkey) => {
      if ((Math.random() * 10) % 10 === 0) {
        return Promise.reject({ response: { status: 403 } });
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ tarefas: [...tarefas], editavel: "S" });
        }, 2000);
      });
    },
    salvarTarefa: (pkey, tarefa) => {
      const index =
        tarefa.key === undefined
          ? -1
          : tarefas.findIndex((t) => t.key === tarefa.key);
      const novasTarefas = [...tarefas];
      if (index >= 0) {
        novasTarefas[index] = { ...tarefa };
      } else {
        novasTarefas.push(tarefa);
      }
      tarefas = novasTarefas;
      if ((Math.random() * 10) % 10 === 0) {
        return Promise.reject({ response: { status: 403 } });
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ tarefas: [...tarefas], editavel: "S" });
        }, 2000);
      });
    },
    marcarTarefa: (key) => {
      const index =
        key === undefined ? -1 : tarefas.findIndex((t) => t.key === key);

      console.log(index, key);

      if (index >= 0) {
        const t = tarefas[index];
        tarefas[index] = { ...t, checked: t.checked === "S" ? "N" : "S" };
        const r = tarefas[index];

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ checked: r.checked, editavel: "S" });
          }, 300);
        });
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({});
        }, 2000);
      });
    },
    removerTarefa: (key) => {
      const novasTarefas = tarefas.filter((t) => t.key !== key);
      tarefas = novasTarefas;
      if ((Math.random() * 10) % 10 === 0) {
        return Promise.reject({ response: { status: 403 } });
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            tarefas: [...tarefas],
            editavel: novasTarefas.length > 0 ? "S" : "N",
          });
        }, 2000);
      });
    },
  };
})();

//export const addProductToBasket = id => new Promise(resolve => setTimeout(resolve, 750));