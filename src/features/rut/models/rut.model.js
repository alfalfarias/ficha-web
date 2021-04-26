export const VERIFICACION = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
};

export const verificacion = function(status) {
  for (let key in VERIFICACION) {
    if (VERIFICACION[key] === status) {
      return status;
    }
  }
  throw new Error(`${status} is undefined for VERIFICACION property`);
};

export const RutModel = function(data) {
  return {
    id: data.id || Number(data.id),
    rut: data.rut || Number(data.rut),
    dv: data.dv || String(data.dv),
    code_aeco: data.code_aeco || String(data.code_aeco),
    mdeudaw: data.mdeudaw || String(data.mdeudaw),
    mdeudas: data.mdeudaw || String(data.mdeudas),
    verificacion: data.verificacion || verificacion(data.verificacion),
    fecha: data.fecha || String(data.fecha),
  };
};