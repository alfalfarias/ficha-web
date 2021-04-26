// import { botStatus } from '../models/rut.model';

export const UpdateRutDto = function(data) {
  return {
    // id: Number(data.id),
    // dni: String(data.dni),
    botStatus: data.botStatus,
    // botStatus: botStatus(data.botStatus),
  };
};

export default UpdateRutDto;