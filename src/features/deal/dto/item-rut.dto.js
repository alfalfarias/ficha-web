export const BOT_STATUS = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
};

export const botStatus = function(status) {
  for (let key in BOT_STATUS) {
    if (BOT_STATUS[key] === status) {
      return status;
    }
  }
  throw new Error(`${status} is undefined for BOT_STATUS property`);
};

export const ItemRutDto = function(item) {
  const element = {
    id: Number(item.id),
    dni: item.dni && String(item.dni),
    aecoCode: item.aecoCode && String(item.aecoCode),
    womDebt: item.womDebt && Number(item.womDebt).toFixed(2),
    sinacofiDebt: item.sinacofiDebt && Number(item.sinacofiDebt).toFixed(2),
    botStatus: item.botStatus && botStatus(item.botStatus),
    updatedAt: new Date(item.updatedAt),

    isRefreshing: false,
    isRemoving: false,
    isUpdating: false,
    showRemove: false,
  };
  return element;
};

export default ItemRutDto;