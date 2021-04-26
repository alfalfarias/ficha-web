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
  throw new Error(`${status} is undefined for verificacion property`);
};

export const CreateRutDto = function(data) {
  return {
    dni: data.dni && String(data.dni),
    botStatus: data.botStatus && botStatus(data.botStatus),
  };
};

export default CreateRutDto;