import { RutModel } from "../models";

const data = [
  {
    id: 1,
    dni: "76.564.411-9",
    aecoCode: "477395", // cod aeco
    womDebt: 6.50, // wom deuda
    sinacofiDebt: 24.20, // sinacofi deuda
    botStatus: 'ENABLED', // monitoreo
    updatedAt: "2021-02-28 23:14", // actualización
  },
  {
    id: 2,
    dni: "76.228.535-5",
    aecoCode: "479902",
    womDebt: 9.50,
    sinacofiDebt: 37.36,
    botStatus: 'DISABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 3,
    dni: "12.299.364-7",
    aecoCode: "620200",
    womDebt: 16.01,
    sinacofiDebt: 23.04,
    botStatus: 'ENABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 4,
    dni: "18.119.441-3",
    aecoCode: "620100",
    womDebt: 3.7,
    sinacofiDebt: 67,
    botStatus: 'DISABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 5,
    dni: "11.129.153-5",
    aecoCode: "829900",
    womDebt: 16.0,
    sinacofiDebt: 49,
    botStatus: 'DISABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 6,
    dni: "11.079.411-8",
    aecoCode: "829932",
    womDebt: 1.0,
    sinacofiDebt: 94,
    botStatus: 'ENABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 7,
    dni: "22483172-2",
    aecoCode: "449211",
    womDebt: 0.2,
    sinacofiDebt: 98,
    botStatus: 'ENABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 8,
    dni: "19343527-0",
    aecoCode: "672853",
    womDebt: 3.2,
    sinacofiDebt: 87,
    botStatus: 'ENABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 9,
    dni: "6058198-3",
    aecoCode: "718463",
    womDebt: 25.05,
    sinacofiDebt: 51,
    botStatus: 'ENABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 10,
    dni: "13098507-6",
    aecoCode: "875632",
    womDebt: 26.75,
    sinacofiDebt: 65,
    botStatus: 'DISABLED',
    updatedAt: "2021-02-28 23:14",
  },
  {
    id: 11,
    dni: "82174631-2",
    aecoCode: "675318",
    womDebt: 9325.25,
    sinacofiDebt: 5748.02,
    botStatus: 'DISABLED',
    updatedAt: "2021-02-28 23:14",
  },
];
data.map(item => RutModel(item));
export default data;